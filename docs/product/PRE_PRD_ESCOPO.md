# Pré-PRD de Escopo

Projeto: Markdown para PDF / PDF Forge PRO  
Arquivo-base usado como referência: `docs/product/BROWNFIELD_ANALYSIS.md`  
Data desta versão: 2026-06-06  
Tipo de documento: Pré-PRD investigativo, não PRD final  
Status: Documento de escopo inicial para revisão humana

## 1. Resumo executivo

O produto existente é uma aplicação web client-side para escrever ou importar Markdown, visualizar o conteúdo em páginas simuladas de papel e exportar o resultado como PDF. O problema aparente é permitir que um usuário individual transforme conteúdo em Markdown em um PDF visualmente formatado sem depender de backend, conta de usuário ou ferramenta externa complexa.

O estágio atual é de protótipo funcional: há editor, toolbar, preview paginado, configurações visuais, importação de arquivos e exportação PDF implementados. Há decisões novas de produto: o PDF gerado não deve ter nome genérico; o nome do arquivo precisa conter referência ao documento criado; o público principal do MVP é pessoa não técnica que quer PDF bonito; e PDF visual/rasterizado é aceitável no MVP. Ainda não há PRD, critérios de aceite formais, plano de implementação ou infraestrutura de testes. Todas as 5 perguntas críticas foram respondidas: público principal, PDF rasterizado, HTML com sanitização, deploy na Vercel e foco em estabilização.

Nível de maturidade do escopo: `Escopo parcialmente definido`.

As 5 perguntas críticas foram respondidas. Ainda existem dúvidas não críticas que podem ser resolvidas no PRD, como regra exata do nome do PDF, formatos de entrada, autosave, configurações visuais e detalhes de deploy na Vercel.

## 2. Objetivo do produto

### Objetivo confirmado

- Permitir que o usuário edite conteúdo Markdown em uma interface web.
- Permitir que o usuário visualize o conteúdo como páginas simuladas de documento.
- Permitir que o usuário exporte o documento para PDF no navegador.
- Priorizar pessoa não técnica que quer PDF bonito como usuário principal do MVP.
- Aceitar PDF visual/rasterizado no MVP; texto selecionável, pesquisável e acessível não é requisito bloqueante neste ciclo.
- Gerar o PDF com nome de arquivo descritivo derivado do documento criado, evitando nomes genéricos.
- Permitir ajustes visuais como estilo, capa, cabeçalho, rodapé, margens, formato e orientação de página.
- Operar sem backend. Deploy na Vercel como site estático.

### Hipóteses de objetivo

- Hipótese: o produto quer ser uma alternativa simples para transformar Markdown em PDFs com aparência editorial.
- Hipótese: o valor principal está em unir editor, preview paginado e exportação local em uma única tela.
- Hipótese: o produto pode priorizar privacidade por processar tudo localmente no browser.
- Hipótese: o MVP deveria estabilizar e validar o fluxo existente antes de adicionar recursos novos.

### Dúvidas sobre o objetivo

- DÚVIDA: o objetivo é criar uma ferramenta genérica de Markdown para PDF ou atender um tipo específico de documento, como relatórios, propostas, e-books, documentação técnica ou trabalhos acadêmicos?
- Resolvido: o PDF final pode ser visual/rasterizado no MVP; texto selecionável, pesquisável e acessível não é requisito obrigatório neste ciclo.
- DÚVIDA: o produto deve continuar 100% local/browser ou deve virar um produto hospedado com persistência, contas ou histórico?
- DÚVIDA: o objetivo do próximo ciclo é estabilizar o protótipo atual ou redesenhar o produto antes da implementação?

## 3. Problema que o produto resolve

O produto parece resolver a necessidade de transformar textos em Markdown em PDFs visualmente organizados, com controle de página, capa, cabeçalho, rodapé, estilos e exportação local.

Quem sente essa dor, com base no arquivo Brownfield:

- usuário final individual que precisa transformar Markdown em PDF visualmente formatado.

Como essa dor é resolvida hoje:

- Não informado.
- Hipótese: usuários podem copiar o conteúdo para editores de texto, usar ferramentas de linha de comando, exportadores online ou editores de documentos, mas isso ainda não foi confirmado.

Por que vale a pena criar esse produto:

- DÚVIDA: ainda não há validação de mercado ou casos de uso de alto valor; o público prioritário do MVP já foi definido como pessoa não técnica que quer PDF bonito.
- Hipótese: vale a pena se o produto reduzir fricção entre escrever em Markdown e gerar um PDF visualmente aceitável sem configuração técnica pesada.
- Hipótese: vale a pena se o preview paginado for confiável o bastante para evitar tentativa e erro na exportação.

## 4. Público-alvo

- Público principal do MVP: pessoa não técnica que quer PDF bonito. Status: Confirmado pelo usuário em 2026-06-06.
- Público secundário: pessoas que já sabem Markdown, devs, redatores, consultores ou empresas podem usar, mas não são o foco principal confirmado do MVP.
- Tipo de usuário: pessoa que edita ou importa conteúdo, usa apoio de templates/toolbar/configurações simples e quer baixar PDF visualmente bonito. Status: Confirmado/derivado da decisão do usuário.
- Contexto de uso: uso em navegador, em uma única rota, sem login e sem backend identificado. Status: Confirmado no estado atual.
- Nível técnico esperado do usuário: não técnico; o produto deve reduzir dependência de conhecimento prévio de Markdown.

Decisão: o produto precisa ser acessível para pessoas não técnicas que usam botões, templates e ajustes simples como apoio.

## 5. Personas principais

### Persona 1 — Pessoa não técnica que quer PDF bonito

- Perfil: pessoa que não quer depender de ferramenta técnica complexa e precisa gerar PDF com aparência profissional.
- Objetivo: criar ou adaptar um documento e exportar um PDF bonito, com apoio de templates, toolbar e configurações simples.
- Dor principal: dificuldade de formatar documentos manualmente e manter consistência visual.
- O que precisa fazer no produto: escolher ou importar conteúdo, editar com apoio visual, conferir preview, ajustar aparência e baixar PDF.
- Status: Confirmada como público principal do MVP pelo usuário em 2026-06-06.
- Risco específico: Markdown pode ser barreira de entrada; o PRD deve prever ajuda guiada sem transformar o MVP em editor WYSIWYG completo.

### Persona 2 — Usuário que já conhece Markdown

