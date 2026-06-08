# Revisão Crítica do PRD

## 1. Resumo da avaliação

**PRD analisado:** `docs/product/PRD.md` — Versão 1.0, 2026-06-06, 1084 linhas, 21 seções.

**Clareza:** O documento é bem estruturado e organizado. A maioria das seções é clara. Porém, há pontos de ambiguidade que podem gerar implementação errada, especialmente em critérios de fidelidade, comportamento de templates e especificações técnicas de deploy.

**Escopo:** Controlado. O MVP é enxuto, com 15 itens explicitamente fora de escopo e diferenciação clara entre MVP, V1, V2 e V3.

**Regras de negócio:** 12 regras definidas na seção 12, a maioria com critério de aceite verificável. Porém, algumas regras-chave ficam vagas (fidelidade preview/PDF, comportamento de template).

**Critérios de aceite:** Presentes em cada funcionalidade e fluxo. Porém, muitos são descritivos em vez de verificáveis objetivamente. Expressões como "fidelidade visual aceitável" e "utilizável sem layout quebrado" não são testáveis sem definição adicional.

**Pronto para plano de implementação?** Parcialmente pronto. Há 4 achados críticos e 18 achados importantes que precisam ser resolvidos antes de gerar um plano de implementação confiável.

**Classificação geral:** `Parcialmente pronto`.

---

## 2. Achados críticos

### CRÍTICO 1 — Critério de fidelidade preview/PDF indefinido

- **Área afetada:** Critérios de aceite / Regras de negócio
- **Problema:** O PRD afirma em múltiplas seções que o "preview deve corresponder ao PDF com fidelidade visual aceitável" (seções 7.3, 12, 15.6, 20.4), mas nunca define o que constitui "aceitável". O PD-02 registra isso como ponto de decisão pendente, mas a seção 20.4 já usa linguagem obrigatória ("Preview DEVE corresponder ao PDF com fidelidade visual aceitável") como se fosse requisito fechado.
- **Por que isso pode gerar erro:** Um agente coder não saberá qual tolerância aplicar. Pode implementar captura pixel-perfect (complexo, lento) ou aceitar diferenças significativas de layout (usuário insatisfeito). Sem critério objetivo, qualquer implementação pode ser contestada.
- **Trecho ou referência do PRD:** Seção 7.3 ("alta fidelidade visual"), Seção 12 ("Preview fiel ao PDF"), Seção 15.6 ("fidelidade visual aceitável"), Seção 20.4 ("fidelidade visual aceitável"), PD-02.
- **Correção recomendada:** Definir critérios objetivos de fidelidade. Exemplo mínimo: "O preview e o PDF devem ter a mesma quantidade de páginas, mesmas margens visuais, mesma distribuição de texto entre páginas e mesma aparência de fontes. Diferenças de sub-pixel e anti-aliasing são aceitáveis." Se PD-02 não puder ser fechado agora, pelo menos definir o que NÃO é exigido (ex.: não é pixel-perfect).
- **Precisa de decisão humana?** Sim — já está como PD-02, mas o PRD precisa de uma resolução mínima para ser usável pelo coder.
- **Impacto se não corrigir:** Alto — implementação pode ir para direção errada; retrabalho certo.

### CRÍTICO 2 — Conteúdo e configurações dos templates não especificados

- **Área afetada:** Regras de negócio / Entidades
- **Problema:** O PRD lista 4 templates (relatório executivo, currículo/profissional, artigo acadêmico, documentação técnica) na seção 7.8, mas não especifica o conteúdo Markdown de cada um nem as configurações recomendadas (preset, fonte, margens, etc.). O PD-07 registra "quantos e quais templates" como decisão pendente, mas a seção 7.8 já lista 4.
- **Por que isso pode gerar erro:** O agente coder precisará inventar o conteúdo dos templates ou usar placeholders genéricos. Templates genéricos não atendem o público-alvo (pessoa não técnica que quer PDF bonito). Além disso, o Brownfield confirma que `templates.ts` já existe com templates atuais — o PRD não diz se deve usar os existentes ou criar novos.
- **Trecho ou referência do PRD:** Seção 7.8, PD-07, Seção 20.6.
- **Correção recomendada:** Especificar o conteúdo Markdown e configurações recomendadas de cada template do MVP, ou então declarar explicitamente: "Usar os templates existentes em `templates.ts` sem alteração; criar novos templates apenas após validação do usuário."
- **Precisa de decisão humana?** Sim — PD-07 precisa de resolução.
- **Impacto se não corrigir:** Alto — templates inadequados comprometem a experiência do público-alvo.

### CRÍTICO 3 — Comportamento de troca de template ambíguo

