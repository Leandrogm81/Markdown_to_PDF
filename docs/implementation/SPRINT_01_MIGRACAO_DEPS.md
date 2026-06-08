# Sprint 1 — Migração de Dependências

Status: PENDENTE
Depende de: Sprint 0 (CONCLUÍDA)

---

## Objetivo

Substituir todas as CDNs carregadas via `<script>` no index.html por dependências npm locais. Habilitar `strict: true` no TypeScript. Garantir que o app funciona sem nenhuma CDN em runtime.

---

## Impacto UI/UX

**Classificação:** Indireto

Esta sprint não altera componentes visuais diretamente, mas a migração de Tailwind CDN para npm pode afetar a renderização de todas as classes CSS. A migração de marked pode afetar a renderização do preview.

- Deve seguir `/docs/design/UI_UX_GUIDE.md` para verificar consistência visual após migração.
- Deve validar que o preview renderiza corretamente após migração.
- Deve validar mobile e desktop após cada migração.

---

## Escopo da sprint

1. Instalar marked via npm e converter de global para import.
2. Instalar jspdf via npm e converter de global para import.
3. Instalar html2canvas via npm e converter de global para import.
4. Instalar Tailwind CSS via npm (@tailwindcss/vite) e remover CDN.
5. Remover import maps do index.html.
6. Habilitar `strict: true` no tsconfig.json.
7. Corrigir erros de tipo resultantes.

---

## Fora do escopo

- Não implementar funcionalidades novas.
- Não alterar templates, presets ou temas.
- Não alterar comportamento de importação ou exportação.
- Não remover GEMINI_API_KEY (Sprint 5).

---

## Arquivos prováveis a criar/alterar

| Arquivo | Ação | Observação |
|---|---|---|
| `package.json` | Alterar | Adicionar marked, jspdf, html2canvas, tailwindcss, @tailwindcss/vite |
| `index.html` | Alterar | Remover CDNs, import maps |
| `vite.config.ts` | Alterar | Adicionar plugin Tailwind |
| `tsconfig.json` | Alterar | Habilitar strict: true |
| `A4DocPreview.tsx` | Alterar | Converter `declare const marked` para import |
| `App.tsx` | Alterar | Converter `declare const jspdf/html2canvas` para imports |
| `tailwind.config.js` | Criar | Se necessário para configuração Tailwind |

**Nota:** Caminhos devem ser confirmados após leitura da codebase.

---

## Tarefas em ordem

### Tarefa 1.1 — Instalar marked via npm

**Descrição:**
Executar `npm install marked`. Remover `<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>` do index.html. Converter `declare const marked` em A4DocPreview.tsx para `import { marked } from 'marked'`.

**Impacto UI/UX:** Indireto — afeta renderização do preview.

**Arquivos prováveis:**
- `package.json`
- `index.html`
- `A4DocPreview.tsx`

**Critério de aceite:**
- `npm run dev` funciona sem erro.
- Preview renderiza Markdown corretamente.
- Não há referência a CDN marked no index.html.

**Validação:**
- `npm run dev` → abrir browser → digitar Markdown → preview atualiza.
- Verificar index.html sem script CDN marked.

**Riscos:**
- API do marked pode diferir entre CDN e npm.
- Types podem não estar incluídos.

**O que NÃO alterar:**
- Não alterar templates.ts.
- Não alterar lógica de parsing além do necessário.

---

### Tarefa 1.2 — Instalar jspdf via npm

**Descrição:**
Executar `npm install jspdf @types/jspdf`. Remover CDN do index.html. Converter `declare const jspdf` em App.tsx para `import { jsPDF } from 'jspdf'`.

**Impacto UI/UX:** Não — afeta apenas exportação PDF.

**Arquivos prováveis:**
- `package.json`
- `index.html`
- `App.tsx`

**Critério de aceite:**
- PDF exporta com sucesso.
- Não há referência a CDN jspdf no index.html.

**Validação:**
- Clicar "Baixar PDF" → arquivo baixado → abre corretamente.

**Riscos:**
- API pode diferir entre CDN e npm.

**O que NÃO alterar:**
- Não alterar lógica de geração além do necessário.

---

### Tarefa 1.3 — Instalar html2canvas via npm

**Descrição:**
Executar `npm install html2canvas`. Remover CDN do index.html. Converter `declare const html2canvas` em App.tsx para `import html2canvas from 'html2canvas'`.

**Impacto UI/UX:** Não — afeta apenas captura de páginas.

**Arquivos prováveis:**
- `package.json`
- `index.html`
- `App.tsx`

**Critério de aceite:**
- PDF exporta com sucesso.
- Não há referência a CDN html2canvas no index.html.

**Validação:**
- Clicar "Baixar PDF" → arquivo baixado.

**Riscos:**
- html2canvas pode não capturar corretamente após migração.

**O que NÃO alterar:**
- Não alterar configurações de captura.