- Perfil: pessoa técnica, redator, dev, consultor ou estudante que já possui ou escreve conteúdo em Markdown.
- Objetivo: transformar rapidamente um documento Markdown em PDF com visual aceitável.
- Dor principal: dificuldade de obter um PDF paginado e visualmente previsível a partir de Markdown.
- O que precisa fazer no produto: editar ou importar Markdown, conferir preview, ajustar aparência e baixar PDF.
- Status: Secundária; não é o foco principal confirmado do MVP.

## 6. Funcionalidades principais

| Funcionalidade | Descrição | Status | Observação |
|---|---|---|---|
| Editor Markdown | Área principal para escrever e editar Markdown. | Confirmada | Existe em `App.tsx`; confirmada como protótipo, não necessariamente como escopo final fechado. |
| Importação de arquivos Markdown/texto | Permite carregar `.md`, `.markdown` e `.txt`. | Confirmada | Implementada, mas não testada manualmente de forma conclusiva no Brownfield. |
| Importação por drag and drop | Permite arrastar arquivo para carregar conteúdo. | Confirmada | Implementada no código; não testada manualmente no Brownfield. |
| Toolbar de formatação | Botões para inserir sintaxe Markdown. | Confirmada | Útil para usuários menos técnicos; critérios ainda não definidos. |
| Preview paginado | Renderiza o documento em páginas simuladas A4/Letter. | Confirmada | Funcionalidade central; precisa de critérios de fidelidade e limites. |
| Quebra física de página com `---` | Linha isolada com `---` representa quebra de página. | Confirmada | Regra implícita identificada no Brownfield. |
| Configurações visuais | Ajustes de estilo, fonte, alinhamento, formato, orientação e margens. | Confirmada | Escopo exato do MVP ainda precisa ser fechado. |
| Capa opcional | Permite renderizar capa antes do corpo do documento. | Confirmada | Implementada; precisa definir se é MVP obrigatório. |
| Cabeçalho, rodapé e numeração | Configura elementos recorrentes nas páginas. | Confirmada | Implementado; precisa critérios de aceite. |
| Templates predefinidos | Permite iniciar documento com modelos. | Confirmada | Implementado; quantidade e tipos ideais são DÚVIDA. |
| Heurística de metadados | Extrai título, subtítulo, autor, instituição, data, cabeçalho e rodapé do Markdown. | Confirmada | Sem testes automatizados; risco de erro silencioso. |
| Exportação para PDF | Captura páginas e baixa PDF no browser. | Confirmada | Implementada, mas download real não foi validado de forma conclusiva. |
| Nome descritivo do arquivo PDF | O PDF baixado não deve ter nome genérico; o nome precisa conter algo do documento criado. | Confirmada | DECISÃO HUMANA registrada; falta detalhar no PRD a regra exata de prioridade, como título, primeiro heading, metadado ou trecho inicial sanitizado. |
| Política de Markdown/HTML seguro | HTML será permitido apenas com sanitização. | Confirmada | DECISÃO HUMANA em 2026-06-06. O PRD deve definir biblioteca de sanitização, tags/atributos permitidos e tratamento de HTML inválido. |
| PDF visual/rasterizado no MVP | O MVP pode aceitar PDF visual/rasterizado; texto selecionável, pesquisável e acessível não é obrigatório neste ciclo. | Confirmada | Decisão do usuário: "Tanto faz"; no PRD, tratar texto selecionável/acessível como melhoria futura ou requisito não bloqueante. |

## 7. Funcionalidades secundárias

| Funcionalidade | Valor esperado | Risco de escopo | Status |
|---|---|---|---|
| Autosave/persistência local | Evitar perda de conteúdo ao recarregar a página. | Médio | Hipótese |
| Histórico de documentos locais | Permitir retomar trabalhos anteriores. | Alto | DÚVIDA — RISCO DE ESCOPO |
| Exportação com texto selecionável | Melhorar acessibilidade, busca e cópia do PDF. | Alto | Futuro / Não obrigatório no MVP |
| Templates customizáveis pelo usuário | Aumentar flexibilidade visual. | Alto | Hipótese — RISCO DE ESCOPO |
| Pré-configurações por tipo de documento | Facilitar uso para relatório, proposta, artigo etc. | Médio | Hipótese |
| Validação visual antes de exportar | Reduzir PDFs quebrados ou páginas inesperadas. | Médio | Hipótese |
| Modo mobile completo | Permitir uso confortável em telas pequenas. | Médio | DÚVIDA |
| Notificações de sucesso/erro | Ajudar o usuário a entender exportação e falhas. | Baixo | Confirmada no código; não validada conclusivamente |
| Modal de dicas de paginação | Ensinar como controlar quebras de página. | Baixo | Confirmada no código; não testada manualmente |
| Integração com IA/Gemini | Sugerir formatação, resumo ou estrutura. | Alto | DÚVIDA — RISCO DE ESCOPO e RISCO TÉCNICO |
| Login e nuvem | Salvar documentos e acessar em vários dispositivos. | Alto | DÚVIDA — RISCO DE ESCOPO |

## 8. Brainstorming Controlado

Esta seção serve para explorar possibilidades, não para definir escopo aprovado.

Nenhuma ideia desta seção deve ser considerada requisito obrigatório sem decisão humana posterior.

### 8.1 Ideias possíveis para o produto

| Ideia | Valor potencial | Complexidade | Risco de escopo | Recomendação |
|---|---|---|---|---|
| MVP local focado em editor + preview + PDF confiável | Alto | Média | Baixo | MVP |
| Política explícita de HTML: bloquear, permitir com sanitização ou permitir apenas Markdown puro | Alto | Média | Médio | MVP — Requer decisão |
| Validação de exportação PDF com documento de exemplo | Alto | Média | Baixo | MVP |
| Nome automático/descritivo do PDF com base no documento | Médio | Baixa/Média | Baixo | MVP |
| Autosave local do Markdown atual | Médio | Média | Médio | Requer decisão |
| Biblioteca pequena de templates por caso de uso | Médio | Média | Médio | Futuro ou MVP limitado |
| Exportação PDF com texto selecionável | Alto | Alta | Alto | Futuro — não obrigatório no MVP |
| Modo de impressão via navegador como alternativa ao PDF por screenshot | Médio | Alta | Alto | Futuro — Requer decisão |
| Editor visual WYSIWYG além do Markdown | Médio | Alta | Alto | Descartar por enquanto |
| Conta de usuário e documentos na nuvem | Médio | Alta | Alto | Futuro, não MVP |
| Colaboração em tempo real | Baixo/Médio | Alta | Alto | Descartar por enquanto |
| Integração com IA para reescrever ou formatar conteúdo | Médio | Alta | Alto | Descartar por enquanto até decisão humana |
| Exportação para DOCX/HTML além de PDF | Médio | Alta | Alto | Futuro |
| Modo offline instalável | Médio | Média | Médio | Futuro, se produto local for prioridade |

