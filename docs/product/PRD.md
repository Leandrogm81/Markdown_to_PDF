# PRD — Markdown para PDF

Projeto: `/mnt/c/Dev/markdown-para-pdf`
Versão do PRD: 1.0
Data: 2026-06-06
Tipo: PRD final derivado do Pré-PRD de escopo
Pré-PRD de origem: `docs/product/PRE_PRD_ESCOPO.md`
Status: Pronto para revisão e planejamento de implementação

---

## 1. Resumo executivo

O produto é uma aplicação web client-side que permite ao usuário escrever ou importar conteúdo Markdown, visualizar o documento como páginas simuladas de papel, ajustar configurações visuais e exportar o resultado como PDF no navegador.

O público principal do MVP é pessoa não técnica que quer gerar PDF com aparência profissional, sem depender de ferramentas técnicas complexas.

O estágio atual é de protótipo funcional com editor, toolbar, preview paginado, configurações visuais, importação de arquivos e exportação PDF implementados. Todas as 5 perguntas críticas do Pré-PRD foram respondidas pelo usuário.

O escopo do MVP é estabilizar o protótipo existente, implementar sanitização de HTML, corrigir o nome do arquivo PDF, preparar deploy na Vercel e validar a exportação real. Melhorias incrementais são aceitas desde que não inflem escopo.

Nível de maturidade do escopo: `Escopo definido — PRD pronto para planejamento`.

---

## 2. Objetivo do produto

### Objetivo principal

Permitir que pessoa não técnica transforme conteúdo Markdown em PDF visualmente profissional, usando editor web, preview paginado, templates, toolbar e ajustes visuais simples, sem necessidade de backend, conta ou ferramenta externa complexa.

### Objetivos secundários

- Permitir importação de arquivos `.md`, `.markdown` e `.txt`.
- Gerar PDF com nome de arquivo descritivo derivado do documento criado.
- Oferecer templates predefinidos como ponto de partida.
- Permitir ajustes de estilo, capa, cabeçalho, rodapé, margens e formato de página.
- Deploy na Vercel como site estático.

### Objetivos fora do MVP

- PDF com texto selecionável, pesquisável e acessível.
- Login, contas, persistência server-side.
- Histórico de documentos.
- Exportação para formatos além de PDF.
- Editor WYSIWYG completo.
- Integração com IA.
- Colaboração em tempo real.
- Monetização.

---

## 3. Problema a resolver

### Problema principal

Pessoas não técnicas precisam gerar documentos PDF com aparência profissional (relatórios, propostas, currículos, artigos) mas enfrentam fricção ao usar ferramentas de linha de comando, editores de texto complexos ou exportadores online que exigem conhecimento técnico.

### Impacto do problema

- Perda de tempo formatando documentos manualmente.
- Resultado visual inconsistente entre tentativas.
- Frustração ao lidar com ferramentas que exigem conhecimento de Markdown, LaTeX ou configuração técnica.

### Como o problema é resolvido hoje

- Hipótese: usuários copiam conteúdo para editores de texto (Word, Google Docs), usam ferramentas de linha de comando (pandoc) ou exportadores online. Não confirmado com dados reais.

### Por que o produto é necessário

O produto reduz a fricção entre escrever conteúdo e gerar um PDF visualmente aceitável, unindo editor, preview paginado e exportação em uma única tela, sem exigir configuração técnica.

### Riscos caso o problema não seja bem resolvido

- O preview não reflete o PDF final → usuário perde confiança.
- A toolbar e templates são insuficientes para pessoa não técnica → barreira de entrada.
- O PDF gerado é pesado ou ilegível → resultado inaceitável.
- O nome do arquivo PDF é genérico → usuário não identifica o download.

---

## 4. Público-alvo e personas

### Persona 1 — Pessoa não técnica que quer PDF bonito

- Perfil: pessoa que não domina ferramentas técnicas, precisa gerar documentos PDF com aparência profissional.
- Necessidade principal: criar PDF bonito sem aprender Markdown completo ou ferramenta complexa.
- Dor principal: dificuldade de formatar documentos manualmente e manter consistência visual.
- O que precisa realizar no produto: escolher template, editar conteúdo com apoio de toolbar, conferir preview, ajustar aparência e baixar PDF.
- Nível técnico esperado: baixo; deve usar templates, toolbar e configurações simples como apoio.
- Observações: público principal confirmado do MVP. Markdown pode ser barreira; o PRD prevê ajuda guiada.

### Persona 2 — Usuário que já conhece Markdown

- Perfil: pessoa técnica, redator, dev, consultor ou estudante que já escreve Markdown.
- Necessidade principal: transformar rapidamente Markdown em PDF com visual aceitável.
- Dor principal: dificuldade de obter PDF paginado e visualmente previsível a partir de Markdown.
- O que precisa realizar no produto: importar ou digitar Markdown, conferir preview, ajustar aparência e baixar PDF.
- Nível técnico esperado: médio/alto.
- Observações: persona secundária; não é foco principal do MVP.

---

## 5. Escopo do MVP

