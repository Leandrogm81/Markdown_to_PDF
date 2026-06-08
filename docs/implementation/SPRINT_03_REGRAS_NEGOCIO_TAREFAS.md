# Sprint quebrada em tarefas menores

## Sprint de origem

- **Nome:** Sprint 3 — Regras de Negocio
- **Objetivo:** Corrigir `---` dentro de code blocks (nao deve criar quebra de pagina), implementar preview vazio com mensagem orientativa, implementar numeracao de pagina correta (capa nao contada) e definir encoding de importacao.
- **Arquivo de origem:** `/docs/implementation/SPRINT_03_REGRAS_NEGOCIO.md`
- **Resumo do escopo:** 4 tarefas — code blocks, preview vazio, numeracao de pagina, encoding.

---

## Analise da Sprint

### Objetivo da sprint

Corrigir comportamentos de regra de negocio que afetam a experiencia do usuario: paginacao correta, preview util quando vazio, numeracao de paginas e importacao robusta.

### Impacto UI/UX da sprint

**Classificacao: Sim**

A sprint impacta UI/UX diretamente em dois pontos:

1. **Preview vazio** (tarefa 3.2) — componente visual novo com mensagem orientativa.
2. **Numeracao de pagina** (tarefa 3.3) — componente visual no rodapé de cada pagina.
3. **`---` em code blocks** (tarefa 3.1) — impacto indireto na paginacao visual.

Tarefas com impacto visual devem seguir `/docs/design/UI_UX_GUIDE.md`.

### Escopo identificado

1. Corrigir `---` dentro de code blocks (nao criar quebra de pagina).
2. Implementar preview vazio com mensagem orientativa.
3. Implementar numeracao de pagina correta (capa nao contada, centro do rodape).
4. Definir encoding de importacao (UTF-8 BOM, fallback Latin-1).

### Fora do escopo

- Nao alterar templates, presets ou temas.
- Nao alterar logica de sanitizacao.
- Nao alterar nome do PDF.
- Nao alterar responsividade.
- Nao alterar logica de exportacao de PDF.

### Dependencias entre partes

- Tarefas 3.1, 3.2, 3.3 e 3.4 sao independentes entre si.
- Todas dependem de Sprint 1 concluida (CDNs migradas).
- Tarefa 3.3 pode ter conflito com a tarefa 3.2 se ambas alterarem a mesma area do rodape.

### Riscos principais

| Risco | Severidade | Area |
|---|---|---|
| Detectar `---` em code blocks sem quebrar paginacao normal | MEDIA | Engenharia |
| Numeracao off-by-one quando capa esta habilitada | BAIXA | Engenharia |
| Encoding Latin-1 pode nao cobrir todos os casos | BAIXA | Engenharia |
| Preview vazio pode parecer generico de IA | MEDIA | UI/UX |

### Estrategia de quebra

A sprint sera dividida em 4 tarefas independentes:

1. Corrigir `---` em code blocks (logica de negocio).
2. Preview vazio (UI/componente).
3. Numeracao de pagina (UI/componente).
4. Encoding de importacao (logica de negocio).

Cada tarefa gera um diff pequeno e revisavel.

---

# Tarefas da Sprint

## Tarefa 3.1 — Corrigir `---` em code blocks

### Objetivo

No parser de Markdown (A4DocPreview.tsx), antes de dividir por `---`, verificar se o `---` esta dentro de um bloco de codigo (triple backtick) ou HTML (`<pre>`, `<code>`). Se estiver, NAO criar quebra de pagina.

### Tipo da tarefa

logica de negocio.

### Impacto UI/UX

**Indireto.** Afeta a paginacao do preview. Paginas podem mudar de posicao se `---` em code blocks parar de criar quebras indevidas.

- Deve validar que a paginacao continua correta apos a alteracao.

### Pre-requisitos

- Sprint 1 concluida.
- `npm run build` funciona.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `components/A4DocPreview.tsx` | Alterar | Logica de split na linha ~90 |

**Nota:** A logica atual (linha 90) e:
```ts
const parts = markdownText.split(/(?:\r?\n)+---+(?:\r?\n)+/);
```
Este regex nao distingue `---` dentro de code blocks. A correcao deve filtrar os `---` que estao dentro de blocos de codigo antes de dividir.

### Passos