### 8.2 Possíveis diferenciais

- Preview paginado fiel ao PDF final — `Possível MVP`.
- Geração local no browser sem enviar conteúdo para servidor — `Requer validação` como posicionamento de produto.
- Templates editoriais simples para documentos comuns — `Requer validação`.
- Controle manual de quebras de página com `---` — `Possível MVP`.
- Nome do PDF derivado do conteúdo do documento, em vez de nome genérico — `Possível MVP`.
- Ajuste visual sem sair da tela de edição — `Possível MVP`.
- PDF com texto selecionável e acessível — `Futuro / não obrigatório no MVP`.
- IA para melhorar conteúdo ou layout — `Descartar por enquanto`.
- Conta, nuvem e histórico multi-dispositivo — `Versão futura`.

### 8.3 Versões possíveis do produto

#### Versão 1 — MVP enxuto

- Foco: estabilizar o fluxo local existente de escrever/importar Markdown, visualizar páginas e exportar PDF.
- Funcionalidades incluídas:
  - editor Markdown;
  - importação básica de `.md`, `.markdown` e `.txt`;
  - toolbar básica;
  - preview paginado;
  - quebra de página por `---`;
  - configurações essenciais de página e estilo;
  - exportação PDF validada;
  - nome do arquivo PDF derivado do documento criado;
  - política definida para HTML/Markdown seguro.
- Funcionalidades excluídas:
  - login;
  - nuvem;
  - colaboração;
  - IA;
  - monetização;
  - histórico de documentos;
  - exportações além de PDF;
  - editor WYSIWYG completo.
- Risco: como PDF rasterizado é aceitável no MVP, o foco de validação deve ser fidelidade visual, legibilidade e download real do arquivo.
- Por que faz sentido: reduz escopo e valida a promessa principal antes de expandir.

#### Versão 2 — Produto intermediário

- Foco: tornar o produto mais confiável e confortável para uso recorrente.
- Funcionalidades incluídas:
  - tudo do MVP;
  - autosave local, se aprovado;
  - templates mais claros por tipo de documento;
  - mensagens de erro melhores;
  - validações de documento antes da exportação;
  - melhoria da experiência mobile;
  - critérios de performance para documentos maiores.
- Funcionalidades excluídas:
  - colaboração em tempo real;
  - backend com contas;
  - IA;
  - billing;
  - marketplace de templates.
- Risco: autosave, templates e mobile podem inflar se não forem limitados.
- Por que faz sentido: melhora retenção e confiabilidade sem transformar o produto em plataforma.

#### Versão 3 — Produto completo

- Foco: transformar a ferramenta em uma plataforma de criação, gestão e exportação de documentos.
- Funcionalidades incluídas:
  - contas de usuário;
  - biblioteca de documentos;
  - templates customizáveis;
  - múltiplos formatos de exportação;
  - possíveis recursos de IA;
  - histórico e versionamento;
  - possível monetização.
- Funcionalidades excluídas:
  - Não informado; dependeria de estratégia de negócio.
- Risco: alto risco de escopo, arquitetura, segurança, dados, permissões e custo de manutenção.
- Por que faz sentido: só faria sentido após validação clara do MVP e demanda real por uso recorrente.

### 8.4 Ideias que NÃO devem entrar agora

#### IA/Gemini para gerar ou melhorar conteúdo

- Por que é tentadora: poderia diferenciar o produto e ajudar usuários a formatar documentos.
- Por que é arriscada: há configuração de `GEMINI_API_KEY` sem uso real identificado, risco de exposição no frontend e ausência de decisão de produto.
- Quando poderia ser considerada no futuro: depois de definir se o produto terá backend seguro, política de dados e caso de uso claro para IA.

#### Login, nuvem e histórico de documentos

- Por que é tentadora: aumenta retenção e permite documentos salvos.
- Por que é arriscada: adiciona autenticação, banco, permissões, privacidade, deploy e suporte.
- Quando poderia ser considerada no futuro: após validar que usuários precisam retomar documentos entre sessões/dispositivos.

#### Colaboração em tempo real

- Por que é tentadora: poderia aproximar o produto de editores colaborativos.
- Por que é arriscada: muda completamente a arquitetura e não aparece como necessidade no Brownfield.
- Quando poderia ser considerada no futuro: somente com demanda comprovada de equipes.

#### Editor WYSIWYG completo

- Por que é tentadora: reduz barreira para usuários que não sabem Markdown.
- Por que é arriscada: duplica complexidade de edição, parsing, preview e exportação.
- Quando poderia ser considerada no futuro: se templates, toolbar e ajuda guiada forem insuficientes para o público principal não técnico.

#### Exportação para DOCX, HTML, EPUB ou múltiplos formatos

- Por que é tentadora: aumenta utilidade.
- Por que é arriscada: cada formato traz regras próprias de layout, compatibilidade e testes.
- Quando poderia ser considerada no futuro: depois que o PDF estiver estável e validado.

## 9. Fluxos de usuário

### Fluxo 1 — Criar PDF a partir do template padrão

- Usuário: pessoa não técnica que quer gerar PDF bonito a partir de conteúdo editável/importado.
- Objetivo: abrir o app, editar conteúdo inicial e exportar PDF.
- Passos prováveis:
  1. Abrir a aplicação.
  2. Editar o Markdown inicial.
  3. Ajustar estilo, capa ou página se necessário.
  4. Conferir preview paginado.
  5. Clicar em baixar PDF.
- Resultado esperado: PDF baixado localmente com aparência compatível com o preview e nome de arquivo relacionado ao documento criado.
- Dúvidas:
  - DÚVIDA: quais critérios definem que o preview é fiel ao PDF?
  - DÚVIDA: qual tamanho de arquivo PDF é aceitável para documentos típicos?
- Riscos:
  - RISCO TÉCNICO: exportação por screenshot pode gerar PDF pesado, mesmo sendo aceitável como PDF visual/rasterizado no MVP.

### Fluxo 2 — Importar arquivo Markdown/texto e exportar

- Usuário: usuário que já possui arquivo `.md`, `.markdown` ou `.txt`.
- Objetivo: carregar arquivo existente e gerar PDF.
- Passos prováveis:
  1. Clicar em importar ou arrastar arquivo.
  2. O app carrega o conteúdo.
  3. Heurísticas tentam preencher metadados.
  4. Usuário revisa configurações.
  5. Usuário exporta PDF.
