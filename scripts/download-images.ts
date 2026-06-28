// Download real web photos and re-encode as PNG, replacing the AI images.
// Keeps filenames identical so no code references need to change.
import sharp from "sharp";
import fs from "fs";
import path from "path";

const IMG_DIR = "/home/z/my-project/public/images";
const META: Record<string, string> = {
  "hero-foundry":
    "https://sfile.chatglm.cn/images-ppt/a5e6879d9fe6.jpg",
  "welder-portrait":
    "https://sfile.chatglm.cn/images-ppt/a20c6c88fe67.jpg",
  "craftsman-pat":
    "https://sfile.chatglm.cn/images-ppt/837f4920ee34.jpg",
  "craftsman-fabricator":
    "https://sfile.chatglm.cn/images-ppt/9a4336fdb147.jpg",
  "craftsman-hvac":
    "https://sfile.chatglm.cn/images-ppt/7c68c3e4d084.jpeg",
  "gallery-copper-hood":
    "https://sfile.chatglm.cn/images-ppt/8cdc3551dc2e.webp",
  "gallery-ductwork":
    "https://sfile.chatglm.cn/images-ppt/cad1835acb60.jpeg",
  "gallery-staircase":
    "https://sfile.chatglm.cn/images-ppt/dc48516c553b.png",
  "gallery-enclosure":
    "https://sfile.chatglm.cn/images-ppt/da12c3b8e579.png",
  "gallery-flashing":
    "https://sfile.chatglm.cn/images-ppt/6a6f74cf77f8.jpg",
  "gallery-structural":
    "https://sfile.chatglm.cn/images-ppt/e76a62bbaef4.jpg",
};

async function download(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function main() {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  let ok = 0;
  let fail = 0;
  for (const [key, url] of Object.entries(META)) {
    const outPath = path.join(IMG_DIR, `${key}.png`);
    try {
      console.log(`[${key}] downloading...`);
      const buf = await download(url);
      // Re-encode as PNG via sharp. Resize very large images down to a sane max
      // dimension to keep file sizes reasonable (preserve aspect ratio).
      let pipeline = sharp(buf, { failOn: "none" });
      const meta = await pipeline.metadata();
      const maxDim = 1600;
      if ((meta.width ?? 0) > maxDim || (meta.height ?? 0) > maxDim) {
        pipeline = pipeline.resize({
          width: maxDim,
          height: maxDim,
          fit: "inside",
          withoutEnlargement: true,
        });
      }
      await pipeline.png({ quality: 90, compressionLevel: 8 }).toFile(outPath);
      const stat = fs.statSync(outPath);
      console.log(`  OK  ${key}.png  (${(stat.size / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.error(`  FAIL ${key}: ${e instanceof Error ? e.message : e}`);
      fail++;
    }
  }
  console.log(`\nDone. ${ok} ok, ${fail} failed.`);
}

main();
