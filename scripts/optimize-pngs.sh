#!/usr/bin/env bash
# Оптимизация PNG (сжатие без потери качества) через oxipng.
# Установка oxipng: https://github.com/oxipng/oxipng/releases
set -euo pipefail

if ! command -v oxipng >/dev/null 2>&1; then
  echo "oxipng не найден. Скачайте с https://github.com/oxipng/oxipng/releases" >&2
  exit 1
fi

OPT_LEVEL="${1:-4}"
ROOT="${2:-.}"

total_before=0
total_after=0

while IFS= read -r -d '' file; do
  before=$(stat -c %s "$file")
  oxipng -o "$OPT_LEVEL" --strip safe "$file"
  after=$(stat -c %s "$file")
  saved=$((before - after))
  total_before=$((total_before + before))
  total_after=$((total_after + after))
  if [ "$saved" -gt 0 ]; then
    printf '  %-58s %s -> %s (-%s)\n' "$file" \
      "$(numfmt --to=iec "$before")" \
      "$(numfmt --to=iec "$after")" \
      "$(numfmt --to=iec "$saved")"
  else
    printf '  %-58s %s (уже оптимально)\n' "$file" "$(numfmt --to=iec "$before")"
  fi
done < <(find "$ROOT" -type f -iname '*.png' \
  -not -path '*/node_modules/*' -not -path '*/.git/*' -print0)

printf '\nИтого: %s -> %s (сэкономлено %s)\n' \
  "$(numfmt --to=iec "$total_before")" \
  "$(numfmt --to=iec "$total_after")" \
  "$(numfmt --to=iec $((total_before - total_after)))"