- Resultado esperado: documento importado aparece no editor e preview, sem perda inesperada de conteúdo.
- Dúvidas:
  - DÚVIDA: qual tamanho máximo de arquivo deve ser suportado?
  - DÚVIDA: HTML embutido no Markdown deve ser aceito?
- Riscos:
  - RISCO TÉCNICO: importação de conteúdo malicioso pode explorar renderização sem sanitização.

### Fluxo 3 — Formatar conteúdo usando toolbar

- Usuário: usuário que quer inserir sintaxe Markdown com ajuda visual.
- Objetivo: aplicar formatação sem memorizar toda a sintaxe.
- Passos prováveis:
  1. Selecionar texto no editor.
  2. Clicar em botão de formatação.
  3. Conferir atualização no preview.
- Resultado esperado: Markdown correto inserido no editor e renderizado no preview.
- Dúvidas:
  - DÚVIDA: a toolbar é parte obrigatória do MVP ou apoio secundário?
- Riscos:
  - RISCO DE PRODUTO: se o público for não técnico, a toolbar atual pode ser insuficiente.

### Fluxo 4 — Ajustar aparência do documento

- Usuário: usuário que quer controlar visual do PDF.
- Objetivo: configurar estilo, fonte, formato, orientação, margens, capa, cabeçalho e rodapé.
- Passos prováveis:
  1. Abrir painel de configurações.
  2. Selecionar preset ou ajustar campos.
  3. Conferir resultado no preview.
  4. Exportar PDF.
- Resultado esperado: alterações visuais refletidas no preview e no PDF.
- Dúvidas:
  - DÚVIDA: quais configurações são essenciais no MVP?
  - DÚVIDA: quais configurações podem ser removidas ou adiadas?
- Riscos:
  - RISCO DE ESCOPO: muitas configurações podem deixar o MVP grande demais e difícil de testar.

### Fluxo 5 — Uso em mobile

- Usuário: usuário em tela pequena.
- Objetivo: editar, configurar e exportar em dispositivo móvel.
- Passos prováveis:
  1. Abrir app no celular.
  2. Usar editor e botão de configurações.
  3. Ajustar opções no overlay.
  4. Exportar PDF.
- Resultado esperado: fluxo utilizável sem layout quebrado.
- Dúvidas:
  - DÚVIDA: mobile é requisito obrigatório do MVP ou apenas responsividade básica?
- Riscos:
  - RISCO DE PRODUTO: editar documentos longos em mobile pode ser experiência ruim.

## 10. Telas necessárias

| Tela | Finalidade | Obrigatória? | Dúvidas |
|---|---|---|---|
| Aplicação principal `/` | Centralizar editor, preview e configurações. | Sim | Precisa definir se o layout atual será mantido ou redesenhado. |
| Área de editor Markdown | Escrever/importar conteúdo. | Sim | Precisa definir recursos mínimos da toolbar. |
| Área de preview paginado | Visualizar páginas simuladas. | Sim | Precisa definir fidelidade esperada em relação ao PDF final. |
| Painel de configurações desktop | Ajustar visual, página, capa, cabeçalho e rodapé. | Sim/Hipótese | Precisa definir quais opções ficam no MVP. |
| Overlay de configurações mobile | Permitir ajustes em telas pequenas. | Hipótese | Mobile precisa ser obrigatório? |
| Modal de dicas de paginação | Explicar uso de quebras de página. | Não/Hipótese | Pode ser substituído por ajuda inline? |
| Notificação de sucesso/erro | Informar resultado da exportação. | Sim/Hipótese | Precisa validar mensagens e estados de erro. |
| Tela de login | Autenticação. | Não | Não há login no estado atual; só considerar se houver decisão humana. |
| Tela de biblioteca de documentos | Listar documentos salvos. | Não | Fora do MVP salvo decisão sobre persistência/histórico. |

## 11. Regras de negócio

| Regra | Status | Observação |
|---|---|---|
| O usuário trabalha em um único documento por sessão. | Confirmada | Regra implícita do estado atual; futuro com múltiplos documentos é DÚVIDA. |
| O documento inicial vem de um template predefinido. | Confirmada | Implementado em `templates.ts`. |
| Uma linha isolada com `---` representa quebra física de página. | Confirmada | Regra central de paginação manual. |
| O preview deve representar o PDF final com alta fidelidade visual. | Hipótese | Brownfield indica intenção implícita; critérios ainda não definidos. |
| A capa é opcional. | Confirmada | Implementada no protótipo. |
| Metadados podem ser inferidos automaticamente do Markdown. | Confirmada | Implementado por heurísticas. |
| Campos inferidos podem ser sobrescritos manualmente. | Confirmada | Implementado no protótipo. |
| Cabeçalho, rodapé e numeração são opcionais/configuráveis. | Confirmada | Implementado no protótipo. |
| O PDF final é gerado no navegador e baixado localmente. | Confirmada | Implementado no código; download real ainda não validado conclusivamente. |
| O arquivo PDF gerado não deve usar nome genérico e deve conter referência ao documento criado. | Confirmada | DECISÃO HUMANA: regra de composição do nome deve ser detalhada no PRD final. |
| Não há salvamento em servidor, conta ou histórico. | Confirmada | Estado atual; não necessariamente decisão permanente. |
| HTML embutido no Markdown pode ser renderizado. | DÚVIDA | Precisa de política explícita: permitir, sanitizar ou bloquear. |
| O PDF pode ser rasterizado como imagem. | DÚVIDA | Precisa decisão sobre texto selecionável/acessível. |

As regras de negócio ainda precisam ser detalhadas antes do PRD final.

## 12. Dados e entidades

| Entidade/Dado | Por que precisa existir | Status | Dúvidas |
|---|---|---|---|
| Documento Markdown atual | Conteúdo editado/importado pelo usuário. | Confirmado | Deve ser salvo localmente ou permanecer só em memória? |
| Configurações visuais | Controlam estilo, formato, margens, orientação, capa, cabeçalho e rodapé. | Confirmado | Quais configurações fazem parte do MVP? |
| Template selecionado | Define conteúdo e configurações iniciais. | Confirmado | Quantos templates são necessários? |
| Metadados inferidos | Preenchem título, subtítulo, autor, instituição, data, cabeçalho e rodapé. | Confirmado | Quais heurísticas são aceitáveis? |
| Overrides manuais de metadados | Permitem corrigir valores inferidos. | Confirmado | Como sinalizar ao usuário que um valor foi inferido? |
| Arquivo importado | Origem do conteúdo carregado pelo usuário. | Confirmado | Há limite de tamanho, codificação ou tipos permitidos? |
| PDF gerado | Arquivo final baixado pelo usuário. | Confirmado | PDF precisa conter texto real, metadados, acessibilidade ou apenas imagem? |
| Nome do arquivo PDF | Evita download com nome genérico e ajuda o usuário a identificar o documento exportado. | Confirmado | Qual fonte deve ter prioridade: título do documento, primeiro H1, metadado inferido, nome do arquivo importado ou trecho inicial sanitizado? |
| Rascunho salvo localmente | Evita perda de conteúdo. | Hipótese | DECISÃO HUMANA: incluir autosave no MVP? |
| Histórico de documentos | Permite retomar documentos anteriores. | DÚVIDA | RISCO DE ESCOPO; exige persistência e UX adicional. |
| Usuário/conta | Identidade para login e sincronização. | DÚVIDA | Não existe no estado atual; provavelmente fora do MVP. |