- **Área afetada:** Regras de negócio / Fluxos
- **Problema:** O critério de aceite da seção 7.8 diz "Alterar template não perde configurações manuais de metadados que o usuário sobrescreveu", mas não esclarece se a troca de template substitui o conteúdo Markdown do editor ou apenas aplica configurações visuais. O Brownfield confirma que o comportamento atual é "Markdown e configuração recomendada são aplicados" (seção "Fluxo de troca de template"), sugerindo substituição completa. Mas o PRD não explicita isso.
- **Por que isso pode gerar erro:** Se o coder implementar substituição de conteúdo, o usuário perde trabalho ao trocar de template sem aviso. Se implementar apenas troca de configuração, o template não terá o efeito esperado (o conteúdo de exemplo não é carregado).
- **Trecho ou referência do PRD:** Seção 7.8 ("Selecionar template carrega conteúdo Markdown e configurações recomendadas"), critério de aceite "Alterar template não perde configurações manuais de metadados".
- **Correção recomendada:** Definir explicitamente: (a) trocar de template substitui o conteúdo Markdown E as configurações; (b) campos de metadados sobrescritos manualmente pelo usuário são preservados; (c) se houver conteúdo no editor, mostrar confirmação antes de substituir (relacionado a PD-04).
- **Precisa de decisão humana?** Sim — envolve UX e risco de perda de dados.
- **Impacto se não corrigir:** Alto — implementação pode causar perda de trabalho do usuário ou comportamento inesperado.

### CRÍTICO 4 — Conflito interno: Autosave simultaneamente fora de escopo e PD pendente

- **Área afetada:** Escopo / Requisitos
- **Problema:** A seção 6 ("Fora de escopo") lista "Autosave local" com a nota "Decisão não tomada; pode entrar em V1 se aprovado". Mas PD-01 pergunta "Autosave local deve entrar no MVP?" e a seção 20.3 lista "Autosave (salvo decisão PD-01)" como item não implementável. Isso cria ambiguidade: autosave está fora de escopo ou é um PD que pode entrar no MVP?
- **Por que isso pode gerar erro:** Um agente coder pode interpretar que autosave está fora de escopo e ignorar PD-01, ou pode interpretar que PD-01 pode reverter a exclusão e implementar sem autorização.
- **Trecho ou referência do PRD:** Seção 6 (linha "Autosave local — Decisão não tomada"), PD-01, Seção 20.3.
- **Correção recomendada:** Remover "Autosave local" da tabela "Fora de escopo" e deixar apenas PD-01 como ponto de decisão. Ou, se a decisão é que autosave NÃO entra no MVP, marcar PD-01 como resolvido e mover para "Fora de escopo" definitivo.
- **Precisa de decisão humana?** Sim — é exatamente o PD-01 que precisa ser resolvido.
- **Impacto se não corrigir:** Médio — confusão na implementação; possível retrabalho.

---

## 3. Achados importantes

### IMPORTANTE 1 — Critérios de aceite descritivos em vez de verificáveis

- **Área afetada:** Critérios de aceite
- **Problema:** Vários critérios usam linguagem subjetiva que não pode ser verificada objetivamente: "utilizável sem layout quebrado" (Fluxo 5), "fidelidade visual aceitável" (Seção 15.6), "preview mostra documento paginado com margens e formatação" (Seção 5), "barreira de entrada permanece alta" (Seção 7.2 riscos).
- **Por que isso pode gerar retrabalho:** Sem critérios objetivos, o agente coder e o validador não concordarão quando o critério é atingido.
- **Trecho ou referência do PRD:** Seções 5, 7.2, 7.3, 15.6, Fluxo 5.
- **Correção recomendada:** Reescrever critérios subjetivos como verificáveis. Exemplo: "utilizável sem layout quebrado" → "editor, toolbar e botão de exportar são visíveis e funcionais em tela de 320px de largura; não há sobreposição de elementos ou scroll horizontal obrigatório."
- **Precisa de decisão humana?** Não
- **Impacto se não corrigir:** Médio — dificulta validação e pode gerar divergência entre coder e reviewer.

### IMPORTANTE 2 — Comportamento mobile não especificado

- **Área afetada:** Telas / Fluxos
- **Problema:** O PRD diz que em mobile "editor e preview podem alternar entre si" (seções 7.1, 10, Fluxo 5), mas não especifica: qual breakpoint define mobile vs desktop? Como o usuário alterna (aba, botão, swipe)? O preview é renderizado em tempo real mesmo quando invisível? A toolbar permanece visível?
- **Por que isso pode gerar retrabalho:** O agente precisará inventar o mecanismo de alternância. Se não houver acordo, cada implementação será diferente.
- **Trecho ou referência do PRD:** Seções 7.1, 10, 15.2, Fluxo 5.
- **Correção recomendada:** Especificar: (a) breakpoint exato (< 768px = mobile, >= 1024px = desktop, 768-1023 = tablet); (b) mecanismo de alternância (ex.: botões "Editor" / "Preview" no header); (c) se o preview atualiza em background quando invisível.
- **Precisa de decisão humana?** Não — pode usar convenções comuns (ex.: Tailwind breakpoints).
- **Impacto se não corrigir:** Médio — implementação inconsistente ou UX ruim em mobile.