| Item do MVP | Descrição | Justificativa | Critério de aceite |
|---|---|---|---|
| Editor Markdown | Área principal para escrever e editar Markdown em tela única | Funcionalidade central do produto | O usuário pode digitar Markdown e ver resultado no preview |
| Toolbar de formatação | Botões para inserir sintaxe Markdown (negrito, itálico, títulos, listas, links, etc.) | Reduz barreira para pessoa não técnica | Clicar em botão insere Markdown correto no editor |
| Preview paginado | Renderiza conteúdo em páginas simuladas A4/Letter | Valor principal: ver como ficará o PDF | Preview mostra documento paginado com margens e formatação |
| Quebra de página com `---` | Linha isolada com `---` cria quebra física de página | Controle manual de paginação | Inserir `---` no Markdown cria nova página no preview |
| Importação de arquivos | Carregar `.md`, `.markdown` e `.txt` via botão ou drag-and-drop | Usuário pode ter conteúdo pronto | Arquivo carregado aparece no editor sem perda de conteúdo |
| Configurações visuais essenciais | Estilo/preset, tamanho de fonte, alinhamento, formato de página (A4/Letter), orientação (retrato/paisagem), margens | Controle visual do documento | Alteração de configuração é refletida no preview |
| Capa opcional | Renderiza capa com título, subtítulo, autor, instituição e data | Documento com aparência profissional | Capa aparece como primeira página quando habilitada |
| Cabeçalho, rodapé e numeração | Elementos recorrentes nas páginas | Padronização visual | Cabeçalho/rodapé aparecem nas páginas quando habilitados |
| Templates predefinidos | Modelos iniciais (relatório, currículo, artigo técnico, etc.) | Acelera uso para pessoa não técnica | Selecionar template carrega conteúdo e configurações recomendadas |
| Heurística de metadados | Extrai título, subtítulo, autor, instituição, data do Markdown | Reduz preenchimento manual | Título do `#` heading é inferido como título da capa |
| Exportação para PDF | Captura paginas e gera PDF no browser | Funcionalidade principal | Clicar em exportar gera e baixa arquivo PDF |
| Nome descritivo do PDF | Nome do arquivo PDF contém referência ao documento | Decisão humana; evita nome genérico | Nome do PDF baixado não é `documento-markdown.pdf` nem genérico |
| Sanitização de HTML | HTML no Markdown é sanitizado antes de renderizar | Decisão humana; segurança | Tags perigosas (script, iframe, onclick) são removidas |
| Notificações de sucesso/erro | Feedback visual ao exportar | UX; usuário entende resultado | Mensagem aparece ao exportar com sucesso ou falha |
| Configuração visual (heading color) | Cor dos títulos do documento | Personalização visual | Alterar cor muda cor dos headings no preview |

#### Configurações visuais do MVP

As seguintes configurações estão confirmadas no MVP com base no que já existe no protótipo:

- Preset de estilo (executivo, moleskine, etc.)
- Tamanho de fonte (pequeno, médio, grande)
- Altura de linha (compacto, normal, espaçado)
- Alinhamento (esquerda, justificado)
- Formato de página (A4, Letter)
- Orientação (retrato, paisagem)
- Margens (estreita, normal, ampla)
- Cor dos headings
- Capa (habilitar/desabilitar + campos: título, subtítulo, autor, instituição, data, tema, cor de destaque)
- Cabeçalho (habilitar/desabilitar + texto)
- Rodapé (habilitar/desabilitar + texto)
- Numeração de página (habilitar/desabilitar)
- Tema do editor (claro/escuro)

---

## 6. Fora de escopo

| Fora de escopo | Motivo | Pode voltar no futuro? |
|---|---|---|
| Login e contas de usuário | Requer backend, autenticação, banco de dados | Sim — V2/V3 |
| Persistência server-side | Requer backend e políticas de dados | Sim — V2/V3 |
| Histórico de documentos | Requer persistência e UX adicional | Sim — V2 |
| Autosave local | Decisão não tomada; pode entrar em V1 se aprovado | Requer decisão |
| PDF com texto selecionável/acessível | Decisão: aceitável como rasterizado no MVP | Sim — V1/V2 |
| Exportação para DOCX, HTML, EPUB | Cada formato traz regras próprias | Sim — V2/V3 |
| Editor WYSIWYG completo | Duplica complexidade | Requer decisão |
| Integração com IA/Gemini | Sem uso real, risco de exposição de chave | Sim — V2/V3 |
| Colaboração em tempo real | Muda arquitetura completamente | Não — descartado por enquanto |
| Monetização, billing, planos | Fora do estágio atual | Sim — V3 |
| Marketplace de templates | Fora do estágio atual | Sim — V3 |
| Modo offline instalável | Não priorizado | Sim — V2 |
| Exportação com texto selecionável | Requer mudar abordagem de exportação | Sim — V1/V2 |
| CDN em runtime para produção | Risco de disponibilidade; deve ser substituído por dependências locais | Sim — correção no MVP |
| Configuração GEMINI_API_KEY | Sem uso real, risco de exposição | Requer decisão de remoção |

---

## 7. Funcionalidades principais

### 7.1. Editor Markdown

#### Objetivo

Permitir que o usuário escreva e edite conteúdo Markdown em uma área de texto principal.

#### Comportamento esperado

- O editor ocupa área visível da tela, lado a lado com o preview.
- O conteúdo digitado é renderizado no preview em tempo real.
- O editor suporta digitação, seleção, cópia, cola e desfazer/refazer.
- Em mobile, o editor e o preview podem alternar entre si (não precisam ser lado a lado).

#### Regras de negócio relacionadas

- O usuário trabalha em um único documento por sessão.
- O conteúdo inicial vem de um template predefinido.
- O conteúdo existe apenas em memória durante a sessão (sem persistência server-side).

#### Critérios de aceite

- [ ] O usuário pode digitar texto no editor e vê-lo renderizado no preview.
- [ ] O editor suporta texto com ao menos 10.000 caracteres sem travar.
- [ ] O conteúdo do editor é mantido ao alterar configurações visuais.
- [ ] Em mobile, o editor é utilizável sem layout quebrado.

#### Pontos de decisão

- PD-01: Autosave local deve entrar no MVP?

#### Riscos

- Documentos longos podem causar lentidão na paginação e exportação.

---

### 7.2. Toolbar de formatação

#### Objetivo

Permitir que pessoa não técnica insira sintaxe Markdown usando botões visuais.

#### Comportamento esperado

- A toolbar fica acima ou próxima ao editor.
- Botões incluem: negrito, itálico, títulos (H1-H3), lista, lista numerada, link, imagem, código, bloco de código, citação, linha horizontal.
- Clicar em um botão insere a sintaxe Markdown correspondente no cursor ou ao redor do texto selecionado.
- A toolbar não executa formatação WYSIWYG; apenas insere Markdown.

#### Regras de negócio relacionadas

- A toolbar é apoio, não substitui conhecimento de Markdown.
- A toolbar não altera o comportamento do parser Markdown.

#### Critérios de aceite

- [ ] Cada botão da toolbar insere Markdown correto no editor.
- [ ] Texto selecionado é envolvido pela sintaxe correspondente (ex.: `**texto**` para negrito).
- [ ] A toolbar é visível e acessível em desktop.
- [ ] Em mobile, a toolbar não quebra o layout.

#### Pontos de decisão

- Nenhum.

#### Riscos

- Se a toolbar for insuficiente para pessoa não técnica, a barreira de entrada permanece alta.

---

### 7.3. Preview paginado

#### Objetivo

Mostrar ao usuário como o documento ficará quando exportado como PDF, com paginação fiel.