---

### Tarefa 1.4 — Instalar Tailwind via npm

**Descrição:**
Executar `npm install tailwindcss @tailwindcss/vite`. Remover `<script src="https://cdn.tailwindcss.com"></script>` e configuração inline do index.html. Adicionar plugin Tailwind no vite.config.ts. Criar CSS com `@import "tailwindcss"` se necessário.

**Impacto UI/UX:** Indireto — afeta TODAS as classes CSS do app.

**Arquivos prováveis:**
- `package.json`
- `index.html`
- `vite.config.ts`
- CSS files

**Critério de aceite:**
- App visualmente idêntico após migração.
- Classes Tailwind funcionam (cores, layout, responsividade).

**Validação:**
- Comparar visual antes/depois da migração.
- Testar em mobile e desktop.

**Riscos:**
- **ALTO:** Pode quebrar todas as classes CSS.
- darkMode config pode precisar de ajuste.
- Typography plugin pode não funcionar via npm da mesma forma.

**O que NÃO alterar:**
- Não alterar classes Tailwind nos componentes.
- Não alterar configuração de darkMode (manter 'class').

---

### Tarefa 1.5 — Remover import maps

**Descrição:**
Remover bloco `<script type="importmap">` do index.html. React e ReactDOM já estão em package.json.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `index.html`

**Critério de aceite:**
- App funciona sem import maps.
- React carrega via npm/Vite.

**Validação:**
- `npm run dev` → app funciona.

**Riscos:**
- Baixo — Vite resolve imports automaticamente.

**O que NÃO alterar:**
- Não alterar imports em componentes React.

---

### Tarefa 1.6 — Habilitar strict mode

**Descrição:**
Adicionar `"strict": true` no tsconfig.json.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `tsconfig.json`

**Critério de aceite:**
- `npx tsc --noEmit` passa sem erros (após tarefa 1.7).

**Validação:**
- `npx tsc --noEmit`.

**Riscos:**
- Pode revelar dezenas de erros de tipo.

**O que NÃO alterar:**
- Não alterar outras configurações do tsconfig.

---

### Tarefa 1.7 — Corrigir erros de tipo do strict mode

**Descrição:**
Executar `npx tsc --noEmit` e corrigir todos os erros de tipo revelados pelo strict mode.

**Impacto UI/UX:** Não — correções de tipo não alteram visual.

**Arquivos prováveis:**
- Todos os .tsx e .ts com erros.

**Critério de aceite:**
- `npx tsc --noEmit` passa sem erros.
- App funciona normalmente.

**Validação:**
- `npx tsc --noEmit` → 0 erros.
- `npm run dev` → app funciona.
- `npm run build` → build OK.

**Riscos:**
- Correções podem alterar comportamento se não cuidadosas.

**O que NÃO alterar:**
- Não alterar lógica de negócio.
- Não alterar comportamento visual.

---

## Comandos de validação da sprint

```bash
# Typecheck
npx tsc --noEmit

# Build
npm run build

# Dev
npm run dev

# Verificar ausência de CDNs
grep -c "cdn\." index.html  # Deve retornar 0
```

---

## Testes necessários

- [ ] App inicia sem erro no console.
- [ ] Preview renderiza Markdown.
- [ ] PDF exporta com sucesso.
- [ ] Classes Tailwind funcionam (cores, layout).
- [ ] Mobile funciona.
- [ ] `npx tsc --noEmit` passa.
- [ ] `npm run build` gera `dist/`.
- [ ] Não há CDNs no index.html.

---

## Fluxo manual de validação

1. Executar `npm install`.
2. Executar `npm run dev`.
3. Abrir no browser.
4. Verificar que o template padrão carrega.
5. Digitar Markdown → preview atualiza.
6. Clicar "Baixar PDF" → arquivo baixado.
7. Verificar que o visual está correto (Tailwind).
8. Testar em mobile (320px).
9. Verificar console sem erros.

---

## Riscos da sprint

- **ALTO:** Migração Tailwind pode quebrar visual.
- **ALTO:** marked API pode diferir.
- **MÉDIO:** strict mode pode revelar muitos erros.

---

## Critérios finais de aceite da sprint

- [ ] `npm run dev` funciona sem erro.
- [ ] `npm run build` gera `dist/` sem erro.
- [ ] `npx tsc --noEmit` passa sem erros.
- [ ] Não há CDNs no index.html.
- [ ] Preview renderiza Markdown.
- [ ] PDF exporta com sucesso.
- [ ] Visual está correto (Tailwind).
- [ ] Mobile funciona.

---

## O que NÃO deve ser alterado nesta sprint

- Não alterar templates.ts.
- Não alterar lógica de importação.
- Não alterar lógica de exportação além do necessário para npm.
- Não implementar sanitização (Sprint 2).
- Não alterar nome do PDF (Sprint 2).
- Não remover GEMINI_API_KEY (Sprint 5).
