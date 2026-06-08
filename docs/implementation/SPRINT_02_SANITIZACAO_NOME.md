# Sprint 2 — Sanitização e Nome do PDF

Status: PENDENTE
Depende de: Sprint 1

---

## Objetivo

Implementar sanitização de HTML com DOMPurify, corrigir o nome do arquivo PDF para seguir a sequência de sanitização definida no PRD, implementar validação de tamanho de importação (8MB) e confirmação antes de substituir conteúdo.

---

## Impacto UI/UX

**Classificação:** Indireto

- Sanitização afeta a renderização de HTML no preview (pode remover tags legítimas se whitelist for muito restritiva).
- Nome do PDF afeta o arquivo baixado (não visual).
- Validação de importação afeta UX de importação (mensagem de erro).
- Confirmação antes de substituir afeta UX de troca de template (modal).

- Deve seguir `/docs/design/UI_UX_GUIDE.md` para o modal de confirmação.
- Deve validar que HTML legítimo ainda renderiza após sanitização.

---

## Escopo da sprint

1. Instalar DOMPurify via npm.
2. Implementar sanitização no A4DocPreview.tsx.
3. Corrigir nome do PDF (sequência de sanitização do PRD).
4. Implementar validação de tamanho de importação (8MB).
5. Implementar confirmação antes de substituir conteúdo.

---

## Fora do escopo

- Não alterar parser Markdown além do necessário para sanitização.
- Não alterar templates, presets ou temas.
- Não alterar layout ou responsividade.

---

## Arquivos prováveis a criar/alterar

| Arquivo | Ação | Observação |
|---|---|---|
| `package.json` | Alterar | Adicionar dompurify, @types/dompurify |
| `A4DocPreview.tsx` | Alterar | Aplicar DOMPurify após marked.parse() |
| `App.tsx` | Alterar | Nome do PDF, validação 8MB, confirmação |
| `Toolbar.tsx` | Alterar | Validação de tamanho no import |

---

## Tarefas em ordem

### Tarefa 2.1 — Instalar DOMPurify

**Descrição:**
Executar `npm install dompurify @types/dompurify`.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `package.json`

**Critério de aceite:**
- DOMPurify instalado em node_modules.

**Validação:**
- `npm ls dompurify`.

---

### Tarefa 2.2 — Implementar sanitização

**Descrição:**
Importar DOMPurify em A4DocPreview.tsx. Após `marked.parse(section)`, aplicar `DOMPurify.sanitize(html)`. Configurar whitelist:
- Tags permitidas: strong, em, br, p, div, span, table, tr, td, th, thead, tbody, ul, ol, li, blockquote, pre, code, h1-h6, a, img.
- Tags bloqueadas: script, iframe, object, embed, form, input, button, style, link, meta, base.
- Atributos permitidos: class, id, href, src, alt, title, colspan, rowspan.
- Atributos bloqueados: todos os `on*`.

**Impacto UI/UX:** Indireto — afeta renderização de HTML no preview.

**Arquivos prováveis:**
- `A4DocPreview.tsx`

**Critério de aceite:**
- `<script>alert('xss')</script>` não é executado.
- `<strong>texto</strong>` renderiza como negrito.
- `<a href="...">link</a>` renderiza como link.
- `<iframe>` é removido.
- `onclick` é removido.

**Validação:**
- Inserir cada tipo de HTML no editor e verificar preview.

**Riscos:**
- Whitelist muito restritiva pode quebrar HTML legítimo.

---

### Tarefa 2.3 — Corrigir nome do PDF

**Descrição:**
Em App.tsx, implementar a sequência de sanitização do nome do PDF conforme PRD seção 7.10:
1. Prioridade: título da capa → primeiro heading # → nome do arquivo importado → fallback 50 chars.
2. Sanitização: NFD → remover diacríticos → minúsculas → espaços/hífens por `-` → remover especiais → colapsar `-` → limitar 80 chars → fallback "documento".

**Impacto UI/UX:** Não — afeta apenas o nome do arquivo baixado.

**Arquivos prováveis:**
- `App.tsx`

**Critério de aceite:**
- Título "Relatório Trimestral Q2" → `relatorio-trimestral-q2.pdf`.
- Nome genérico NÃO é gerado.

**Validação:**
- Exportar PDF com diferentes títulos → verificar nomes.

---

### Tarefa 2.4 — Validação de tamanho de importação (8MB)

**Descrição:**
Em App.tsx e Toolbar.tsx, antes de ler o arquivo, verificar `file.size`. Se > 8MB, mostrar mensagem de erro e não importar.

**Impacto UI/UX:** Indireto — mensagem de erro na importação.

**Arquivos prováveis:**
- `App.tsx`
- `Toolbar.tsx`

**Critério de aceite:**
- Arquivo > 8MB é rejeitado com mensagem de erro.
- Arquivo ≤ 8MB é importado normalmente.

**Validação:**
- Criar arquivo de teste > 8MB → importar → verificar erro.

---

### Tarefa 2.5 — Confirmação antes de substituir conteúdo

**Descrição:**
Em App.tsx, antes de trocar template ou importar arquivo, se houver conteúdo no editor, mostrar modal de confirmação. Se o usuário cancelar, manter conteúdo atual.

**Impacto UI/UX:** Sim — modal de confirmação.

**Arquivos prováveis:**
- `App.tsx`

**Critério de aceite:**
- Trocar template com conteúdo → modal aparece.
- Cancelar → conteúdo mantido.
- Confirmar → conteúdo substituído.
- Importar arquivo com conteúdo → modal aparece.

**Validação:**
- Digitar no editor → trocar template → verificar modal.

---

## Comandos de validação da sprint

```bash
npx tsc --noEmit
npm run build
npm run dev
```

---

## Testes necessários

- [ ] XSS bloqueado (script, iframe, onclick).
- [ ] HTML válido renderiza.
- [ ] Nome do PDF descritivo.
- [ ] Importação > 8MB rejeitada.
- [ ] Confirmação antes de substituir funciona.
- [ ] Build funciona.

---

## Riscos da sprint

- **MÉDIO:** DOMPurify whitelist pode ser muito restritiva.
- **BAIXO:** Sequência de sanitização do nome pode ter edge cases.

---

## Critérios finais de aceite da sprint

- [ ] `<script>` não é executado no preview.
- [ ] Nome do PDF segue sanitização.
- [ ] Importação > 8MB é rejeitada.
- [ ] Confirmação funciona antes de substituir.
- [ ] Build e typecheck passam.

---

## O que NÃO deve ser alterado nesta sprint

- Não alterar parser Markdown além da sanitização.
- Não alterar templates, presets ou temas.
- Não alterar layout ou responsividade.
- Não alterar lógica de paginação.
