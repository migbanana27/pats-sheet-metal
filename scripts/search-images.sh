#!/usr/bin/env bash
# Search real web photos for Pat's Sheet Metal — replaces repetitive AI images.
# Runs all searches in parallel; each writes a JSON file to /tmp/imgsearch/.
set -u
OUT=/tmp/imgsearch
mkdir -p "$OUT"
LOG="$OUT/search.log"
: > "$LOG"

search () {
  local key="$1"; local query="$2"
  echo ">>> search: $key" >> "$LOG"
  z-ai image-search -q "$query" -c 3 --gl us --no-rank -o "$OUT/$key.json" >> "$LOG" 2>&1 \
    && echo "OK  $key" >> "$LOG" \
    || echo "FAIL $key" >> "$LOG"
}

search hero-foundry "industrial sheet metal fabrication shop interior with heavy machinery and orange sparks, dark dramatic photography"
search welder-portrait "welder wearing protective mask welding steel with bright sparks, dramatic industrial photography"
search craftsman-pat "portrait of a middle aged male welder wearing leather apron in workshop, professional photography"
search craftsman-fabricator "portrait of a female metal fabricator wearing safety glasses in workshop, professional photography"
search craftsman-hvac "portrait of a male hvac technician with ductwork in industrial setting, professional photography"
search gallery-copper-hood "custom hammered copper range hood installed in luxury kitchen, architectural photography"
search gallery-ductwork "galvanized steel hvac ductwork installation in commercial building ceiling, construction photography"
search gallery-staircase "modern steel and wood staircase with black metal railing in industrial loft, interior photography"
search gallery-enclosure "custom powder coated steel electrical enclosure, industrial product photography"
search gallery-flashing "copper flashing and metal roof details on luxury home exterior, architectural photography"
search gallery-structural "structural steel I beam welding fabrication with sparks on construction site, industrial photography"

echo "=== ALL DONE ===" >> "$LOG"
