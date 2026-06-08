# Sprint quebrada em tarefas menores

## Sprint de origem

- **Nome:** Sprint 5 — Deploy e Validacao
- **Objetivo:** Remover GEMINI_API_KEY do codigo, configurar meta tags para SEO/OG, configurar build para Vercel, validar build de producao e executar checklist final.
- **Arquivo de origem:** `/docs/implementation/SPRINT_05_DEPLOY_VALIDACAO.md`
- **Resumo do escopo:** 5 tarefas — remover chave, meta tags, configurar Vercel, validar build, checklist final.

---

## Analise da Sprint

### Objetivo da sprint

Preparar o app para deploy na Vercel: remover segredos expostos, configurar meta tags, validar build de producao e executar checklist final de aceite.

### Impacto UI/UX da sprint

**Classificacao: Indireto**

- Meta tags afetam como o app aparece em links compartilhados (titulo, descricao, favicon).
- Remocao de GEMINI_API_KEY nao afeta visual.
- Deploy na Vercel afeta acessibilidade do produto.

### Escopo identificado

1. Remover GEMINI_API_KEY de vite.config.ts e verificar outros arquivos.
2. Configurar meta tags (title, description, favicon, OG).
3. Configurar build para Vercel (vercel.json, SPA redirect).
4. Validar build de producao (sem chaves, sem CDNs).
5. Checklist final de validacao (PRD secoes 16 e 20.7).

### Fora do escopo

- Nao alterar funcionalidades.
- Nao alterar templates, presets ou temas.
- Nao alterar sanitizacao ou regras de negocio.
- Nao alterar responsividade.

### Dependencias entre partes

- Tarefa 5.1 (remover chave) deve vir antes de 5.4 (validar build) para garantir que a chave nao esta no bundle.
- Tarefa 5.2 (meta tags) e independente.
- Tarefa 5.3 (configurar Vercel) e independente.
- Tarefa 5.4 (validar build) depende de 5.1 e 5.3.
- Tarefa 5.5 (checklist final) depende de todas as anteriores.

### Riscos principais

| Risco | Severidade | Area |
|---|---|---|
| GEMINI_API_KEY pode estar referenciada em outros alem do vite.config | MEDIA | Seguranca |
| Meta tags podem estar incompletas | BAIXA | SEO |
| Configuracao Vercel pode ter edge cases (SPA redirect) | MEDIA | Deploy |
| Build de producao pode ter problemas nao vistos em dev | MEDIA | Engenharia |

### Estrategia de quebra

A sprint sera dividida em 5 tarefas sequenciais:

1. Remover GEMINI_API_KEY (seguranca, prioridade alta).
2. Configurar meta tags (SEO, isolado).
3. Configurar Vercel (deploy, isolado).
4. Validar build de producao (depende de 5.1 e 5.3).
5. Checklist final (depende de todas).

---

# Tarefas da Sprint

## Tarefa 5.1 — Remover GEMINI_API_KEY

### Objetivo

Remover as linhas que expoem GEMINI_API_KEY em vite.config.ts e verificar se ha referencias em outros arquivos.

### Tipo da tarefa

configuracao + seguranca.

### Impacto UI/UX

**Nao.** Remocao de segredo exposto nao afeta renderizacao.

### Pre-requisitos

- Sprints 1-4 concluidas (ou pelo menos Sprint 1).
- `npm run build` funciona.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `vite.config.ts` | Alterar | Remover linhas 15-16 (define API_KEY e GEMINI_API_KEY) |

**Nota:** O vite.config.ts atual tem:
```ts
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
},
```
Tambem ha `process.env.BILLING_API_KEY` em templates.ts:249 — isso e uma chave diferente e NAO deve ser removida.

### Passos

1. Em vite.config.ts, remover as duas linhas do `define` que referenciam GEMINI_API_KEY (linhas 15-16).
2. Se o objeto `define` ficar vazio, remover o bloco `define` inteiro.
3. Verificar se `loadEnv` ainda e necessario (se nao houver mais variaveis, pode ser removido).
4. Verificar se ha referencias a `process.env.API_KEY` ou `process.env.GEMINI_API_KEY` em outros arquivos:
   ```bash
   grep -rn "GEMINI_API_KEY\|process.env.API_KEY" --include="*.ts" --include="*.tsx" --include="*.html" .
   ```