### IMPORTANTE 3 — Loading/progresso durante exportação PDF não especificado

- **Área afetada:** Telas / UX
- **Problema:** A seção 10 menciona "Estado de exportação: botão de exportar mostra loading", mas não detalha: qual componente mostra loading? O botão fica desabilitado? Há barra de progresso ou spinner? Quanto tempo antes de mostrar timeout? E se o navegador travar durante a captura?
- **Por que isso pode gerar retrabalho:** Para documentos longos, a exportação pode levar vários segundos. Sem feedback, o usuário pode clicar múltiplas vezes ou fechar a aba.
- **Trecho ou referência do PRD:** Seção 10 ("Estado de exportação"), Seção 7.10.
- **Correção recomendada:** Especificar: (a) botão de exportar mostra spinner e texto "Gerando PDF..."; (b) botão fica desabilitado durante geração; (c) timeout de 30 segundos com mensagem de erro; (d) múltiplos cliques não disparam múltiplas gerações.
- **Precisa de decisão humana?** Não
- **Impacto se não corrigir:** Médio — UX ruim; possível duplicação de downloads.

### IMPORTANTE 4 — Imagens na toolbar sem especificação

- **Área afetada:** Requisitos / Regras de negócio
- **Problema:** A seção 7.2 lista "imagem" como botão da toolbar, mas o PRD não especifica como imagens funcionam: o usuário insere URL externa? Faz upload de arquivo? A imagem é convertida para data URL? Qual o limite de tamanho? Como imagens são renderizadas no preview e no PDF?
- **Por que isso pode gerar retrabalho:** Imagens são complexas — data URLs podem ser muito grandes, URLs externas podem falhar em produção (CORS), e o PDF rasterizado precisa incorporar as imagens.
- **Trecho ou referência do PRD:** Seção 7.2 (botão "imagem"), Seção 11 (nenhuma entidade para imagem).
- **Correção recomendada:** Definir: (a) botão "imagem" insere `![alt](url)` — usuário cola URL manualmente; (b) upload de imagem é fora do escopo do MVP; (c) imagens externas são renderizadas no preview e capturadas no PDF; (d) imagens que falham mostram placeholder.
- **Precisa de decisão humana?** Sim — envolve decisão de escopo.
- **Impacto se não corrigir:** Médio — implementação pode ser inconsistente ou gerar bugs na exportação.

### IMPORTANTE 5 — Configuração de deploy Vercel não especificada

- **Área afetada:** Integrações / Deploy
- **Problema:** O PRD diz que o deploy será na Vercel como site estático, mas não especifica: qual comando de build? Qual diretório de output? SPA routing (redirects)? Variáveis de ambiente? Domínio personalizado? Favicon e meta tags?
- **Por que isso pode gerar retrabalho:** Sem especificação, o agente pode configurar incorretamente ou esquecer de itens essenciais (ex.: SPA routing para que todas as rotas retornem index.html).
- **Trecho ou referência do PRD:** Seção 14, Seção 20.2.
- **Correção recomendada:** Adicionar seção "Configuração Vercel" com: (a) framework: Vite; (b) build command: `npm run build`; (c) output directory: `dist`; (d) SPA: não há rotas, mas configurar redirect para index.html se necessário; (e) meta tags: título, descrição, favicon, og:image.
- **Precisa de decisão humana?** Não — são configurações técnicas padrão.
- **Impacto se não corrigir:** Médio — deploy pode falhar ou ter comportamento inesperado.

### IMPORTANTE 6 — Migração de Tailwind CDN para npm não detalhada

- **Área afetada:** Integrações / Técnico
- **Problema:** O PRD lista 4 CDNs para substituir (Tailwind, marked, jspdf, html2canvas), mas apenas Tailwind tem implicações de build complexas. As outras 3 são simples `npm install`. Tailwind exige escolha entre: (a) Tailwind CSS v3/v4 com PostCSS; (b) Tailwind CLI; (c) @tailwindcss/vite plugin. O PRD não especifica qual abordagem.
- **Por que isso pode gerar retrabalho:** A escolha afeta a configuração de build, o tamanho do bundle e a compatibilidade com o código existente que usa classes Tailwind via CDN.
- **Trecho ou referência do PRD:** Seção 14, Seção 20.2.
- **Correção recomendada:** Especificar: usar `@tailwindcss/vite` plugin (abordagem mais simples para Vite). Ou, se o código atual usa muitas classes Tailwind, documentar que a migração é transparente (mesmas classes, só muda a fonte do CSS).
- **Precisa de decisão humana?** Não — recomendação técnica.
- **Impacto se não corrigir:** Médio — pode gerar configuração incorreta ou CSS quebrado.