#### Comportamento esperado

- O conteúdo Markdown é renderizado como HTML e distribuído em páginas simuladas de A4 ou Letter.
- Cada página mostra margens, cabeçalho, rodapé e numeração conforme configuração.
- O preview atualiza em tempo real quando o conteúdo ou configurações mudam.
- Uma linha isolada com `---` no Markdown cria quebra física de página.
- O preview é scrollável e mostra todas as páginas.

#### Regras de negócio relacionadas

- O preview deve representar o PDF final com alta fidelidade visual.
- Quebra de página por `---` é regra central de paginação manual.

#### Critérios de aceite

- [ ] O preview mostra ao menos 2 páginas quando o conteúdo é suficiente.
- [ ] Inserir `---` no Markdown cria nova página no preview.
- [ ] Alterar formato (A4/Letter) ou orientação (retrato/paisagem) atualiza o preview.
- [ ] Cabeçalho, rodapé e numeração aparecem quando habilitados.
- [ ] O preview é scrollável e mostra todas as páginas geradas.

#### Pontos de decisão

- PD-02: Qual o critério de fidelidade entre preview e PDF?

#### Riscos

- A paginação por medição de DOM pode ser imprecisa para conteúdo complexo (tabelas, código longo).

---

### 7.4. Importação de arquivos

#### Objetivo

Permitir que o usuário carregue conteúdo de arquivos existentes.

#### Comportamento esperado

- O usuário pode importar arquivos `.md`, `.markdown` e `.txt` via botão de upload.
- O usuário pode arrastar um arquivo para a área do editor (drag-and-drop).
- O conteúdo do arquivo substitui o conteúdo atual do editor.
- Heurísticas tentam preencher metadados (título, autor, etc.) a partir do conteúdo importado.
- O nome do arquivo importado pode ser usado para preencher o título da capa.

#### Regras de negócio relacionadas

- A importação substitui o conteúdo atual sem confirmação (comportamento atual; pode ser revisado).
- Arquivos com encoding inválido devem gerar mensagem de erro.

#### Critérios de aceite

- [ ] O usuário pode importar `.md` via botão de upload.
- [ ] O usuário pode importar `.md` via drag-and-drop.
- [ ] O conteúdo importado aparece no editor sem perda.
- [ ] Heurísticas preenchem título a partir do primeiro `#` heading.
- [ ] Arquivo `.txt` é carregado corretamente.

#### Pontos de decisão

- PD-03: Qual o tamanho máximo de arquivo suportado?
- PD-04: Deve haver confirmação antes de substituir conteúdo atual?

#### Riscos

- Importação de conteúdo malicioso pode explorar renderização sem sanitização (mitigado por F-07 sanitização).

---

### 7.5. Configurações visuais

#### Objetivo

Permitir que o usuário ajuste a aparência do documento.

#### Comportamento esperado

- Painel de configurações acessível na interface (sidebar em desktop, overlay em mobile).
- Configurações disponíveis no MVP:
  - Preset de estilo (executivo, moleskine, etc.)
  - Tamanho de fonte (pequeno, médio, grande)
  - Altura de linha (compacto, normal, espaçado)
  - Alinhamento (esquerda, justificado)
  - Formato de página (A4, Letter)
  - Orientação (retrato, paisagem)
  - Margens (estreita, normal, ampla)
  - Cor dos headings
- Alterações são refletidas no preview em tempo real.

#### Regras de negócio relacionadas

- Configurações visuais não alteram o conteúdo Markdown.
- Configurações visuais são mantidas durante a sessão.

#### Critérios de aceite

- [ ] Cada configuração listada está disponível na interface.
- [ ] Alterar configuração atualiza o preview sem recarregar a página.
- [ ] Em mobile, configurações são acessíveis via overlay/modal.
- [ ] O preset de estilo altera fontes e cores do documento.

#### Pontos de decisão

- PD-05: Quais presets de estilo estarão disponíveis no MVP?

#### Riscos

- Muitas configurações podem confundir pessoa não técnica.

---

### 7.6. Capa opcional

#### Objetivo

Permitir renderizar uma página de capa antes do corpo do documento.

#### Comportamento esperado

- A capa pode ser habilitada/desabilitada nas configurações.
- Quando habilitada, a capa mostra: título, subtítulo, autor, instituição, data, tema visual e cor de destaque.
- Campos da capa são preenchidos automaticamente por heurísticas e podem ser editados manualmente.
- A capa aparece como primeira página do preview e do PDF.

#### Regras de negócio relacionadas

- A capa é opcional.
- Metadados podem ser inferidos automaticamente do Markdown.
- Campos inferidos podem ser sobrescritos manualmente.

#### Critérios de aceite

- [ ] Habilitar capa adiciona primeira página ao preview.
- [ ] Desabilitar capa remove a primeira página do preview.
- [ ] Campos da capa são editáveis pelo usuário.
- [ ] Título do `#` heading é inferido como título da capa.
- [ ] A capa aparece no PDF exportado.

#### Pontos de decisão

- PD-06: Quais temas de capa estarão disponíveis no MVP?

#### Riscos

- Heurísticas podem inferir metadados errados; o usuário precisa perceber e corrigir.

---

### 7.7. Cabeçalho, rodapé e numeração

#### Objetivo

Exibir elementos recorrentes nas páginas do documento.

#### Comportamento esperado

- Cabeçalho pode ser habilitado/desabilitado e ter texto configurável.
- Rodapé pode ser habilitado/desabilitado e ter texto configurável.
- Numeração de página pode ser habilitada/desabilitada.
- Elementos aparecem em todas as páginas (exceto capa, se aplicável).

#### Regras de negócio relacionadas

- Cabeçalho, rodapé e numeração são opcionais/configuráveis.

#### Critérios de aceite

- [ ] Habilitar cabeçalho exibe texto configurado no topo de cada página.
- [ ] Habilitar rodapé exibe texto configurado no rodapé de cada página.
- [ ] Numeração mostra "Página X de Y" quando habilitada.
- [ ] Elementos aparecem no PDF exportado.

#### Pontos de decisão

- Nenhum.

#### Riscos

- Nenhum significativo.

---

### 7.8. Templates predefinidos

#### Objetivo

Oferecer modelos iniciais para acelerar a criação de documentos.

#### Comportamento esperado

