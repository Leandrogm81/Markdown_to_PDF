# Sprint quebrada em tarefas menores

## Sprint de origem

- **Nome:** Sprint 1 — Migracao de Dependencias
- **Objetivo:** Substituir todas as CDNs carregadas via `<script>` no index.html por dependencias npm locais. Habilitar `strict: true` no TypeScript. Garantir que o app funciona sem nenhuma CDN em runtime.
- **Arquivo de origem:** `/docs/implementation/SPRINT_01_MIGRACAO_DEPS.md`
- **Resumo do escopo:** Migrar jspdf, html2canvas e Tailwind de CDN para npm. Remover import maps. Habilitar strict mode e corrigir erros.

## Analise da Sprint

### Objetivo da sprint

Eliminar todas as CDNs do index.html, migrando cada dependencia para npm, e habilitar strict mode no TypeScript.

### Impacto UI/UX da sprint

**Classificacao: Indireto**

A sprint nao altera componentes visuais diretamente, mas a migracao de Tailwind CDN para npm pode afetar a renderizacao de todas as classes CSS. A migracao de marked (ja concluida) e a de jspdf/html2canvas podem afetar a renderizacao do preview e a exportacao do PDF.

Tarefas com impacto visual devem seguir `/docs/design/UI_UX_GUIDE.md`.

### Escopo identificado

1. Migrar jspdf de CDN para npm.
2. Migrar html2canvas de CDN para npm.
3. Migrar Tailwind CSS de CDN para npm (@tailwindcss/vite).
4. Remover import maps do index.html (React/ReactDOM ja estao no package.json).
5. Habilitar `strict: true` no tsconfig.json.
6. Corrigir erros de tipo resultantes do strict mode.
7. Remover bloco de CDN e import maps do index.html (higiene final).

### Fora do escopo

- Nao implementar funcionalidades novas.
- Nao alterar templates.ts, presets ou temas.
- Nao alterar comportamento de importacao ou exportacao.
- Nao implementar sanitizacao (Sprint 2).
- Nao alterar nome do PDF (Sprint 2).
- Nao remover GEMINI_API_KEY (Sprint 5).
- Nao adicionar autosave (decisao PD-01: NAO).
- Nao adicionar tema escuro (decisao PD-11: NAO).

### Dependencias entre partes

- Tarefas 1.1 e 1.2 (jspdf e html2canvas) podem ser executadas em qualquer ordem entre si, mas devem vir antes da tarefa 1.5 (remover import maps) para garantir que o app funcione durante a transicao.
- Tarefa 1.3 (Tailwind) e independente das outras migracoes de CDN.
- Tarefa 1.4 (remover import maps) deve vir apos 1.1 e 1.2.
- Tarefa 1.5 (strict mode) deve vir apos todas as migracoes para evitar conflitos de tipo.
- Tarefa 1.6 (corrigir erros de tipo) depende de 1.5.
- Tarefa 1.7 (validacao final) depende de todas as anteriores.

### Riscos principais

| Risco | Severidade | Area |
|---|---|---|
| Tailwind CDN -> npm pode quebrar todas as classes CSS | ALTA | Engenharia |
| marked ja migrado, mas typeof check residual em A4DocPreview.tsx | BAIXA | Engenharia |
| strict mode pode revelar dezenas de erros de tipo | MEDIA | Engenharia |
| @tailwindcss/typography via require() na config inline nao funciona via npm | MEDIA | Engenharia |
| Import maps removidos antes de React/ReactDOM confirmados no package.json | BAIXA | Engenharia |

### Estrategia de quebra

A sprint sera dividida em 7 tarefas sequenciais:

1. Migrar jspdf (isolado, baixo risco).
2. Migrar html2canvas (isolado, baixo risco).
3. Migrar Tailwind (risco alto, isolado).
4. Limpar index.html (remover import maps e CDNs residuais).
5. Habilitar strict mode.
6. Corrigir erros de tipo.
7. Validacao final da sprint.

