# Analise de Projeto Existente (Brownfield)

Projeto analisado: `/mnt/c/Dev/markdown-para-pdf`  
Data da analise: 2026-06-06  
Escopo: documentar o estado real do projeto, sem implementar funcionalidades e sem criar PRD.

## 1. Resumo executivo

O sistema hoje e uma aplicacao web client-side chamada **Markdown para PDF / PDF Forge PRO**. Ela permite escrever ou importar Markdown, visualizar o resultado em paginas simuladas de papel e exportar o conteudo como PDF.

Quem usa, se for identificavel:

- Usuario final individual que precisa transformar Markdown em PDF visualmente formatado.
- Nao ha evidencia de usuarios autenticados, perfis de acesso, multiusuario, administracao ou backend.

Stack atual:

- Frontend: React 19.2.x + React DOM 19.2.x.
- Build/dev server: Vite 6.4.x.
- Linguagem: TypeScript/TSX.
- UI: classes Tailwind via CDN em `index.html`, icones `lucide-react`.
- Markdown/renderizacao/exportacao: `marked`, `html2canvas` e `jspdf` carregados por CDN em `index.html`.
- Estado: hooks locais do React (`useState`, `useMemo`, `useEffect`, `useRef`).
- Persistencia: nao identificada.
- Backend: nao identificado.

Nivel de maturidade: `Prototipo`.

Justificativa do nivel:

- Build e TypeScript passam apos instalar dependencias.
- A UI principal renderiza no navegador e o preview mostra paginas reais.
- Nao existe script de teste, arquivos de teste, PRD, plano de testes ou documentacao de produto final.
- Ha dependencias de CDN em runtime, README herdado do AI Studio e configuracao de ambiente inconsistente com o codigo atual.

Evidencias usadas nesta analise:

- `package.json`: scripts `dev`, `build`, `preview`; sem script `test`.
- `npm ci`: dependencias instaladas com sucesso, 0 vulnerabilidades encontradas.
- `npm run build`: Vite build concluiu com sucesso; aviso de `/index.css` ausente.
- `npx tsc --noEmit`: concluiu sem erros.
- `npm audit --audit-level=moderate`: 0 vulnerabilidades.
- Browser em `http://127.0.0.1:3000`: tela desktop renderizada com editor, preview e painel de configuracoes; 6 paginas simuladas no documento exemplo.
- Console do browser: aviso de Tailwind CDN em producao; libs `marked`, `jspdf` e `html2canvas` disponiveis.

## 2. Inventario de funcionalidades

| Funcionalidade | Onde esta implementada | Estado | Testada? |
|---|---|---|---|
| Editor Markdown principal | `App.tsx` (`textarea#markdown-editor`) | Implementada | Parcialmente: renderizou no browser |
| Barra de formatacao Markdown | `components/Toolbar.tsx` | Implementada | Parcialmente: inspecao de UI; sem teste automatizado |
| Insercao de quebra fisica de pagina com `---` | `components/Toolbar.tsx`, `components/A4DocPreview.tsx` | Implementada | Parcialmente: preview mostrou multiplas paginas |
| Importacao de `.md`, `.markdown` e `.txt` por seletor de arquivo | `components/Toolbar.tsx`, `App.tsx` | Implementada | Nao testada manualmente nesta execucao |
| Importacao por drag and drop | `App.tsx` | Implementada | Nao testada manualmente nesta execucao |
| Templates predefinidos | `templates.ts`, `components/SettingsPanel.tsx` | Implementada | Parcialmente: template padrao carregou no browser |
| Estatisticas de texto: caracteres, palavras e tempo de leitura | `App.tsx`, `components/Toolbar.tsx` | Implementada | Parcialmente: exibido na UI |
| Preview editorial em paginas A4/Letter | `components/A4DocPreview.tsx` | Implementada | Parcialmente: renderizou 6 paginas no browser |
| Paginacao automatica por medicao de DOM | `components/A4DocPreview.tsx` | Implementada | Parcialmente: build/preview OK; sem testes de borda |
| Separacao de listas, tabelas e blocos de codigo entre paginas | `components/A4DocPreview.tsx` | Implementada | Nao coberta por teste automatizado |
| Capa opcional do documento | `App.tsx`, `components/A4DocPreview.tsx`, `components/SettingsPanel.tsx` | Implementada | Parcialmente: capa renderizada no preview |
| Sincronizacao heuristica de titulo, subtitulo, autor, instituicao, data, cabecalho e rodape | `utils/heuristics.ts`, `App.tsx` | Implementada | Tipagem passou; sem testes automatizados |
| Override manual de campos detectados automaticamente | `App.tsx`, `components/SettingsPanel.tsx` | Implementada | Nao testada manualmente nesta execucao |
| Presets visuais: moderno, classico, tecnico, moleskine e executivo | `styles.ts`, `components/SettingsPanel.tsx` | Implementada | Parcialmente: preset executivo ativo no browser |
| Configuracao de tamanho de fonte, alinhamento, formato, orientacao e margens | `components/SettingsPanel.tsx`, `styles.ts`, `types.ts` | Implementada | Parcialmente: inspecao de UI; sem teste automatizado |
| Configuracao de cabecalho, rodape e numeracao | `components/SettingsPanel.tsx`, `components/A4DocPreview.tsx` | Implementada | Parcialmente: cabecalho/rodape renderizados no preview |
| Exportacao para PDF | `App.tsx`, dependencias CDN `html2canvas` e `jspdf` | Implementada | Parcialmente: libs carregadas; botao existe; sem validacao de arquivo baixado nesta execucao |
| Modal de dicas de paginacao | `App.tsx` | Implementada | Nao testada manualmente nesta execucao |
| Notificacoes de sucesso/erro de PDF | `App.tsx` | Implementada | Nao testadas de forma conclusiva nesta execucao |
| Geracao de planilha de prompts do framework | `build_prompts_workbook.mjs` | Parcial/legado | Nao testada; possui caminho absoluto externo e dependencia nao listada no `package.json` |
| Documentacao do framework operacional v1.1 | `README_USO_GUIADO.md`, `docs/**` | Implementada como documentacao | Lida parcialmente nesta analise |