- O usuário pode selecionar um template ao iniciar ou a qualquer momento.
- Selecionar template carrega conteúdo Markdown e configurações recomendadas.
- Templates disponíveis no MVP: relatório executivo, currículo/profissional, artigo acadêmico, documentação técnica.
- O usuário pode editar o conteúdo carregado pelo template.

#### Regras de negócio relacionadas

- O documento inicial vem de um template predefinido.
- Templates são apenas pontos de partida; o usuário tem controle total.

#### Critérios de aceite

- [ ] Ao menos 3 templates estão disponíveis.
- [ ] Selecionar template carrega conteúdo e configurações no editor e preview.
- [ ] O usuário pode editar conteúdo após selecionar template.
- [ ] Alterar template não perde configurações manuais de metadados que o usuário sobrescreveu.

#### Pontos de decisão

- PD-07: Quantos e quais templates estarão disponíveis no MVP?

#### Riscos

- Templates podem não representar casos de uso reais do público-alvo.

---

### 7.9. Heurística de metadados

#### Objetivo

Preencher automaticamente campos de metadados (título, subtítulo, autor, instituição, data, cabeçalho, rodapé) a partir do conteúdo Markdown.

#### Comportamento esperado

- Quando o conteúdo é digitado ou importado, heurísticas analisam o Markdown.
- Título é inferido do primeiro `#` heading.
- Subtítulo é inferido da primeira linha em itálico após o título.
- Autor, instituição e data são inferidos de padrões como `**Autor:**` ou linhas específicas.
- Campos inferidos são exibidos na capa e podem ser sobrescritos manualmente.
- Quando o usuário sobrescreve um campo, a heurística não o substitui mais.

#### Regras de negócio relacionadas

- Metadados podem ser inferidos automaticamente do Markdown.
- Campos inferidos podem ser sobrescritos manualmente.

#### Critérios de aceite

- [ ] Título do `#` heading é inferido como título da capa.
- [ ] Subtítulo em itálico é inferido como subtítulo da capa.
- [ ] O usuário pode sobrescrever qualquer campo inferido.
- [ ] Campos sobrescritos não são substituídos por nova heurística.

#### Pontos de decisão

- PD-08: Quais heurísticas além de título e subtítulo devem funcionar no MVP?

#### Riscos

- Heurísticas podem inferir valores errados silenciosamente.

---

### 7.10. Exportação para PDF

#### Objetivo

Gerar e baixar arquivo PDF a partir do documento visualizado no preview.

#### Comportamento esperado

- Clicar em "Exportar PDF" ou "Baixar PDF" inicia a geração.
- O sistema captura cada página do preview como imagem e compõe o PDF.
- O PDF é gerado no navegador e baixado localmente.
- O nome do arquivo PDF contém referência ao documento criado (não genérico).
- Mensagem de sucesso ou erro é exibida ao concluir.

#### Regras de negócio relacionadas

- O PDF final é gerado no navegador e baixado localmente.
- O arquivo PDF gerado não deve usar nome genérico.
- O PDF pode ser rasterizado como imagem (texto selecionável não é obrigatório).

#### Regras de composição do nome do PDF

O nome do arquivo PDF deve ser gerado com a seguinte prioridade:

1. Título da capa (se capa habilitada e título preenchido).
2. Primeiro heading `#` do Markdown (se existir).
3. Nome do arquivo importado (se o conteúdo foi importado de arquivo).
4. Fallback: primeiros 50 caracteres do conteúdo, sanitizados.

Regras de sanitização do nome:

- Converter para minúsculas.
- Remover caracteres especiais, acentos e espaços.
- Substituir espaços e hifens por `-`.
- Limitar a 80 caracteres.
- Remover `-` inicial e final.
- Se após sanitização o nome estiver vazio, usar `documento`.

Exemplo: título "Relatório Trimestral Q2" → `relatorio-trimestral-q2.pdf`.

#### Critérios de aceite

- [ ] Clicar em exportar gera e baixa arquivo PDF.
- [ ] O nome do PDF contém referência ao título ou conteúdo do documento.
- [ ] O nome do PDF não é `documento-markdown.pdf` nem genérico.
- [ ] Mensagem de sucesso aparece ao concluir exportação.
- [ ] Mensagem de erro aparece se a exportação falhar.
- [ ] O PDF contém todas as páginas do preview.
- [ ] A capa aparece no PDF quando habilitada.

#### Pontos de decisão

- PD-09: O PDF deve ter limite de tamanho aceitável?

#### Riscos

- Exportação por captura de imagem pode gerar PDF pesado para documentos longos.
- Fidelidade visual entre preview e PDF pode variar.

---

### 7.11. Sanitização de HTML no Markdown

#### Objetivo

Permitir HTML dentro do Markdown de forma segura, removendo tags e atributos perigosos.

#### Comportamento esperado

- O parser Markdown aceita HTML embutido no conteúdo.
- Antes de renderizar, o HTML é sanitizado para remover tags perigosas.
- Tags permitidas: formatação básica (strong, em, br, p, div, span, table, tr, td, th, thead, tbody, ul, ol, li, blockquote, pre, code, h1-h6, a, img).
- Tags bloqueadas: script, iframe, object, embed, form, input, button, style, link, meta, base.
- Atributos permitidos: class, id, href, src, alt, title, colspan, rowspan.
- Atributos bloqueados: onclick, onload, onerror, onmouseover e qualquer atributo `on*`.
- HTML inválido ou removido não gera erro; é silenciosamente sanitizado.

#### Regras de negócio relacionadas

- HTML embutido no Markdown é permitido apenas com sanitização.

#### Critérios de aceite

- [ ] `<script>alert('xss')</script>` não é executado nem renderizado como script.
- [ ] `<strong>texto</strong>` é renderizado como negrito.
- [ ] `<a href="https://example.com">link</a>` é renderizado como link.
- [ ] `<img src="url" alt="desc">` é renderizado como imagem.
- [ ] `<iframe src="...">` é removido do output.
- [ ] `onclick` e atributos `on*` são removidos.

#### Pontos de decisão

- PD-10: Qual biblioteca de sanitização será usada? (Recomendação: DOMPurify)

#### Riscos

- Sanitização muito restritiva pode quebrar documentos que dependem de HTML específico.
- Sanitização muito permissiva pode deixar brechas de segurança.