Cada tarefa gera um diff pequeno e revisavel. A tarefa de Tailwind e a mais arriscada e deve ser validada visualmente antes de prosseguir.

---

# Tarefas da Sprint

## Tarefa 1.1 — Migrar jspdf de CDN para npm

### Objetivo

Instalar jspdf via npm, remover a CDN do index.html e converter o `declare const jspdf` em App.tsx para `import { jsPDF } from 'jspdf'`.

### Tipo da tarefa

configuracao + lógica de negócio (migracao de import).

### Impacto UI/UX

**Nao.** Afeta apenas a exportacao de PDF, nao a renderizacao visual.

### Pre-requisitos

- Sprint 0 e 00B concluidas (confirmado).
- `npm run build` funciona (confirmado).
- `npm test` passa (confirmado).

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `package.json` | Alterar | Adicionar jspdf |
| `App.tsx` | Alterar | Converter declare const para import (linhas 32-36) |
| `index.html` | Alterar | Remover script CDN jspdf |

**Nota:** Caminhos confirmados. App.tsx esta na raiz do projeto (nao em src/).

### Passos

1. Executar `npm install jspdf` na raiz do projeto.
2. Em App.tsx, remover o bloco `declare const jspdf` (linhas 32-36).
3. Em App.tsx, adicionar `import { jsPDF } from 'jspdf';` no topo, apos os imports existentes.
4. Verificar se todas as referencias a `jspdf.jsPDF` em App.tsx foram atualizadas para `jsPDF` (a importacao nomeada ja resolve, pois `jsPDF` sera o construtor direto).
5. Em index.html, remover a linha `<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>`.
6. Executar `npm run dev` e verificar que o app inicia sem erro.
7. Executar `npm test` e verificar que os 22 testes continuam passando.

### Criterios de aceite

- `npm install` instala jspdf sem erro.
- `npm run dev` funciona sem erro no console.
- Nao ha referencia a CDN jspdf no index.html.
- `declare const jspdf` nao existe mais em App.tsx.
- `import { jsPDF } from 'jspdf'` existe em App.tsx.
- `npm test` passa (22 testes).

### Como validar

```bash
npm run dev
# Abrir browser -> verificar que app carrega
# Verificar console sem erros

npm test

# Verificar ausencia de CDN
grep -c "cdnjs.*jspdf" index.html  # Deve retornar 0
grep -c "declare const jspdf" App.tsx  # Deve retornar 0
```

### Riscos

- A API do jspdf pode diferir sutilmente entre a versao UMD global e a versao npm. Verificar se `new jsPDF({...})` funciona igual.
- Tipos podem nao estar incluidos no pacote jspdf (verificar se @types/jspdf e necessario).

### O que NAO alterar

- Nao alterar a logica de geracao de PDF (apenas o import).
- Nao alterar templates.ts.
- Nao alterar configuracoes de captura.

### Reversibilidade

Reverter desfazendo: (1) remover import, (2) restaurar declare const, (3) restaurar script CDN no index.html, (4) `npm uninstall jspdf`. Diff pequeno e facil de reverter.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Tarefa: Migrar jspdf de CDN para npm no projeto /mnt/c/Dev/markdown-para-pdf.

Passos:
1. npm install jspdf
2. Em App.tsx: remover o bloco "declare const jspdf" (linhas ~32-36) e adicionar "import { jsPDF } from 'jspdf'" no topo.
3. Verificar que todas as referencias a "jspdf.jsPDF" funcionam com o import direto.
4. Em index.html: remover o script CDN do jspdf.
5. npm run dev -> verificar sem erros.
6. npm test -> 22 testes passando.

