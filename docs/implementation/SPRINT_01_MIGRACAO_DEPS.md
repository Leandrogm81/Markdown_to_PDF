# Sprint 1 — Migração de dependências CDN para npm

## Objetivo

Substituir as 4 CDNs (Tailwind, marked, jspdf, html2canvas) por dependências npm locais, remover a GEMINI_API_KEY e garantir que o app compila e funciona sem CDNs externas.

---

## Impacto UI/UX

**Classificação:** Indireto.

A migração de CDNs não altera telas diretamente, mas se o build quebrar, toda a interface será afetada. Após a migração, o visual deve ser idêntico ao anterior.

- Deve validar que o visual não mudou após a migração.
- Deve verificar mobile e desktop após cada tarefa.

---

## Escopo da sprint

- Instalar marked, jspdf, html2canvas, tailwindcss, @tailwindcss/vite, @tailwindcss/typography como npm.
- Configurar Tailwind via plugin Vite em vez de CDN.
- Remover todas as tags `<script src="cdn...">` do index.html.
- Atualizar imports do código para usar npm em vez de globais.
- Remover GEMINI_API_KEY do vite.config.ts.
- Validar build completo.

## Fora do escopo

- Alterar funcionalidade existente.
- Alterar layout ou visual.
- Adicionar novas features.
- Implementar sanitização (Sprint 2).
- Alterar templates.

---

## Arquivos prováveis a criar/alterar

| Arquivo | Ação | Observação |
|---|---|---|
| `package.json` | Alterar | Novas dependências |
| `index.html` | Alterar | Remover CDNs, remover import maps |
| `vite.config.ts` | Alterar | Adicionar Tailwind plugin, remover GEMINI_API_KEY |
| `App.tsx` | Alterar | Imports de marked/jspdf/html2canvas |
| `components/A4DocPreview.tsx` | Alterar | Se usa html2canvas/jspdf |
| `styles.ts` ou CSS | Alterar/criar | Tailwind CSS via npm |
| `tailwind.config.js` ou `tailwind.config.ts` | Criar | Config do Tailwind |

**Nota:** Caminhos são prováveis. Confirmar após leitura da codebase na Sprint 0.

---

## Tarefas em ordem

### Tarefa 1.1 — Instalar dependências npm

**Descrição:** Instalar marked, jspdf, html2canvas, tailwindcss, @tailwindcss/vite, @tailwindcss/typography.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `package.json`

**Critério de aceite:**
- `npm install` completa sem erros.
- Dependências aparecem em `package.json`.

**Validação:**
- `cat package.json | grep -E "marked|jspdf|html2canvas|tailwindcss"`.

**Riscos:**
- Versões incompatíveis com o código existente.

**O que NÃO alterar:**
- Não alterar código fonte ainda.

---

### Tarefa 1.2 — Configurar Tailwind via vite plugin

**Descrição:** Substituir a CDN do Tailwind pelo plugin @tailwindcss/vite. Configurar CSS entry point.

**Impacto UI/UX:** Indireto — se configurado incorretamente, todo o CSS quebra.

**Arquivos prováveis:**
- `vite.config.ts`
- `index.html` (remover `<script src="https://cdn.tailwindcss.com">`)
- `styles.ts` ou novo arquivo CSS
- `tailwind.config.js` ou `tailwind.config.ts`

**Critério de aceite:**
- Classes Tailwind funcionam sem CDN.
- Visual idêntico ao anterior.

**Validação:**
- `npm run dev` → app abre com estilos corretos.
- Comparar visual antes/depois.

**Riscos:**
- CSS quebrado se configuração incorreta.
- Plugins Tailwind (typography) podem precisar de configuração adicional.

**O que NÃO alterar:**
- Não alterar classes Tailwind usadas no código.
- Não alterar layout ou visual.

---

### Tarefa 1.3 — Remover CDNs do index.html

**Descrição:** Remover todas as tags `<script src="cdn...">` do index.html (marked, jspdf, html2canvas). Manter import maps apenas se necessário para React.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `index.html`

**Critério de aceite:**
- Nenhuma tag `<script src="http...">` no index.html (exceto se React precisar de import map).
- App funciona após remoção.

**Validação:**
- `grep -c "cdn" index.html` deve retornar 0.
- `npm run dev` → app funciona.

**Riscos:**
- Remover import map do React pode quebrar o app.

**O que NÃO alterar:**
- Não remover o `<script type="module">` que carrega o app.

---

### Tarefa 1.4 — Adicionar imports npm no código

