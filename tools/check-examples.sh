for file in docs/**/*.md; do
  if [[ "$file" != *README.md ]]; then
    pandoc -i "$file" -t json | jq '[.blocks[] | select(.t == "CodeBlock") | .c[1]]' >"${file%.*}.tmp"
    node -e "
const fs = require('node:fs');
const filepath = '${file%.*}.tmp';
const lines = JSON.parse(fs.readFileSync(filepath, 'utf8'));

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  fs.writeFileSync(filepath + '.' + i + '.ts', 'import * as jose from \'https://deno.land/x/jose/index.ts\'\n' + line);
}
"
    rm "${file%.*}.tmp"
  fi
done

for file in docs/**/*.ts; do
  if ! deno run "$file" >/dev/null 2>&1; then
    echo "fail $file"
  else
    echo "success $file"
  fi
  rm $file
done