NAO alterar: templates.ts, logica de negocio, configuracoes de captura.
Validar: grep -c "cdnjs.*jspdf" index.html deve retornar 0.
```

---

## Tarefa 1.2 — Migrar html2canvas de CDN para npm

### Objetivo

Instalar html2canvas via npm, remover a CDN do index.html e converter o `declare const html2canvas` em App.tsx para `import html2canvas from 'html2canvas'`.

### Tipo da tarefa

configuracao + logica de negocio (migracao de import).

### Impacto UI/UX

**Nao.** Afeta apenas a captura de paginas para exportacao de PDF.

### Pre-requisitos

- Tarefa 1.1 concluida (jspdf migrado).
- `npm run build` funciona.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `package.json` | Alterar | Adicionar html2canvas |
| `App.tsx` | Alterar | Converter declare const para import (linha 32) |
| `index.html` | Alterar | Remover script CDN html2canvas |

### Passos

1. Executar `npm install html2canvas` na raiz do projeto.
2. Em App.tsx, remover `declare const html2canvas` (linha 32).
3. Em App.tsx, adicionar `import html2canvas from 'html2canvas';` no topo.
4. Em index.html, remover a linha `<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>`.
5. Executar `npm run dev` e verificar que o app inicia sem erro.
6. Executar `npm test` e verificar que os 22 testes continuam passando.

### Criterios de aceite

- `npm install` instala html2canvas sem erro.
- `npm run dev` funciona sem erro.
- Nao ha referencia a CDN html2canvas no index.html.
- `declare const html2canvas` nao existe mais em App.tsx.
- `npm test` passa.

### Como validar

```bash
npm run dev
# Abrir browser -> verificar app carrega

npm test

grep -c "cdnjs.*html2canvas" index.html  # Deve retornar 0
grep -c "declare const html2canvas" App.tsx  # Deve retornar 0
```

### Riscos

- html2canvas pode ter comportamento diferente entre UMD global e modulo ES. Verificar captura de paginas.
- A versao npm pode nao incluir tipos (verificar).

### O que NAO alterar

- Nao alterar configuracoes de captura.
- Nao alterar templates.ts.
- Nao alterar logica de geracao de PDF.

### Reversibilidade

Reverter desfazendo: (1) remover import, (2) restaurar declare const, (3) restaurar script CDN, (4) `npm uninstall html2canvas`.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Tarefa: Migrar html2canvas de CDN para npm no projeto /mnt/c/Dev/markdown-para-pdf.

Passos:
1. npm install html2canvas
2. Em App.tsx: remover "declare const html2canvas" (linha ~32) e adicionar "import html2canvas from 'html2canvas'" no topo.
3. Em index.html: remover o script CDN do html2canvas.
4. npm run dev -> verificar sem erros.
5. npm test -> 22 testes passando.

NAO alterar: templates.ts, logica de negocio, configuracoes de captura.
Validar: grep -c "cdnjs.*html2canvas" index.html deve retornar 0.
```

---

## Tarefa 1.3 — Migrar Tailwind CSS de CDN para npm

### Objetivo

Instalar Tailwind CSS via npm usando o plugin @tailwindcss/vite, remover o script CDN e a config inline do index.html, e configurar o Tailwind no vite.config.ts.

### Tipo da tarefa

configuracao + UI/Componente (afeta todas as classes CSS).

### Impacto UI/UX

**Sim.** Esta tarefa afeta TODA a renderizacao CSS do app. Todas as classes Tailwind dependem desta migracao.

- Deve ler `/docs/design/UI_UX_GUIDE.md` antes de executar.
- Deve validar mobile e desktop apos migracao.
- Deve evitar aparencia generica de IA.
- Deve prever loading, erro e vazio quando aplicavel.
- Deve comparar visual antes/depois da migracao.

### Pre-requisitos

- Leitura de `/docs/design/UI_UX_GUIDE.md`.
- Screenshot do app ANTES da migracao para comparacao.
- `npm run dev` funciona antes da migracao.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `package.json` | Alterar | Adicionar tailwindcss, @tailwindcss/vite, @tailwindcss/typography |
| `vite.config.ts` | Alterar | Adicionar plugin tailwindcss |
| `index.html` | Alterar | Remover script CDN Tailwind + config inline |
| `index.css` (ou criar) | Alterar/Criar | Adicionar @import "tailwindcss" |

