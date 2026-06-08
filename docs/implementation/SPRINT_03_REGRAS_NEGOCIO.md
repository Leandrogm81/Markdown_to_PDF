# Sprint 3 — Regras de Negócio

Status: PENDENTE
Depende de: Sprint 1

---

## Objetivo

Corrigir comportamento de `---` dentro de code blocks (não deve criar quebra de página), implementar preview com conteúdo vazio (mensagem orientativa), implementar numeração de página correta (capa não contada) e definir encoding de importação.

---

## Impacto UI/UX

**Classificação:** Sim

- Preview vazio mostra mensagem orientativa → componente visual.
- Numeração de página visível no rodapé → componente visual.
- `---` em code blocks afeta paginação → impacto visual indireto.

- Deve seguir `/docs/design/UI_UX_GUIDE.md` para mensagem de preview vazio.
- Deve validar que a mensagem de preview vazio não parece genérica de IA.
- Deve validar numeração em mobile e desktop.

---

## Escopo da sprint

1. Corrigir `---` em code blocks (não criar quebra de página).
2. Implementar preview vazio com mensagem orientativa.
3. Implementar numeração de página (capa não contada, centro do rodapé).
4. Definir encoding de importação (UTF-8 BOM, fallback Latin-1).

---

## Fora do escopo

- Não alterar templates, presets ou temas.
- Não alterar lógica de sanitização.
- Não alterar nome do PDF.
- Não alterar responsividade.

---

## Arquivos prováveis a criar/alterar

| Arquivo | Ação | Observação |
|---|---|---|
| `A4DocPreview.tsx` | Alterar | `---` em code blocks, preview vazio, numeração |
| `App.tsx` | Alterar | Encoding de importação |
| `Toolbar.tsx` | Alterar | Encoding de importação |

---

## Tarefas em ordem

### Tarefa 3.1 — Corrigir `---` em code blocks

**Descrição:**
No parser de Markdown (A4DocPreview.tsx), antes de dividir por `---`, verificar se o `---` está dentro de um bloco de código (`` ``` ``) ou HTML (`<pre>`, `<code>`). Se estiver, NÃO criar quebra de página.

**Impacto UI/UX:** Indireto — afeta paginação.

**Arquivos prováveis:**
- `A4DocPreview.tsx`

**Critério de aceite:**
- `---` isolado em linha vazia → cria quebra de página.
- `---` dentro de bloco de código → NÃO cria quebra.
- `---` dentro de `<pre>` ou `<code>` → NÃO cria quebra.

**Validação:**
- Inserir `---` dentro de bloco de código → verificar que não quebra.
- Inserir `---` isolado → verificar que quebra.

**Riscos:**
- Parser Markdown pode não distinguir corretamente contextos.

---

### Tarefa 3.2 — Preview vazio com mensagem orientativa

**Descrição:**
Quando o editor estiver vazio, o preview deve mostrar uma página A4 em branco com texto centralizado e sutil: "Comece a digitar ou selecione um template".

**Impacto UI/UX:** Sim — componente visual.

**Arquivos prováveis:**
- `A4DocPreview.tsx`

**Critério de aceite:**
- Editor vazio → preview mostra página A4 em branco com mensagem.
- Mensagem é sutil (não domina a tela).
- Mensagem desaparece quando conteúdo é digitado.

**Validação:**
- Limpar editor → verificar mensagem.
- Digitar algo → verificar que mensagem desaparece.

---

### Tarefa 3.3 — Numeração de página

**Descrição:**
Implementar numeração "Página X de Y" no centro do rodapé de cada página do corpo. Capa NÃO é contada. Numeração começa em 1 na primeira página do corpo. Quebras manuais (`---`) incrementam normalmente.

**Impacto UI/UX:** Sim — componente visual no rodapé.

**Arquivos prováveis:**
- `A4DocPreview.tsx`

**Critério de aceite:**
- Numeração aparece no rodapé quando habilitada.
- Capa não é contada.
- X começa em 1 no corpo.
- "Página X de Y" no centro do rodapé.

**Validação:**
- Documento com capa → verificar numeração.
- Documento sem capa → verificar numeração.

---

### Tarefa 3.4 — Encoding de importação

**Descrição:**
Definir encoding de importação: UTF-8 (com ou sem BOM). Se UTF-8 falhar ou tiver caracteres de substituição (U+FFFD), tentar Latin-1 como fallback. Se ambos falharem, mostrar mensagem de erro.

**Impacto UI/UX:** Não — afeta apenas importação.

**Arquivos prováveis:**
- `App.tsx`
- `Toolbar.tsx`

**Critério de aceite:**
- Arquivo UTF-8 com BOM → importado corretamente.
- Arquivo Latin-1 → importado com fallback.
- Arquivo com encoding inválido → mensagem de erro.

**Validação:**
- Importar arquivo com BOM → verificar conteúdo.
- Importar arquivo Latin-1 → verificar conteúdo.

---

## Comandos de validação da sprint

```bash
npx tsc --noEmit
npm run build
npm run dev
```

---

## Testes necessários

- [ ] `---` em code block não cria quebra.
- [ ] `---` isolado cria quebra.
- [ ] Preview vazio mostra mensagem.
- [ ] Numeração correta com capa.
- [ ] Numeração correta sem capa.
- [ ] Encoding UTF-8 BOM funciona.
- [ ] Encoding Latin-1 funciona.
- [ ] Build funciona.

---

## Riscos da sprint

- **MÉDIO:** Detectar `---` em code blocks pode ser complexo.
- **BAIXO:** Numeração pode ter off-by-one com capa.

---

## Critérios finais de aceite da sprint

- [ ] `---` em code block não cria quebra.
- [ ] Preview vazio mostra mensagem orientativa.
- [ ] Numeração começa em 1 no corpo.
- [ ] Capa não é contada na numeração.
- [ ] Encoding funciona corretamente.
- [ ] Build e typecheck passam.

---

## O que NÃO deve ser alterado nesta sprint

- Não alterar templates, presets ou temas.
- Não alterar sanitização.
- Não alterar nome do PDF.
- Não alterar responsividade.
