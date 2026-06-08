# Sprint quebrada em tarefas menores

## Sprint de origem

- **Nome:** Sprint 2 — Sanitizacao e Nome do PDF
- **Objetivo:** Implementar sanitizacao de HTML com DOMPurify, corrigir o nome do arquivo PDF conforme PRD secao 7.10, implementar validacao de tamanho de importacao (8MB) e confirmacao antes de substituir conteudo.
- **Arquivo de origem:** `/docs/implementation/SPRINT_02_SANITIZACAO_NOME.md`
- **Resumo do escopo:** 5 tarefas — DOMPurify, sanitizacao HTML, nome do PDF, validacao 8MB, confirmacao de substituicao.

---

## Analise da Sprint

### Objetivo da sprint

Tornar o app seguro contra XSS via HTML no Markdown, gerar PDFs com nomes descritivos, proteger contra importacao de arquivos grandes e evitar perda acidental de conteudo.

### Impacto UI/UX da sprint

**Classificacao: Sim**

A sprint impacta UI/UX diretamente em dois pontos:

1. **Modal de confirmacao** (tarefa 2.5) — componente visual novo com titulo, descricao, botoes de acao.
2. **Mensagem de erro de importacao** (tarefa 2.4) — feedback visual ao usuario quando arquivo excede 8MB.
3. **Sanitizacao HTML** (tarefa 2.2) — impacto indireto na renderizacao do preview.

Tarefas com impacto visual devem seguir `/docs/design/UI_UX_GUIDE.md`.

### Escopo identificado

1. Instalar DOMPurify via npm.
2. Implementar sanitizacao de HTML no A4DocPreview.tsx (whitelist de tags/atributos).
3. Corrigir nome do PDF conforme sequencia de sanitizacao do PRD secao 7.10.
4. Implementar validacao de tamanho de importacao (8MB).
5. Implementar confirmacao antes de substituir conteudo (modal).

### Fora do escopo

- Nao alterar parser Markdown alem do necessario para sanitizacao.
- Nao alterar templates, presets ou temas.
- Nao alterar layout ou responsividade.
- Nao alterar logica de paginacao.
- Nao implementar funcionalidades novas.
- Nao alterar logica de exportacao alem do nome do arquivo.

### Dependencias entre partes

- Tarefa 2.1 (instalar DOMPurify) deve vir antes de 2.2 (implementar sanitizacao).
- Tarefa 2.3 (nome do PDF) e independente das outras.
- Tarefa 2.4 (validacao 8MB) e independente das outras.
- Tarefa 2.5 (confirmacao) e independente das outras, mas usa componente visual.
- Tarefas 2.3, 2.4 e 2.5 podem ser executadas em qualquer ordem apos 2.2.

### Riscos principais

| Risco | Severidade | Area |
|---|---|---|
| Whitelist do DOMPurify pode ser muito restritiva e remover HTML legitimo | MEDIA | Engenharia |
| Sequencia de sanitizacao do nome pode ter edge cases (emoji, caracteres especiais) | BAIXA | Engenharia |
| Modal de confirmacao pode nao seguir UI/UX Guide | MEDIA | UI/UX |
| Validacao 8MB pode ter edge cases com arquivos sem extensao | BAIXA | Engenharia |

### Estrategia de quebra

A sprint sera dividida em 5 tarefas:

1. Instalar DOMPurify (configuracao, isolado).
2. Implementar sanitizacao (logica de negocio, depende de 2.1).
3. Corrigir nome do PDF (logica de negocio, isolado).
4. Validacao de importacao 8MB (logica de negocio + UI, isolado).
5. Confirmacao antes de substituir (UI/componente, isolado).

Cada tarefa gera um diff pequeno e revisavel. A tarefa 2.5 (modal) e a que mais impacta UI/UX.

---

# Tarefas da Sprint

## Tarefa 2.1 — Instalar DOMPurify

### Objetivo

Instalar DOMPurify e seus tipos via npm. Nenhuma alteracao de codigo — apenas dependencia.

### Tipo da tarefa

configuracao.

### Impacto UI/UX

**Nao.** Apenas instalacao de pacote. Nenhum codigo alterado.

### Pre-requisitos

- Sprint 1 concluida (npm funciona, sem CDNs).
- `npm run build` funciona.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `package.json` | Alterar | Adicionar dompurify e @types/dompurify |