**Nota:** O index.html atual usa `require('@tailwindcss/typography')` na config inline. Na migracao npm, o plugin typography precisa ser instalado e configurado separadamente. O inline config tambem define darkMode: 'class' e customizacoes de typography — essas precisam ser migradas para o CSS ou vite.config.ts.

### Passos

1. Executar `npm install tailwindcss @tailwindcss/vite @tailwindcss/typography`.
2. Em vite.config.ts, adicionar o plugin Tailwind:
   ```ts
   import tailwindcss from '@tailwindcss/vite';
   // ...
   plugins: [react(), tailwindcss()],
   ```
3. Em index.html, remover o bloco inteiro do Tailwind:
   - `<script src="https://cdn.tailwindcss.com"></script>`
   - Todo o bloco `<script>tailwind.config = {...}</script>`
4. Verificar se existe um arquivo CSS principal (index.css). Se existir, adicionar `@import "tailwindcss";` no topo. Se nao existir, verificar como o CSS e importado e ajustar.
5. Verificar se as customizacoes de typography do inline config precisam ser migradas para um arquivo CSS ou config.
6. Executar `npm run dev` e comparar visualmente com o estado anterior.
7. Executar `npm test` e verificar que os 22 testes continuam passando.

### Criterios de aceite

- `npm run dev` funciona sem erro.
- App visualmente identico (ou muito proximo) ao estado anterior.
- Classes Tailwind funcionam (cores, layout, responsividade, typography).
- Dark mode classes ainda funcionam (body.bg-gray-900, etc.).
- Nao ha referencia a cdn.tailwindcss.com no index.html.
- `npm test` passa.
- `npm run build` gera dist/ sem erro.

### Como validar

```bash
npm run dev
# Abrir browser -> comparar visual com screenshot anterior
# Testar responsividade (320px mobile)
# Verificar que typography funciona no preview

npm test
npm run build

grep -c "cdn.tailwindcss" index.html  # Deve retornar 0
```

### Riscos

- **ALTO:** Pode quebrar todas as classes CSS se a migracao nao for feita corretamente.
- O plugin @tailwindcss/typography via npm pode ter comportamento diferente do CDN.
- A config inline tem darkMode: 'class' e customizacoes de typography que precisam ser migradas.
- Classes arbitrárias como `dark:bg-gray-900` podem nao funcionar se o dark mode nao for configurado.

### O que NAO alterar

- Nao alterar classes Tailwind nos componentes.
- Nao alterar darkMode config (manter 'class' se possivel).
- Nao alterar templates.ts.
- Nao remover GEMINI_API_KEY.

### Reversibilidade

Reverter desfazendo: (1) remover plugin do vite.config.ts, (2) restaurar script CDN e config inline no index.css, (3) remover @import "tailwindcss" do CSS, (4) `npm uninstall tailwindcss @tailwindcss/vite @tailwindcss/typography`. Risco: o inline config original precisa ser preservado para rollback.

### Modelo recomendado

**modelo intermediário recomendado** — risco alto de quebra visual, requer comparacao visual cuidadosa.

### Prompt de execução para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Tarefa: Migrar Tailwind CSS de CDN para npm no projeto /mnt/c/Dev/markdown-para-pdf.

ANTES DE COMECAR: Ler /docs/design/UI_UX_GUIDE.md. Tirar screenshot do app com npm run dev para comparacao.

Passos:
1. npm install tailwindcss @tailwindcss/vite @tailwindcss/typography
2. Em vite.config.ts: importar e adicionar plugin tailwindcss (junto com react).
3. Em index.html: remover o script CDN do Tailwind E todo o bloco de config inline.
4. No CSS principal (index.css ou equivalente): adicionar "@import 'tailwindcss'" no topo.
5. Verificar se as customizacoes de typography do inline config precisam ser migradas.
6. npm run dev -> comparar visual com screenshot anterior.
7. Validar mobile (320px) e desktop.
8. npm test -> 22 testes passando.
9. npm run build -> OK.

