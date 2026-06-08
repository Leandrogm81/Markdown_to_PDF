# DECISIONS

Registro de decisoes permanentes do projeto.

## Formato

```markdown
## [data] - [titulo da decisao]

### Contexto
[situacao]

### Decisao
[o que foi decidido]

### Motivo
[por que]

### Impacto
[efeito pratico]

### Status
[ativa / substituida / revogada]
```

## Decisoes do produto markdown-para-pdf

### 2026-06-06 - Nome do PDF deve conter referencia ao documento

**Contexto:** o usuário solicitou que o PDF gerado não tenha nome genérico.

**Decisao:** o arquivo PDF exportado deve ter um nome descritivo com algo do documento criado. A regra exata de composição do nome — por exemplo título, primeiro heading, metadado inferido, nome do arquivo importado ou trecho inicial sanitizado — deve ser detalhada no PRD final.

**Motivo:** facilitar identificação posterior do arquivo baixado e evitar downloads com nomes genéricos pouco úteis.

**Impacto:** o Pré-PRD e o PRD final devem tratar o nome do arquivo PDF como requisito confirmado; a implementação futura deve incluir fallback e sanitização do nome.

**Status:** ativa.

### 2026-06-06 - Publico principal do MVP e pessoa nao tecnica que quer PDF bonito

**Contexto:** o Pré-PRD perguntava se o MVP deveria focar em pessoa que já sabe Markdown, pessoa não técnica que quer PDF bonito ou outro perfil específico.

**Decisao:** o público principal do MVP é pessoa não técnica que quer PDF bonito.

**Motivo:** a experiência deve reduzir atrito técnico e priorizar templates, toolbar, ajuda guiada e resultado visual profissional.

**Impacto:** o PRD final deve tratar conhecimento de Markdown como barreira possível e não deve assumir que o usuário principal é dev ou especialista em Markdown.

**Status:** ativa.

### 2026-06-06 - PDF visual rasterizado e aceitavel no MVP

**Contexto:** o Pré-PRD perguntava se o PDF precisava ter texto selecionável, pesquisável e acessível ou se um PDF visual/rasterizado era aceitável.

**Decisao:** para o MVP, PDF visual/rasterizado é aceitável; texto selecionável, pesquisável e acessível não é requisito obrigatório neste ciclo.

**Motivo:** o usuário respondeu "Tanto faz", então a arquitetura atual baseada em captura visual pode ser considerada aceitável para MVP, desde que o resultado seja legível e visualmente fiel.

**Impacto:** o PRD final deve priorizar critérios de qualidade visual, download real, páginas corretas e legibilidade; exportação com texto selecionável/acessível pode ser tratada como melhoria futura ou não bloqueante.

**Status:** ativa.

### 2026-06-06 - HTML dentro do Markdown permitido apenas com sanitizacao

**Contexto:** o Pré-PRD perguntava se HTML dentro do Markdown deveria ser permitido, permitido apenas com sanitização ou bloqueado. O estado atual do código era permitir HTML sem sanitização visível, via `marked.parse` e `dangerouslySetInnerHTML`.

**Decisao:** o HTML dentro do Markdown deve ser permitido apenas com sanitização.

**Motivo:** o usuário aprovou a recomendação técnica de sanitizar, pois o público principal do MVP é não técnico e o estado atual gera risco de segurança.

**Impacto:** o PRD final deve especificar biblioteca de sanitização (ex.: DOMPurify), lista de tags/atributos permitidos e comportamento quando HTML inválido for removido.

**Status:** ativa.

### 2026-06-06 - Deploy na Vercel como site estatico

**Contexto:** o Pré-PRD perguntava se o MVP seria 100% local, hospedado ou ambos.

**Decisao:** o MVP será hospedado em produção na Vercel como site estático (SPA/client-side).

**Motivo:** o usuário pretende publicar o produto. Vercel é adequada para deploy de SPAs sem backend.

**Impacto:** o PRD deve considerar performance, CDN, domínio, favicon, meta tags, SEO básico e configuração de build para Vercel. Login, contas e persistência server-side estão fora do escopo.

**Status:** ativa.