### Passos

1. Executar `npm install dompurify`.
2. Executar `npm install -D @types/dompurify`.
3. Verificar que `npm ls dompurify` mostra a versao instalada.
4. Executar `npm run build` para garantir que nao quebrou nada.

### Criterios de aceite

- `npm ls dompurify` mostra pacote instalado.
- `npm ls @types/dompurify` mostra tipos instalados.
- `npm run build` funciona.
- `npm test` passa.

### Como validar

```bash
npm ls dompurify
npm ls @types/dompurify
npm run build
npm test
```

### Riscos

- Baixo. Instalacao de pacote sem alteracao de codigo.

### O que NAO alterar

- Nao alterar nenhum arquivo de codigo.
- Nao alterar configuracoes.

### Reversibilidade

`npm uninstall dompurify @types/dompurify`.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Tarefa: Instalar DOMPurify no projeto /mnt/c/Dev/markdown-para-pdf.

Passos:
1. npm install dompurify
2. npm install -D @types/dompurify
3. npm ls dompurify -> verificar instalado
4. npm run build -> OK
5. npm test -> OK

NAO alterar nenhum arquivo de codigo. Apenas instalar o pacote.
```

---

## Tarefa 2.2 — Implementar sanitizacao de HTML com DOMPurify

### Objetivo

Importar DOMPurify em A4DocPreview.tsx e aplicar `DOMPurify.sanitize()` em todo HTML gerado por `marked.parse()`, antes de inserir via `dangerouslySetInnerHTML`.

### Tipo da tarefa

logica de negocio.

### Impacto UI/UX

**Indireto.** A sanitizacao afeta a renderizacao de HTML no preview. HTML legitimo deve continuar renderizando corretamente. HTML malicioso (script, iframe, onclick) deve ser removido.

- Deve ler `/docs/design/UI_UX_GUIDE.md` para verificar que o preview mantem consistencia visual.
- Deve validar que tags legitimas (strong, em, a, table, etc.) ainda renderizam.
- Deve validar mobile e desktop.

### Pre-requisitos

- Tarefa 2.1 concluida (DOMPurify instalado).
- `npm run build` funciona.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `components/A4DocPreview.tsx` | Alterar | Importar DOMPurify e aplicar sanitize apos marked.parse (linha 99) |

**Nota:** O arquivo tem 754 linhas. `marked.parse(section)` esta na linha 99. `dangerouslySetInnerHTML` esta nas linhas 704 e 726. A sanitizacao deve ser aplicada no resultado de `marked.parse` antes de ser usado no dangerouslySetInnerHTML.

### Passos

1. Em A4DocPreview.tsx, adicionar `import DOMPurify from 'dompurify';` no topo.
2. Na funcao que chama `marked.parse(section)` (linha ~99), envolver o resultado com `DOMPurify.sanitize()`:
   - Antes: `return marked.parse(section);`
   - Depois: `return DOMPurify.sanitize(marked.parse(section));`
3. Verificar se ha outros pontos onde HTML e inserido via dangerouslySetInnerHTML (linhas 704 e 726) e aplicar sanitizacao se necessario.
4. Configurar whitelist se necessario (tags permitidas: strong, em, br, p, div, span, table, tr, td, th, thead, tbody, ul, ol, li, blockquote, pre, code, h1-h6, a, img; atributos: class, id, href, src, alt, title, colspan, rowspan; bloquear: script, iframe, object, embed, form, input, button, style, link, meta, base, todos os on*).
5. Executar `npm run dev` e testar no browser.

### Criterios de aceite

- `<script>alert('xss')</script>` no editor NAO executa script no preview.
- `<strong>texto</strong>` renderiza como negrito.
- `<a href="...">link</a>` renderiza como link clicavel.
- `<iframe>` e removido do preview.
- `onclick` e removido de tags.
- `<img src="..." alt="...">` renderiza.
- `<table>` renderiza corretamente.
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
npm run dev
# Abrir browser
# Testar: <script>alert('xss')</script> -> nao executa
# Testar: <strong>negrito</strong> -> renderiza
# Testar: <a href="https://example.com">link</a> -> renderiza
# Testar: <iframe src="..."></iframe> -> removido
# Testar: <p onclick="alert('xss')">texto</p> -> onclick removido

npm test
npm run build
```