1. Ler a funcao que divide o markdown por `---` (linhas 84-90 de A4DocPreview.tsx).
2. Antes de aplicar o split, preprocessar o texto para proteger `---` dentro de blocos de codigo:
   - Identificar blocos delimitados por triple backtick.
   - Substituir `---` dentro desses blocos por placeholder temporario.
   - Aplicar o split normal.
   - Restaurar os placeholders.
3. Alternativa: usar uma funcao de split customizada que verifica contexto.
4. Testar com markdown que contenha `---` dentro e fora de code blocks.

### Criterios de aceite

- `---` isolado em linha vazia (fora de code block) → cria quebra de pagina.
- `---` dentro de bloco de codigo (triple backtick) → NAO cria quebra.
- `---` dentro de `<pre>` ou `<code>` → NAO cria quebra.
- Paginacao geral nao e afetada.
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
npm run dev
# Testar markdown com:
# 1. --- isolado -> deve criar quebra
# 2. --- dentro de ```code block``` -> NAO deve criar quebra
# 3. --- dentro de <pre> -> NAO deve criar quebra
# 4. Documento longo com varios --- -> paginacao correta

npm test
npm run build
```

### Riscos

- **MEDIO:** O regex de deteccao pode nao cobrir todos os edge cases (code blocks aninhados, inline code com backticks).
- Expressoes regulares para parsing de Markdown sao inherentemente frageis.

### O que NAO alterar

- Nao alterar a logica de paginacao (apenas o split).
- Nao alterar templates.ts.
- Nao alterar layout ou CSS.

### Reversibilidade

Restaurar o split original na linha 90. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf
Arquivo: components/A4DocPreview.tsx (linhas 84-90)

Contexto: A linha 90 divide o markdown por "---" com regex:
  const parts = markdownText.split(/(?:\r?\n)+---+(?:\r?\n)+/);
Isso nao distingue "---" dentro de code blocks.

Passos:
1. Ler a logica de split (linhas 84-90).
2. Implementar preprocessamento que protege "---" dentro de blocos de codigo (triple backtick).
3. Aplicar o split normal apos protecao.
4. Restaurar placeholders apos split.
5. npm run dev -> testar:
   - "---" isolado -> cria quebra
   - "---" dentro de ```code``` -> NAO cria quebra
   - "---" dentro de <pre> -> NAO cria quebra
6. npm test -> OK
7. npm run build -> OK

NAO alterar: logica de paginacao, templates.ts, layout, CSS.
RISCO: regex pode nao cobrir todos os edge cases. Testar bem.
```

---

## Tarefa 3.2 — Preview vazio com mensagem orientativa

### Objetivo

Quando o editor estiver vazio, o preview deve mostrar uma pagina A4 em branco com texto centralizado e sutil: "Comece a digitar ou selecione um template".

### Tipo da tarefa

UI/componente.

### Impacto UI/UX

**Sim.** Componente visual novo — mensagem de estado vazio no preview.

- Deve ler `/docs/design/UI_UX_GUIDE.md` antes de executar.
- A mensagem deve ser sutil (nao dominar a tela).
- Deve seguir o padrao de empty states do guia (secao 6.1).
- Deve validar mobile e desktop.
- Deve evitar aparencia generica de IA.
- Deve prever: estado vazio, estado com conteudo (mensagem desaparece).

### Pre-requisitos

- Sprint 1 concluida.
- Leitura de `/docs/design/UI_UX_GUIDE.md`.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `components/A4DocPreview.tsx` | Alterar | Adicionar condicional de estado vazio |

**Nota:** Quando o editor esta vazio, `markdownText` e `''`. O `sections` resultante e `['']`. O preview renderiza uma pagina em branco. A logica deve detectar conteudo vazio e mostrar mensagem.

### Passos

1. Ler `/docs/design/UI_UX_GUIDE.md` secoes 6.1 (empty states) e 8 (microcopy).
2. Em A4DocPreview.tsx, antes de renderizar as paginas, verificar se o conteudo e vazio.
3. Se vazio, renderizar uma pagina A4 em branco com mensagem centralizada:
   - Texto: "Comece a digitar ou selecione um template"
   - Estilo: sutil, cor clara (nao dominar a tela), fonte menor.
4. Quando conteudo for digitado, a mensagem desaparece e o preview normal aparece.
5. A mensagem deve estar dentro da estrutura de pagina A4 (para manter proporcao).