---

### 7.12. Notificações de sucesso/erro

#### Objetivo

Informar o usuário sobre o resultado de ações como exportação e importação.

#### Comportamento esperado

- Ao exportar PDF com sucesso, exibir notificação positiva com nome do arquivo.
- Ao falhar exportação, exibir notificação de erro com descrição genérica.
- Ao importar arquivo com sucesso, exibir notificação.
- Notificações desaparecem automaticamente após alguns segundos.

#### Regras de negócio relacionadas

- Nenhuma regra específica além de feedback ao usuário.

#### Critérios de aceite

- [ ] Notificação de sucesso aparece ao exportar PDF.
- [ ] Notificação de erro aparece se exportação falhar.
- [ ] Notificação desaparece automaticamente após 5 segundos.

#### Pontos de decisão

- Nenhum.

#### Riscos

- Nenhum significativo.

---

## 8. Funcionalidades secundárias

| Funcionalidade | Valor esperado | Prioridade | Entra no MVP? | Observação |
|---|---|---|---|---|
| Autosave local | Evitar perda de conteúdo ao recarregar | Média | Requer decisão (PD-01) | Usa localStorage; precisa UX de restauração |
| Modo mobile completo | Uso confortável em telas pequenas | Média | Parcial — responsividade básica sim | Editor completo em mobile pode ser experiência ruim |
| Modal de dicas de paginação | Ensinar uso de `---` para quebra de página | Baixa | Não — pode ser ajuda inline | Existe no código atual |
| Validação visual antes de exportar | Avisar sobre páginas vazias ou muito longas | Média | Não — V1 | Reduz PDFs quebrados |
| Pré-configurações por tipo de documento | Facilitar uso para relatório, proposta, etc. | Média | Não — V1 | Extensão dos templates |
| Templates customizáveis pelo usuário | Salvar configurações como template pessoal | Baixa | Não — V2 | Risco de escopo |
| Notificações visuais antes de exportar | Confirmar ação antes de gerar PDF | Baixa | Não — V1 | UX de confirmação |
| Exportação com texto selecionável | Acessibilidade, busca e cópia | Alta | Não — V1/V2 | Requer mudar abordagem de exportação |
| Histórico de documentos | Retomar trabalhos anteriores | Alta | Não — V2 | Requer persistência |
| Integração com IA | Sugerir formatação, resumo | Média | Não — V2/V3 | Requer backend seguro |
| Login e nuvem | Acessar em múltiplos dispositivos | Alta | Não — V2/V3 | Requer backend |

---

## 9. Fluxos de usuário

### Fluxo 1 — Criar PDF a partir de template

- Usuário: pessoa não técnica.
- Objetivo: abrir app, editar conteúdo e exportar PDF.
- Pré-condições: navegador moderno com JavaScript habilitado.
- Passos:
  1. Abrir a aplicação na URL da Vercel.
  2. O app carrega com template padrão (relatório executivo).
  3. Editar conteúdo Markdown no editor.
  4. Conferir preview paginado.
  5. Ajustar configurações visuais se necessário.
  6. Clicar em "Baixar PDF".
  7. Arquivo PDF é baixado com nome descritivo.
- Resultado esperado: PDF baixado com aparência compatível com o preview.
- Estados de erro: falha na geração do PDF → notificação de erro.
- Critérios de aceite:
  - [ ] Template padrão carrega ao abrir o app.
  - [ ] O usuário pode editar, configurar e exportar sem erro.
  - [ ] O PDF baixado tem nome descritivo.
- Pontos de decisão: Nenhum.

### Fluxo 2 — Importar arquivo e exportar

- Usuário: pessoa que já possui arquivo Markdown/texto.
- Objetivo: carregar arquivo existente e gerar PDF.
- Pré-condições: arquivo `.md`, `.markdown` ou `.txt` disponível.
- Passos:
  1. Clicar em importar ou arrastar arquivo para o editor.
  2. O app carrega o conteúdo e infere metadados.
  3. Conferir preview e ajustar configurações se necessário.
  4. Clicar em "Baixar PDF".
  5. Arquivo PDF é baixado com nome derivado do documento.
- Resultado esperado: conteúdo importado aparece no editor e preview; PDF baixado.
- Estados de erro: arquivo com formato inválido → notificação de erro.
- Critérios de aceite:
  - [ ] Arquivo `.md` é carregado via upload e drag-and-drop.
  - [ ] Conteúdo importado aparece no editor.
  - [ ] Metadados são inferidos do conteúdo.
  - [ ] PDF é exportado com sucesso.
- Pontos de decisão: PD-03 (tamanho máximo), PD-04 (confirmação).

### Fluxo 3 — Formatar conteúdo com toolbar

- Usuário: pessoa não técnica.
- Objetivo: aplicar formatação sem memorizar sintaxe Markdown.
- Pré-condições: editor com conteúdo.
- Passos:
  1. Selecionar texto no editor.
  2. Clicar em botão de formatação (ex.: negrito).
  3. Conferir resultado no preview.
- Resultado esperado: Markdown correto inserido e renderizado.
- Estados de erro: Nenhum significativo.
- Critérios de aceite:
  - [ ] Botão de negrito envolve texto com `**`.
  - [ ] Botão de título insere `# ` antes da linha.
  - [ ] Preview atualiza após inserção.
- Pontos de decisão: Nenhum.

### Fluxo 4 — Ajustar aparência do documento

- Usuário: pessoa não técnica.
- Objetivo: configurar visual do documento.
- Pré-condições: editor com conteúdo.
- Passos:
  1. Abrir painel de configurações.
  2. Alterar preset, fonte, margens ou formato.
  3. Conferir resultado no preview.
  4. Exportar PDF.
- Resultado esperado: alterações visuais refletidas no preview e no PDF.
- Estados de erro: Nenhum significativo.
- Critérios de aceite:
  - [ ] Alterar preset muda fontes e cores no preview.
  - [ ] Alterar formato de A4 para Letter muda dimensões do preview.
  - [ ] Configurações são mantidas durante a sessão.
- Pontos de decisão: PD-05, PD-06.

### Fluxo 5 — Uso em mobile

- Usuário: pessoa em dispositivo móvel.
- Objetivo: editar e exportar em tela pequena.
- Pré-condições: navegador mobile moderno.
- Passos:
  1. Abrir app no celular.
  2. Usar editor (editor e preview podem alternar).
  3. Acessar configurações via overlay/modal.
  4. Exportar PDF.