### Riscos

- **MEDIO:** Whitelist muito restritiva pode remover HTML legitimo (tabelas, imagens, links).
- marked.parse pode retornar HTML com atributos nao previstos na whitelist.

### O que NAO alterar

- Nao alterar a logica do marked.parse (apenas envolver com sanitize).
- Nao alterar templates.ts.
- Nao alterar layout ou CSS.
- Nao alterar logica de paginacao.

### Reversibilidade

Remover `import DOMPurify` e desfazer a chamada `DOMPurify.sanitize()`. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf
Arquivo: components/A4DocPreview.tsx

Passos:
1. Importar DOMPurify no topo: import DOMPurify from 'dompurify';
2. Na linha ~99, onde tem "return marked.parse(section)", trocar para "return DOMPurify.sanitize(marked.parse(section))".
3. Verificar se outras linhas com dangerouslySetInnerHTML (704, 726) tambem precisam de sanitizacao.
4. npm run dev -> testar no browser:
   - <script>alert('xss')</script> -> NAO deve executar
   - <strong>negrito</strong> -> deve renderizar
   - <a href="https://example.com">link</a> -> deve renderizar
   - <iframe></iframe> -> deve ser removido
5. npm test -> OK
6. npm run build -> OK

NAO alterar: templates.ts, layout, CSS, logica de paginacao.
RISCO: se HTML legitimo parar de renderizar, ajustar whitelist.
```

---

## Tarefa 2.3 — Corrigir nome do PDF conforme PRD

### Objetivo

Substituir a logica atual de nome do PDF (linha 299 de App.tsx) pela sequencia de sanitizacao completa definida na secao 7.10 do PRD.

### Tipo da tarefa

logica de negocio.

### Impacto UI/UX

**Nao.** Afeta apenas o nome do arquivo baixado, nao a renderizacao visual. O usuario so ve o nome na janela de download do browser.

### Pre-requisitos

- Sprint 1 concluida.
- `npm run build` funciona.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `App.tsx` | Alterar | Substituir logica de nome do PDF (linhas ~299-300) |

**Nota:** A logica atual (linha 299) e:
```ts
const fileName = `${documentTitle.toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
```
Precisa ser substituida pela sequencia de 8 passos do PRD.

### Passos

1. Criar funcao auxiliar `sanitizePdfName(rawName: string): string` em App.tsx (ou em utils/ se preferir).
2. Implementar a sequencia do PRD secao 7.10:
   - NFD + remover diacríticos
   - minusculas
   - espacos/hifens por `-`
   - remover caracteres que nao sejam letras, numeros ou `-`
   - colapsar multiplos `-`
   - remover `-` inicial/final
   - limitar a 80 chars
   - fallback "documento" se vazio
3. Implementar a prioridade de escolha do nome:
   - Titulo da capa (se capa habilitada e titulo preenchido)
   - Primeiro heading `#` do Markdown
   - Nome do arquivo importado
   - Fallback: primeiros 50 chars do conteudo
4. Substituir a linha 299 de App.tsx pela chamada a nova funcao.
5. Testar com varios titulos.

### Criterios de aceite

- "Relatorio Trimestral Q2" -> `relatorio-trimestral-q2.pdf`
- "Ções e Ações" -> `coes-e-acoes.pdf`
- Titulo vazio com heading "# Meu Documento" -> `meu-documento.pdf`
- Sem titulo nem heading, arquivo importado "notas reuniao.txt" -> `notas-reuniao.pdf`
- Tudo vazio -> `documento.pdf`
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
npm run dev
# Testar exportacao com diferentes titulos
# Verificar nomes dos arquivos baixados