Não há definição de schema técnico neste Pré-PRD. Não há escolha de banco de dados.

## 13. Usuários e permissões

Estado atual confirmado:

- Login: ausente.
- Tipos de usuário: ausentes.
- Permissões: ausentes.
- Administrador: ausente.
- Cliente/colaborador: ausentes.
- Acesso público: provável no estado atual, pois qualquer pessoa que abre a página pode usar.
- Acesso privado: Não informado.

DÚVIDA: o produto deve permanecer sem login e sem persistência, ou haverá contas de usuário no futuro?

Recomendação de escopo inicial: não assumir login, permissões, administrador, cliente, colaborador ou área privada no MVP sem decisão humana explícita.

## 14. Integrações necessárias

| Integração | Finalidade | Status | Risco |
|---|---|---|---|
| FileReader do browser | Ler arquivos importados pelo usuário. | Confirmada no protótipo | Médio |
| Download local via `jspdf.save` | Baixar PDF gerado localmente. | Confirmada no protótipo | Médio |
| ResizeObserver/medição de DOM | Recalcular preview e paginação. | Confirmada no protótipo | Médio |
| DOMParser | Apoiar renderização/medição do HTML convertido. | Confirmada no protótipo | Médio |
| `marked` via CDN | Converter Markdown em HTML. | Confirmada no protótipo | Alto |
| `html2canvas` via CDN | Capturar páginas como imagem. | Confirmada no protótipo | Alto |
| `jspdf` via CDN | Montar e salvar PDF. | Confirmada no protótipo | Alto |
| Tailwind CDN | Estilização utilitária em runtime. | Confirmada no protótipo | Alto |
| React/ReactDOM por importmap externo no `index.html` | Referência herdada no HTML. | Confirmada no arquivo, mas uso efetivo no build é ambíguo | Médio |
| Gemini/API key | Não há uso real identificado no app; aparece em README/configuração. | DÚVIDA | Alto |
| Backend/API remota | Não identificada. | Não confirmada | Alto se adicionada sem decisão |
| Serviço de autenticação | Não identificado. | Não confirmada | Alto se adicionada sem decisão |
| Pagamento/billing | Não informado. | Não confirmada | Alto se adicionada sem decisão |

Não inventar integrações como requisito. Integrações úteis, mas não solicitadas, devem permanecer como hipótese ou fora do escopo.

## 15. Monetização

Não informado.

Dúvidas caso monetização se torne aplicável:

- O produto será gratuito?
- Haverá assinatura?
- Haverá pagamento único?
- Haverá planos por volume de documentos ou recursos avançados?
- Haverá teste grátis?
- A cobrança será manual ou automática?
- Recursos como templates, exportação avançada, nuvem ou IA seriam pagos?

Nenhuma decisão de monetização deve ser assumida no PRD final sem confirmação humana.

## 16. Critérios de sucesso

### Critérios confirmados

- Nenhum critério de sucesso de produto foi confirmado formalmente.

### Critérios sugeridos

- O usuário consegue gerar um PDF a partir de Markdown sem usar backend.
- O preview paginado corresponde ao PDF exportado dentro de tolerância definida.
- Um documento de exemplo com múltiplas páginas exporta sem erro.
- O PDF exportado usa nome de arquivo descritivo derivado do documento, não um nome genérico.
- Importação de `.md`, `.markdown` e `.txt` funciona sem perda inesperada de conteúdo.
- Quebras de página com `---` produzem páginas previsíveis.
- O produto não executa HTML perigoso vindo do Markdown importado ou digitado, conforme política a definir.
- O usuário entende claramente quando a exportação falhou e o que pode fazer em seguida.
- O MVP preserva escopo enxuto e não adiciona login, nuvem, IA ou múltiplos formatos sem decisão explícita.

## 17. Riscos

### Riscos técnicos

- RISCO TÉCNICO: Markdown/HTML é renderizado via `dangerouslySetInnerHTML` sem sanitização visível, gerando risco de injeção de conteúdo malicioso.
- RISCO TÉCNICO: exportação PDF por screenshots/JPEG pode gerar arquivo pesado, sem texto selecionável e com perda de qualidade textual.
- RISCO TÉCNICO: dependências críticas carregadas por CDN podem falhar por rede, CSP, indisponibilidade externa ou mudanças de versão.
- RISCO TÉCNICO: Tailwind CDN não é recomendado para produção, conforme aviso registrado no console.
- RISCO TÉCNICO: `GEMINI_API_KEY` aparece em configuração/README sem uso real identificado, com risco de exposição no frontend se usada incorretamente.
- RISCO TÉCNICO: não há testes automatizados para heurísticas, paginação, importação ou exportação PDF.
- RISCO TÉCNICO: componentes grandes e acoplados aumentam risco de regressão em qualquer mudança.
- RISCO TÉCNICO: documentos longos podem degradar performance por medição de DOM e captura de páginas.

### Riscos de produto

- RISCO DE PRODUTO: público-alvo ainda não está definido com precisão.
- RISCO DE PRODUTO: se o usuário final não souber Markdown, o editor atual pode não resolver a dor principal.
- RISCO DE PRODUTO: se o usuário espera PDF pesquisável/selecionável, a exportação rasterizada pode frustrar adoção.
- RISCO DE PRODUTO: excesso de configurações pode tornar o produto difícil para usuários não técnicos.
- RISCO DE PRODUTO: falta de autosave pode causar perda de conteúdo e baixa confiança.
- RISCO DE PRODUTO: sem critérios de fidelidade preview/PDF, o usuário pode não confiar no resultado.

### Riscos de escopo