NAO alterar: classes Tailwind nos componentes, templates.ts, GEMINI_API_KEY.
RISCO ALTO: se o visual quebrar, investigar antes de prosseguir. Preservar o inline config original para rollback.
```

---

## Tarefa 1.4 — Limpar index.html (remover import maps e CDNs residuais)

### Objetivo

Remover o bloco `<script type="importmap">` do index.html. React e ReactDOM ja estao no package.json e o Vite resolve os imports automaticamente.

### Tipo da tarefa

configuracao.

### Impacto UI/UX

**Nao.** Import maps sao apenas mecanismo de resolucao de modulos. O Vite ja resolve React/ReactDOM via node_modules.

### Pre-requisitos

- Tarefas 1.1, 1.2 e 1.3 concluidas (todas as CDNs removidas).
- `npm run dev` funciona.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `index.html` | Alterar | Remover bloco importmap |

### Passos

1. Em index.html, remover o bloco:
   ```html
   <script type="importmap">
   {
     "imports": {
       "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
       "react/": "https://aistudiocdn.com/react@^19.2.0/",
       "react": "https://aistudiocdn.com/react@^19.2.0"
     }
   }
   </script>
   ```
2. Verificar que React e ReactDOM ja estao em package.json como dependencies.
3. Executar `npm run dev` e verificar que o app carrega normalmente.
4. Executar `npm test` e verificar que os 22 testes continuam passando.

### Criterios de aceite

- Bloco importmap removido do index.html.
- `npm run dev` funciona sem erro.
- React carrega via Vite/node_modules (verificar no Network tab do browser).
- `npm test` passa.

### Como validar

```bash
npm run dev
# Abrir browser -> Network tab -> verificar que react vem de node_modules

npm test

grep -c "importmap" index.html  # Deve retornar 0
grep -c "aistudiocdn" index.html  # Deve retornar 0
```

### Riscos

- Baixo. O Vite resolve imports de node_modules automaticamente.
- Se algum import em componentes usar caminhos relativos ao import map, pode quebrar (verificar).

### O que NAO alterar

- Nao alterar imports em componentes React.
- Nao alterar package.json.

### Reversibilidade

Restaurar o bloco importmap no index.html. Simples.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Tarefa: Remover import maps do index.html no projeto /mnt/c/Dev/markdown-para-pdf.

Passos:
1. Em index.html: remover o bloco <script type="importmap">...</script> inteiro.
2. Verificar que React e ReactDOM estao em package.json (deve estar).
3. npm run dev -> app carrega sem erro.
4. npm test -> 22 testes passando.
5. Verificar: grep -c "aistudiocdn" index.html deve retornar 0.

NAO alterar: imports nos componentes, package.json.
```

---

## Tarefa 1.5 — Habilitar strict mode no tsconfig.json

### Objetivo

Adicionar `"strict": true` no tsconfig.json. Esta tarefa APENAS habilita o flag — os erros serao corrigidos na tarefa 1.6.

### Tipo da tarefa

configuracao.

### Impacto UI/UX

**Nao.** Configuracao de compilador nao afeta renderizacao.

### Pre-requisitos

- Tarefas 1.1 a 1.4 concluidas (todas as migracoes feitas).
- `npm run build` funciona.
- `npm test` passa.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `tsconfig.json` | Alterar | Adicionar "strict": true em compilerOptions |

### Passos

1. Em tsconfig.json, adicionar `"strict": true` dentro de `compilerOptions`.
2. Executar `npx tsc --noEmit` para listar todos os erros.
3. Salvar a saida dos erros para referencia na tarefa 1.6.
4. NAO corrigir os erros nesta tarefa — apenas registrar.

### Criterios de aceite