- Resultado esperado: fluxo utilizável sem layout quebrado.
- Estados de erro: layout quebrado em telas muito pequenas.
- Critérios de aceite:
  - [ ] O app abre sem erro em mobile.
  - [ ] O editor é utilizável em tela pequena.
  - [ ] Configurações são acessíveis via overlay.
  - [ ] PDF pode ser exportado em mobile.
- Pontos de decisão: Nenhum.

---

## 10. Telas e componentes

| Tela | Finalidade | Elementos principais | Obrigatória no MVP? | Observações |
|---|---|---|---|---|
| Aplicação principal `/` | Tela única do produto | Editor, preview, toolbar, configurações | Sim | Layout responsivo |
| Editor Markdown | Digitar/editar conteúdo | Textarea, toolbar | Sim | Lado a lado com preview em desktop |
| Preview paginado | Visualizar páginas | Páginas simuladas A4/Letter | Sim | Área scrollável |
| Painel de configurações | Ajustar visual | Campos de configuração, presets | Sim | Sidebar em desktop, overlay em mobile |
| Overlay de configurações mobile | Acessar configurações em mobile | Modal/drawer | Sim | Ativado por botão |
| Notificação de sucesso/erro | Feedback ao exportar/importar | Toast/banner | Sim | Desaparece automaticamente |

### Tela 1 — Aplicação principal

#### Finalidade

Tela única que centraliza edição, preview, configurações e exportação.

#### Elementos principais

- Header com logo/nome do produto e ações principais (importar, exportar, templates).
- Área de editor Markdown com toolbar.
- Área de preview paginado.
- Painel de configurações (sidebar ou overlay).
- Notificações (toast).

#### Ações do usuário

- Digitar/editar Markdown.
- Importar arquivo.
- Selecionar template.
- Ajustar configurações visuais.
- Exportar PDF.

#### Estados necessários

- Estado inicial: template padrão carregado, preview renderizado.
- Estado de edição: conteúdo modificado, preview atualizado.
- Estado de exportação: botão de exportar mostra loading.
- Estado de sucesso: notificação de sucesso.
- Estado de erro: notificação de erro.
- Estado vazio: editor sem conteúdo, preview vazio.

#### Critérios de aceite da tela

- [ ] A tela abre sem erro no navegador.
- [ ] Editor e preview são visíveis simultaneamente em desktop.
- [ ] Em mobile, editor e preview podem alternar.
- [ ] Botões de ação (importar, exportar, templates) são acessíveis.

---

## 11. Dados e entidades

| Entidade | Finalidade | Campos prováveis | Relações | Observações |
|---|---|---|---|---|
| Documento | Conteúdo editado/importado | markdown (string), templateId (string) | Pertence a uma sessão | Existe apenas em memória |
| Configurações visuais | Controle de aparência | preset, fontSize, lineHeight, alignment, pageSize, orientation, margins, headingColor, editorTheme | Associada ao documento | Mantida durante sessão |
| Capa | Metadados da capa | enabled, title, subtitle, author, institution, date, theme, accentColor | Associada a configurações | Campos inferidos por heurísticas |
| Cabeçalho/Rodapé | Elementos recorrentes | showHeader, showFooter, headerText, footerText, showPageNumbers | Associada a configurações | Opcional |
| Template | Modelo inicial | id, name, icon, description, markdown, recommendedConfig | Referenciado por documento | Carrega conteúdo + configurações |
| Metadados inferidos | Dados extraídos do Markdown | title, subtitle, author, institution, date, headerText, footerText | Associados ao documento | Podem ser sobrescritos |
| Arquivo importado | Origem do conteúdo | fileName, content, encoding | Carregado para o documento | Descartado após importação |
| PDF gerado | Arquivo final | fileName, pageCount, fileSize | Gerado a partir do documento | Baixado localmente |

Não há definição de schema técnico. Não há banco de dados. Dados existem apenas em memória durante a sessão do navegador.

---

## 12. Regras de negócio

| Regra | Descrição | Obrigatória? | Critério de aceite |
|---|---|---|---|
| Documento único por sessão | O usuário trabalha em um documento por vez | Sim | Não há funcionalidade de múltiplos documentos no MVP |
| Template como ponto de partida | O documento inicial vem de um template | Sim | App carrega template padrão ao abrir |
| Quebra de página por `---` | Linha isolada com `---` cria quebra física | Sim | `---` no Markdown resulta em nova página no preview |
| Capa opcional | Capa pode ser habilitada ou desabilitada | Sim | Toggle de capa funciona corretamente |
| Metadados inferidos | Título, subtítulo, autor, etc. são extraídos do Markdown | Sim | Primeiro `#` heading vira título da capa |
| Campos sobrescritos manualmente | Usuário pode corrigir metadados inferidos | Sim | Campo sobrescrito não é substituído por nova heurística |
| Cabeçalho/rodapé opcionais | Podem ser habilitados ou desabilitados | Sim | Toggle funciona corretamente |
| PDF gerado no navegador | Sem envio de dados para servidor | Sim | Nenhuma requisição de rede para gerar PDF |
| Nome descritivo do PDF | Nome do arquivo contém referência ao documento | Sim | Nome não é genérico |
| HTML sanitizado | HTML no Markdown é sanitizado antes de renderizar | Sim | Tags perigosas são removidas |
| Sem persistência server-side | Dados existem apenas em memória | Sim | Nenhuma chamada a API/backend para salvar |
| Preview fiel ao PDF | Preview deve representar resultado final | Sim | Páginas do preview correspondem às páginas do PDF |

---

## 13. Permissões e papéis de usuário

| Papel | Permissões | Restrições | Observações |
|---|---|---|---|
| Usuário anônimo | Editar, importar, configurar, exportar | Sem persistência, sem login, sem histórico | Único papel no MVP |

Não há login, tipos de usuário ou permissões no MVP. Qualquer pessoa que acessa a URL pode usar o produto.

---

## 14. Integrações

