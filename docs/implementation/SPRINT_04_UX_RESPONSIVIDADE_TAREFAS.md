# Sprint quebrada em tarefas menores

## Sprint de origem

- **Nome:** Sprint 4 — UX e Responsividade
- **Objetivo:** Validar e corrigir responsividade mobile (320px), garantir 44px de area de toque em botoes, validar notificacoes de sucesso/erro (5s) e validar spinner no botao de exportar (30s timeout).
- **Arquivo de origem:** `/docs/implementation/SPRINT_04_UX_RESPONSIVIDADE.md`
- **Resumo do escopo:** 4 tarefas — responsividade mobile, area de toque, notificacoes, spinner/timeout.

---

## Analise da Sprint

### Objetivo da sprint

Garantir que o app funciona bem em mobile (320px), que todos os botoes tem area de toque adequada, que notificacoes tem comportamento correto e que a exportacao de PDF tem feedback visual e timeout.

### Impacto UI/UX da sprint

**Classificacao: Sim**

Todas as 4 tarefas impactam UI/UX diretamente:

1. **Responsividade mobile** — layout completo do app em telas pequenas.
2. **Area de toque** — dimensoes de botoes interativos.
3. **Notificacoes** — componentes visuais de feedback.
4. **Spinner/timeout** — componente visual de loading no botao de exportar.

Tarefas com impacto visual devem seguir `/docs/design/UI_UX_GUIDE.md`.

### Escopo identificado

1. Validar e corrigir responsividade mobile (320px).
2. Garantir 44px de area de toque em botoes interativos.
3. Validar notificacoes de sucesso/erro (auto-dismiss 5s).
4. Validar spinner no botao de exportar e implementar timeout de 30s.

### Fora do escopo

- Nao alterar templates, presets ou temas.
- Nao alterar sanitizacao.
- Nao alterar regras de negocio.
- Nao alterar deploy.
- Nao alterar logica de paginacao.

### Dependencias entre partes

- Todas as 4 tarefas sao independentes entre si.
- Todas dependem de Sprint 1 concluida.
- Tarefa 4.1 (responsividade) pode revelar problemas que afetam 4.2 (area de toque).

### Riscos principais

| Risco | Severidade | Area |
|---|---|---|
| Layout mobile pode quebrar em 320px | MEDIA | UI/UX |
| 44px pode conflitar com design atual dos botoes | BAIXA | UI/UX |
| Timeout de 30s nao existe — precisa ser implementado | MEDIA | Engenharia |
| Notificacoes ja existem mas podem ter timing incorreto | BAIXA | UI/UX |

### Estrategia de quebra

A sprint sera dividida em 4 tarefas:

1. Responsividade mobile (UI/componente) — audit + fix.
2. Area de toque 44px (UI/componente) — audit + fix.
3. Notificacoes 5s (validacao) — audit, provavelmente ja funciona.
4. Spinner + timeout 30s (UI/componente + logica) — spinner ja existe, timeout precisa ser implementado.

---

# Tarefas da Sprint

## Tarefa 4.1 — Validar e corrigir responsividade mobile (320px)

### Objetivo

Testar o app em mobile (320px) e corrigir qualquer problema de layout: sobreposicao de elementos, scroll horizontal obrigatorio, botoes Editor/Preview funcionando, configuracoes acessiveis via overlay.

### Tipo da tarefa

UI/componente.

### Impacto UI/UX

**Sim.** Afeta o layout completo do app em telas pequenas.

- Deve ler `/docs/design/UI_UX_GUIDE.md` antes de executar.
- Deve validar mobile (320px) e desktop.
- Deve evitar aparencia generica de IA.
- Deve prever loading, erro e vazio quando aplicavel.

### Pre-requisitos

- Sprint 1 concluida.
- Leitura de `/docs/design/UI_UX_GUIDE.md`.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `App.tsx` | Alterar | Layout mobile, breakpoints |