**Descrição:** Atualizar o código para importar marked, jspdf e html2canvas via npm em vez de usar variáveis globais.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `App.tsx`
- Componentes que usam marked/jspdf/html2canvas

**Critério de aceite:**
- `import { marked } from 'marked'` funciona.
- `import jsPDF from 'jspdf'` funciona.
- `import html2canvas from 'html2canvas'` funciona.
- App compila sem erros de tipo.

**Validação:**
- `npm run build` sem erros.
- App funciona no navegador.

**Riscos:**
- API das bibliotecas pode diferir entre CDN e npm.
- Tipos TypeScript podem não estar incluídos.

**O que NÃO alterar:**
- Não alterar lógica de negócio.
- Não alterar comportamento das funcionalidades.

---

### Tarefa 1.5 — Remover GEMINI_API_KEY

**Descrição:** Remover todas as referências à GEMINI_API_KEY do vite.config.ts e do código.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `vite.config.ts`
- `App.tsx` (se houver referência)

**Critério de aceite:**
- Nenhuma referência a `GEMINI_API_KEY` no vite.config.ts.
- Nenhuma referência a `process.env.GEMINI_API_KEY` no código.
- `grep -r "GEMINI" dist/` retorna vazio após build.

**Validação:**
- `npm run build && grep -r "GEMINI" dist/` → vazio.

**Riscos:**
- Se houver código que usa a key, pode quebrar funcionalidade (mas o PRD diz que não tem uso real).

**O que NÃO alterar:**
- Não remover `.env` se existir (apenas parar de referenciar).

---

### Tarefa 1.6 — Atualizar imports do código

**Descrição:** Garantir que todos os imports de marked, jspdf, html2canvas usam a versão npm.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- Todos os componentes que usam essas bibliotecas.

**Critério de aceite:**
- Nenhum `window.marked`, `window.jspdf`, `window.html2canvas` no código.

**Validação:**
- `grep -r "window\.marked\|window\.jspdf\|window\.html2canvas" --include="*.ts" --include="*.tsx"` → vazio.

**Riscos:**
- Nenhum significativo.

**O que NÃO alterar:**
- Não alterar comportamento.

---

### Tarefa 1.7 — Validar build completo

**Descrição:** Executar build e verificar que o bundle não contém CDNs nem GEMINI_API_KEY.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `dist/`

**Critério de aceite:**
- `npm run build` completa sem erros.
- `grep -r "cdn.tailwindcss\|cdn.jsdelivr\|cdnjs.cloudflare\|GEMINI" dist/` → vazio.

**Validação:**
- Comandos acima.
- `npm run preview` → app funciona.

**Riscos:**
- Nenhum.

**O que NÃO alterar:**
- Nenhum arquivo.

---

## Comandos de validação da sprint

```bash
# Build
npm run build

# Verificar ausência de CDNs no HTML
grep -c "cdn" index.html

# Verificar ausência de GEMINI no bundle
grep -r "GEMINI" dist/

# Verificar ausência de globais
grep -r "window\.marked\|window\.jspdf\|window\.html2canvas" --include="*.ts" --include="*.tsx"

# Preview local
npm run preview
```

---

## Testes necessários

- **Testes manuais:** App abre, Markdown renderiza, PDF exporta, Tailwind funciona.
- **Testes de regressão:** Todas as funcionalidades existentes continuam funcionando.

---

## Fluxo manual de validação

1. Executar `npm run dev`.
2. Abrir no navegador.
3. Verificar que o layout está correto (Tailwind funcionando).
4. Digitar Markdown no editor.
5. Verificar que o preview renderiza.
6. Exportar PDF e verificar download.
7. Verificar que o nome do PDF não é genérico.
8. Verificar mobile (se possível).

---

## Riscos da sprint

- Migração de CDNs pode quebrar o build se houver incompatibilidade de versões.
- Tailwind via npm pode ter comportamento diferente da CDN.
- Import maps do React podem precisar ser mantidos.

---

## Critérios finais de aceite da sprint

- [ ] `npm run build` completa sem erros.
- [ ] Nenhuma CDN no `index.html`.
- [ ] GEMINI_API_KEY não está no bundle.
- [ ] App funciona no navegador.
- [ ] Classes Tailwind funcionam.
- [ ] Markdown é renderizado no preview.
- [ ] PDF é exportado corretamente.
- [ ] Visual idêntico ao anterior.

---

## O que NÃO deve ser alterado nesta sprint

- Funcionalidade de nenhuma feature.
- Layout ou visual.
- Templates.
- Configurações visuais.
- Lógica de negócio.
