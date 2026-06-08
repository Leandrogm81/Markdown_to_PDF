import re

# === 1. Update vite.config.ts ===
with open('vite.config.ts', 'r') as f:
    vite = f.read()

vite = vite.replace(
    "import react from '@vitejs/plugin-react';",
    "import react from '@vitejs/plugin-react';\nimport tailwindcss from '@tailwindcss/vite';"
)

vite = vite.replace(
    "plugins: [react()],",
    "plugins: [react(), tailwindcss()],"
)

with open('vite.config.ts', 'w') as f:
    f.write(vite)
print('vite.config.ts: tailwindcss plugin added')

# === 2. Create index.css ===
with open('index.css', 'w') as f:
    f.write('@import "tailwindcss";\n')
print('index.css: created')

# === 3. Update index.html ===
with open('index.html', 'r') as f:
    html = f.read()

html = html.replace('    <script src="https://cdn.tailwindcss.com"></script>\n', '')
html = re.sub(r'    <script>\s*\n\s*tailwind\.config = \{.*?\}\s*\n\s*</script>\n', '', html, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(html)

print('DONE')