**Nota:** O layout atual usa `grid-cols-1 lg:grid-cols-12` (linha 426). Ja existe `isMobileSettingsOpen` (linha 75) e overlay de configuracoes mobile (linha 428). Precisa validar se o layout funciona em 320px.

### Passos

1. Ler `/docs/design/UI_UX_GUIDE.md` secoes 7 (responsividade) e 4.1 (layout).
2. Executar `npm run dev` e abrir no browser.
3. Abrir DevTools e simular 320px de largura.
4. Verificar:
   - App abre sem erro.
   - Nao ha scroll horizontal obrigatorio.
   - Editor e preview alternam (se houver toggle) ou ambos visiveis.
   - Configuracoes sao acessiveis via overlay.
   - Toolbar nao quebra.
   - Textos nao sao cortados.
5. Corrigir problemas encontrados.
6. Testar em 320px, 375px e 768px.

### Criterios de aceite

- App funciona em 320px sem scroll horizontal indevido.
- Nao ha sobreposicao de elementos.
- Configuracoes acessiveis via overlay.
- Toolbar funcional.
- Textos legiveis.
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
npm run dev
# DevTools -> 320px -> testar cada funcionalidade
# DevTools -> 375px -> testar
# DevTools -> 768px -> testar

npm test
npm run build
```

### Riscos

- MEDIO: Correcoes de layout podem afetar desktop.

### O que NAO alterar

- Nao alterar templates.ts.
- Nao alterar sanitizacao.
- Nao alterar regras de negocio.

### Reversibilidade

Restaurar classes CSS originais. Diff moderado mas facil de identificar.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf

ANTES DE COMECAR: Ler /docs/design/UI_UX_GUIDE.md (secoes 4.1, 7).

Arquivo: App.tsx

Contexto: O layout usa grid-cols-1 lg:grid-cols-12 (linha 426).
Ja existe isMobileSettingsOpen e overlay de configuracoes mobile.

Passos:
1. npm run dev -> abrir DevTools -> simular 320px.
2. Verificar: sem scroll horizontal, sem sobreposicao, toolbar funcional.
3. Verificar: configuracoes acessiveis via overlay.
4. Verificar: textos legiveis, botoes clicaveis.
5. Corrigir problemas encontrados (apenas classes CSS, nao logica).
6. Testar em 320px, 375px, 768px e desktop.
7. npm test -> OK
8. npm run build -> OK

NAO alterar: templates.ts, sanitizacao, regras de negocio.
UI/UX: layout deve seguir secao 7 do UI/UX Guide.
```

---

## Tarefa 4.2 — Garantir 44px de area de toque em botoes

### Objetivo

Verificar que todos os botoes interativos tem ao menos 44px de area de toque em mobile. Incluir botoes da toolbar, botoes de acao e botoes de configuracao.

### Tipo da tarefa

UI/componente.

### Impacto UI/UX

**Sim.** Afeta dimensoes de botoes interativos.

- Deve ler `/docs/design/UI_UX_GUIDE.md` antes de executar.
- Deve validar mobile e desktop.
- Deve evitar aparencia generica de IA.

### Pre-requisitos

- Sprint 1 concluida.
- Leitura de `/docs/design/UI_UX_GUIDE.md`.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `components/Toolbar.tsx` | Alterar | Area de toque dos botoes da toolbar |
| `components/SettingsPanel.tsx` | Alterar | Area de toque em mobile |
| `App.tsx` | Alterar | Area de toque de botoes de acao |

**Nota:** Os botoes da toolbar usam `w-4 h-4` para icones (linhas 71-81 de Toolbar.tsx) e padding `p-1.5 px-2.5` (linha 132). Precisa verificar se a area total de toque atinge 44px.

### Passos

1. Ler `/docs/design/UI_UX_GUIDE.md` secoes 5.1 (botoes) e 9 (acessibilidade).
2. Inspecionar cada botao interativo no DevTools (320px).
3. Verificar dimensoes de cada botao (width e height >= 44px ou area equivalente).
4. Ajustar padding/min-h/min-w onde necessario.
5. Garantir que o ajuste nao quebra o layout desktop.