### IMPORTANTE 7 — Sanitização do nome do PDF tem regra redundante

- **Área afetada:** Regras de negócio
- **Problema:** As regras de sanitização do nome do PDF (seção 7.10) dizem: "Remover caracteres especiais, acentos e espaços" e depois "Substituir espaços e hifens por `-`". Se os espaços já foram removidos na etapa anterior, a segunda regra é redundante para espaços. Além disso, "remover acentos" não é a mesma coisa que "converter para minúsculas" — a sequência de operações está confusa.
- **Por que isso pode gerar erro:** O agente pode implementar a sanitização em ordem incorreta ou interpretar as regras de forma diferente do esperado.
- **Trecho ou referência do PRD:** Seção 7.10 ("Regras de sanitização do nome").
- **Correção recomendada:** Reescrever como sequência clara: (1) Normalizar para NFD e remover diacríticos (acentos). (2) Converter para minúsculas. (3) Substituir espaços e hifens por `-`. (4) Remover caracteres que não sejam letras, números ou `-`. (5) Colapsar múltiplos `-` em um único. (6) Remover `-` inicial e final. (7) Limitar a 80 caracteres. (8) Se vazio, usar `documento`.
- **Precisa de decisão humana?** Não
- **Impacto se não corrigir:** Baixo/Médio — nomes de arquivo podem ficar inconsistentes.

### IMPORTANTE 8 — `---` dentro de code blocks não especificado

- **Área afetada:** Regras de negócio
- **Problema:** A regra "linha isolada com `---` cria quebra física de página" (seções 5, 7.3, 12) não especifica o que acontece quando `---` aparece dentro de um bloco de código (```` ``` ````), dentro de HTML, ou com espaços antes/depois.
- **Por que isso pode gerar erro:** Um parser simples pode detectar `---` em qualquer contexto, criando quebras de página indesejadas dentro de exemplos de código.
- **Trecho ou referência do PRD:** Seções 5, 7.3, 12.
- **Correção recomendada:** Especificar: `---` só cria quebra de página quando: (a) é a única coisa na linha (sem espaços antes, sem texto depois); (b) NÃO está dentro de um bloco de código (```` ``` ````); (c) NÃO está dentro de um bloco HTML (`<pre>`, `<code>`).
- **Precisa de decisão humana?** Não — é correção técnica.
- **Impacto se não corrigir:** Médio — quebras de página incorretas em documentos com exemplos de código.

### IMPORTANTE 9 — "Tema do editor (claro/escuro)" listado mas não funcionalidade

- **Área afetada:** Requisitos / Consistência
- **Problema:** A seção 5 ("Configurações visuais do MVP") lista "Tema do editor (claro/escuro)", mas a seção 7.5 ("Configurações visuais") não menciona tema do editor. Não há funcionalidade dedicada a tema, nem critério de aceite, nem comportamento esperado.
- **Por que isso pode gerar erro:** O agente pode ignorar o tema do editor por não estar na seção 7.5, ou pode implementar sem especificação.
- **Trecho ou referência do PRD:** Seção 5 (linha "Tema do editor (claro/escuro)"), Seção 7.5 (ausente).
- **Correção recomendada:** Ou adicionar "Tema do editor" como item na seção 7.5 com critérios de aceite, ou remover da seção 5 se não é prioridade do MVP.
- **Precisa de decisão humana?** Sim — é decisão de escopo.
- **Impacto se não corrigir:** Baixo — feature menor, mas inconsistência no documento.

### IMPORTANTE 10 — Encoding de arquivos importados não especificado

- **Área afetada:** Regras de negócio / Dados
- **Problema:** A seção 7.4 diz "Arquivos com encoding inválido devem gerar mensagem de erro", mas não define: qual encoding é esperado? UTF-8? UTF-16? ASCII? Como detectar encoding inválido? O que fazer com BOM (Byte Order Mark)?
- **Por que isso pode gerar erro:** Arquivos .txt no Windows podem vir em CP-1251 ou Latin-1. Se o parser esperar UTF-8 estrito, arquivos legítimos podem gerar erro.
- **Trecho ou referência do PRD:** Seção 7.4 ("Arquivos com encoding inválido devem gerar mensagem de erro").
- **Correção recomendada:** Especificar: aceitar UTF-8 (com ou sem BOM). Arquivos em outros encodings podem ser tentados com fallback para Latin-1. Se o conteúdo tiver caracteres de substituição (U+FFFD), mostrar aviso.
- **Precisa de decisão humana?** Não — é especificação técnica.
- **Impacto se não corrigir:** Médio — arquivos legítimos podem ser rejeitados.