## 3. Inventario de telas e rotas

| Tela/Rota | Arquivo | Estado visual | Responsiva? | Observacao |
|---|---|---|---|---|
| `/` - Aplicacao principal PDF Forge PRO | `index.tsx`, `App.tsx` | Funcional em desktop: header, editor, preview e painel de configuracoes visiveis | Sim, por classes Tailwind `lg:*`, layout mobile e overlay de configuracoes | Nao ha roteador; SPA de rota unica |
| Header / CTA de exportacao | `App.tsx` | Visivel; botao `Baixar PDF Elegante` destacado | Sim | Aciona `handleGeneratePdf` |
| Coluna esquerda - editor Markdown | `App.tsx`, `components/Toolbar.tsx` | Visivel com tema escuro e barra de acoes | Sim | Altura muda entre mobile e desktop |
| Coluna central - preview de paginas | `components/A4DocPreview.tsx` | Visivel; mostrou capa e paginas simuladas | Sim | Escala pagina conforme largura disponivel |
| Coluna direita - configuracoes desktop | `components/SettingsPanel.tsx` | Visivel em desktop | Sim, oculta em telas menores | Em mobile vira painel/overlay acionado por botao |
| Overlay de configuracoes mobile | `App.tsx`, `components/SettingsPanel.tsx` | Implementado no codigo | Sim | Nao testado visualmente nesta execucao |
| Modal de dicas | `App.tsx` | Implementado no codigo | Provavel | Nao testado manualmente nesta execucao |
| Notificacao de sucesso de PDF | `App.tsx` | Implementada no codigo | Provavel | Nao validada de forma conclusiva nesta execucao |
| Notificacao de erro de PDF | `App.tsx` | Implementada no codigo | Provavel | Nao validada de forma conclusiva nesta execucao |

Rotas adicionais: nao identificadas. Nao ha `react-router`, `BrowserRouter`, `Route`, `Routes` ou logica de `window.location` no codigo-fonte inspecionado.

## 4. Arquitetura real

Estrutura de pastas e arquivos principais:

```text
/
  App.tsx
  index.tsx
  index.html
  package.json
  package-lock.json
  tsconfig.json
  vite.config.ts
  types.ts
  templates.ts
  styles.ts
  build_prompts_workbook.mjs
  metadata.json
  README.md
  README_USO_GUIADO.md
  /components
    A4DocPreview.tsx
    SettingsPanel.tsx
    Toolbar.tsx
  /utils
    heuristics.ts
  /docs
    /agent
    /design
    /evolution
    /implementation
    /product
```

Fluxo de dados real:

1. `index.tsx` monta `<App />` em `#root`.
2. `App.tsx` mantem o estado principal:
   - `markdownText`
   - `config`
   - `selectedTemplateId`
   - flags de geracao, sucesso, erro, dicas, drag and drop e overrides.
