"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  FileText,
  Wind,
  Hammer,
  Gem,
  Loader2,
  CheckCircle2,
  Pencil,
  Download,
} from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../ui-bits";
import { MapEmbed } from "../map-embed";
import { SHOP } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;
type ProjectType = "HVAC" | "Custom Fab" | "Architectural";

interface FormState {
  name: string;
  phone: string;
  email: string;
  projectType: ProjectType | "";
  need: string;
  details: string;
  fileName: string;
  fileData: string;
}

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  need: "",
  details: "",
  fileName: "",
  fileData: "",
};

const PROJECT_OPTIONS: {
  id: ProjectType;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "HVAC", label: "HVAC & Ductwork", desc: "Duct runs, fittings, retrofits", icon: Wind },
  { id: "Custom Fab", label: "Custom Fabrication", desc: "Enclosures, structural, welds", icon: Hammer },
  { id: "Architectural", label: "Architectural Metal", desc: "Hoods, stairs, flashings, copper", icon: Gem },
];

export function ContactView() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-silver/15 bg-black py-24 sm:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
          style={{ backgroundImage: "url(/images/gallery-ductwork.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-forge" /> Get a Quote
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.92] text-foreground sm:text-7xl">
              Let&apos;s Build Something{" "}
              <span className="text-forge">Indestructible</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver/80 sm:text-lg">
              Send us your blueprint and get a fast, honest custom quote. No
              salespeople, no runaround — just craftsmen who want to build your
              project right.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-12 lg:px-8">
          {/* Left: info */}
          <div className="lg:col-span-2">
            <Reveal>
              <SectionHeading
                eyebrow="The Shop"
                title={
                  <>
                    Reach the <span className="text-forge">Shop</span>
                  </>
                }
              />
              <ul className="mt-8 space-y-5">
                <ContactRow icon={MapPin} label="Address" value={SHOP.address} />
                <ContactRow
                  icon={Phone}
                  label="Phone"
                  value={SHOP.phone}
                  href={SHOP.phoneHref}
                />
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={SHOP.email}
                  href={`mailto:${SHOP.email}`}
                />
                <ContactRow icon={Clock} label="Hours" value={SHOP.hours} />
              </ul>

              {/* Map */}
              <div className="mt-6">
                <MapEmbed variant="compact" height={220} />
              </div>
            </Reveal>

            {/* Lead magnet */}
            <Reveal delay={0.1}>
              <div className="mt-10 border border-forge/40 bg-forge/5 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center bg-forge text-black">
                    <FileText className="size-5" />
                  </span>
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-forge">
                      Free Download
                    </p>
                    <p className="font-display text-base font-bold uppercase text-foreground">
                      Contractor&apos;s Guide
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;The Contractor&apos;s Guide to Spec-Perfect
                  Ductwork&rdquo; — a 1-page checklist of common install
                  mistakes and how custom fabrication saves money on energy
                  bills.
                </p>
                <a
                  href="/contractors-guide.pdf"
                  download="Pat-Sheet-Metal-Contractors-Guide-to-Spec-Perfect-Ductwork.pdf"
                  className="group mt-4 inline-flex items-center gap-2 bg-forge px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#ff7a2e]"
                >
                  <Download className="size-4" />
                  Download the PDF
                </a>
                <p className="mt-2 text-[0.7rem] text-muted-foreground">
                  Instant download · 1 page · PDF
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: multi-step form */}
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <MultiStepForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center border border-silver/20 text-forge">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-foreground">{value}</p>
      </div>
    </>
  );
  return (
    <li className="flex items-center gap-4">
      {href ? (
        <a href={href} className="flex items-center gap-4 transition-colors hover:text-forge">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

function MultiStepForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const update = (field: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validateStep = (s: Step): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!form.name.trim() || form.name.trim().length < 2)
        e.name = "Enter your name.";
      // Real phone number: 7-15 digits, may include + - ( ) . spaces,
      // and an optional "x"/"ext" extension. Rejects pure letters and
      // strings with random words like "call me at 555-1234".
      const phoneStr = form.phone.trim();
      const phoneDigits = phoneStr.replace(/[^0-9]/g, "");
      const phoneCharsOk = /^[+]?[\d\s().\-]+(?:\s*(?:x|ext|#)\s*\d+)?$/i.test(
        phoneStr,
      );
      if (
        phoneDigits.length < 7 ||
        phoneDigits.length > 15 ||
        !phoneCharsOk
      )
        e.phone = "Enter a valid phone number.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Enter a valid email.";
      if (!form.projectType) e.projectType = "Pick a service.";
    }
    if (s === 2) {
      if (form.details.trim().length < 10)
        e.details = "Tell us a bit more (10+ characters).";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step) && step < 3) setStep((s) => (s + 1) as Step);
  };
  const back = () => setStep((s) => (Math.max(1, s - 1)) as Step);

  const onFile = (file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((e) => ({ ...e, file: "File must be under 5MB." }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({
        ...f,
        fileName: file.name,
        fileData: String(reader.result ?? ""),
      }));
      setErrors((e) => ({ ...e, file: "" }));
    };
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          projectType: form.projectType,
          need: form.need,
          details: form.details,
          fileName: form.fileName || undefined,
          fileData: form.fileData || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setServerError(
          data?.errors?._ ||
            data?.errors?.details ||
            "Submission failed. Please call the shop.",
        );
      }
    } catch {
      setServerError("Network error. Please call the shop instead.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-forge/40 bg-steel p-8 text-center sm:p-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mx-auto flex size-20 items-center justify-center bg-forge text-black"
        >
          <CheckCircle2 className="size-11" strokeWidth={2.5} />
        </motion.div>
        <h3 className="mt-6 font-display text-3xl font-bold uppercase text-foreground">
          Blueprint Received.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Thanks, {form.name.split(" ")[0] || "partner"}. Your{" "}
          <span className="text-forge">{form.projectType}</span> quote request
          is in the shop. A craftsman will reach out within one business day.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SHOP.phoneHref}
            className="inline-flex items-center justify-center gap-2 border border-silver/30 px-6 py-3 font-display text-xs font-semibold uppercase tracking-wider text-silver transition-colors hover:border-forge hover:text-forge"
          >
            <Phone className="size-4" /> Or Call Now: {SHOP.phone}
          </a>
          <button
            onClick={() => {
              setForm(EMPTY);
              setStep(1);
              setSubmitted(false);
            }}
            className="font-display text-xs font-semibold uppercase tracking-wider text-forge hover:underline"
          >
            Submit Another →
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="border border-silver/15 bg-steel p-6 sm:p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {["Service & Contact", "The Details", "Review & Submit"].map(
            (label, i) => {
              const n = (i + 1) as Step;
              const done = step > n;
              const active = step === n;
              return (
                <div
                  key={label}
                  className="flex flex-1 items-center"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center border font-display text-xs font-bold transition-colors",
                        done && "border-forge bg-forge text-black",
                        active && "border-forge text-forge",
                        !done && !active && "border-silver/25 text-silver/50",
                      )}
                    >
                      {done ? <Check className="size-4" /> : n}
                    </span>
                    <span
                      className={cn(
                        "hidden font-display text-[0.65rem] font-semibold uppercase tracking-wider sm:block",
                        active ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 2 && (
                    <span
                      className={cn(
                        "mx-2 h-px flex-1 transition-colors",
                        step > n ? "bg-forge" : "bg-silver/15",
                      )}
                    />
                  )}
                </div>
              );
            },
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <StepBody key="s1">
            <FieldLabel>What are we building?</FieldLabel>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PROJECT_OPTIONS.map((opt) => {
                const selected = form.projectType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      update("projectType", opt.id);
                      setErrors((e) => ({ ...e, projectType: "" }));
                    }}
                    className={cn(
                      "border p-4 text-left transition-all",
                      selected
                        ? "border-forge bg-forge/10"
                        : "border-silver/20 hover:border-silver/40",
                    )}
                  >
                    <opt.icon
                      className={cn(
                        "size-6",
                        selected ? "text-forge" : "text-silver/60",
                      )}
                    />
                    <p className="mt-3 font-display text-sm font-bold uppercase text-foreground">
                      {opt.label}
                    </p>
                    <p className="mt-1 text-[0.7rem] text-muted-foreground">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
            {errors.projectType && <ErrorText>{errors.projectType}</ErrorText>}

            {/* Optional free-text: describe what you need */}
            <div className="mt-5">
              <label className="font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Describe what you need{" "}
                <span className="font-normal normal-case text-muted-foreground/70">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                value={form.need}
                onChange={(e) => update("need", e.target.value)}
                maxLength={300}
                placeholder="e.g. A 36&quot; copper range hood, 10 floors of ductwork, a custom steel railing..."
                className="mt-1.5 w-full border border-silver/20 bg-black px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-forge focus:outline-none"
              />
              <p className="mt-1.5 text-[0.7rem] text-muted-foreground">
                Not sure which category fits? Just tell us what you&apos;re
                after — we&apos;ll figure out the rest.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Full Name"
                value={form.name}
                onChange={(v) => update("name", v)}
                error={errors.name}
                placeholder="Jane Contractor"
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                error={errors.phone}
                placeholder="(512) 555-0199"
                type="tel"
              />
            </div>
            <div className="mt-4">
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
                placeholder="jane@buildco.com"
                type="email"
              />
            </div>

            <FormNav onNext={next} nextLabel="Continue" />
          </StepBody>
        )}

        {step === 2 && (
          <StepBody key="s2">
            <FieldLabel>The Details</FieldLabel>
            <p className="mt-1 text-xs text-muted-foreground">
              Tell us about dimensions, materials, timeline, and anything else
              that matters. The more detail, the faster the quote.
            </p>
            <textarea
              value={form.details}
              onChange={(e) => update("details", e.target.value)}
              rows={6}
              placeholder="e.g. Custom copper range hood, 36&quot; wide, for a kitchen reno in Westlake. Need it in 4 weeks..."
              className="mt-3 w-full resize-none border border-silver/20 bg-black px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-forge focus:outline-none"
            />
            {errors.details && <ErrorText>{errors.details}</ErrorText>}

            {/* Blueprint upload */}
            <FieldLabel className="mt-6">
              Upload Blueprint / Sketch{" "}
              <span className="font-normal normal-case text-muted-foreground">
                (optional)
              </span>
            </FieldLabel>
            <label
              className={cn(
                "mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed px-6 py-8 text-center transition-colors",
                form.fileName
                  ? "border-forge/50 bg-forge/5"
                  : "border-silver/25 hover:border-forge/50",
              )}
            >
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.dwg,.dxf"
                className="sr-only"
                onChange={(e) => onFile(e.target.files?.[0] ?? null)}
              />
              {form.fileName ? (
                <>
                  <FileText className="size-7 text-forge" />
                  <p className="font-display text-sm font-semibold text-foreground">
                    {form.fileName}
                  </p>
                  <p className="text-[0.7rem] text-muted-foreground">
                    Click to replace
                  </p>
                </>
              ) : (
                <>
                  <Upload className="size-7 text-silver/50" />
                  <p className="font-display text-sm font-semibold uppercase text-foreground">
                    Drop or click to upload
                  </p>
                  <p className="text-[0.7rem] text-muted-foreground">
                    PDF, PNG, JPG, DWG · max 5MB
                  </p>
                </>
              )}
            </label>
            {errors.file && <ErrorText>{errors.file}</ErrorText>}

            <FormNav onBack={back} onNext={next} nextLabel="Review" />
          </StepBody>
        )}

        {step === 3 && (
          <StepBody key="s3">
            <FieldLabel>Review &amp; Submit</FieldLabel>
            <p className="mt-1 text-xs text-muted-foreground">
              Looks good? Fire it to the shop.
            </p>

            <div className="mt-4 divide-y divide-silver/10 border border-silver/15 bg-black">
              <ReviewRow
                label="Service"
                value={form.projectType}
                onEdit={() => setStep(1)}
              />
              {form.need.trim() && (
                <ReviewRow
                  label="What You Need"
                  value={form.need}
                  onEdit={() => setStep(1)}
                />
              )}
              <ReviewRow
                label="Name"
                value={form.name}
                onEdit={() => setStep(1)}
              />
              <ReviewRow
                label="Phone"
                value={form.phone}
                onEdit={() => setStep(1)}
              />
              <ReviewRow
                label="Email"
                value={form.email}
                onEdit={() => setStep(1)}
              />
              <ReviewRow
                label="Details"
                value={form.details}
                onEdit={() => setStep(2)}
              />
              <ReviewRow
                label="Blueprint"
                value={form.fileName || "None attached"}
                onEdit={() => setStep(2)}
              />
            </div>

            {serverError && (
              <div className="mt-4 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {serverError}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={back}
                className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-silver/70 transition-colors hover:text-forge"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
              <button
                onClick={submit}
                disabled={submitting}
                className="group inline-flex items-center justify-center gap-2 bg-forge px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-[#ff7a2e] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending to Shop...
                  </>
                ) : (
                  <>
                    Send to the Shop <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </StepBody>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepBody({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FieldLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "mt-1.5 w-full border bg-black px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none",
          error
            ? "border-red-500/60 focus:border-red-500"
            : "border-silver/20 focus:border-forge",
        )}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 text-xs text-red-400">{children}</p>
  );
}

function FormNav({
  onBack,
  onNext,
  nextLabel,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel: string;
}) {
  return (
    <div className="mt-7 flex items-center justify-between gap-3">
      {onBack ? (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-silver/70 transition-colors hover:text-forge"
        >
          <ArrowLeft className="size-4" /> Back
        </button>
      ) : (
        <span />
      )}
      <button
        onClick={onNext}
        className="group inline-flex items-center justify-center gap-2 bg-forge px-7 py-3 font-display text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-[#ff7a2e] hover:-translate-y-0.5"
      >
        {nextLabel}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-4">
      <div className="min-w-0">
        <p className="font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 break-words text-sm text-foreground">{value}</p>
      </div>
      <button
        onClick={onEdit}
        className="inline-flex shrink-0 items-center gap-1 font-display text-[0.65rem] font-semibold uppercase tracking-wider text-forge hover:underline"
      >
        <Pencil className="size-3" /> Edit
      </button>
    </div>
  );
}