- RISCO DE ESCOPO: adicionar login, nuvem e histórico antes de validar o MVP muda o produto de ferramenta local para plataforma.
- RISCO DE ESCOPO: incluir IA/Gemini agora abre decisões de backend, custo, privacidade e segurança.
- RISCO DE ESCOPO: tentar suportar múltiplos formatos de exportação antes de estabilizar PDF multiplica testes e regras.
- RISCO DE ESCOPO: criar editor WYSIWYG completo pode substituir o conceito do produto e atrasar o MVP.
- RISCO DE ESCOPO: permitir templates customizáveis sem limite pode virar um sistema de design dentro do produto.

## 18. Dúvidas em aberto

| Dúvida | Categoria | Impacto | Prioridade |
|---|---|---|---|
| HTML dentro do Markdown será permitido, sanitizado ou bloqueado? | Funcionalidade/Segurança | Alto | Crítica — RESOLVIDA: permitido apenas com sanitização |
| O produto será local/browser, hospedado em produção ou ambos? | Objetivo/Deploy | Alto | Crítica |
| O MVP deve estabilizar o protótipo atual ou redesenhar a experiência? | Objetivo | Alto | Crítica |
| O app precisa de autosave local no MVP? | Dados/UX | Médio | Normal |
| Quais documentos são prioritários: relatórios, propostas, artigos, documentação técnica, e-books ou outros? | Público/Funcionalidade | Alto | Normal |
| Quais configurações visuais são realmente obrigatórias? | Funcionalidade | Médio | Normal |
| Qual limite de tamanho de documento deve ser suportado? | Risco/Performance | Médio | Normal |
| Mobile é requisito obrigatório ou apenas responsividade básica? | Telas/Fluxo | Médio | Normal |
| O download real de PDF já atende o mínimo esperado? | Critério de sucesso | Alto | Normal |
| A configuração Gemini deve ser removida, ignorada ou virar funcionalidade futura? | Integração | Médio | Normal |
| Haverá monetização? | Monetização | Baixo/Médio | Normal |
| Haverá login, biblioteca de documentos ou histórico? | Usuários/Dados | Alto | Normal |
| Qual tolerância aceitável entre preview e PDF exportado? | Critério de sucesso | Alto | Normal |
| Qual deve ser a ordem de prioridade para gerar o nome do PDF: título, primeiro H1, metadado, nome do arquivo importado ou trecho inicial? | Dados/Funcionalidade | Médio | Normal |

## 19. Perguntas essenciais para fechar o escopo

### Pergunta 1 — CRÍTICA

- Categoria: público-alvo
- Pergunta: Quem é o usuário principal do MVP: pessoa que já sabe Markdown, pessoa não técnica que quer PDF bonito, ou um perfil específico como estudante, consultor, redator, dev ou empresa?
- Por que importa: define complexidade da interface, linguagem, templates, toolbar e necessidade de ajuda guiada.
- O que muda dependendo da resposta: se o público não souber Markdown, o produto precisará mais orientação, templates e talvez simplificação da edição; se souber Markdown, o MVP pode focar em fidelidade e exportação.
- Resposta do usuário em 2026-06-06: pessoa não técnica que quer PDF bonito.
- Status: Resolvida; registrar como público principal do MVP.

### Pergunta 2 — CRÍTICA

- Categoria: funcionalidades obrigatórias
- Pergunta: O PDF precisa ter texto selecionável, pesquisável e acessível, ou um PDF visual/rasterizado é aceitável no MVP?
- Por que importa: essa decisão pode mudar completamente a estratégia de exportação.
- O que muda dependendo da resposta: se texto selecionável for obrigatório, a abordagem atual por captura de imagem pode não ser suficiente; se rasterizado for aceitável, o MVP pode priorizar estabilidade e qualidade visual.
- Resposta do usuário em 2026-06-06: tanto faz.
- Interpretação operacional: PDF visual/rasterizado é aceitável no MVP; texto selecionável, pesquisável e acessível não é requisito bloqueante deste ciclo.
- Status: Resolvida.

### Pergunta 3 — CRÍTICA

- Categoria: riscos
- Pergunta: HTML dentro do Markdown deve ser permitido, permitido apenas com sanitização, ou bloqueado completamente?
- Por que importa: entrada Markdown/HTML sem política clara gera risco de segurança e afeta compatibilidade com documentos existentes.
- O que muda dependendo da resposta: permitir HTML exige sanitização e testes; bloquear HTML simplifica segurança, mas pode quebrar documentos que dependem de HTML embutido.
- Estado atual verificado no código em 2026-06-06: HTML era permitido de fato sem sanitização. O app usava `marked.parse(section)` em `components/A4DocPreview.tsx` e injetava o resultado com `dangerouslySetInnerHTML`; não havia DOMPurify/sanitização visível nas dependências ou no código.
- Recomendação técnica para o MVP: permitir HTML apenas com sanitização, ou bloquear HTML se a prioridade for máxima simplicidade/segurança.
- Resposta do usuário em 2026-06-06: permitir HTML apenas com sanitização.
- Status: Resolvida. O PRD final deve especificar a biblioteca de sanitização (ex.: DOMPurify), a lista de tags/atributos permitidos e o comportamento quando HTML inválido for removido (avisar ou silenciar).

### Pergunta 4 — CRÍTICA

- Categoria: objetivo do produto
- Pergunta: O MVP deve ser uma ferramenta 100% local no navegador, um produto hospedado em produção, ou ambos?
- Por que importa: define expectativas de privacidade, deploy, dependências externas, persistência e suporte.
- O que muda dependendo da resposta: produto local evita backend e contas; produto hospedado pode exigir políticas de segurança, analytics, domínio, deploy e talvez termos de uso.
- Resposta do usuário em 2026-06-06: pretende fazer deploy na Vercel para publicar.
- Interpretação operacional: MVP hospedado em produção na Vercel como site estático (SPA/client-side). Sem backend no MVP. Login, contas e persistência server-side estão fora do escopo.
- Status: Resolvida.

### Pergunta 5 — CRÍTICA

- Categoria: critérios de sucesso
- Pergunta: O próximo ciclo deve apenas estabilizar o protótipo existente ou também redesenhar a experiência e remover débitos como CDNs, README/Gemini e componentes grandes?
- Por que importa: mistura de estabilização, redesign e saneamento técnico pode inflar o primeiro ciclo.
- O que muda dependendo da resposta: estabilizar primeiro reduz risco; redesenhar junto exige plano maior, testes e decisões de UI/UX.
- Resposta do usuário em 2026-06-06: estabilizar primeiro, mas aceita sugestões de melhoria pontual.
- Interpretação operacional: foco principal é estabilização. Melhorias incrementais são aceitas se não inflarem escopo, não quebrarem funcionalidade existente e não exigirem redesenho de componentes grandes.
- Status: Resolvida.