| Integração | Finalidade | Status | Risco | Observação |
|---|---|---|---|---|
| Vercel | Deploy e hospedagem do site estático | Confirmada | Baixo | SPA sem backend |
| CDN Tailwind | Estilização via CDN | Confirmada — substituir no MVP | Alto | CDN em runtime é risco; deve ser substituído por dependência local |
| CDN marked | Parser Markdown | Confirmada — substituir no MVP | Alto | Deve ser instalado como dependência npm |
| CDN jspdf | Geração de PDF | Confirmada — substituir no MVP | Alto | Deve ser instalado como dependência npm |
| CDN html2canvas | Captura de páginas como imagem | Confirmada — substituir no MVP | Alto | Deve ser instalado como dependência npm |
| DOMPurify (ou similar) | Sanitização de HTML | Ponto de decisão (PD-10) | Médio | Recomendação: DOMPurify como dependência npm |
| GEMINI_API_KEY | Sem uso real identificado | Ponto de decisão | Alto | Deve ser removida ou documentada |

Nota: as CDNs atuais (Tailwind, marked, jspdf, html2canvas) são risco para produção. O PRD recomenda substituí-las por dependências npm locais antes do deploy na Vercel. Essa correção é considerada parte da estabilização do MVP.

---

## 15. Requisitos não funcionais

### 15.1. Desempenho

- O preview deve atualizar em menos de 1 segundo após alteração do conteúdo para documentos de até 5.000 caracteres.
- A exportação PDF deve concluir em menos de 10 segundos para documentos de até 20 páginas.
- O editor deve suportar ao menos 10.000 caracteres sem travamento perceptível.

### 15.2. Responsividade

- O app deve funcionar em telas a partir de 320px de largura (mobile).
- Em desktop (>= 1024px), editor e preview devem ser visíveis simultaneamente.
- Em mobile (< 768px), editor e preview podem alternar entre si.
- Botões e controles devem ter ao menos 44px de área de toque em mobile.

### 15.3. Segurança

- HTML no Markdown deve ser sanitizado antes de renderizar.
- Nenhuma chave de API ou segredo deve estar exposto no bundle de produção.
- O app não deve enviar conteúdo do usuário para servidores externos.

### 15.4. Manutenibilidade

- O código deve ser TypeScript com tipagem estrita.
- Componentes React devem ter responsabilidade única.
- Configurações visuais devem ser centralizadas em um único arquivo de constantes.

### 15.5. Acessibilidade

- Botões devem ter texto alternativo ou aria-label.
- Contraste de texto deve ser legível (WCAG AA mínimo).
- O app deve ser navegável por teclado.

### 15.6. Confiabilidade

- A exportação PDF deve gerar arquivo válido e abrível em leitores de PDF padrão.
- O preview deve corresponder ao PDF final com fidelidade visual aceitável.
- Mensagens de erro devem ser claras e acionáveis.

### 15.7. Compatibilidade

- O app deve funcionar em Chrome, Firefox, Safari e Edge (versões recentes).
- O app deve funcionar em navegadores mobile (Chrome Android, Safari iOS).

---

## 16. Critérios de aceite gerais

| Critério | Como verificar | Obrigatório para MVP? |
|---|---|---|
| O app abre sem erro na URL da Vercel | Acessar URL e verificar console | Sim |
| O usuário pode digitar Markdown e ver preview | Digitar e conferir preview | Sim |
| O usuário pode importar arquivo `.md` | Upload e drag-and-drop | Sim |
| O usuário pode ajustar configurações visuais | Alterar cada configuração e conferir preview | Sim |
| O usuário pode exportar PDF | Clicar em exportar e verificar download | Sim |
| O PDF tem nome descritivo | Verificar nome do arquivo baixado | Sim |
| HTML perigoso é sanitizado | Inserir `<script>` e verificar que não executa | Sim |
| O app funciona em mobile | Testar em dispositivo ou emulador mobile | Sim |
| O app funciona em Chrome, Firefox, Safari, Edge | Testar em cada navegador | Sim |
| Não há erros no console do navegador | Abrir DevTools e verificar | Sim |
| CDNs foram substituídas por dependências locais | Verificar `package.json` e ausência de scripts CDN no HTML | Sim |
| GEMINI_API_KEY não está exposta no bundle | Verificar bundle de produção | Sim |

---

## 17. Riscos e mitigação

| Risco | Tipo | Impacto | Probabilidade | Mitigação |
|---|---|---|---|---|
| Sanitização de HTML muito restritiva | Técnico | Alto | Média | Testar com documentos que usam HTML; ajustar whitelist |
| Sanitização de HTML muito permissiva | Segurança | Alto | Baixa | Usar biblioteca madura (DOMPurify); testar XSS |
| Preview não corresponde ao PDF | Produto | Alto | Alta | Definir critérios de fidelidade; testar com documentos variados |
| PDF muito pesado para documentos longos | Técnico | Médio | Média | Definir limite de páginas; otimizar captura |
| Toolbar insuficiente para pessoa não técnica | Produto | Alto | Média | Testar com público-alvo; iterar botões e tooltips |
| Heurísticas inferem metadados errados | Produto | Médio | Alta | Tornar campos editáveis; mostrar o que foi inferido |
| CDN indisponível em produção | Deploy | Alto | Baixa | Substituir por dependências npm locais |
| GEMINI_API_KEY exposta no bundle | Segurança | Alto | Média | Removê-la do código e configuração |
| Componentes grandes difíceis de manter | Técnico | Médio | Alta | Refatorar incrementalmente após testes |
| Sem testes automatizados | Técnico | Alto | Alta | Implementar Sprint 00B de testes antes de features |
| Git não detectado no projeto | Operacional | Médio | Alta | Inicializar repositório Git |
| Escopo inflado por melhorias incrementais | Escopo | Alto | Média | Cada melhoria deve ter justificativa e não quebrar funcionalidade |
| Documentos com tabelas grandes causam lentidão | Técnico | Médio | Média | Testar com documentos de referência; definir limites |
| Markdown como barreira para pessoa não técnica | Produto | Alto | Média | Templates, toolbar e preview como apoio; não exigir conhecimento prévio |

---

## 18. Métricas de sucesso

### Métricas de uso

- Número de PDFs exportados por sessão.
- Taxa de usuários que concluem o fluxo de exportação.
- Templates mais utilizados.

### Métricas de eficiência

- Tempo médio entre abrir o app e exportar PDF.
- Número de alterações de configuração antes de exportar.

### Métricas de qualidade