### IMPORTANTE 11 — Preview com conteúdo vazio não especificado

- **Área afetada:** Telas / Fluxos
- **Problema:** O PRD menciona "Estado vazio: editor sem conteúdo, preview vazio" (seção 10), mas não define: o que mostra o preview vazio? Página em branco? Mensagem orientativa? Placeholder?
- **Por que isso pode gerar erro:** Primeira impressão do usuário. Se mostrar página em branco, pode parecer que o app quebrou.
- **Trecho ou referência do PRD:** Seção 10 ("Estado vazio").
- **Correção recomendada:** Especificar: quando o editor estiver vazio, o preview mostra uma página A4 em branco com texto centralizado e sutil: "Comece a digitar ou selecione um template".
- **Precisa de decisão humana?** Não — é UX padrão.
- **Impacto se não corrigir:** Baixo — experiência do primeiro acesso.

### IMPORTANTE 12 — Git initialization sem detalhes

- **Área afetada:** Integrações / Operacional
- **Problema:** A seção 20.2 lista "Inicializar repositório Git" como tarefa do MVP, mas o PRD não especifica: criar .gitignore? Fazer commit inicial? Usar repositório existente? Qual branch padrão?
- **Por que isso pode gerar erro:** Sem .gitignore correto, `node_modules/` e `dist/` podem ser commitados.
- **Trecho ou referência do PRD:** Seção 20.2.
- **Correção recomendada:** Especificar: (a) `git init`; (b) criar `.gitignore` com `node_modules/`, `dist/`, `.env`, `*.local`; (c) commit inicial com mensagem descritiva; (d) branch padrão `main`.
- **Precisa de decisão humana?** Não
- **Impacto se não corrigir:** Médio — repositório pode ficar poluído.

### IMPORTANTE 13 — Sem estratégia de error tracking para MVP

- **Área afetada:** Riscos / Manutenibilidade
- **Problema:** O PRD lista métricas de sucesso (seção 18) e menciona "taxa de erros na exportação PDF" como métrica de qualidade, mas não define como capturar esses erros. Não há analytics, error tracking nem logging no MVP.
- **Por que isso pode gerar erro:** Sem error tracking, bugs de exportação em produção serão invisíveis até que usuários reportem.
- **Trecho ou referência do PRD:** Seção 18.
- **Correção recomendada:** Considerar adicionar Vercel Analytics (gratuito) ou Sentry (free tier) para captura básica de erros. Ou declarar explicitamente: "Métricas serão coletadas manualmente ou em V1."
- **Precisa de decisão humana?** Sim — decisão de escopo.
- **Impacto se não corrigir:** Baixo — não bloqueia implementação, mas dificulta iteração.

### IMPORTANTE 14 — Seção 10 lista 6 telas, mas são apenas 3 componentes reais

- **Área afetada:** Telas
- **Problema:** A tabela da seção 10 lista 6 "telas", mas na prática são apenas 3 componentes na mesma tela: Editor, Preview e Configurações. As outras 3 entradas (Overlay mobile, Notificação, Aplicação principal) são subcomponentes ou estados. Isso pode confundir o agente coder sobre quantas telas realmente precisam ser construídas.
- **Por que isso pode gerar erro:** O agente pode tentar criar rotas ou telas separadas desnecessariamente.
- **Trecho ou referência do PRD:** Seção 10.
- **Correção recomendada:** Clarificar: "O MVP tem uma única tela (`/`). Os componentes são: Editor (textarea + toolbar), Preview (páginas simuladas), Painel de Configurações (sidebar ou overlay), e Notificações (toast)."
- **Precisa de decisão humana?** Não
- **Impacto se não corrigir:** Baixo — confusão de arquitetura.

### IMPORTANTE 15 — Detalhes de numeração de página incompletos

- **Área afetada:** Regras de negócio
- **Problema:** A seção 7.7 diz que numeração mostra "Página X de Y", mas não especifica: a capa é contada? Onde aparece a numeração (centro do rodapé, canto inferior direito)? A numeração é afetada por `---` (quebras manuais)?
- **Por que isso pode gerar erro:** Se a capa for contada, a numeração do corpo começa em 2. Se não, começa em 1. A posição visual também precisa ser definida.
- **Trecho ou referência do PRD:** Seção 7.7.
- **Correção recomendada:** Especificar: (a) numeração começa em 1 na primeira página do corpo (capa não é contada); (b) posição: centro do rodapé; (c) quebras manuais (`---`) incrementam o número de página normalmente.
- **Precisa de decisão humana?** Não — convenção padrão.
- **Impacto se não corrigir:** Baixo — inconsistência visual.