- `"strict": true` presente em tsconfig.json.
- `npx tsc --noEmit` executa (pode ter erros — esperado).
- Erros registrados para a proxima tarefa.

### Como validar

```bash
npx tsc --noEmit
# Deve executar (mesmo com erros)
# Registrar saida para tarefa 1.6
```

### Riscos

- Pode revelar dezenas de erros de tipo. Isso e esperado e sera resolvido na tarefa 1.6.

### O que NAO alterar

- Nao alterar outras configuracoes do tsconfig.
- Nao corrigir erros de tipo (deixar para tarefa 1.6).

### Reversibilidade

Remover `"strict": true` do tsconfig.json.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Tarefa: Habilitar strict mode no tsconfig.json do projeto /mnt/c/Dev/markdown-para-pdf.

Passos:
1. Em tsconfig.json, adicionar "strict": true dentro de compilerOptions.
2. Executar "npx tsc --noEmit" e registrar TODOS os erros encontrados.
3. NAO corrigir os erros — apenas listar.
4. Retornar a lista completa de erros.

NAO corrigir erros de tipo. NAO alterar outras configs do tsconfig.
```

---

## Tarefa 1.6 — Corrigir erros de tipo do strict mode

### Objetivo

Corrigir todos os erros de tipo revelados pelo strict mode na tarefa 1.5, garantindo que `npx tsc --noEmit` passe sem erros.

### Tipo da tarefa

logica de negocio + validacao.

### Impacto UI/UX

**Nao.** Correcoes de tipo nao alteram renderizacao visual.

### Pre-requisitos

- Tarefa 1.5 concluida (strict mode habilitado).
- Lista de erros disponivel.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `App.tsx` | Alterar | Provavel — muitas linhas, logica complexa |
| `components/A4DocPreview.tsx` | Alterar | Provavel — 757 linhas |
| `components/Toolbar.tsx` | Alterar | Possivel |
| `components/SettingsPanel.tsx` | Alterar | Possivel |
| `components/CoverPage.tsx` | Alterar | Possivel |
| `types.ts` | Alterar | Possivel — definicoes de tipo |
| `styles.ts` | Alterar | Possivel |
| `templates.ts` | Alterar | Possivel |
| `utils/heuristics.ts` | Alterar | Possivel |

**Nota:** Os arquivos exatos dependem dos erros encontrados na tarefa 1.5.

### Passos

1. Executar `npx tsc --noEmit` para obter a lista atualizada de erros.
2. Corrigir os erros um a um, priorizando:
   - Erros em types.ts (definicoes de tipo).
   - Erros em componentes menores.
   - Erros em App.tsx e A4DocPreview.tsx (maiores).
3. Para cada correcao, verificar que nao altera comportamento.
4. Executar `npx tsc --noEmit` apos cada batch de correcoes.
5. Quando 0 erros, executar `npm run build` e `npm test`.

### Criterios de aceite

- `npx tsc --noEmit` passa com 0 erros.
- `npm run build` gera dist/ sem erro.
- `npm test` passa (22 testes).
- `npm run dev` funciona normalmente.

### Como validar

```bash
npx tsc --noEmit  # 0 erros
npm run build      # OK
npm test           # 22 passando
npm run dev        # app funciona
```

### Riscos

- Correcoes podem alterar comportamento se nao cuidadosas. Usar type assertions (`as Type`) apenas quando necessario.
- Algumas correcoes podem revelar bugs latentes.

### O que NAO alterar

- Nao alterar logica de negocio.
- Nao alterar comportamento visual.
- Nao alterar templates.ts (a menos que o erro de tipo seja la).

### Reversibilidade

As correcoes de tipo geralmente sao aditivas (adicionar tipos, assertions). Reverter removendo as anotacoes adicionadas.

### Modelo recomendado

**modelo intermediário recomendado** — pode envolver muitos arquivos e decisoes de tipo que afetam comportamento.

### Prompt de execução para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Tarefa: Corrigir todos os erros de tipo do strict mode no projeto /mnt/c/Dev/markdown-para-pdf.

Passos:
1. Executar "npx tsc --noEmit" e listar todos os erros.
2. Corrigir cada erro, priorizando: types.ts, componentes menores, App.tsx, A4DocPreview.tsx.
3. Para cada correcao, garantir que o comportamento nao muda.
4. Repetir ate "npx tsc --noEmit" retornar 0 erros.
5. Executar "npm run build" -> OK.
6. Executar "npm test" -> 22 testes passando.
7. Executar "npm run dev" -> app funciona normalmente.

NAO alterar logica de negocio. NAO alterar comportamento visual.
Use type assertions (as Type) apenas quando necessario, nao como atalho.
```