### Criterios de aceite

- Editor vazio → preview mostra pagina A4 em branco com mensagem.
- Mensagem e sutil (cor clara, tamanho menor, nao domina a tela).
- Mensagem desaparece quando conteudo e digitado.
- Mensagem funciona em mobile e desktop.
- Mensagem nao parece generica de IA.
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
npm run dev
# 1. Abrir app com editor vazio -> verificar mensagem
# 2. Digitar algo -> mensagem desaparece
# 3. Limpar editor -> mensagem reaparece
# 4. Testar em mobile (320px)
# 5. Testar em desktop

npm test
npm run build
```

### Riscos

- MEDIO: Mensagem pode parecer generica de IA se nao for bem estilizada.

### O que NAO alterar

- Nao alterar logica de paginacao.
- Nao alterar templates.ts.
- Nao alterar layout existente.

### Reversibilidade

Remover o condicional de estado vazio. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf

ANTES DE COMECAR: Ler /docs/design/UI_UX_GUIDE.md (secoes 6.1, 8).

Arquivo: components/A4DocPreview.tsx

Contexto: Quando o editor esta vazio, o preview renderiza uma pagina em branco.
Precisa adicionar uma mensagem de estado vazio.

Passos:
1. Verificar onde o conteudo e renderizado no preview.
2. Adicionar condicional: se conteudo vazio, mostrar pagina A4 com mensagem.
3. Mensagem: "Comece a digitar ou selecione um template"
4. Estilo: sutil, cor clara (text-slate-400 ou similar), tamanho menor, centralizado.
5. Quando conteudo existe -> mensagem desaparece.
6. npm run dev -> testar vazio e com conteudo.
7. Testar mobile (320px) e desktop.
8. npm test -> OK
9. npm run build -> OK

NAO alterar: logica de paginacao, templates.ts, layout existente.
UI/UX: mensagem deve seguir secao 6.1 do UI/UX Guide (empty state util, nao generico).
```

---

## Tarefa 3.3 — Numeracao de pagina correta

### Objetivo

Ajustar a numeracao de pagina para que: (1) capa nao seja contada, (2) numeracao comece em 1 na primeira pagina do corpo, (3) numeracao apareca no centro do rodape.

### Tipo da tarefa

UI/componente + logica de negocio.

### Impacto UI/UX

**Sim.** Componente visual no rodape de cada pagina.

- Deve ler `/docs/design/UI_UX_GUIDE.md` antes de executar.
- A numeracao deve ser discreta e funcional.
- Deve validar mobile e desktop.
- Deve evitar aparencia generica de IA.

### Pre-requisitos

- Sprint 1 concluida.
- Leitura de `/docs/design/UI_UX_GUIDE.md`.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `components/A4DocPreview.tsx` | Alterar | Logica de numeracao (linhas ~505, ~740) |

**Nota:** A logica atual:
- Linha 505: `const totalPages = allPages.length + (coverPage.enabled ? 1 : 0);`
- Linha 740: `Página ${pageIdx} de ${totalPages}` — numeracao inclui capa.
- O footer esta alinhado com `justify-between` (esquerda = texto do rodape, direita = numeracao).

Problemas identificados:
1. `pageIdx` inclui a capa (comeca em 0 ou 1 para capa, 2 para primeira pagina do corpo).
2. `totalPages` inclui a capa.
3. A numeracao esta alinhada a direita, nao ao centro.

### Passos

1. Ler `/docs/design/UI_UX_GUIDE.md` secoes 4.1 (layout) e 5.4 (componentes).
2. Identificar como `pageIdx` e gerado (provavelmente no loop de renderizacao).
3. Ajustar numeracao:
   - Se capa esta habilitada: `pageNumber = pageIdx` (comecando em 1 para a primeira pagina do corpo).
   - Se capa nao esta habilitada: `pageNumber = pageIdx + 1` (comecando em 1).
   - `totalPages` deve excluir a capa.
4. Centralizar a numeracao no rodape (trocar `justify-between` por `justify-center` ou ajustar layout).
5. Testar com capa habilitada e desabilitada.

### Criterios de aceite