### IMPORTANTE 16 — Critérios de aceite do Fluxo 2 não cobrem PD-04

- **Área afetada:** Critérios de aceite / Fluxos
- **Problema:** O Fluxo 2 (importar arquivo e exportar) lista PD-04 como ponto de decisão, mas os critérios de aceite do fluxo não incluem nenhum critério sobre confirmação antes de substituir. Se PD-04 for resolvido como "sim, mostrar confirmação", o critério de aceite precisará ser adicionado.
- **Por que isso pode gerar erro:** O agente pode ignorar PD-04 ao implementar o Fluxo 2.
- **Trecho ou referência do PRD:** Fluxo 2, PD-04.
- **Correção recomendada:** Adicionar critério de aceite condicional: "Se PD-04 for aprovado: confirmar antes de substituir conteúdo atual."
- **Precisa de decisão humana?** Não — é ajuste de documento.
- **Impacto se não corrigir:** Baixo — PD-04 pode ser esquecido na implementação.

### IMPORTANTE 17 — "Configurações visuais mantidas durante a sessão" sem persistência

- **Área afetada:** Regras de negócio
- **Problema:** A seção 7.5 diz "Configurações visuais são mantidas durante a sessão", e a seção 12 repete. Mas "sessão" não é definido: é enquanto a aba está aberta? Inclui reload da página? Se PD-01 (autosave) não for aprovado, configurações são perdidas no reload.
- **Por que isso pode gerar erro:** Se o usuário recarregar a página, pode perder todas as configurações. O PRD não deixa claro se isso é aceitável.
- **Trecho ou referência do PRD:** Seções 7.5, 12.
- **Correção recomendada:** Definir "sessão": "Configurações são mantidas em memória enquanto a aba está aberta. Recarregar a página restaura configurações padrão (a menos que PD-01 seja aprovado)."
- **Precisa de decisão humana?** Não — é clarificação.
- **Impacto se não corrigir:** Médio — usuário pode perder configurações sem aviso.

### IMPORTANTE 18 — Seção 15.2 define 44px para toque mas não para botões da toolbar

- **Área afetada:** Requisitos não funcionais / Acessibilidade
- **Problema:** A seção 15.2 exige "Botões e controles devem ter ao menos 44px de área de toque em mobile", mas a toolbar (seção 7.2) não menciona esse requisito. Se a toolbar tiver botões pequenos, viola 15.2.
- **Por que isso pode gerar erro:** O agente pode estilizar botões da toolbar com tamanho inadequado para mobile.
- **Trecho ou referência do PRD:** Seções 7.2, 15.2.
- **Correção recomendada:** Adicionar na seção 7.2: "Botões da toolbar devem ter ao menos 44px de área de toque em mobile."
- **Precisa de decisão humana?** Não
- **Impacto se não corrigir:** Baixo — acessibilidade mobile.

---

## 4. Achados opcionais

### OPCIONAL 1 — Sem wireframes ou mockups referenciados

- **Área afetada:** Telas / Design
- **Observação:** O PRD descreve telas em texto mas não referencia wireframes, mockups ou o `docs/design/UI_UX_GUIDE.md`. Para pessoa não técnica como público-alvo, a experiência visual é crítica.
- **Benefício da melhoria:** Wireframes reduzem ambiguidade sobre layout e posição de elementos.
- **Correção recomendada:** Referenciar `docs/design/UI_UX_GUIDE.md` se existir, ou criar wireframes básicos das telas principais.
- **Bloqueia implementação?** Não

### OPCIONAL 2 — Quatro templates pode ser muito para MVP

- **Área afetada:** Escopo
- **Observação:** O PRD lista 4 templates (relatório executivo, currículo, artigo acadêmico, documentação técnica). Para MVP de estabilização, 2 templates bem feitos podem ser suficientes.
- **Benefício da melhoria:** Menos templates = menos conteúdo para criar, testar e manter.
- **Correção recomendada:** Considerar começar com 2 templates (relatório executivo e currículo) e adicionar os outros em V1.
- **Bloqueia implementação?** Não

### OPCIONAL 3 — TypeScript strict mode e linting não mencionados

- **Área afetada:** Manutenibilidade
- **Observação:** A seção 15.4 exige "TypeScript com tipagem estrita", mas não menciona `tsconfig.json` com `strict: true`, ESLint ou Prettier.
- **Benefício da melhoria:** Configuração explícita garante consistência e pega erros mais cedo.
- **Correção recomendada:** Adicionar: "tsconfig.json deve ter `strict: true`. Projeto deve ter ESLint configurado com regras para React e TypeScript."
- **Bloqueia implementação?** Não

### OPCIONAL 4 — Heading color como configuração visual única