---

## Tarefa 1.7 — Validacao final da Sprint 1

### Objetivo

Validar que toda a sprint foi concluida com sucesso: nenhuma CDN no index.html, strict mode ativo, build OK, testes OK, app funciona.

### Tipo da tarefa

validacao.

### Impacto UI/UX

**Indireto.** Validacao visual do app apos todas as migracoes.

- Deve ler `/docs/design/UI_UX_GUIDE.md` para verificar consistencia visual.
- Deve validar mobile e desktop.
- Deve comparar com o estado anterior a sprint.

### Pre-requisitos

- Tarefas 1.1 a 1.6 concluidas.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `index.html` | Verificar | Nenhuma CDN ou import map |
| `tsconfig.json` | Verificar | strict: true presente |
| `App.tsx` | Verificar | Sem declare const |
| `docs/agent/CURRENT_STATE.md` | Atualizar | Estado apos Sprint 1 |
| `docs/agent/HANDOFF.md` | Atualizar | Continuidade |
| `docs/evolution/CHANGELOG.md` | Atualizar | Registro de mudancas |

### Passos

1. Executar todos os comandos de validacao:
   ```bash
   npx tsc --noEmit          # 0 erros
   npm run build              # OK
   npm test                   # 22 testes
   npm run dev                # App funciona
   ```
2. Verificar ausencia de CDNs:
   ```bash
   grep -c "cdn\." index.html           # 0
   grep -c "aistudiocdn" index.html     # 0
   grep -c "importmap" index.html       # 0
   grep -c "cdnjs" index.html           # 0
   ```
3. Verificar strict mode:
   ```bash
   grep "strict" tsconfig.json          # Deve conter "strict": true
   ```
4. Verificar que App.tsx nao tem declare const:
   ```bash
   grep -c "declare const" App.tsx      # 0
   ```
5. Validacao visual: abrir app no browser, verificar que preview renderiza, que PDF exporta, que layout esta correto.
6. Validacao mobile: testar em viewport 320px.
7. Verificar console sem erros.
8. Atualizar CURRENT_STATE.md e HANDOFF.md.
9. Adicionar entrada no CHANGELOG.md.

### Criterios de aceite

- Todos os comandos de validacao passam.
- Nenhuma CDN no index.html.
- strict mode ativo.
- App funciona visualmente.
- Mobile funciona.
- Console sem erros.
- Arquivos de continuidade atualizados.

### Como validar

Ver lista de comandos acima.

### Riscos

- Pode encontrar problemas residuais que precisam de correcao antes de fechar a sprint.

### O que NAO alterar

- Nao implementar funcionalidades.
- Nao alterar escopo.

### Reversibilidade

N/A — e apenas validacao.

### Modelo recomendado

modelo econômico suficiente

### Prompt de execução para o coder

```
Execute SOMENTE esta tarefa — validacao final da Sprint 1.

Projeto: /mnt/c/Dev/markdown-para-pdf

Passos:
1. npx tsc --noEmit -> 0 erros
2. npm run build -> OK
3. npm test -> 22 testes
4. npm run dev -> abrir browser, verificar preview, exportar PDF, testar mobile (320px)
5. grep -c "cdn\." index.html -> 0
6. grep -c "aistudiocdn" index.html -> 0
7. grep -c "importmap" index.html -> 0
8. grep -c "declare const" App.tsx -> 0
9. grep "strict" tsconfig.json -> contem "strict": true
10. Verificar console do browser sem erros.

Se algum teste falhar, corrigir antes de reportar sucesso.

Reportar: resultado de cada validacao, arquivos alterados, surpresas encontradas.
```