### 2026-06-06 - Foco do proximo ciclo e estabilizacao com melhorias incrementais

**Contexto:** o Pré-PRD perguntava se o próximo ciclo deveria estabilizar ou redesenhar.

**Decisao:** o foco principal é estabilização. Melhorias incrementais são aceitas desde que não inflem escopo, não quebrem funcionalidade existente e não exijam redesenho de componentes grandes.

**Motivo:** o usuário quer estabilizar primeiro, mas está aberto a sugestões pontuais que melhorem o produto sem aumentar risco.

**Impacto:** o PRD e o plano de implementação devem priorizar correção de bugs, validação de PDF, implementação de sanitização de HTML, remoção de dependências CDN e preparação para deploy na Vercel. Melhorias de UI/UX devem ser incrementais e bem definidas.

**Status:** ativa.

### 2026-06-07 — Autosave local NÃO entra no MVP

**Contexto:** PD-01 perguntava se autosave local (localStorage) deveria entrar no MVP.

**Decisao:** NÃO. Sessão = aba aberta. Recarregar a página restaura template e configurações padrão.

**Motivo:** Decisão humana explícita. Simplifica escopo do MVP.

**Impacto:** Não implementar localStorage, não criar UX de restauração de sessão. Configurações e conteúdo vivem apenas em memória.

**Status:** ativa.

### 2026-06-07 — Tamanho máximo de arquivo importado: 8MB

**Contexto:** PD-03 perguntava o limite de tamanho para importação de arquivos.

**Decisao:** 8MB.

**Motivo:** Decisão humana explícita.

**Impacto:** Implementar validação de tamanho antes de importar. Mostrar erro claro se exceder.

**Status:** ativa.

### 2026-06-07 — Confirmação antes de substituir conteúdo

**Contexto:** PD-04 perguntava se deve haver confirmação antes de substituir o conteúdo do editor ao importar ou trocar template.

**Decisao:** SIM. Sempre pedir confirmação antes de substituir conteúdo existente.

**Motivo:** Decisão humana explícita. Evita perda acidental de trabalho.

**Impacto:** Implementar modal/confirm antes de qualquer operação que substitua o conteúdo do editor.

**Status:** ativa.

### 2026-06-07 — Usar templates existentes em templates.ts

**Contexto:** PD-07 perguntava se o MVP deveria usar templates existentes ou criar novos.

**Decisao:** Usar os templates existentes em `templates.ts` sem alteração. Criar novos templates apenas após validação do usuário.

**Motivo:** Recomendação padrão do PRD v1.1. Estabilizar primeiro.

**Impacto:** Não criar novos templates no MVP. Templates existentes são a base.

**Status:** ativa.

### 2026-06-07 — DOMPurify como biblioteca de sanitização

**Contexto:** PD-10 perguntava qual biblioteca de sanitização usar para HTML dentro do Markdown.

**Decisao:** DOMPurify.

**Motivo:** Recomendação padrão do PRD v1.1. Biblioteca madura, amplamente usada, leve.

**Impacto:** Instalar DOMPurify via npm na Sprint 2. Sanitizar todo HTML renderizado.

**Status:** ativa.

### 2026-06-07 — Sem tema escuro no MVP

**Contexto:** PD-11 perguntava se o tema do editor (claro/escuro) deveria entrar no MVP.

**Decisao:** NÃO.

**Motivo:** Recomendação padrão do PRD v1.1. Simplifica escopo.

**Impacto:** Não implementar toggle de tema. Editor fica com tema claro apenas.

**Status:** ativa.

## Decisoes iniciais deste framework

### 2026-05-28 - Planilha como mapa, Markdown como fonte dos prompts

**Decisao:** manter a planilha como indice/roteador e armazenar prompts completos em arquivos `.md`.

**Motivo:** a planilha e melhor para navegacao visual; Markdown e melhor para prompts longos, versionamento e manutencao.

**Status:** ativa.

### 2026-05-28 - Menor numero significa maior prioridade na hierarquia de documentos

**Decisao:** corrigir a ambiguidade da lacuna L4: prioridade 1 e a mais alta.

**Motivo:** evita interpretacao contraditoria entre texto e tabela.

**Status:** ativa.