3. `templates.ts` fornece Markdown inicial e configuracoes recomendadas.
4. `utils/heuristics.ts` tenta extrair metadados do Markdown para capa/cabecalho/rodape.
5. `Toolbar` recebe callbacks para inserir Markdown, limpar, restaurar e importar arquivos.
6. `SettingsPanel` altera configuracoes visuais, capa, pagina, cabecalho e rodape.
7. `A4DocPreview` converte Markdown para HTML com `marked`, divide por `---`, mede altura no DOM e renderiza paginas fisicas simuladas.
8. `handleGeneratePdf` em `App.tsx` captura cada `.a4-page-node` com `html2canvas`, cria paginas com `jspdf` e chama `pdf.save(...)` no browser.

Servicos externos:

- Nao ha backend proprio.
- Nao ha API remota chamada pelo codigo de aplicacao inspecionado.
- Ha dependencias carregadas por CDN em runtime:
  - `https://cdn.tailwindcss.com`
  - `https://cdn.jsdelivr.net/npm/marked/marked.min.js`
  - `https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js`
  - `https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js`
- `index.html` contem importmap para React/ReactDOM via `https://aistudiocdn.com`, embora o build Vite use as dependencias npm.

Autenticacao:

- Ausente.
- Nao ha login, sessao, papeis, permissoes ou tokens de usuario.

Estado global:

- Ausente como store externa.
- Estado central fica em `App.tsx` e e repassado por props.

Persistencia de dados:

- Ausente.
- Busca por `localStorage`, `sessionStorage`, `indexedDB`, `fetch`, `axios`, `supabase` e `firebase` nao encontrou uso no codigo-fonte principal.
- O conteudo existe apenas em memoria durante a sessao do browser, salvo quando o usuario baixa o PDF.

Configuracao de ambiente:

- `vite.config.ts` le `GEMINI_API_KEY` e define `process.env.API_KEY` e `process.env.GEMINI_API_KEY` no bundle.
- `README.md` instrui configurar `.env.local` com `GEMINI_API_KEY`.
- Nenhum uso real de Gemini foi encontrado no codigo da aplicacao.
- Nao existe `.env.example`.

## 5. Qualidade observavel

| Dimensao | Status | Evidencia |
|---|---|---|
| Testes automatizados | Ausentes | `package.json` nao tem script `test`; nao ha arquivos `*.test.*` ou `*.spec.*`; `docs/implementation/SPRINT_00B_TESTES.md` existe como prompt de fundacao, nao como suite configurada |
| Tipagem | Parcial | Projeto usa TypeScript e `npx tsc --noEmit` passou; porem `tsconfig.json` tem `allowJs: true`, nao declara `strict`, e libs CDN sao declaradas manualmente com tipos frouxos/`any` |
| Tratamento de erros | Parcial | PDF e parsing Markdown possuem `try/catch`; erro de PDF mostra mensagem generica; importacao de arquivo e heuristicas tem pouca validacao de borda |
| Variaveis de ambiente | Parciais | README e Vite citam `GEMINI_API_KEY`; nao existe `.env.example`; chave aparenta ser inutilizada e seria exposta ao client bundle se configurada |
| Logging | Parcial | `console.error` em erros de PDF e Markdown; `console.log` em script auxiliar; sem estrategia de observabilidade |
| Documentacao inline | Escassa | Existem comentarios pontuais em `App.tsx`, `A4DocPreview.tsx` e `utils/heuristics.ts`; README principal ainda e generico do AI Studio |
| Dependencias | Sem alertas | `npm audit --audit-level=moderate` retornou 0 vulnerabilidades; ha alertas/debitos de empacotamento por CDN Tailwind, libs CDN e dependencia `motion` aparentemente nao usada |

Observacoes adicionais de qualidade:

- `npm run build` passou, mas informou: `/index.css doesn't exist at build time, it will remain unchanged to be resolved at runtime`.
- Console do browser informou: `cdn.tailwindcss.com should not be used in production`.
- Componentes grandes observados por contagem de linhas: `A4DocPreview.tsx` ~758 linhas, `App.tsx` ~667 linhas, `SettingsPanel.tsx` ~626 linhas.
- `pygount`, excluindo `node_modules` e `dist`, identificou 32 arquivos analisados e 555 linhas de codigo classificadas, mas TSX ficou parcialmente fora da classificacao de codigo; a contagem de linhas por arquivo e mais representativa para tamanho real dos componentes.

## 6. Debitos tecnicos