### Criterios de aceite

- Todos os botoes interativos tem area de toque >= 44px em mobile.
- Layout desktop nao e afetado negativamente.
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
npm run dev
# DevTools -> 320px -> inspecionar cada botao
# Verificar width e height >= 44px

npm test
npm run build
```

### Riscos

- BAIXO: Aumentar area de toque pode comprimir outros elementos em mobile.

### O que NAO alterar

- Nao alterar templates.ts.
- Nao alterar sanitizacao.
- Nao alterar regras de negocio.

### Reversibilidade

Restaurar classes CSS originais dos botoes. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf

ANTES DE COMECAR: Ler /docs/design/UI_UX_GUIDE.md (secoes 5.1, 9).

Arquivos: components/Toolbar.tsx, components/SettingsPanel.tsx, App.tsx

Contexto: Botoes da toolbar usam padding p-1.5 px-2.5 (Toolbar.tsx linha 132).
Icones sao w-4 h-4 (Toolbar.tsx linhas 71-81).

Passos:
1. npm run dev -> DevTools -> 320px.
2. Inspecionar cada botao interativo -> verificar dimensoes.
3. Onde area < 44px, ajustar com min-h-[44px] min-w-[44px] ou padding maior.
4. Usar min-h/min-w para nao afetar desktop (responsivo).
5. Testar em 320px e desktop.
6. npm test -> OK
7. npm run build -> OK

NAO alterar: templates.ts, sanitizacao, regras de negocio.
UI/UX: area de toque >= 44px e requisito de acessibilidade (UI/UX Guide secao 9).
```

---

## Tarefa 4.3 — Validar notificacoes de sucesso/erro (5s)

### Objetivo

Verificar que notificacoes de sucesso e erro aparecem e desaparecem apos 5 segundos. Validar timing, posicao e conteudo.

### Tipo da tarefa

validacao.

### Impacto UI/UX

**Sim.** Componentes visuais de feedback.

- Deve ler `/docs/design/UI_UX_GUIDE.md` antes de executar.
- Deve validar mobile e desktop.
- Deve prever estados: sucesso, erro, timeout.

### Pre-requisitos

- Sprint 1 concluida.
- Leitura de `/docs/design/UI_UX_GUIDE.md`.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `App.tsx` | Verificar | Notificacoes ja implementadas (linhas 287, 292) |

**Nota:** As notificacoes ja existem:
- Sucesso: `setIsSuccess(true)` + `setTimeout(() => setIsSuccess(false), 5000)` (linha 287).
- Erro: `setPdfError(...)` + `setTimeout(() => setPdfError(null), 5000)` (linha 292).
- Importacao: `setImportNotification(...)` com `setTimeout` (linhas 122-124).

Esta tarefa e principalmente de VALIDACAO. Se os timings estiverem corretos, apenas confirmar. Se nao, ajustar.

### Passos

1. Ler `/docs/design/UI_UX_GUIDE.md` secoes 6.3 (error states) e 8 (microcopy).
2. Executar `npm run dev` e testar:
   - Exportar PDF com sucesso → verificar notificacao verde.
   - Esperar 5s → verificar que desaparece.
   - Simular erro de exportacao → verificar notificacao vermelha.
   - Esperar 5s → verificar que desaparece.
   - Importar arquivo → verificar notificacao.
3. Verificar posicao das notificacoes (fixo no canto inferior direito).
4. Verificar em mobile e desktop.
5. Se algum timing estiver incorreto, corrigir.

### Criterios de aceite

- Notificacao de sucesso aparece ao exportar PDF.
- Notificacao de erro aparece se exportacao falhar.
- Ambas desaparecem apos 5 segundos.
- Notificacoes funcionam em mobile e desktop.
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
npm run dev
# 1. Exportar PDF -> notificacao verde aparece
# 2. Cronometrar 5s -> notificacao desaparece
# 3. Simular erro (se possivel) -> notificacao vermelha
# 4. Cronometrar 5s -> desaparece
# 5. Importar arquivo -> notificacao aparece
# 6. Testar em mobile e desktop