### Pergunta 6

- Categoria: funcionalidades obrigatórias
- Pergunta: Quais formatos de entrada são obrigatórios no MVP: apenas `.md`, também `.markdown`, `.txt` e colagem direta?
- Por que importa: define testes de importação e mensagens de erro.
- O que muda dependendo da resposta: menos formatos reduzem risco; mais formatos exigem validações de arquivo e conteúdo.

### Pergunta 7

- Categoria: funcionalidades opcionais
- Pergunta: Autosave local deve entrar no MVP ou ficar para versão futura?
- Por que importa: evita perda de conteúdo, mas adiciona decisões de persistência e UX.
- O que muda dependendo da resposta: se entrar no MVP, será necessário definir quando salvar, como restaurar e como limpar dados.

### Pergunta 8

- Categoria: dados que serão salvos
- Pergunta: O produto deve salvar algum dado do usuário além do PDF baixado localmente?
- Por que importa: define privacidade, persistência, escopo e possíveis permissões.
- O que muda dependendo da resposta: sem salvamento, o MVP é mais simples; com salvamento, é preciso decidir localStorage/arquivo/conta sem escolher stack ainda.

### Pergunta 9

- Categoria: usuários e permissões
- Pergunta: O MVP terá login, tipos de usuário ou área privada?
- Por que importa: login muda arquitetura, dados, segurança e escopo.
- O que muda dependendo da resposta: se não houver login, o produto segue como ferramenta local; se houver, precisa PRD específico de autenticação e permissões.

### Pergunta 10

- Categoria: telas e fluxos
- Pergunta: Mobile precisa ser totalmente suportado para edição/exportação ou basta layout não quebrar?
- Por que importa: edição de documento em mobile pode exigir decisões específicas de UX.
- O que muda dependendo da resposta: suporte completo mobile aumenta testes e ajustes; suporte básico reduz escopo inicial.

### Pergunta 11

- Categoria: funcionalidades obrigatórias
- Pergunta: Quais configurações visuais são indispensáveis no MVP: estilo, fonte, tamanho, margens, orientação, capa, cabeçalho, rodapé e numeração?
- Por que importa: configurações demais dificultam testes e podem confundir usuários.
- O que muda dependendo da resposta: o PRD pode reduzir opções no MVP ou preservar todas como requisitos.

### Pergunta 12

- Categoria: integrações
- Pergunta: A configuração de Gemini/API key deve ser removida do escopo atual, mantida apenas como legado, ou planejada como funcionalidade futura?
- Por que importa: há risco de exposição de chave no frontend e confusão na documentação.
- O que muda dependendo da resposta: remover simplifica; manter exige documentação; transformar em feature exige decisões de backend e privacidade.

### Pergunta 13

- Categoria: monetização
- Pergunta: Existe intenção de monetizar o produto no curto prazo?
- Por que importa: monetização pode exigir contas, limites, planos, billing e suporte.
- O que muda dependendo da resposta: se não houver monetização, o MVP fica mais simples; se houver, precisa discovery específico.

### Pergunta 14

- Categoria: riscos
- Pergunta: Qual tamanho de documento o MVP precisa suportar com desempenho aceitável?
- Por que importa: paginação por medição de DOM e exportação por canvas podem sofrer com documentos longos.
- O que muda dependendo da resposta: documentos curtos permitem MVP simples; documentos longos exigem testes de carga e possíveis mudanças técnicas.

### Pergunta 15

- Categoria: critérios de sucesso
- Pergunta: Qual é o mínimo aceitável para considerar a exportação PDF bem-sucedida: arquivo baixa, páginas corretas, visual fiel, tamanho aceitável, texto legível, ou texto selecionável?
- Por que importa: define critérios de aceite verificáveis.
- O que muda dependendo da resposta: o PRD poderá ter critérios objetivos em vez de avaliação subjetiva.

### Pergunta 16

- Categoria: funcionalidades opcionais
- Pergunta: Templates devem ser parte central do MVP ou apenas exemplos auxiliares?
- Por que importa: templates podem acelerar uso, mas também exigem curadoria, UI e testes.
- O que muda dependendo da resposta: se forem centrais, precisam critérios próprios; se auxiliares, podem ficar mínimos.

### Pergunta 17

- Categoria: objetivo do produto
- Pergunta: O nome e posicionamento desejados são `Markdown para PDF`, `PDF Forge PRO` ou outro?
- Por que importa: o Brownfield registra nomes diferentes, o que pode gerar inconsistência de produto e documentação.
- O que muda dependendo da resposta: o PRD final poderá padronizar nomenclatura, textos e README.

### Pergunta 18

- Categoria: dados que serão salvos
- Pergunta: Para gerar o nome do PDF, qual fonte deve ter prioridade: título do documento, primeiro heading `#`, metadado inferido, nome do arquivo importado ou trecho inicial do texto?
- Por que importa: o requisito de não usar nome genérico está confirmado, mas a regra precisa ser previsível para o usuário e testável no PRD.
- O que muda dependendo da resposta: o PRD final poderá definir fallback, sanitização de caracteres, limite de tamanho do nome e comportamento quando o documento não tiver título.

## 20. Pontos que precisam de decisão humana

### 20.1 Decisões já resolvidas nesta rodada

- Público principal do MVP: pessoa não técnica que quer PDF bonito.
- Requisito de PDF selecionável/acessível: não é obrigatório no MVP; PDF visual/rasterizado é aceitável.
- Política de HTML dentro do Markdown: permitir apenas com sanitização.
- Deploy: hospedado em produção na Vercel como site estático.
- Foco do próximo ciclo: estabilização, com abertura para melhorias incrementais.

### 20.2 Decisões ainda pendentes
| Definir se autosave entra no MVP | Afeta dados, UX e persistência. | Médio |
| Definir se haverá login, nuvem ou histórico | Muda o produto de ferramenta local para plataforma. | Alto |
| Definir papel da configuração Gemini/API key | Evita exposição de chave e confusão de documentação. | Médio/Alto |
| Definir critérios mínimos de sucesso para PDF visual | Necessário para testes e auditoria objetiva: download, páginas corretas, legibilidade, fidelidade visual e tamanho aceitável. | Alto |
| Definir nome oficial do produto | Evita inconsistência entre interface, README e documentação. | Médio |
| Definir regra exata para compor o nome do arquivo PDF | O requisito de evitar nome genérico está aprovado, mas a origem e fallback do nome precisam ser claros para implementação e testes. | Médio |