npm test
npm run build
```

### Riscos

- BAIXO: Edge cases com caracteres especiais, emoji, nomes muito curtos.
- A prioridade de fallback precisa ser testada com cada cenario.

### O que NAO alterar

- Nao alterar logica de geracao do PDF (apenas o nome).
- Nao alterar templates.ts.
- Nao alterar layout ou CSS.

### Reversibilidade

Restaurar a linha original de App.tsx. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf
Arquivo: App.tsx (linha ~299)

Contexto: O PRD v1.1 secao 7.10 define a sequencia de sanitizacao do nome do PDF.
Leia a secao 7.10 do PRD em docs/product/PRD_v1.1.md (linhas 552-601).

Passos:
1. Criar funcao sanitizePdfName(rawName: string): string com a sequencia de 8 passos do PRD.
2. Implementar prioridade: titulo da capa > primeiro heading # > nome do arquivo importado > fallback 50 chars.
3. Substituir a logica atual da linha ~299 de App.tsx.
4. Testar:
   - "Relatorio Trimestral Q2" -> relatorio-trimestral-q2.pdf
   - "Ções e Ações" -> coes-e-acoes.pdf
   - Titulo vazio + heading "# Meu Documento" -> meo-documento.pdf
   - Tudo vazio -> documento.pdf
5. npm test -> OK
6. npm run build -> OK

NAO alterar: logica de geracao do PDF, templates.ts, layout.
```

---

## Tarefa 2.4 — Validacao de tamanho de importacao (8MB)

### Objetivo

Antes de ler o arquivo importado, verificar `file.size`. Se exceder 8MB, mostrar mensagem de erro e nao importar.

### Tipo da tarefa

logica de negocio + UI/componente.

### Impacto UI/UX

**Sim.** Esta tarefa introduz uma mensagem de erro visual quando o usuario tenta importar arquivo grande.

- Deve ler `/docs/design/UI_UX_GUIDE.md` antes de executar.
- A mensagem de erro deve ser clara, objetiva e seguir o padrao de microcopy do guia.
- Deve validar mobile e desktop.
- Deve evitar aparencia generica de IA.

### Pre-requisitos

- Sprint 1 concluida.
- Leitura de `/docs/design/UI_UX_GUIDE.md`.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `App.tsx` | Alterar | Adicionar validacao de tamanho antes de importar (linha ~157) |

**Nota:** O handleImportFile esta na linha 102 de App.tsx. A leitura do arquivo esta na linha ~157. A validacao deve ser feita antes de ler o arquivo, quando `file.size` esta disponivel.

### Passos

1. Em App.tsx, antes de ler o arquivo (linha ~157), adicionar verificacao de tamanho:
   - Se `file.size > 8 * 1024 * 1024`, mostrar erro e retornar.
2. Usar o mecanismo de notificacao existente (`importNotification`) ou criar estado de erro adequado.
3. Mensagem de erro sugerida: "Arquivo muito grande. O limite e 8MB." (seguir microcopy do UI/UX Guide — direta, operacional, sem marketing).
4. Garantir que a mensagem aparece proxima ao contexto (botao de importar).
5. Garantir que a mensagem some apos alguns segundos ou apos nova acao.

### Criterios de aceite

- Arquivo > 8MB e rejeitado com mensagem de erro visivel.
- Arquivo <= 8MB e importado normalmente.
- Mensagem de erro e clara e objetiva (nao generica).
- Mensagem some apos alguns segundos.
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
npm run dev
# Criar arquivo de teste > 8MB: dd if=/dev/zero of=teste-grande.md bs=1M count=9
# Importar -> verificar mensagem de erro
# Importar arquivo pequeno -> verificar que funciona

npm test
npm run build
```

### Riscos

- BAIXO: Edge case com arquivos sem extensao ou very small files.

### O que NAO alterar

- Nao alterar logica de importacao existente (apenas adicionar guard).
- Nao alterar templates.ts.
- Nao alterar layout.

### Reversibilidade

Remover a verificacao de tamanho. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf
Arquivo: App.tsx

ANTES DE COMECAR: Ler /docs/design/UI_UX_GUIDE.md (secoes 5.2, 6.3, 8).

Contexto: Decisao PD-03 define limite de 8MB para importacao.
O handleImportFile esta na linha 102. A leitura do arquivo esta por volta da linha 157.
Ja existe um estado importNotification (linha 94) que pode ser reutilizado.

Passos:
1. Antes de ler o arquivo (linha ~157), adicionar: if (file.size > 8 * 1024 * 1024) { setImportNotification('Arquivo muito grande. O limite e 8MB.'); return; }
2. Garantir que a mensagem some apos alguns segundos (usar setTimeout se necessario).
3. Mensagem deve ser direta e operacional (UI/UX Guide secao 8).
4. npm run dev -> testar com arquivo > 8MB -> verificar mensagem.
5. npm run dev -> testar com arquivo pequeno -> verificar que importa normalmente.
6. npm test -> OK
7. npm run build -> OK

NAO alterar: logica de importacao, templates.ts, layout.
UI/UX: mensagem de erro deve seguir microcopy do guia (direta, sem marketing).
```