npm test
npm run build
```

### Riscos

- BAIXO: Notificacoes ja implementadas, provavelmente so precisa validar.

### O que NAO alterar

- Nao alterar templates.ts.
- Nao alterar sanitizacao.
- Nao alterar regras de negocio.
- Nao alterar logica de exportacao.

### Reversibilidade

N/A — e principalmente validacao. Se alterar, e apenas ajuste de timing.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf

ANTES DE COMECAR: Ler /docs/design/UI_UX_GUIDE.md (secoes 6.3, 8).

Arquivo: App.tsx

Contexto: Notificacoes ja implementadas:
- Sucesso: linha 287 (setTimeout 5000ms)
- Erro: linha 292 (setTimeout 5000ms)
- Importacao: linhas 122-124

Passos:
1. npm run dev -> exportar PDF -> verificar notificacao verde.
2. Cronometrar 5s -> verificar que desaparece.
3. Verificar notificacao de erro (se possivel simular).
4. Verificar notificacao de importacao.
5. Verificar posicao (fixo, canto inferior direito).
6. Testar em mobile e desktop.
7. Se timing incorreto, ajustar setTimeout.
8. npm test -> OK
9. npm run build -> OK

NAO alterar: templates.ts, sanitizacao, regras de negocio, logica de exportacao.
UI/UX: notificacoes devem seguir microcopy do UI/UX Guide (secao 8).
```

---

## Tarefa 4.4 — Validar spinner e implementar timeout 30s

### Objetivo

Verificar que o botao de exportar mostra spinner e fica desabilitado durante geracao. Implementar timeout de 30 segundos com mensagem de erro se a geracao exceder esse tempo.

### Tipo da tarefa

UI/componente + logica de negocio.

### Impacto UI/UX

**Sim.** Componente visual de loading no botao e mensagem de erro por timeout.

- Deve ler `/docs/design/UI_UX_GUIDE.md` antes de executar.
- Deve validar mobile e desktop.
- Deve prever estados: loading, timeout, erro.

### Pre-requisitos

- Sprint 1 concluida.
- Leitura de `/docs/design/UI_UX_GUIDE.md`.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `App.tsx` | Alterar | Adicionar timeout de 30s na geracao de PDF |

**Nota:** O spinner ja existe (linha 408: `animate-spin`). O disabled ja existe (linha 402: `disabled={isGenerating}`). O texto "Forjando PDF..." ja aparece (linha 412). Porem, NAO existe timeout de 30s — se a geracao travar, o botao fica desabilitado indefinidamente.

### Passos

1. Ler `/docs/design/UI_UX_GUIDE.md` secoes 6.2 (loading states) e 8 (microcopy).
2. Verificar que o spinner e disabled ja funcionam (provavelmente sim).
3. Implementar timeout de 30s na funcao `handleGeneratePdf`:
   - Iniciar um `setTimeout` de 30s ao comecar a geracao.
   - Se a geracao nao terminar em 30s, cancelar e mostrar erro.
   - Limpar o timeout se a geracao terminar antes.
4. Mensagem de erro por timeout: "A geracao do PDF excedeu 30 segundos. Tente novamente com menos imagens."
5. Garantir que o botao volta a ficar habilitado apos timeout.

### Criterios de aceite

- Botao mostra spinner durante geracao.
- Botao fica desabilitado durante geracao.
- Multiplos cliques nao disparam multiplas geracoes.
- Se geracao exceder 30s, erro e exibido e botao volta ao normal.
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
npm run dev
# 1. Clicar exportar -> verificar spinner e disabled
# 2. Clicar multiplas vezes -> verificar que nao duplica
# 3. Para testar timeout: pode ser necessario simular (documentacao)
# 4. Verificar em mobile e desktop