- **Área afetada:** Escopo / UX
- **Observação:** "Cor dos headings" é uma configuração visual listada na seção 5 e 7.5, mas não há critério de aceite específico nem comportamento descrito (ex.: é um seletor de cor? dropdown com opções? afeta H1-H6 igualmente?).
- **Benefício da melhoria:** Especificação evita implementação inconsistente.
- **Correção recomendada:** Adicionar critério: "Seletor de cor (input type color ou preset de cores) que afeta todos os headings (H1-H6) igualmente."
- **Bloqueia implementação?** Não

### OPCIONAL 5 — Nenhuma menção a favicon e meta tags

- **Área afetada:** Deploy / SEO
- **Observação:** A seção 14 menciona "favicon, meta tags, SEO básico" no impacto da decisão de deploy, mas o PRD não especifica quais meta tags são obrigatórias.
- **Benefício da melhoria:** Meta tags corretas melhoram compartilhamento e aparência em links.
- **Correção recomendada:** Adicionar: favicon, `<title>`, `<meta name="description">`, Open Graph tags básicas (og:title, og:description, og:image).
- **Bloqueia implementação?** Não

### OPCIONAL 6 — "Documentação técnica" como template pode confundir

- **Área afetada:** Produto
- **Observação:** O template "documentação técnica" atende persona secundária (usuário que já conhece Markdown), não o público principal. Pode ser menos útil para pessoa não técnica.
- **Benefício da melhoria:** Focar templates no público-alvo aumenta relevância.
- **Correção recomendada:** Considerar substituir "documentação técnica" por "carta/formal" ou "proposta comercial", que são mais relevantes para pessoa não técnica.
- **Bloqueia implementação?** Não

---

## 5. Correções recomendadas

| Prioridade | Correção | Tipo | Bloqueia plano de implementação? | Precisa de humano? |
|---|---|---|---|---|
| Alta | Definir critério objetivo de fidelidade preview/PDF (CRÍTICO 1) | Critério | Sim | Sim |
| Alta | Especificar conteúdo e configurações dos templates (CRÍTICO 2) | Requisito | Sim | Sim |
| Alta | Definir comportamento de troca de template (CRÍTICO 3) | Regra | Sim | Sim |
| Alta | Resolver conflito autosave / PD-01 / Fora de escopo (CRÍTICO 4) | Escopo | Sim | Sim |
| Alta | Reescrever critérios de aceite subjetivos como verificáveis (IMPORTANTE 1) | Critério | Sim | Não |
| Alta | Especificar comportamento mobile completo (IMPORTANTE 2) | Tela | Sim | Não |
| Alta | Especificar imagens na toolbar (IMPORTANTE 4) | Requisito | Sim | Sim |
| Média | Especificar loading/progresso na exportação (IMPORTANTE 3) | Tela | Não | Não |
| Média | Detalhar configuração de deploy Vercel (IMPORTANTE 5) | Integração | Não | Não |
| Média | Especificar abordagem de migração Tailwind (IMPORTANTE 6) | Integração | Não | Não |
| Média | Corrigir regras de sanitização do nome do PDF (IMPORTANTE 7) | Regra | Não | Não |
| Média | Definir comportamento de `---` em code blocks (IMPORTANTE 8) | Regra | Não | Não |
| Média | Decidir sobre tema do editor (claro/escuro) (IMPORTANTE 9) | Requisito | Não | Sim |
| Média | Especificar encoding de importação (IMPORTANTE 10) | Regra | Não | Não |
| Média | Definir preview com conteúdo vazio (IMPORTANTE 11) | Tela | Não | Não |
| Média | Detalhar inicialização Git (IMPORTANTE 12) | Integração | Não | Não |
| Média | Definir numeração de página (IMPORTANTE 15) | Regra | Não | Não |
| Média | Clarificar "sessão" para configurações (IMPORTANTE 17) | Regra | Não | Não |
| Baixa | Adicionar critério de aceite condicional para PD-04 (IMPORTANTE 16) | Critério | Não | Não |
| Baixa | Adicionar requisito de toque 44px na toolbar (IMPORTANTE 18) | Critério | Não | Não |
| Baixa | Referenciar wireframes ou UI guide (OPCIONAL 1) | Telas | Não | Não |
| Baixa | Considerar reduzir templates para 2 (OPCIONAL 2) | Escopo | Não | Sim |
| Baixa | Adicionar ESLint/Prettier (OPCIONAL 3) | Manutenibilidade | Não | Não |
| Baixa | Especificar heading color (OPCIONAL 4) | Requisito | Não | Não |
| Baixa | Adicionar favicon e meta tags (OPCIONAL 5) | Deploy | Não | Não |
| Baixa | Reavaliar template "documentação técnica" (OPCIONAL 6) | Produto | Não | Sim |