---

## Tarefa 2.5 — Confirmacao antes de substituir conteudo

### Objetivo

Antes de trocar template ou importar arquivo, se houver conteudo no editor, mostrar modal de confirmacao. Se o usuario cancelar, manter conteudo atual.

### Tipo da tarefa

UI/componente + logica de negocio.

### Impacto UI/UX

**Sim.** Esta tarefa cria um modal de confirmacao — componente visual novo.

- Deve ler `/docs/design/UI_UX_GUIDE.md` antes de executar.
- O modal deve seguir as regras de modais do guia (secao 5.5): titulo direto, descricao curta, acao principal clara, cancelar disponivel.
- Deve validar mobile e desktop.
- Deve evitar aparencia generica de IA.
- Deve prever estados: modal aberto, confirmar, cancelar.

### Pre-requisitos

- Sprint 1 concluida.
- Leitura de `/docs/design/UI_UX_GUIDE.md`.
- `npm run build` funciona.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `App.tsx` | Alterar | Adicionar estado do modal, logica de interceptacao, renderizacao do modal |

**Nota:** Precisa identificar onde o template e trocado e onde o arquivo e importado para interceptar com o modal. O handleImportFile (linha 102) e um ponto. A troca de template provavelmente e outro.

### Passos

1. Ler `/docs/design/UI_UX_GUIDE.md` secoes 5.5 (Modais) e 3 (Principios de UX).
2. Adicionar estado `showConfirmModal` em App.tsx.
3. Adicionar estado `pendingAction` para armazenar a acao que sera executada apos confirmacao.
4. Interceptar a troca de template: se houver conteudo no editor, mostrar modal em vez de trocar direto.
5. Interceptar a importacao de arquivo: se houver conteudo no editor, mostrar modal em vez de importar direto.
6. No modal:
   - Titulo: "Substituir conteudo?"
   - Descricao: "O conteudo atual sera perdido. Deseja continuar?"
   - Botao primario: "Substituir" (confirma)
   - Botao secundario: "Cancelar" (fecha modal, mantem conteudo)
7. Se confirmar, executar a acao pendente.
8. Se cancelar, limpar acao pendente e manter conteudo.
9. O modal deve funcionar em mobile (caber na tela, botoes acessiveis).

### Criterios de aceite

- Trocar template com conteudo no editor -> modal aparece.
- Cancelar modal -> conteudo mantido, template nao trocado.
- Confirmar modal -> conteudo substituido pelo novo template.
- Importar arquivo com conteudo no editor -> modal aparece.
- Cancelar modal na importacao -> conteudo mantido.
- Confirmar modal na importacao -> arquivo importado.
- Sem conteudo no editor -> acao acontece sem modal.
- Modal funciona em mobile (320px).
- Modal funciona em desktop.
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
npm run dev
# 1. Digitar algo no editor
# 2. Selecionar outro template -> modal deve aparecer
# 3. Clicar Cancelar -> conteudo mantido
# 4. Selecionar outro template -> modal -> Confirmar -> conteudo substituido
# 5. Importar arquivo com conteudo -> modal
# 6. Testar em mobile (320px)