npm test
npm run build
```

### Riscos

- BAIXO: Spinner e disabled ja implementados. Timeout e adicao simples.

### O que NAO alterar

- Nao alterar templates.ts.
- Nao alterar sanitizacao.
- Nao alterar logica de geracao de PDF (apenas adicionar timeout).

### Reversibilidade

Remover o setTimeout de 30s. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf

ANTES DE COMECAR: Ler /docs/design/UI_UX_GUIDE.md (secoes 6.2, 8).

Arquivo: App.tsx

Contexto: Spinner ja existe (linha 408). Disabled ja existe (linha 402).
NAO existe timeout de 30s — se geracao travar, botao fica desabilitado.

Passos:
1. Verificar que spinner e disabled ja funcionam.
2. Em handleGeneratePdf (linha ~229), adicionar timeout de 30s:
   - const timeoutId = setTimeout(() => { setPdfError("A geracao do PDF excedeu 30 segundos."); setIsGenerating(false); }, 30000);
   - Limpar timeout no finally: clearTimeout(timeoutId).
3. Mensagem de erro: "A geracao do PDF excedeu 30 segundos. Tente novamente com menos imagens."
4. npm run dev -> testar exportacao normal -> verificar spinner.
5. npm test -> OK
6. npm run build -> OK

NAO alterar: templates.ts, sanitizacao, logica de geracao (apenas adicionar timeout).
UI/UX: mensagem de erro deve seguir microcopy do UI/UX Guide (secao 8).
```

---

# Ordem recomendada de execucao

```
Tarefa 4.1  Responsividade mobile     (independente)
Tarefa 4.2  Area de toque 44px        (independente, pode revelar dependencia de 4.1)
Tarefa 4.3  Notificacoes 5s           (independente, validacao)
Tarefa 4.4  Spinner + timeout 30s     (independente)
```

Todas as 4 tarefas sao independentes entre si.

**Checkpoints:**
- Apos Tarefa 4.1: commit "fix: responsividade mobile 320px"
- Apos Tarefa 4.2: commit "fix: area de toque 44px em botoes"
- Apos Tarefa 4.3: commit "chore: validar notificacoes 5s"
- Apos Tarefa 4.4: commit "feat: timeout 30s na geracao de PDF"

**Sequencia recomendada:** 4.1 antes de 4.2 (layout mobile pode afetar area de toque).

**Todas as tarefas exigem leitura de UI/UX Guide.**

**Auditoria UI/UX:** Obrigatoria apos cada tarefa.

---

# Checklist final da sprint

- [ ] `npx tsc --noEmit` passa com 0 erros
- [ ] `npm run build` gera dist/ sem erro
- [ ] `npm test` passa
- [ ] `npm run dev` funciona sem erro no console
- [ ] App funciona em 320px sem scroll horizontal
- [ ] Botao Editor/Preview alterna corretamente (se existir)
- [ ] Configuracoes acessiveis via overlay em mobile
- [ ] Todos os botoes interativos >= 44px de area de toque
- [ ] Notificacao de sucesso aparece e desaparece em 5s
- [ ] Notificacao de erro aparece e desaparece em 5s
- [ ] Spinner no botao de exportar funciona
- [ ] Botao desabilitado durante geracao
- [ ] Timeout de 30s funciona
- [ ] Multiplos cliques nao disparam multiplas geracoes
- [ ] Responsividade validada em mobile e desktop
- [ ] Regressoes verificadas
- [ ] Arquivos alterados revisados
- [ ] Escopo conferido contra sprint original
- [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] UI/UX Gate preenchido para todas as tarefas
- [ ] `/docs/design/UI_UX_GUIDE.md` seguido em todas as tarefas

---

# Tarefas que NAO devem ir para modelo economico

Nenhuma. Todas as 4 tarefas sao mecanicas e seguras para modelo economico.

A tarefa 4.1 (responsividade) e a mais trabalhosa visualmente, mas nao envolve arquitetura ou decisoes criticas — modelo economico e suficiente.
