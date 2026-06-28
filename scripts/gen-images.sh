#!/usr/bin/env bash
# Pat's Sheet Metal — industrial image generation
# Valid API sizes: 1024x1024, 768x1344, 864x1152, 1344x768, 1152x864
set -u
OUT="/home/z/my-project/public/images"
mkdir -p "$OUT"
LOG="$OUT/gen.log"
: > "$LOG"

gen () {
  local name="$1"; local size="$2"; local prompt="$3"
  if [ -f "$OUT/$name" ]; then echo "SKIP $name (exists)"; return; fi
  echo ">>> GEN $name [$size]"
  z-ai image -p "$prompt" -o "$OUT/$name" -s "$size" > "$OUT/${name}.tmp.log" 2>&1
  local rc=$?
  if [ $rc -eq 0 ] && [ -f "$OUT/$name" ]; then
    echo "    OK $name"
    echo "OK $name" >> "$LOG"
  else
    echo "    FAIL $name (rc=$rc)"
    echo "FAIL $name :: $(tail -2 "$OUT/${name}.tmp.log" 2>/dev/null)" >> "$LOG"
  fi
  rm -f "$OUT/${name}.tmp.log"
}

gen "hero-foundry.png" "1344x768" \
  "Dramatic high-contrast black and white photograph of an industrial sheet metal fabrication shop, a massive hydraulic press stamping glowing orange-hot steel plate, bright neon orange sparks exploding everywhere, dark smoky atmosphere, cinematic, gritty raw metal-shop feel, professional photography, ultra detailed, moody"

gen "welder-portrait.png" "1344x768" \
  "High contrast black and white portrait of a welder behind a dark protective welding mask, intense bright orange sparks arcs, focused posture, dramatic rim lighting, gritty industrial workshop, professional cinematography, ultra detailed"

gen "craftsman-pat.png" "864x1152" \
  "Black and white dramatic portrait of a rugged middle-aged male master welder wearing a leather apron, arms crossed, weathered hands, industrial workshop background with steel sheets, strong side lighting, professional studio photography, ultra detailed, gritty"

gen "craftsman-fabricator.png" "864x1152" \
  "Black and white dramatic portrait of a skilled female architectural metal fabricator wearing safety glasses and a dark work shirt, confident focused expression, polished metalwork in background, dramatic lighting, professional photography, ultra detailed"

gen "craftsman-hvac.png" "864x1152" \
  "Black and white dramatic portrait of a male HVAC ductwork specialist holding metal measuring tools, wearing a dark work jacket, industrial ductwork background, confident stance, dramatic lighting, professional photography, ultra detailed"

gen "gallery-copper-hood.png" "1024x1024" \
  "Custom handcrafted hammered copper range hood installed in a luxury modern kitchen, warm metallic patina with subtle orange tones, professional architectural interior photography, high detail, elegant"

gen "gallery-ductwork.png" "1024x1024" \
  "Precision-cut galvanized steel HVAC ductwork installation in a commercial building, clean welds and seams, exposed industrial ceiling, dramatic lighting, professional construction photography, high detail"

gen "gallery-staircase.png" "1024x1024" \
  "Custom architectural steel and reclaimed wood staircase with ornamental black metal railing, modern industrial loft, dramatic natural light, professional interior photography, high detail"

gen "gallery-enclosure.png" "1024x1024" \
  "Custom heavy-gauge powder-coated steel electrical enclosure, precision sheet metal fabrication, clean welds, industrial product photography on dark background, high detail"

gen "gallery-flashing.png" "1024x1024" \
  "Custom copper flashing and ornamental metal roof details on a luxury home, developing green patina accents, architectural exterior photography, dramatic sky, high detail"

gen "gallery-structural.png" "1024x1024" \
  "Heavy structural steel I-beam welding fabrication, massive industrial welds, bright orange sparks, dark dramatic black and white photography, construction site, ultra detailed"

echo "=== DONE ==="