5. Se houver referencias, avaliar se precisam ser removidas.
6. Executar `npm run build` para garantir que nao quebrou.

### Criterios de aceite

- `grep -rn "GEMINI" . --include="*.ts" --include="*.tsx" --include="*.html"` retorna 0 resultados (exceto node_modules).
- `npm run build` funciona.
- `npm test` passa.
- Bundle de producao nao contem a chave.

### Como validar

```bash
grep -rn "GEMINI" . --include="*.ts" --include="*.tsx" --include="*.html" | grep -v node_modules
# Deve retornar vazio

npm run build
npm test
```

### Riscos

- BAIXO: Remocao simples. Se algum codigo depende de process.env.API_KEY, vai quebrar em runtime (verificar).

### O que NAO alterar

- Nao remover `process.env.BILLING_API_KEY` de templates.ts (e outra chave).
- Nao alterar funcionalidades.
- Nao alterar templates.ts.

### Reversibilidade

Restaurar as duas linhas no `define` do vite.config.ts. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf
Arquivo: vite.config.ts (linhas 15-16)

Contexto: As linhas 15-16 expoem GEMINI_API_KEY no bundle:
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)

ATENCAO: templates.ts:249 tem process.env.BILLING_API_KEY — isso e OUTRA chave, NAO remover.

Passos:
1. Remover linhas 15-16 de vite.config.ts.
2. Se define ficar vazio, remover bloco define.
3. Verificar se loadEnv ainda e necessario.
4. grep -rn "GEMINI" . --include="*.ts" --include="*.tsx" --include="*.html" | grep -v node_modules -> 0 resultados.
5. npm run build -> OK
6. npm test -> OK

NAO alterar: templates.ts, funcionalidades, templates, presets.
```

---

## Tarefa 5.2 — Configurar meta tags

### Objetivo

Adicionar meta tags ao `<head>` do index.html: title, description, favicon, Open Graph (og:title, og:description, og:type, og:url).

### Tipo da tarefa

configuracao.

### Impacto UI/UX

**Indireto.** Meta tags afetam como o app aparece em links compartilhados e na aba do browser. Nao altera renderizacao interna.

- Deve validar que o titulo aparece na aba do browser.
- Deve validar que o favicon aparece.

### Pre-requisitos

- Sprint 1 concluida.
- `npm run build` funciona.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `index.html` | Alterar | Adicionar meta tags no <head> |
| `public/` | Criar | Pasta para favicon (se nao existir) |

**Nota:** O index.html atual tem apenas `<meta charset>`, `<meta viewport>` e `<title>Markdown para PDF</title>`. Nao ha description, favicon ou OG tags. Nao existe pasta `public/`.

### Passos

1. Verificar se existe pasta `public/`. Se nao, criar.
2. Criar ou copiar um favicon (SVG ou PNG) para `public/favicon.svg` ou `public/favicon.png`.
3. Em index.html, adicionar no `<head>`:
   - `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` (ou PNG)
   - `<meta name="description" content="Converta Markdown em PDFs elegantes com visual profissional.">`
   - `<meta property="og:title" content="Markdown para PDF">`
   - `<meta property="og:description" content="Converta Markdown em PDFs elegantes com visual profissional.">`
   - `<meta property="og:type" content="website">`
   - `<meta property="og:url" content="https://markdown-para-pdf.vercel.app">`
4. Verificar que o titulo existente esta adequado.
5. Executar `npm run build` e verificar que o favicon esta no dist/.

### Criterios de aceite

- `<title>` presente e adequado.
- `<meta name="description">` presente.
- Favicon presente e funciona.
- OG tags presentes (title, description, type, url).
- `npm run build` funciona.
- Favicon copiado para dist/.

### Como validar

```bash
npm run dev
# Verificar: titulo na aba do browser
# Verificar: favicon na aba
# Verificar: view-source -> meta tags presentes

