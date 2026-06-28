import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendQuoteEmail } from "@/lib/email";
import fs from "fs";
import path from "path";

const QUOTES_DIR = path.join(process.cwd(), "download", "quotes");

const PROJECT_TYPES = ["HVAC", "Custom Fab", "Architectural"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, projectType, need, details, fileName, fileData } =
      typeof body === "object" && body !== null ? body : {};

    // Validate
    const errors: Record<string, string> = {};
    if (!name || String(name).trim().length < 2)
      errors.name = "Name is required.";
    if (!phone || String(phone).trim().length < 7)
      errors.phone = "A valid phone number is required.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email)))
      errors.email = "A valid email is required.";
    if (!projectType || !PROJECT_TYPES.includes(projectType))
      errors.projectType = "Select a project type.";
    if (!details || String(details).trim().length < 10)
      errors.details = "Tell us a bit about your project (10+ characters).";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 },
      );
    }

    // Handle optional blueprint upload
    let savedFileName: string | null = null;
    let savedFilePath: string | null = null;
    if (fileData && fileName) {
      // Basic safety: limit ~5MB
      const base64 = String(fileData).split(",").pop() ?? "";
      const buffer = Buffer.from(base64, "base64");
      if (buffer.length > 5 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            errors: { file: "Blueprint file must be under 5MB." },
          },
          { status: 400 },
        );
      }
      const safeName = String(fileName)
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(0, 80);
      const stamp = Date.now();
      savedFileName = `${stamp}-${safeName}`;
      savedFilePath = path.join(QUOTES_DIR, savedFileName);
      try {
        fs.mkdirSync(QUOTES_DIR, { recursive: true });
        fs.writeFileSync(savedFilePath, buffer);
      } catch {
        savedFileName = null;
        savedFilePath = null;
      }
    }

    const record = await db.quoteRequest.create({
      data: {
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: String(email).trim(),
        projectType: String(projectType),
        need: need ? String(need).trim().slice(0, 500) : null,
        details: String(details).trim(),
        fileName: savedFileName,
        filePath: savedFilePath,
      },
    });

    // Email the shop owner with all the details. Runs non-blocking but awaited;
    // never throws (failures are logged + an audit copy is always saved to disk).
    const mailResult = await sendQuoteEmail({
      id: record.id,
      name: record.name,
      phone: record.phone,
      email: record.email,
      projectType: record.projectType,
      need: record.need,
      details: record.details,
      fileName: record.fileName,
      submittedAt: record.createdAt,
    });

    return NextResponse.json({
      success: true,
      id: record.id,
      message: "Quote request received. The shop will be in touch shortly.",
      emailSent: mailResult.sent,
    });
  } catch (err) {
    console.error("[api/contact] error:", err);
    return NextResponse.json(
      {
        success: false,
        errors: { _: "Something went wrong on our end. Please call the shop." },
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "pat's sheet metal quotes" });
}