---

## 6. Pontos de decisão pendentes

| Ponto de decisão | Por que importa | Impacto | Prioridade |
|---|---|---|---|
| PD-01: Autosave no MVP? | Conflito com seção "Fora de escopo"; bloqueia definição de comportamento no reload | Alto | Alta |
| PD-02: Critério de fidelidade preview/PDF | Sem definição, critérios de aceite são inválidos; bloqueia validação | Alto | Alta |
| PD-03: Tamanho máximo de arquivo importado | Define limites técnicos da importação | Médio | Média |
| PD-04: Confirmação antes de substituir conteúdo | Afeta UX de importação e troca de template | Médio | Média |
| PD-05: Presets de estilo disponíveis | Define biblioteca visual do MVP | Médio | Média |
| PD-06: Temas de capa disponíveis | Define aparência da capa | Baixo | Baixa |
| PD-07: Quantos e quais templates no MVP | Conteúdo dos templates não especificado | Alto | Alta |
| PD-08: Heurísticas além de título/subtítulo | Define automação de metadados | Baixo | Baixa |
| PD-09: Limite de tamanho/páginas do PDF | Define limites da exportação | Médio | Média |
| PD-10: Biblioteca de sanitização | Define implementação da sanitização (recomendação: DOMPurify) | Alto | Alta |
| Imagens na toolbar: upload ou URL? | Não há especificação; toolbar lista "imagem" sem detalhes | Médio | Média |
| Tema do editor (claro/escuro): entra no MVP? | Listado na seção 5 mas ausente na seção 7.5 | Baixo | Baixa |

---

## 7. Riscos para o agente de código

| Risco de interpretação | Possível erro do coder | Como corrigir no PRD |
|---|---|---|
| "Alta fidelidade visual" sem definição | Implementar pixel-perfect (complexo demais) ou aceitar diferenças grandes (usuário insatisfeito) | Definir critérios objetivos de fidelidade |
| Template "carrega conteúdo e configurações" | Substituir conteúdo do editor sem aviso, causando perda de trabalho | Definir se substitui conteúdo, se pede confirmação, se preserva overrides |
| Autosave fora de escopo E PD-01 pendente | Ignorar PD-01 e não implementar, ou implementar sem autorização | Resolver conflito; remover de uma das duas listas |
| "Configurações mantidas durante sessão" | Implementar localStorage para configurações (fora do escopo se autosave não aprovado) | Definir "sessão" explicitamente |
| `---` como quebra de página | Detectar `---` dentro de code blocks e criar quebras incorretas | Especificar contextos onde `---` é ignorado |
| "10.000 caracteres sem travar" | Interpretar como limite rígido e truncar conteúdo | Clarificar que é teste de performance, não limite funcional |
| Toolbar com botão "imagem" | Implementar upload de imagem (complexo) sem especificação | Definir se é URL ou upload |
| Preview "scrollável" | Implementar scroll por página (paginated scroll) em vez de scroll contínuo | Definir tipo de scroll |
| "Página X de Y" na numeração | Contar capa como página 1 | Esclarificar se capa é contada |
| CDN substituir por npm = simples | Subestimar Tailwind (requer configuração de build, não é só npm install) | Detalhar abordagem de migração do Tailwind |

---

## 8. Veredito final

**Classificação:** `Parcialmente pronto`

**Motivo:** O PRD é bem estruturado, com escopo controlado, regras de negócio definidas e critérios de aceite presentes. Porém, 4 achados críticos impedem a geração de um plano de implementação confiável: fidelidade preview/PDF indefinida, templates sem conteúdo especificado, comportamento de troca de template ambíguo e conflito interno sobre autosave.

### Pode virar plano de implementação agora?

`Sim, com ressalvas`

### Condições para avançar

1. **Obrigatório antes do plano:** Resolver os 4 achados críticos (CRÍTICO 1 a 4). Sem isso, o agente coder terá que inventar regras de negócio.
2. **Altamente recomendado:** Resolver os achados importantes 1, 2, 4 e 8 (critérios verificáveis, mobile, imagens, `---` em code blocks).
3. **Desejável:** Resolver os demais achados importantes antes de implementar features (depois do plano, antes do código).

### Próxima ação recomendada

Corrigir achados críticos e importantes. Os 4 críticos precisam de decisão humana (PD-01, PD-02, PD-07, comportamento de template). Os importantes podem ser resolvidos pelo agente com base em convenções técnicas.

**Sequência sugerida:**
1. Resolver PD-01, PD-02, PD-07 e comportamento de template (humanos ou delegação).
2. Corrigir achados importantes 1, 2, 4, 8 (agente, sem humano).
3. Atualizar PRD com correções.
4. Gerar plano de implementação.