- Com capa: numeracao comeca em 1 na primeira pagina do corpo.
- Sem capa: numeracao comeca em 1 na primeira pagina.
- Capa nao e contada no total.
- "Pagina X de Y" aparece no centro do rodape.
- Numeracao funciona em mobile e desktop.
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
npm run dev
# 1. Documento com capa + multiplas paginas -> verificar numeracao
# 2. Documento sem capa -> verificar numeracao
# 3. Verificar que capa nao tem numeracao
# 4. Verificar centralizacao no rodape
# 5. Testar mobile (320px) e desktop

npm test
npm run build
```

### Riscos

- BAIXO: Off-by-one na numeracao com/sem capa.

### O que NAO alterar

- Nao alterar logica de paginacao (apenas numeracao).
- Nao alterar templates.ts.
- Nao alterar layout das paginas.

### Reversibilidade

Restaurar a logica original de numeracao. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf

ANTES DE COMECAR: Ler /docs/design/UI_UX_GUIDE.md (secoes 4.1, 5.4).

Arquivo: components/A4DocPreview.tsx

Contexto: A numeracao atual inclui a capa no total e nao comeca em 1 no corpo.
Linhas relevantes:
- 505: totalPages = allPages.length + (coverPage.enabled ? 1 : 0)
- 740: Página ${pageIdx} de ${totalPages}
- 731-742: footer com justify-between

Problemas:
1. pageIdx inclui capa
2. totalPages inclui capa
3. Numeracao alinhada a direita, nao ao centro

Passos:
1. Identificar como pageIdx e gerado no loop de renderizacao.
2. Ajustar: se capa habilitada, pageNumber = pageIdx (1-based para corpo).
3. Ajustar: totalPages deve excluir capa.
4. Centralizar numeracao no rodape.
5. npm run dev -> testar com e sem capa.
6. npm test -> OK
7. npm run build -> OK

NAO alterar: logica de paginacao, templates.ts, layout das paginas.
```

---

## Tarefa 3.4 — Encoding de importacao

### Objetivo

Definir encoding de importacao: UTF-8 (com ou sem BOM). Se UTF-8 falhar ou tiver caracteres de substituicao (U+FFFD), tentar Latin-1 como fallback. Se ambos falharem, mostrar mensagem de erro.

### Tipo da tarefa

logica de negocio.

### Impacto UI/UX

**Nao.** Afeta apenas a leitura de arquivos importados. O usuario so ve resultado se houver erro de encoding (mensagem de erro).

### Pre-requisitos

- Sprint 1 concluida.
- `npm run build` funciona.

### Arquivos provaveis

| Arquivo | Acao | Observacao |
|---|---|---|
| `App.tsx` | Alterar | Logica de leitura de arquivo (linhas 153-160) |

**Nota:** A logica atual:
```ts
const reader = new FileReader();
// ...
reader.readAsText(file);  // linha 160 — sem encoding especificado
```
`readAsText` sem segundo argumento usa UTF-8 por padrao. Precisa adicionar deteccao de BOM e fallback Latin-1.

### Passos

1. Em App.tsx, na funcao de leitura de arquivo (linhas 153-160):
   - Primeiro, verificar se o arquivo comeca com BOM UTF-8 (bytes 0xEF, 0xBB, 0xBF).
   - Ler como UTF-8: `reader.readAsText(file, 'UTF-8')`.
   - Apos leitura, verificar se o resultado contem U+FFFD (caracter de substituicao).
   - Se contiver U+FFFD, tentar reler como Latin-1: `reader.readAsText(file, 'ISO-8859-1')`.
   - Se ambos falharem (resultado vazio ou corrompido), mostrar mensagem de erro.
2. Mensagem de erro: "Nao foi possivel ler o arquivo. Verifique o formato e tente novamente."
3. Garantir que BOM e removido do conteudo importado.

### Criterios de aceite

- Arquivo UTF-8 sem BOM → importado corretamente.
- Arquivo UTF-8 com BOM → importado corretamente (BOM removido).
- Arquivo Latin-1 → importado com fallback.
- Arquivo com encoding invalido → mensagem de erro.
- `npm test` passa.
- `npm run build` funciona.

### Como validar

```bash
# Criar arquivos de teste
echo -e "\xEF\xBB\xBFHello BOM" > /tmp/test-bom.md
echo -e "Caf\xe9 com a\xe7\xfa\xcar" > /tmp/test-latin1.md
echo -e "\x00\x01\x02\x03" > /tmp/test-invalid.md

npm run dev
# Importar cada arquivo e verificar resultado

npm test
npm run build
```