npm test
npm run build
```

### Riscos

- **MEDIO:** Identificar todos os pontos onde o conteudo e substituido pode ser complexo.
- O modal pode nao seguir o UI/UX Guide se nao for cuidadoso.
- Mobile: modal deve caber na tela.

### O que NAO alterar

- Nao alterar templates.ts.
- Nao alterar logica de exportacao.
- Nao alterar layout existente (apenas adicionar modal).
- Nao alterar logica de paginacao.

### Reversibilidade

Remover estados, interceptacoes e renderizacao do modal. Diff moderado mas facil de identificar.

### Modelo recomendado

**modelo intermediario recomendado** — envolve componente visual novo (modal) que deve seguir UI/UX Guide.

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf

ANTES DE COMECAR: Ler /docs/design/UI_UX_GUIDE.md (secoes 3, 5.5, 6, 8).

Contexto: Decisao PD-04 confirma que deve haver confirmacao antes de substituir conteudo.
O App.tsx tem handleImportFile (linha 102) e provavelmente um handler de troca de template.
O estado importNotification (linha 94) ja existe para feedback.

Passos:
1. Identificar onde o template e trocado e onde o arquivo e importado.
2. Adicionar estado showConfirmModal e pendingAction.
3. Interceptar: se editor tem conteudo E acao e trocar template ou importar -> mostrar modal.
4. Modal:
   - Titulo: "Substituir conteudo?"
   - Descricao: "O conteudo atual sera perdido. Deseja continuar?"
   - Botao primario: "Substituir"
   - Botao secundario: "Cancelar"
5. Confirmar -> executar acao pendente. Cancelar -> manter conteudo.
6. Sem conteudo no editor -> acao direta, sem modal.
7. Testar em mobile (320px) e desktop.
8. npm test -> OK
9. npm run build -> OK

NAO alterar: templates.ts, logica de exportacao, layout existente.
UI/UX: modal deve seguir secao 5.5 do UI/UX Guide (titulo direto, descricao curta, acoes claras).
```

---

# Ordem recomendada de execucao

```
Tarefa 2.1  Instalar DOMPurify         (independente)
Tarefa 2.2  Implementar sanitizacao    (depende de 2.1)
Tarefa 2.3  Corrigir nome do PDF       (independente, pode ser paralela com 2.2)
Tarefa 2.4  Validacao 8MB              (independente, pode ser paralela com 2.2 e 2.3)
Tarefa 2.5  Confirmacao de substituicao (independente, pode ser paralela com 2.2, 2.3 e 2.4)
```

**Checkpoints:**
- Apos Tarefa 2.1: commit "chore: instalar DOMPurify"
- Apos Tarefa 2.2: commit "feat: sanitizacao HTML com DOMPurify" — VALIDAR XSS ANTES DE COMMITAR
- Apos Tarefa 2.3: commit "feat: nome do PDF descritivo conforme PRD"
- Apos Tarefa 2.4: commit "feat: validacao de importacao 8MB"
- Apos Tarefa 2.5: commit "feat: confirmacao antes de substituir conteudo"

**Tarefas que podem ser paralelas:** 2.3, 2.4 e 2.5 sao independentes entre si e de 2.2.

**Tarefa que exige revisao antes de continuar:** 2.2 (sanitizacao) — se HTML legitimo parar de renderizar, deve ser resolvido antes de prosseguir.

**Tarefa que exige leitura de UI/UX Guide:** 2.5 (modal de confirmacao) — obrigatorio.

**Auditoria UI/UX:** Obrigatoria apos Tarefa 2.5.

---

# Checklist final da sprint

- [ ] `npx tsc --noEmit` passa com 0 erros
- [ ] `npm run build` gera dist/ sem erro
- [ ] `npm test` passa
- [ ] `npm run dev` funciona sem erro no console
- [ ] XSS bloqueado: `<script>alert('xss')</script>` nao executa
- [ ] HTML legitimo renderiza: strong, em, a, table, img
- [ ] Nome do PDF segue sequencia de sanitizacao do PRD 7.10
- [ ] Arquivo > 8MB e rejeitado com mensagem de erro
- [ ] Confirmacao aparece antes de substituir conteudo
- [ ] Cancelar confirmacao mantem conteudo
- [ ] Modal funciona em mobile (320px)
- [ ] Modal funciona em desktop
- [ ] Responsividade validada
- [ ] Regressoes verificadas
- [ ] Arquivos alterados revisados
- [ ] Escopo conferido contra sprint original
- [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] UI/UX Gate preenchido para tarefas com impacto visual
- [ ] `/docs/design/UI_UX_GUIDE.md` seguido nas tarefas 2.4 e 2.5

---

# Tarefas que NAO devem ir para modelo economico

| Tarefa | Motivo |
|---|---|
| Tarefa 2.5 — Confirmacao antes de substituir | Componente visual novo (modal) que deve seguir UI/UX Guide. Envolve interceptacao em multiplos pontos. Modelo intermediario recomendado. |

As demais tarefas (2.1, 2.2, 2.3, 2.4) sao mecanicas e seguras para modelo economico.