npm run build
ls dist/  # verificar favicon
```

### Riscos

- BAIXO: Favicon pode nao ser copiado para dist/ se nao estiver em public/.

### O que NAO alterar

- Nao alterar funcionalidades.
- Nao alterar templates.ts.
- Nao alterar layout.

### Reversibilidade

Remover as meta tags adicionadas e o favicon. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf

Contexto: index.html tem apenas charset, viewport e title. Nao ha description, favicon ou OG tags.
Nao existe pasta public/.

Passos:
1. Criar pasta public/ se nao existir.
2. Criar um favicon simples (SVG ou PNG) em public/favicon.svg.
3. Em index.html, adicionar no <head>:
   - <link rel="icon" type="image/svg+xml" href="/favicon.svg">
   - <meta name="description" content="Converta Markdown em PDFs elegantes com visual profissional.">
   - <meta property="og:title" content="Markdown para PDF">
   - <meta property="og:description" content="Converta Markdown em PDFs elegantes com visual profissional.">
   - <meta property="og:type" content="website">
   - <meta property="og:url" content="https://markdown-para-pdf.vercel.app">
4. npm run dev -> verificar titulo e favicon na aba.
5. npm run build -> verificar que favicon esta em dist/.
6. npm test -> OK

NAO alterar: funcionalidades, templates.ts, layout.
```

---

## Tarefa 5.3 — Configurar build para Vercel

### Objetivo

Configurar o projeto para deploy na Vercel: verificar build command, output directory, SPA redirect.

### Tipo da tarefa

configuracao.

### Impacto UI/UX

**Nao.** Configuracao de deploy nao afeta renderizacao.

### Pre-requisitos

- Sprint 1 concluida.
- `npm run build` gera dist/.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `vercel.json` | Criar | SPA redirect para index.html |

**Nota:** Vite gera `dist/` por padrao. A Vercel detecta Vite automaticamente. Porem, para SPA, pode ser necessario `vercel.json` com redirect para `index.html` em rotas que nao existem.

### Passos

1. Verificar se `npm run build` gera `dist/` corretamente.
2. Verificar se `dist/index.html` existe.
3. Criar `vercel.json` se necessario:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
4. Verificar se ha algum `.gitignore` que ignore `dist/` (nao deve estar ignorado para deploy, mas Vercel faz build no CI).

### Criterios de aceite

- `npm run build` gera `dist/` com index.html e assets.
- `vercel.json` existe se necessario para SPA.
- Configuracao compativel com deploy na Vercel.

### Como validar

```bash
npm run build
ls dist/
cat dist/index.html  # verificar que existe
cat vercel.json  # se existir
```

### Riscos

- MEDIO: SPA redirect pode nao funcionar sem vercel.json.

### O que NAO alterar

- Nao alterar funcionalidades.
- Nao alterar vite.config.ts (alem do necessario).

### Reversibilidade

Remover vercel.json se criado. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf

Contexto: Vite gera dist/ por padrao. Vercel detecta Vite automaticamente.
SPA pode precisar de vercel.json para redirect.

Passos:
1. npm run build -> verificar que dist/ existe com index.html.
2. Se nao existir vercel.json, criar com:
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
3. Verificar .gitignore nao ignora dist/ (ok, Vercel faz build no CI).
4. npm run build -> OK

