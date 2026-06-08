# Sprint 5 — Deploy e Validação

Status: PENDENTE
Depende de: Sprints 1, 2, 3, 4

---

## Objetivo

Remover GEMINI_API_KEY do código, configurar meta tags para SEO/OG, configurar build para Vercel, validar build de produção e executar checklist final de validação.

---

## Impacto UI/UX

**Classificação:** Indireto

- Meta tags afetam como o app aparece em links compartilhados (título, descrição).
- Deploy na Vercel afeta acessibilidade do produto.
- Remoção de GEMINI_API_KEY não afeta visual.

---

## Escopo da sprint

1. Remover GEMINI_API_KEY de vite.config.ts.
2. Configurar meta tags (title, description, favicon, OG).
3. Configurar build para Vercel.
4. Validar build de produção.
5. Checklist final de validação.

---

## Fora do escopo

- Não alterar funcionalidades.
- Não alterar templates, presets ou temas.
- Não alterar sanitização ou regras de negócio.

---

## Arquivos prováveis a criar/alterar

| Arquivo | Ação | Observação |
|---|---|---|
| `vite.config.ts` | Alterar | Remover GEMINI_API_KEY |
| `index.html` | Alterar | Meta tags, favicon |
| `vercel.json` | Criar | Se necessário para SPA redirect |

---

## Tarefas em ordem

### Tarefa 5.1 — Remover GEMINI_API_KEY

**Descrição:**
Remover as linhas `process.env.API_KEY` e `process.env.GEMINI_API_KEY` de vite.config.ts. Verificar se há referências em outros arquivos.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `vite.config.ts`

**Critério de aceite:**
- GEMINI_API_KEY não está em nenhum arquivo de código.
- Bundle de produção não contém a chave.

**Validação:**
- `grep -r "GEMINI" .` → sem resultados.
- Verificar bundle de produção.

---

### Tarefa 5.2 — Configurar meta tags

**Descrição:**
Adicionar ao `<head>` do index.html:
- `<title>` com nome do produto.
- `<meta name="description">` com descrição.
- Favicon.
- Open Graph: `og:title`, `og:description`, `og:type`, `og:url`.

**Impacto UI/UX:** Indireto — afeta como o link aparece quando compartilhado.

**Arquivos prováveis:**
- `index.html`

**Critério de aceite:**
- `<title>` presente.
- `<meta name="description">` presente.
- Favicon presente.
- OG tags presentes.

**Validação:**
- Verificar `<head>` do index.html.
- Compartilhar link → verificar preview.

---

### Tarefa 5.3 — Configurar build para Vercel

**Descrição:**
Configurar:
- Framework: Vite.
- Build command: `npm run build`.
- Output directory: `dist`.
- SPA redirect para index.html (se necessário).
- Criar `vercel.json` se necessário.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `vite.config.ts`
- `vercel.json` (se necessário)

**Critério de aceite:**
- `npm run build` gera `dist/`.
- `dist/` contém index.html e assets.

**Validação:**
- `npm run build` → verificar `dist/`.

---

### Tarefa 5.4 — Validar build de produção

**Descrição:**
Executar `npm run build` e verificar:
- Sem erros.
- `dist/` gerado corretamente.
- Bundle não contém GEMINI_API_KEY.
- Bundle não contém CDNs.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- Todos.

**Critério de aceite:**
- `npm run build` funciona.
- `dist/` está correto.
- Sem chaves ou CDNs no bundle.

**Validação:**
- `npm run build`.
- `grep -r "GEMINI" dist/`.
- `grep -r "cdn\." dist/`.

---

### Tarefa 5.5 — Checklist final de validação

**Descrição:**
Executar checklist completo do PRD seção 16 e 20.7.

**Impacto UI/UX:** Não.

**Critério de aceite:**
- [ ] App abre sem erro na Vercel.
- [ ] Usuário pode digitar Markdown e ver preview.
- [ ] Usuário pode importar arquivo .md.
- [ ] Usuário pode ajustar configurações visuais.
- [ ] Usuário pode exportar PDF.
- [ ] PDF tem nome descritivo.
- [ ] HTML `<script>` não é executado.
- [ ] CDNs não estão no bundle.
- [ ] GEMINI_API_KEY não está exposta.
- [ ] App funciona em mobile (320px).
- [ ] Botão de exportar mostra spinner.
- [ ] `---` em code block não cria quebra.
- [ ] Preview vazio mostra mensagem.
- [ ] Não há erros no console.
- [ ] Funciona em Chrome, Firefox, Safari, Edge.

---

## Comandos de validação da sprint

```bash
npx tsc --noEmit
npm run build
npm run dev
npm run preview
```

---

## Testes necessários

- [ ] GEMINI_API_KEY removida.
- [ ] Meta tags presentes.
- [ ] Build funciona.
- [ ] App funciona na Vercel.
- [ ] Chrome funciona.
- [ ] Firefox funciona.
- [ ] Safari funciona.
- [ ] Edge funciona.

---

## Riscos da sprint

- **MÉDIO:** Configuração Vercel pode ter edge cases.
- **BAIXO:** Meta tags podem estar incompletas.

---

## Critérios finais de aceite da sprint

- [ ] GEMINI_API_KEY removida.
- [ ] Meta tags configuradas.
- [ ] Build funciona.
- [ ] Deploy na Vercel funciona.
- [ ] Checklist final completo.

---

## O que NÃO deve ser alterado nesta sprint

- Não alterar funcionalidades.
- Não alterar templates, presets ou temas.
- Não alterar sanitização ou regras de negócio.
- Não alterar responsividade.