| Debito | Area | Severidade | Impacto se nao resolver |
|---|---|---|---|
| Ausencia de testes automatizados e script `test` | Qualidade/Entrega | Alta | Regressao em paginacao, heuristicas e exportacao de PDF pode passar despercebida |
| Markdown renderizado com `dangerouslySetInnerHTML` a partir de entrada do usuario, sem sanitizacao visivel | Seguranca | Alta | Markdown/HTML malicioso pode executar ou injetar conteudo no contexto do app, especialmente ao importar arquivos de terceiros |
| `GEMINI_API_KEY` configurado para ser exposto no bundle, mas sem uso real identificado | Seguranca/Configuracao | Alta | Se uma chave real for colocada em `.env.local`, pode ir para o frontend sem necessidade |
| Uso de Tailwind via CDN em runtime | Frontend/Deploy | Media/Alta | Nao recomendado para producao; depende de rede externa e pode afetar performance, previsibilidade e seguranca |
| `index.html` referencia `/index.css`, mas arquivo nao existe | Build/Frontend | Media | Build emite aviso; deploy pode carregar recurso 404 ou manter configuracao morta |
| Dependencias criticas por CDN: `marked`, `jspdf`, `html2canvas` | Frontend/Disponibilidade | Media/Alta | App pode quebrar offline, com bloqueio de rede, mudanca de CDN ou politica CSP mais restrita |
| Componentes muito grandes (`A4DocPreview`, `App`, `SettingsPanel`) | Manutenibilidade | Media | Dificulta manutencao, revisao e testes; aumenta risco de mudancas acidentais |
| Logica de paginacao baseada em medicao de DOM dentro do componente | Performance/Complexidade | Media | Documentos longos podem gerar lentidao, jank ou resultados inconsistentes entre browsers |
| Exportacao PDF por screenshots JPEG de paginas | Produto/Qualidade PDF | Media | PDF tende a nao ser semanticamente selecionavel/pesquisavel e pode ficar pesado/perder qualidade textual |
| README principal herdado do AI Studio e inconsistente com app atual | Documentacao | Media | Novo desenvolvedor pode configurar chave Gemini desnecessaria e entender errado o produto |
| `motion` aparece como dependencia, mas nao ha uso no codigo-fonte principal | Dependencias | Baixa/Media | Aumenta instalacao/superficie de dependencia sem valor aparente |
| `build_prompts_workbook.mjs` usa caminho absoluto externo e importa `@oai/artifact-tool` fora do `package.json` | Ferramental/Legado | Media | Script nao e reprodutivel no ambiente do projeto sem ajustes |
| Ausencia de PRD, `HANDOFF.md`, `CURRENT_STATE.md`, plano de testes e criterios de aceite do produto | Processo/Continuidade | Media | Dificulta priorizacao, retomada e validacao objetiva de proximas mudancas |
| Nao ha persistencia/autosave do Markdown | Produto/UX | Baixa/Media | Usuario pode perder trabalho ao recarregar a pagina |

## 7. PRD reverso

Regras de negocio implicitas:

- O usuario trabalha em um unico documento Markdown por sessao.
- O documento inicial vem de um template predefinido.
- Uma linha isolada com `---` representa quebra fisica de pagina.
- O preview de paginas deve representar o PDF final com alta fidelidade visual.
- A capa e opcional e, quando ativa, entra antes do corpo do documento.
- Metadados do documento podem ser inferidos automaticamente do Markdown.
- Campos inferidos podem ser sobrescritos manualmente pelo usuario.
- O usuario pode escolher estilo editorial, fonte, alinhamento, tamanho da folha, orientacao e margens.
- Cabecalho, rodape e numeracao de paginas sao opcionais/configuraveis.
- O PDF final e gerado no proprio navegador e baixado localmente.
- Nao ha salvamento em servidor, conta de usuario ou historico.

Fluxos reais de usuario:

1. Fluxo de template padrao:
   - Abrir app.
   - Editar o Markdown inicial.
   - Ajustar estilo/capa/estrutura se desejar.
   - Conferir preview.
   - Clicar em `Baixar PDF Elegante`.

2. Fluxo de importacao:
   - Abrir app.
   - Clicar em `Importar` ou arrastar arquivo para o editor.
   - App carrega conteudo e limpa overrides.
   - Heuristicas tentam preencher metadados.
   - Usuario ajusta configuracoes e exporta.

3. Fluxo de formatacao:
   - Selecionar trecho no textarea.
   - Usar botoes de negrito, italico, titulos, listas, checklist, link, imagem, codigo ou tabela.
   - Preview atualiza em tempo real.