NAO alterar: funcionalidades, vite.config.ts.
```

---

## Tarefa 5.4 — Validar build de producao

### Objetivo

Executar build de producao e verificar que nao contem segredos, CDNs ou erros.

### Tipo da tarefa

validacao.

### Impacto UI/UX

**Nao.** Validacao de build nao afeta renderizacao.

### Pre-requisitos

- Tarefa 5.1 concluida (GEMINI_API_KEY removida).
- Tarefa 5.3 concluida (config Vercel).
- `npm run build` funciona.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `dist/` | Verificar | Bundle de producao |

### Passos

1. Executar `npm run build`.
2. Verificar que `dist/` foi gerado.
3. Verificar que o bundle nao contem GEMINI_API_KEY:
   ```bash
   grep -r "GEMINI" dist/
   ```
4. Verificar que o bundle nao contem CDNs:
   ```bash
   grep -r "cdn\." dist/
   grep -r "aistudiocdn" dist/
   ```
5. Verificar que `dist/index.html` existe.
6. Verificar que assets (JS, CSS) estao presentes.
7. Executar `npm run preview` e testar no browser.

### Criterios de aceite

- `npm run build` funciona sem erro.
- `dist/` contem index.html e assets.
- Nao ha GEMINI_API_KEY no bundle.
- Nao ha CDNs no bundle.
- `npm run preview` funciona.

### Como validar

```bash
npm run build
grep -r "GEMINI" dist/  # vazio
grep -r "cdn\." dist/  # vazio
grep -r "aistudiocdn" dist/  # vazio
npm run preview  # abrir browser -> funciona
```

### Riscos

- BAIXO: Validacao apenas, sem alteracao de codigo.

### O que NAO alterar

- Nao alterar nenhum arquivo. Apenas validar.

### Reversibilidade

N/A — e apenas validacao.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa — validacao de build de producao.

Projeto: /mnt/c/Dev/markdown-para-pdf

Passos:
1. npm run build -> OK
2. ls dist/ -> index.html + assets
3. grep -r "GEMINI" dist/ -> vazio
4. grep -r "cdn\." dist/ -> vazio
5. grep -r "aistudiocdn" dist/ -> vazio
6. npm run preview -> abrir browser -> app funciona
7. Verificar console sem erros

Se algum teste falhar, reportar o problema (NAO corrigir).
```

---

## Tarefa 5.5 — Checklist final de validacao

### Objetivo

Executar checklist completo do PRD (secoes 16 e 20.7) para validar que o MVP esta pronto para deploy.

### Tipo da tarefa

validacao.

### Impacto UI/UX

**Indireto.** Validacao visual completa do app.

- Deve ler `/docs/design/UI_UX_GUIDE.md` para verificar consistencia visual.
- Deve validar mobile e desktop.
- Deve verificar todos os estados (loading, erro, vazio).

### Pre-requisitos

- Tarefas 5.1 a 5.4 concluidas.
- Sprints 1-4 concluidas (ou validadas).

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| Todos | Verificar | Validacao final |

### Passos

1. Ler `/docs/design/UI_UX_GUIDE.md`.
2. Executar todos os comandos de validacao:
   ```bash
   npx tsc --noEmit          # 0 erros
   npm run build              # OK
   npm test                   # passando
   npm run dev                # funciona
   npm run preview            # funciona
   ```
3. Executar checklist manual:
   - [ ] App abre sem erro.
   - [ ] Usuario pode digitar Markdown e ver preview.
   - [ ] Usuario pode importar arquivo .md.
   - [ ] Usuario pode ajustar configuracoes visuais.
   - [ ] Usuario pode exportar PDF.
   - [ ] PDF tem nome descritivo.
   - [ ] HTML `<script>` nao e executado (XSS bloqueado).
   - [ ] CDNs nao estao no bundle.
   - [ ] GEMINI_API_KEY nao esta exposta.
   - [ ] App funciona em mobile (320px).
   - [ ] Botao de exportar mostra spinner.
   - [ ] `---` em code block nao cria quebra.
   - [ ] Preview vazio mostra mensagem.
   - [ ] Nao ha erros no console.
4. Testar em multiplos browsers (Chrome, Firefox, Safari, Edge) se possivel.
5. Atualizar arquivos de continuidade (CURRENT_STATE.md, HANDOFF.md, CHANGELOG.md).

### Criterios de aceite

- Todos os comandos de validacao passam.
- Checklist manual completo.
- App funciona em mobile e desktop.
- Nao ha erros no console.
- Arquivos de continuidade atualizados.

### Como validar

Ver lista de comandos e checklist acima.

### Riscos

- BAIXO: Validacao apenas.