- Taxa de erros na exportação PDF.
- Correspondência visual entre preview e PDF (avaliação manual).
- Tamanho médio dos PDFs gerados.

### Métricas de negócio

- Hipótese: número de acessos únicos por semana.
- Hipótese: taxa de retorno de usuários.

Nota: métricas de negócio são hipóteses; não há analytics configurado no MVP. Recomenda-se adicionar analytics básico (Vercel Analytics) após validação do MVP.

---

## 19. Pontos de decisão pendentes

| Ponto de decisão | Por que importa | Impacto se não decidir | Prioridade |
|---|---|---|---|
| PD-01: Autosave local deve entrar no MVP? | Evita perda de conteúdo ao recarregar | Conteúdo é perdido ao recarregar a página | Média |
| PD-02: Qual critério de fidelidade entre preview e PDF? | Define aceite da exportação | Critérios de aceite ficam vagos | Alta |
| PD-03: Qual tamanho máximo de arquivo importado? | Define limites de importação | Arquivos grandes podem travar o app | Média |
| PD-04: Deve haver confirmação antes de substituir conteúdo? | UX; evita perda acidental | Usuário pode perder trabalho ao importar | Baixa |
| PD-05: Quais presets de estilo estarão disponíveis? | Define biblioteca visual do MVP | Presets podem não atender público-alvo | Média |
| PD-06: Quais temas de capa estarão disponíveis? | Define aparência da capa | Capa pode não atender expectativas | Baixa |
| PD-07: Quantos e quais templates no MVP? | Define pontos de partida | Templates podem não representar uso real | Média |
| PD-08: Quais heurísticas além de título/subtítulo? | Define automação de metadados | Campos ficam vazios ou errados | Baixa |
| PD-09: PDF deve ter limite de tamanho/páginas? | Define limites da exportação | PDFs muito grandes podem falhar | Média |
| PD-10: Qual biblioteca de sanitização? | Define implementação da sanitização | Sanitização pode ser insegura ou quebrar conteúdo | Alta |

---

## 20. Resumo para o agente de implementação

### 20.1. Objetivo da implementação

Estabilizar o protótipo existente, implementar sanitização de HTML, corrigir nome do PDF, substituir CDNs por dependências locais e preparar deploy na Vercel.

### 20.2. O que implementar no MVP

- Sanitização de HTML no Markdown (usar DOMPurify ou similar).
- Nome descritivo do arquivo PDF (regra de prioridade: título > heading > nome do arquivo importado > fallback).
- Substituir CDNs (Tailwind, marked, jspdf, html2canvas) por dependências npm.
- Configuração de build para Vercel (SPA, rotas, meta tags).
- Remover GEMINI_API_KEY do código e configuração.
- Validar exportação PDF real (download, páginas, fidelidade).
- Garantir responsividade básica em mobile.
- Garantir que toolbar funciona corretamente para pessoa não técnica.
- Implementar notificações de sucesso/erro na exportação.
- Inicializar repositório Git.

### 20.3. O que não implementar

- Login, contas, autenticação.
- Persistência server-side.
- Histórico de documentos.
- Editor WYSIWYG.
- Integração com IA.
- Colaboração em tempo real.
- Exportação para outros formatos.
- Monetização.
- Autosave (salvo decisão PD-01).

### 20.4. Regras críticas

- HTML no Markdown DEVE ser sanitizado antes de renderizar.
- Nome do PDF DEVE conter referência ao documento; NÃO DEVE ser genérico.
- PDF DEVE ser gerado no browser; NÃO DEVE enviar conteúdo para servidor.
- CDNs NÃO DEVEM estar presentes no bundle de produção.
- GEMINI_API_KEY NÃO DEVE estar exposta no bundle.
- Preview DEVE corresponder ao PDF com fidelidade visual aceitável.
- Componentes grandes DEVEM ser mantidos intactos salvo necessidade de correção de bug.

### 20.5. Telas obrigatórias

- Tela principal com editor + preview + configurações.
- Painel de configurações (sidebar em desktop, overlay em mobile).
- Notificações de sucesso/erro.

### 20.6. Entidades principais

- Documento (conteúdo Markdown em memória).
- Configurações visuais (preset, fonte, margens, formato, orientação, capa, cabeçalho, rodapé).
- Template (modelo inicial com conteúdo e configurações).
- Metadados inferidos (título, subtítulo, autor, etc.).

### 20.7. Critérios de aceite essenciais

- App abre sem erro na Vercel.
- Usuário pode editar, importar, configurar e exportar.
- PDF é baixado com nome descritivo.
- HTML `<script>` não é executado.
- CDNs não estão no bundle de produção.
- App funciona em mobile sem layout quebrado.
- Não há erros no console.

### 20.8. Pontos que o coder não deve decidir sozinho

- PD-01: Autosave no MVP? → Decisão humana pendente.
- PD-02: Critério de fidelidade preview/PDF → Decisão humana pendente.
- PD-05: Presets de estilo → Pode usar os existentes no código; não criar novos sem autorização.
- PD-07: Templates do MVP → Usar os existentes no código; não remover sem autorização.
- PD-10: Biblioteca de sanitização → Recomendação: DOMPurify; confirmar antes de implementar.
- Não redesenhar componentes grandes sem justificativa de bug.
- Não adicionar funcionalidade fora do escopo do PRD.
- Não transformar brainstorming em requisito.

---

## 21. Checklist de qualidade do PRD

| Item | Status | Observação |
|---|---|---|
| Escopo claro | OK | MVP enxuto; fora de escopo explícito; V1/V2/V3 diferenciados |
| Regras claras | OK | 12 regras de negócio com critérios de aceite verificáveis |
| Critérios de aceite claros | OK | Checkboxes verificáveis em cada funcionalidade e fluxo |
| Telas definidas | OK | 6 telas/componentes listados com estados necessários |
| Dados definidos | OK | 8 entidades conceituais; sem schema técnico |
| Riscos mapeados | OK | 14 riscos com tipo, impacto, probabilidade e mitigação |
| Fora de escopo definido | OK | 15 itens explicitamente fora do MVP |
| MVP separado de V1 e futuras melhorias | OK | MVP, V1, V2, V3 claramente diferenciados |
| Pontos de decisão identificados | OK | 10 pontos de decisão (PD-01 a PD-10) |
| Pronto para virar plano de implementação | OK | Seção 20 fornece resumo executável para agente coder |