4. Fluxo de troca de template:
   - Abrir aba `Modelos`.
   - Selecionar template.
   - Markdown e configuracao recomendada sao aplicados.

5. Fluxo mobile previsto:
   - Abrir app em tela pequena.
   - Usar botao de configuracoes no header.
   - Ajustar configuracoes no overlay lateral.

Permissoes e papeis existentes:

- Nao ha papeis.
- Nao ha permissoes por usuario.
- Todo usuario que acessa a pagina pode editar, importar e exportar.

Integracoes ativas:

- APIs nativas do browser:
  - `FileReader` para importacao de arquivo.
  - Download local via `jspdf.save`.
  - `ResizeObserver`, `DOMParser` e medicao de DOM para preview/paginacao.
- Bibliotecas CDN:
  - `marked` para Markdown -> HTML.
  - `html2canvas` para canvas a partir do DOM.
  - `jspdf` para geracao de PDF.
  - Tailwind CDN para estilos utilitarios.

## 8. Delta entre estado atual e desejado

Nao existe `/docs/product/PRD.md` no projeto.

| Funcionalidade desejada | Estado atual | Gap | Prioridade |
|---|---|---|---|
| Produto desejado documentado | Nao ha PRD | Escopo, publico-alvo, criterios de aceite e prioridades nao estao formalizados | Alta |
| Estrategia de testes | Existe prompt `SPRINT_00B_TESTES.md`, mas nao ha infraestrutura real | Falta escolher e configurar framework de teste | Alta |
| Politica de seguranca para Markdown/HTML | Nao documentada | Falta decidir sanitizacao, HTML permitido/proibido e threat model | Alta |
| Estrategia de deploy/producao | Nao documentada | CDN Tailwind e libs externas precisam de decisao para producao | Media/Alta |
| Persistencia/autosave | Nao implementada e nao especificada | Falta decidir se o produto deve manter rascunhos locais ou historico | Media |

`Estado desejado nao documentado. Recomenda-se criar um Pre-PRD com base nesta analise.`

## 9. Riscos

| Risco | Tipo | Severidade | Recomendacao |
|---|---|---|---|
| Entrada Markdown/HTML sem sanitizacao antes de `dangerouslySetInnerHTML` | Seguranca | Alta | Definir politica de HTML e sanitizar com biblioteca apropriada antes de renderizar |
| Exposicao acidental de `GEMINI_API_KEY` no frontend | Seguranca/Configuracao | Alta | Remover variavel se nao for usada ou mover chamadas Gemini para backend seguro |
| Falta de testes automatizados para heuristicas, paginacao e exportacao | Qualidade | Alta | Executar Sprint 00B de testes antes de novas features |
| Dependencia de CDNs para funcionamento basico | Disponibilidade/Seguranca | Media/Alta | Empacotar dependencias via npm/build ou definir CSP/SRI e politica de fallback |
| Tailwind CDN em producao e `/index.css` ausente | Deploy/Frontend | Media | Configurar Tailwind localmente ou remover referencias mortas |
| PDF gerado como imagem rasterizada | Produto/Performance | Media | Validar se o requisito do produto exige texto selecionavel/acessivel; se sim, reavaliar estrategia de PDF |
| Documentos longos podem degradar performance por medicao DOM e captura de paginas | Performance | Media | Criar testes de carga com documentos grandes e limites conhecidos |
| Projeto nao parece estar dentro de repositorio Git neste caminho | Processo | Media | Confirmar controle de versao antes de mudancas maiores |
| README e metadata indicam AI Studio/Gemini, divergindo do app real | Continuidade | Media | Atualizar documentacao apos PRD/decisoes aprovadas |
| Script de planilha com caminho absoluto externo | Reprodutibilidade | Media | Decidir se o script e legado; se for mantido, parametrizar caminho e declarar dependencia |

## 10. Recomendacao de proximo passo

`Criar Pre-PRD`

Motivo:

- O estado real do projeto ja foi mapeado neste Brownfield.
- Nao existe PRD documentando objetivo, usuarios, criterios de aceite, escopo MVP, politica de seguranca, deploy e estrategia de testes.
- Antes de implementar ou refatorar, o projeto precisa decidir o produto desejado.

Observacao operacional:

- Apos o Pre-PRD, a proxima acao tecnica mais urgente deve ser configurar a fundacao de testes (`SPRINT_00B_TESTES.md`) e tratar a seguranca da renderizacao Markdown/HTML antes de evoluir a exportacao ou aceitar arquivos de terceiros.