### Riscos

- BAIXO: Latin-1 pode nao cobrir todos os encodings comuns (Windows-1252 e similar).
- BOM pode ser removido de conteudo legítimo se detectado incorretamente.

### O que NAO alterar

- Nao alterar logica de importacao alem do encoding.
- Nao alterar templates.ts.
- Nao alterar layout.

### Reversibilidade

Restaurar `reader.readAsText(file)` sem encoding. Diff pequeno.

### Modelo recomendado

modelo economico suficiente

### Prompt de execucao para o coder

```
Execute SOMENTE esta tarefa. Nao avance para a proxima.

Projeto: /mnt/c/Dev/markdown-para-pdf
Arquivo: App.tsx (linhas 153-160)

Contexto: A leitura atual usa reader.readAsText(file) sem encoding.
readAsText(file) usa UTF-8 por padrao, mas nao detecta BOM nem faz fallback.

Passos:
1. Ler o arquivo como ArrayBuffer primeiro para detectar BOM.
2. Se BOM UTF-8 (EF BB BF), remover e ler como UTF-8.
3. Senao, ler como UTF-8: reader.readAsText(file, 'UTF-8').
4. Apos leitura, verificar se contem U+FFFD (substituicao).
5. Se contiver U+FFFD, reler como Latin-1: reader.readAsText(file, 'ISO-8859-1').
6. Se ambos falharem, mostrar erro: "Nao foi possivel ler o arquivo."
7. npm run dev -> testar com arquivo UTF-8, BOM, Latin-1.
8. npm test -> OK
9. npm run build -> OK

NAO alterar: logica de importacao (apenas encoding), templates.ts, layout.
```

---

# Ordem recomendada de execucao

```
Tarefa 3.1  Corrigir --- em code blocks  (independente)
Tarefa 3.2  Preview vazio                 (independente)
Tarefa 3.3  Numeracao de pagina           (independente)
Tarefa 3.4  Encoding de importacao        (independente)
```

Todas as 4 tarefas sao independentes entre si e podem ser executadas em qualquer ordem.

**Checkpoints:**
- Apos Tarefa 3.1: commit "fix: --- em code blocks nao cria quebra de pagina"
- Apos Tarefa 3.2: commit "feat: preview vazio com mensagem orientativa"
- Apos Tarefa 3.3: commit "fix: numeracao de pagina exclui capa"
- Apos Tarefa 3.4: commit "feat: encoding de importacao com fallback Latin-1"

**Tarefa que exige leitura de UI/UX Guide:** 3.2 (preview vazio) e 3.3 (numeracao) — obrigatorio.

**Auditoria UI/UX:** Obrigatoria apos Tarefas 3.2 e 3.3.

---

# Checklist final da sprint

- [ ] `npx tsc --noEmit` passa com 0 erros
- [ ] `npm run build` gera dist/ sem erro
- [ ] `npm test` passa
- [ ] `npm run dev` funciona sem erro no console
- [ ] `---` em code block nao cria quebra de pagina
- [ ] `---` isolado cria quebra de pagina
- [ ] Preview vazio mostra mensagem orientativa
- [ ] Mensagem some quando conteudo e digitado
- [ ] Numeracao comeca em 1 no corpo
- [ ] Capa nao e contada na numeracao
- [ ] Numeracao centralizada no rodape
- [ ] Encoding UTF-8 funciona
- [ ] Encoding UTF-8 com BOM funciona
- [ ] Encoding Latin-1 funciona com fallback
- [ ] Responsividade validada
- [ ] Regressoes verificadas
- [ ] Arquivos alterados revisados
- [ ] Escopo conferido contra sprint original
- [ ] Nenhuma funcionalidade fora do escopo adicionada
- [ ] UI/UX Gate preenchido para tarefas 3.2 e 3.3
- [ ] `/docs/design/UI_UX_GUIDE.md` seguido nas tarefas com impacto visual

---

# Tarefas que NAO devem ir para modelo economico

Nenhuma. Todas as 4 tarefas sao mecanicas e seguras para modelo economico.

A tarefa 3.1 (detectar `---` em code blocks) e a mais complexa logicamente, mas nao envolve arquitetura, seguranca ou decisoes criticas de UI/UX — modelo economico e suficiente.