## 21. Lacunas adicionais não bloqueantes

- Definir tom de voz e microcopy da interface.
- Definir política de mensagens de erro para importação e exportação.
- Definir se haverá exemplos de documentos longos para teste.
- Definir se imagens em Markdown serão suportadas e sob quais limitações.
- Definir requisitos mínimos de acessibilidade visual da interface.
- Definir se a ferramenta precisa funcionar offline.
- Definir se haverá analytics ou coleta de métricas de uso.
- Definir se documentos com tabelas grandes são caso de uso prioritário.
- Definir se o projeto precisa de guia UI/UX completo antes de redesign.

## 22. Recomendações para a próxima etapa

Recomendação: gerar o PRD mestre a partir deste Pré-PRD.

Motivo: as 5 perguntas críticas foram respondidas — público principal, PDF rasterizado, HTML com sanitização, deploy na Vercel e foco em estabilização. O Pré-PRD está pronto para ser transformado em PRD mestre.

Próximo passo: gerar PRD mestre, revisar criticamente e depois criar plano de implementação. Só então executar Sprint 00B de testes.

## 23. O que o próximo modelo NÃO deve fazer

- Não criar PRD final sem revisar se o Pré-PRD reflete todas as decisões já tomadas.
- Não inventar funcionalidades.
- Não escolher stack técnica sem autorização.
- Não transformar hipóteses em requisitos.
- Não transformar brainstorming em escopo aprovado.
- Não ignorar riscos de escopo.
- Não simplificar dúvidas importantes.
- Não assumir monetização.
- Não assumir permissões, login, administrador, cliente ou colaborador.
- Não criar telas desnecessárias.
- Não avançar para implementação.
- Não corrigir código antes de fechar o escopo do MVP.
- Não registrar decisões em `docs/evolution/DECISIONS.md` sem decisão humana real.
- Não tratar a exportação PDF como validada completamente sem evidência de download real.
- Não permitir que o PRD final volte a especificar nome genérico para o PDF exportado.
- Não tratar a configuração Gemini como requisito de produto.

## 24. Saída obrigatória para continuidade

### 24.1 Ideia consolidada

Ferramenta web para transformar conteúdo Markdown em PDF por meio de uma experiência integrada com editor, preview paginado, ajustes visuais e exportação local pelo navegador.

### 24.2 Problema que o produto resolve

O produto resolve, em hipótese ainda a validar, a dificuldade de converter Markdown em um PDF visualmente organizado e previsível sem depender de fluxo técnico complexo ou edição manual em outro software.

### 24.3 Público-alvo

Público principal confirmado do MVP: pessoa não técnica que quer PDF bonito.

Públicos secundários possíveis: usuário técnico que já sabe Markdown, estudante, consultor, redator, desenvolvedor ou empresa, mas nenhum deles é foco principal confirmado do MVP.

Modo de uso: hospedado em produção na Vercel como site estático (SPA). Sem backend, login ou contas no MVP.

### 24.4 Escopo inicial

- Editor Markdown em tela única.
- Importação básica de arquivos `.md`, `.markdown` e `.txt`, se confirmada no MVP.
- Toolbar básica de formatação.
- Preview paginado com suporte a quebra de página por `---`.
- Configurações essenciais de documento e aparência.
- Capa, cabeçalho, rodapé e numeração, se mantidos como essenciais após decisão.
- Exportação PDF local validada por critérios objetivos.
- Nome do arquivo PDF exportado derivado do documento criado, sem nome genérico.
- HTML permitido apenas com sanitização; biblioteca e regras definidas no PRD.
- Critérios mínimos para fidelidade entre preview e PDF.

### 24.5 Fora de escopo inicial

- Login e contas de usuário.
- Biblioteca de documentos na nuvem.
- Histórico multi-documento.
- Colaboração em tempo real.
- IA/Gemini para geração ou melhoria de conteúdo.
- Monetização, planos ou billing.
- Exportação para DOCX, EPUB, HTML ou outros formatos além de PDF.
- Editor WYSIWYG completo.
- Marketplace ou editor avançado de templates.

### 24.6 Riscos

- RISCO TÉCNICO: implementação da sanitização de HTML precisa de biblioteca, regras e testes; escolha errada pode quebrar compatibilidade ou ser insegura.
- RISCO DE PRODUTO/UI: embora PDF rasterizado seja aceitável no MVP, ainda é preciso validar fidelidade visual, legibilidade, tamanho do arquivo e download real.
- RISCO TÉCNICO: dependências CDN em runtime podem ser inadequadas para produção.
- RISCO TÉCNICO: ausência de testes automatizados aumenta risco de regressão.
- RISCO DE PRODUTO: público não técnico pode ter dificuldade com Markdown se templates, toolbar e ajuda guiada forem insuficientes.
- RISCO DE PRODUTO: excesso de opções pode dificultar uso.
- RISCO DE ESCOPO: login, nuvem, IA, múltiplos formatos e WYSIWYG completo podem inflar o MVP.

### 24.7 Dúvidas em aberto

- Qual biblioteca, tags e atributos serão permitidos na sanitização de HTML?
- Autosave entra no MVP?
- Mobile é requisito completo ou responsividade básica?
- Quais configurações visuais são essenciais?
- Qual tamanho de documento deve ser suportado?
- A configuração Gemini/API key será removida, mantida como legado ou planejada para futuro?
- Qual fonte e fallback serão usados para compor o nome descritivo do PDF?

### 24.8 Critérios iniciais de aceite

- O usuário consegue editar Markdown no navegador.
- O usuário consegue importar conteúdo Markdown/texto dentro dos formatos aprovados para o MVP.
- O preview paginado mostra o documento em páginas simuladas.
- Uma linha isolada com `---` cria uma quebra física de página, se essa regra for mantida.
- O usuário consegue configurar os elementos visuais aprovados para o MVP.
- O usuário consegue exportar e baixar um PDF localmente.
- O PDF baixado não usa nome genérico e contém referência ao documento criado.
- O PDF gerado atende ao critério aprovado de qualidade visual/rasterizada: download real, páginas corretas, legibilidade e fidelidade visual aceitável.
- O comportamento para HTML dentro do Markdown segue a política aprovada.
- O produto não exige login, backend, nuvem ou monetização no MVP, salvo decisão humana posterior.
- As principais funcionalidades do MVP possuem critérios verificáveis antes de implementação.

### 24.9 Próximo passo recomendado

Criação do PRD mestre a partir deste Pré-PRD. Todas as 5 perguntas críticas foram respondidas.