---

# Ordem recomendada de execucao

```
Tarefa 1.1  Migrar jspdf              (independente)
Tarefa 1.2  Migrar html2canvas        (independente, pode ser paralela com 1.1)
Tarefa 1.3  Migrar Tailwind           (independente, RISCO ALTO — validar visual antes de prosseguir)
Tarefa 1.4  Limpar import maps        (depende de 1.1 e 1.2)
Tarefa 1.5  Habilitar strict mode     (depende de 1.1-1.4)
Tarefa 1.6  Corrigir erros de tipo    (depende de 1.5)
Tarefa 1.7  Validacao final           (depende de 1.1-1.6)
```

**Checkpoints:**
- Apos Tarefa 1.1: commit "feat: migrar jspdf para npm"
- Apos Tarefa 1.2: commit "feat: migrar html2canvas para npm"
- Apos Tarefa 1.3: commit "feat: migrar Tailwind para npm" — VALIDAR VISUAL ANTES DE COMMITAR
- Apos Tarefa 1.4: commit "chore: remover import maps do index.html"
- Apos Tarefa 1.6: commit "chore: habilitar strict mode e corrigir erros de tipo"
- Apos Tarefa 1.7: commit "docs: atualizar continuidade apos Sprint 1"

**Tarefas que podem ser paralelas:** 1.1 e 1.2 (jspdf e html2canvas sao independentes).

**Tarefa que exige revisao antes de continuar:** 1.3 (Tailwind) — se o visual quebrar, deve ser resolvido antes de prosseguir.

**Auditoria UI/UX:** Obrigatoria apos Tarefa 1.3 e na Tarefa 1.7.

---

# Checklist final da sprint

- [ ] `npx tsc --noEmit` passa com 0 erros
- [ ] `npm run build` gera dist/ sem erro
- [ ] `npm test` passa (22+ testes)
- [ ] `npm run dev` funciona sem erro no console
- [ ] Nenhuma CDN no index.html (grep cdn. = 0)
- [ ] Nenhum import map no index.html (grep importmap = 0)
- [ ] Nenhum aistudiocdn no index.html (grep aistudiocdn = 0)
- [ ] Nenhum declare const em App.tsx (grep declare const = 0)
- [ ] strict: true no tsconfig.json
- [ ] Preview renderiza Markdown corretamente
- [ ] PDF exporta com sucesso
- [ ] Visual correto (Tailwind funciona)
- [ ] Mobile funciona (320px)
- [ ] Responsividade validada
- [ ] Regressoes verificadas
- [ ] Arquivos alterados revisados
- [ ] Escopo conferido contra sprint original
- [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] UI/UX Gate preenchido para tarefas com impacto visual
- [ ] `/docs/design/UI_UX_GUIDE.md` seguido na tarefa 1.3 e 1.7
- [ ] CURRENT_STATE.md atualizado
- [ ] HANDOFF.md atualizado
- [ ] CHANGELOG.md atualizado

---

# Tarefas que NAO devem ir para modelo economico

| Tarefa | Motivo |
|---|---|
| Tarefa 1.3 — Migrar Tailwind | Risco alto de quebrar todo o CSS. Requer comparacao visual cuidadosa. Modelo intermediario recomendado. |
| Tarefa 1.6 — Corrigir erros de tipo | Pode envolver muitos arquivos e decisoes de tipo que afetam comportamento. Modelo intermediario recomendado. |

As demais tarefas (1.1, 1.2, 1.4, 1.5, 1.7) sao mecanicas e seguras para modelo economico.