### O que NAO alterar

- Nao implementar funcionalidades.
- Nao alterar escopo.

### Reversibilidade

N/A — e apenas validacao.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa — checklist final de validacao.

Projeto: /mnt/c/Dev/markdown-para-pdf

ANTES DE COMECAR: Ler /docs/design/UI_UX_GUIDE.md.

Passos:
1. npx tsc --noEmit -> 0 erros
2. npm run build -> OK
3. npm test -> passando
4. npm run dev -> abrir browser, testar:
   - Digitar Markdown -> preview atualiza
   - Importar arquivo .md -> funciona
   - Ajustar configuracoes -> funciona
   - Exportar PDF -> funciona, nome descritivo
   - <script>alert('xss')</script> -> NAO executa
   - Editor vazio -> mostra mensagem
   - --- em code block -> nao cria quebra
5. DevTools -> 320px -> testar mobile
6. Verificar console sem erros
7. grep -r "GEMINI" . --include="*.ts" --include="*.tsx" | grep -v node_modules -> vazio
8. grep -r "cdn\." index.html -> vazio

Se algum teste falhar, reportar o problema.
Reportar: resultado de cada validacao, arquivos alterados, surpresas.
```

---

# Ordem recomendada de execucao

```
Tarefa 5.1  Remover GEMINI_API_KEY   (independente, PRIORIDADE ALTA)
Tarefa 5.2  Configurar meta tags     (independente)
Tarefa 5.3  Configurar Vercel        (independente)
Tarefa 5.4  Validar build            (depende de 5.1 e 5.3)
Tarefa 5.5  Checklist final          (depende de todas)
```

**Checkpoints:**
- Apos Tarefa 5.1: commit "chore: remover GEMINI_API_KEY do vite.config"
- Apos Tarefa 5.2: commit "feat: meta tags e favicon"
- Apos Tarefa 5.3: commit "chore: configurar Vercel SPA redirect"
- Apos Tarefa 5.4: commit "chore: validacao de build de producao"
- Apos Tarefa 5.5: commit "docs: checklist final e atualizacao de continuidade"

**Sequencia recomendada:** 5.1 primeiro (seguranca), depois 5.2 e 5.3 em paralelo, depois 5.4, depois 5.5.

**Auditoria UI/UX:** Obrigatoria na Tarefa 5.5.

---

# Checklist final da sprint

- [ ] `npx tsc --noEmit` passa com 0 erros
- [ ] `npm run build` gera dist/ sem erro
- [ ] `npm test` passa
- [ ] GEMINI_API_KEY removida (grep = 0)
- [ ] Meta tags presentes (title, description, OG, favicon)
- [ ] vercel.json criado (se necessario)
- [ ] dist/ contem index.html e assets
- [ ] Bundle sem GEMINI_API_KEY
- [ ] Bundle sem CDNs
- [ ] App funciona em mobile (320px)
- [ ] App funciona em desktop
- [ ] XSS bloqueado
- [ ] PDF exporta com nome descritivo
- [ ] Preview vazio mostra mensagem
- [ ] Notificacoes funcionam (5s)
- [ ] Spinner funciona no exportar
- [ ] Nao ha erros no console
- [ ] Responsividade validada
- [ ] Regressoes verificadas
- [ ] Escopo conferido contra sprint original
- [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] UI/UX Gate preenchido para tarefa 5.5
- [ ] `/docs/design/UI_UX_GUIDE.md` seguido na tarefa 5.5
- [ ] CURRENT_STATE.md atualizado
- [ ] HANDOFF.md atualizado
- [ ] CHANGELOG.md atualizado

---

# Tarefas que NAO devem ir para modelo economico

| Tarefa | Motivo |
|---|---|
| Tarefa 5.1 — Remover GEMINI_API_KEY | Envolve seguranca. Embora simples, um erro pode deixar a chave exposta. Modelo economico e suficiente, mas com atencao extra. |

As demais tarefas (5.2, 5.3, 5.4, 5.5) sao mecanicas e seguras para modelo economico.
