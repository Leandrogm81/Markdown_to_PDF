# Guia UI/UX do Projeto

## 1. Objetivo do guia

Este documento define a direção visual, os princípios de UX, os critérios de aceite visual e o padrão estético mínimo do projeto.

Ele deve ser usado por qualquer agente, modelo ou desenvolvedor que implemente telas, componentes, formulários, tabelas, menus, textos de interface, estados visuais ou fluxos de usuário.

O objetivo principal é garantir uma interface:

- bonita;
- elegante;
- profissional;
- consistente;
- responsiva;
- clara;
- funcional;
- visualmente madura;
- sem aparência genérica de IA;
- sem aparência de protótipo improvisado;
- sem excesso de decoração sem função.

Este guia deve ser tratado como fonte obrigatória sempre que houver impacto direto ou indireto em UI/UX.

Se houver conflito entre este guia e uma instrução específica do PRD, o PRD prevalece para regras de produto, e este guia prevalece para critérios visuais, desde que não altere escopo, fluxo ou regra de negócio.

---

## 2. Personalidade visual do produto

A interface deve transmitir:

- profissionalismo;
- confiança;
- clareza;
- organização;
- sobriedade;
- precisão;
- facilidade de uso;
- estabilidade;
- sensação de produto real e maduro;
- sensação de ferramenta prática, não de vitrine decorativa.

A interface NÃO deve parecer:

- template genérico de SaaS;
- dashboard artificial criado por IA;
- landing page chamativa sem propósito;
- protótipo improvisado;
- painel poluído;
- sistema cheio de cards decorativos;
- interface com excesso de gradientes, sombras ou ícones aleatórios;
- produto visualmente bonito, mas pouco utilizável;
- tela montada apenas para impressionar em screenshot.

A estética deve ser moderna, mas discreta.

O foco é:

1. utilidade;
2. legibilidade;
3. consistência;
4. hierarquia visual;
5. velocidade de compreensão;
6. confiança operacional.

---

## 3. Princípios de UX

Toda tela ou fluxo deve seguir estes princípios:

1. Clareza acima de decoração.
2. Uma ação principal evidente por tela ou seção.
3. Hierarquia visual fácil de entender.
4. Pouca carga cognitiva.
5. Textos objetivos e úteis.
6. Feedback claro para ações do usuário.
7. Estados vazios explicativos.
8. Mensagens de erro compreensíveis.
9. Responsividade real, não apenas tela encolhida.
10. Consistência entre componentes.
11. Fluxos previsíveis.
12. Ações destrutivas sempre devem exigir cuidado visual.
13. Informações importantes devem ter prioridade visual.
14. Elementos decorativos só devem existir se ajudarem a compreensão.
15. A interface deve parecer feita para uso diário, não apenas para demonstração.
16. O usuário deve entender rapidamente:
    - onde está;
    - o que pode fazer;
    - qual ação é mais importante;
    - qual será a consequência da ação.

---

## 4. Direção visual

### 4.1 Layout

O layout deve ser organizado, espaçado e previsível.

Regras:

- usar alinhamento consistente;
- evitar blocos soltos sem relação visual;
- agrupar informações relacionadas;
- usar áreas em branco para melhorar leitura;
- evitar excesso de elementos na primeira dobra;
- evitar excesso de cards;
- evitar telas com tudo competindo por atenção;
- manter largura máxima confortável para leitura;
- priorizar grids simples;
- manter fluxo visual de cima para baixo e da esquerda para direita;
- destacar apenas o que realmente importa;
- evitar seções decorativas sem função;
- evitar repetir o mesmo tipo de bloco muitas vezes;
- evitar que botões, badges, ícones e cards tenham todos o mesmo peso visual.

Recomendações:

- páginas de conteúdo: largura máxima entre `960px` e `1200px`;
- dashboards: grid responsivo com colunas claras;
- formulários: largura confortável, sem campos comprimidos;
- telas mobile: uma coluna principal;
- ações principais: próximas ao contexto da decisão;
- páginas densas: usar seções colapsáveis apenas quando isso melhorar clareza;
- páginas simples: evitar estruturas complexas desnecessárias.

### 4.1.1 Hierarquia de página

Toda página relevante deve ter uma hierarquia clara:

1. Cabeçalho da página.
2. Descrição curta do contexto.
3. Ação principal.
4. Conteúdo principal.
5. Ações secundárias.
6. Informações auxiliares.
7. Estados e mensagens.

Exemplo de hierarquia boa:

```text
Título da página
Descrição curta do que a tela faz
Botão principal
Conteúdo principal organizado
Ações secundárias discretas
Mensagens e estados contextuais
```

Exemplo de hierarquia ruim:

```text
Vários cards competindo
Três botões primários
Título genérico
Ícones decorativos
Informações importantes escondidas
Tabela espremida
```

---

### 4.2 Cores

A paleta deve ser sóbria e profissional.

Quando o projeto ainda não tiver paleta definida, use uma base semelhante a esta:

| Uso | Cor sugerida | Observação |
|---|---|---|
| Fundo principal | `#F8FAFC` | claro, neutro |
| Superfície/card | `#FFFFFF` | superfície principal |
| Texto principal | `#0F172A` | alta legibilidade |
| Texto secundário | `#475569` | apoio visual |
| Texto discreto | `#64748B` | metadados e ajuda |
| Borda | `#E2E8F0` | separação leve |
| Primária | `#1D4ED8` | ação principal |
| Primária hover | `#1E40AF` | interação |
| Sucesso | `#15803D` | confirmação |
| Alerta | `#B45309` | atenção |
| Erro | `#B91C1C` | erro/destrutivo |
| Fundo erro leve | `#FEF2F2` | mensagens de erro |
| Fundo sucesso leve | `#F0FDF4` | mensagens positivas |
| Fundo alerta leve | `#FFFBEB` | mensagens de atenção |
| Fundo informativo leve | `#EFF6FF` | mensagens informativas |

Regras:

- não usar muitas cores principais;
- não usar gradientes chamativos sem função;
- não usar roxo/azul neon como padrão automático de IA;
- não misturar paletas diferentes;
- não usar cor como único indicador de estado;
- garantir contraste adequado entre texto e fundo;
- reservar cores fortes para ações, alertas ou estados importantes;
- evitar múltiplas cores saturadas na mesma tela;
- evitar badges coloridas demais sem hierarquia clara.

### 4.2.1 Uso correto de cor

Use cor para:

- indicar ação principal;
- diferenciar estados;
- chamar atenção para alertas reais;
- destacar status importantes;
- organizar informações quando isso ajudar a compreensão.

Não use cor para:

- decorar cards sem função;
- criar "efeito dashboard" artificial;
- destacar tudo ao mesmo tempo;
- compensar layout confuso;
- criar aparência chamativa sem ganho de UX.

---

### 4.3 Tipografia

A tipografia deve priorizar leitura.

Regras:

- títulos devem ser claros e objetivos;
- subtítulos devem explicar contexto, não enfeitar;
- corpo de texto deve ter tamanho confortável;
- labels devem ser visíveis e diretos;
- placeholders não substituem labels;
- evitar frases longas em botões;
- evitar textos genéricos de marketing;
- evitar excesso de pesos tipográficos;
- manter consistência entre páginas.

Escala sugerida:

| Elemento | Tamanho sugerido | Peso |
|---|---:|---:|
| Título principal | 28–36px | 600–700 |
| Título de seção | 20–24px | 600 |
| Subtítulo | 16–18px | 400–500 |
| Corpo | 14–16px | 400 |
| Label | 13–14px | 500 |
| Texto auxiliar | 12–14px | 400 |
| Botão | 14–15px | 500–600 |
| Badge | 11–13px | 500 |
| Texto de tabela | 13–14px | 400–500 |

### 4.3.1 Tom textual da interface

A interface deve usar linguagem:

- direta;
- operacional;
- simples;
- objetiva;
- sem excesso de marketing;
- sem frases abstratas;
- sem "copy de startup" genérica.

Evitar:

```text
Transforme sua experiência com uma solução completa e inteligente.
```

Preferir:

```text
Crie, acompanhe e edite seus orçamentos em um só lugar.
```

---

### 4.4 Espaçamento

Use uma escala consistente:

| Valor | Uso |
|---:|---|
| 4px | microajustes, ícones próximos de texto |
| 8px | separação pequena entre elementos relacionados |
| 12px | espaçamento interno compacto |
| 16px | espaçamento padrão entre campos e blocos |
| 24px | separação entre grupos |
| 32px | separação entre seções |
| 48px | grandes blocos ou respiro superior |
| 64px | hero, páginas institucionais ou separações maiores |

Regras:

- não usar espaçamentos aleatórios;
- não comprimir formulários;
- não deixar cards grudados;
- não criar telas com excesso de espaço vazio sem função;
- manter consistência entre telas semelhantes;
- usar espaçamento para organizar, não para enfeitar;
- não deixar telas com densidade inconsistente, onde uma seção parece comprimida e outra parece solta demais.

### 4.4.1 Densidade visual

A densidade deve ser adequada ao tipo de tela:

| Tipo de tela | Densidade recomendada |
|---|---|
| Dashboard operacional | média |
| Formulário | média-baixa |
| Relatório | média-alta, mas legível |
| Página inicial simples | baixa-média |
| Lista/tabela | média-alta com boa hierarquia |
| Tela mobile | baixa-média |

Evite dois extremos:

- tela vazia demais sem conteúdo útil;
- tela densa demais sem respiro.

---

### 4.5 Bordas, sombras e cantos

Regras:

- bordas devem ser leves e funcionais;
- sombras devem ser discretas;
- cantos arredondados devem ser consistentes;
- evitar sombra forte em todos os cards;
- evitar bordas arredondadas exageradas em todos os elementos;
- não usar sombra como principal separador visual se uma borda leve resolver;
- não misturar muitos raios de borda diferentes.

Sugestões:

| Elemento | Raio | Sombra |
|---|---:|---|
| Botões | 8–10px | nenhuma ou muito leve |
| Inputs | 8–10px | nenhuma |
| Cards | 12–16px | leve, se necessário |
| Modais | 16–20px | média e discreta |
| Badges | 999px | nenhuma |
| Tabelas | 8–12px | nenhuma ou mínima |
| Menus dropdown | 10–14px | leve |

Sombra recomendada para cards, quando necessária:

- suave;
- baixa opacidade;
- sem efeito flutuante exagerado;
- coerente entre cards do mesmo nível.

---

## 5. Componentes principais

### 5.1 Botões

Tipos esperados:

- primário;
- secundário;
- destrutivo;
- fantasma;
- link/terciário.

Regras:

- cada tela deve ter uma ação principal clara;
- botões primários não devem competir entre si;
- ações secundárias devem ser discretas;
- ações destrutivas devem ter cor e texto claros;
- estado disabled deve ser visualmente evidente;
- estado loading deve impedir clique duplicado;
- texto do botão deve começar com verbo;
- botões devem ter altura confortável em desktop e mobile;
- botões com ícone devem manter rótulo textual quando a clareza exigir.

Exemplos bons:

- `Criar orçamento`
- `Salvar alterações`
- `Adicionar cliente`
- `Enviar pedido`
- `Cancelar`
- `Excluir item`
- `Gerar relatório`
- `Ver detalhes`

Exemplos ruins:

- `Começar agora`
- `Explorar possibilidades`
- `Transformar experiência`
- `Desbloquear potencial`
- `Gerenciar tudo`
- `Clique aqui`
- `Avançar para o futuro`

---

### 5.2 Inputs e formulários

Regras:

- todo campo deve ter label;
- placeholder deve ser apenas ajuda complementar;
- mensagens de erro devem explicar o problema;
- campos obrigatórios devem ser identificáveis;
- grupos de campos devem ter lógica visual;
- formulários longos devem ser divididos por seções;
- validação deve ser clara;
- não usar apenas cor para indicar erro;
- inputs devem ter altura confortável para mobile;
- campos relacionados devem ficar próximos;
- campos menos importantes podem ser visualmente secundários;
- botões de envio devem ficar no fim natural do fluxo.

Cada formulário relevante deve prever:

- estado inicial;
- preenchimento parcial;
- erro de validação;
- envio em andamento;
- sucesso;
- falha de envio;
- cancelamento, quando aplicável.

### 5.2.1 Formulários longos

Formulários longos devem:

- ser divididos por seções;
- ter títulos de seção claros;
- evitar campos desnecessários;
- mostrar apenas campos relevantes quando possível;
- preservar dados preenchidos em caso de erro;
- indicar erros próximos dos campos correspondentes;
- evitar depender apenas de alerta global.

---

### 5.3 Cards

Cards devem ser usados apenas para agrupar informações relacionadas.

Usar card para:

- resumo de uma entidade;
- bloco de formulário;
- agrupamento de métricas úteis;
- item de lista com ações;
- painel de informação;
- agrupamento de status ou pendências;
- resumo de dados acionáveis.

Não usar card para:

- decoração vazia;
- preencher espaço;
- criar aparência de dashboard sem necessidade;
- repetir informações sem função;
- criar múltiplos blocos visualmente iguais sem hierarquia.

Regras:

- card deve ter título claro;
- card deve ter conteúdo útil;
- ações devem ficar próximas ao contexto;
- evitar vários cards com o mesmo peso visual;
- evitar cards excessivamente coloridos;
- evitar ícones grandes sem função;
- cards de alerta devem ser usados com moderação.

---

### 5.4 Tabelas e listas

Tabelas devem ser legíveis e funcionais.

Regras:

- cabeçalhos claros;
- alinhamento consistente;
- ações por linha discretas;
- estado vazio útil;
- paginação ou rolagem quando necessário;
- em mobile, considerar cards/lista em vez de tabela espremida;
- evitar colunas demais;
- valores importantes devem ter destaque moderado;
- colunas numéricas devem ter alinhamento previsível;
- ações frequentes devem estar fáceis de encontrar;
- ações raras não devem poluir a tabela.

Estados obrigatórios:

- carregando;
- vazio;
- erro;
- sem resultados após filtro;
- dados parciais, quando aplicável.

### 5.4.1 Listas em mobile

Em mobile, listas devem priorizar:

- título do item;
- informação mais importante;
- status;
- ação principal;
- ação secundária, se necessária.

Evite tabelas horizontais espremidas quando os dados puderem ser reorganizados em cards compactos.

---

### 5.5 Modais

Modais devem ser usados com moderação.

Regras:

- título direto;
- descrição curta;
- ação principal clara;
- ação de cancelar disponível;
- foco visual no conteúdo;
- não usar modal para tudo;
- ações destrutivas devem exigir confirmação clara;
- modal deve funcionar bem em mobile;
- modais não devem conter fluxos longos quando uma página dedicada for melhor.

Use modal para:

- confirmação;
- formulário curto;
- detalhe rápido;
- aviso importante;
- ação contextual.

Evite modal para:

- cadastro longo;
- fluxo de múltiplas etapas;
- edição complexa;
- navegação principal.

---

### 5.6 Navegação

Regras:

- menu deve ser previsível;
- item ativo deve ser visível;
- nomes devem ser objetivos;
- evitar excesso de níveis;
- evitar ícones sem texto quando isso prejudicar clareza;
- mobile deve ter navegação adaptada;
- páginas internas podem usar breadcrumbs quando necessário;
- o usuário deve saber onde está;
- o usuário deve conseguir voltar ou cancelar sem medo.

Nomes bons:

- `Orçamentos`
- `Clientes`
- `Pedidos`
- `Agenda`
- `Relatórios`
- `Configurações`

Nomes ruins:

- `Central`
- `Hub`
- `Painel inteligente`
- `Experiência`
- `Workspace`
- `Área premium`

---

## 6. Estados obrigatórios

Toda tela relevante deve considerar:

- carregando;
- vazio;
- erro;
- sucesso;
- permissão negada;
- dados incompletos;
- primeira utilização;
- sem resultados;
- offline ou falha de rede, quando aplicável;
- mobile;
- desktop.

Estados não devem ser genéricos. Eles precisam orientar o usuário.

Exemplo ruim:

```text
Erro inesperado.
```

Exemplo melhor:

```text
Não foi possível carregar os orçamentos. Verifique sua conexão e tente novamente.
```

### 6.1 Empty states

Estados vazios devem responder:

1. O que está vazio?
2. Por que isso pode estar vazio?
3. O que o usuário pode fazer agora?
4. Qual é a ação principal?

Exemplo:

```text
Nenhum orçamento cadastrado.
Crie o primeiro orçamento para começar a acompanhar seus pedidos.
[Criar orçamento]
```

### 6.2 Loading states

Loading states devem:

- mostrar que o sistema está trabalhando;
- evitar tela piscando;
- evitar múltiplos spinners sem contexto;
- manter layout estável sempre que possível;
- usar skeleton quando fizer sentido.

### 6.3 Error states

Mensagens de erro devem:

- explicar o que aconteceu;
- indicar o que o usuário pode tentar;
- não culpar o usuário;
- não expor detalhes técnicos sensíveis;
- preservar dados preenchidos quando possível.

---

## 7. Responsividade

A interface deve funcionar bem em:

- mobile;
- tablet;
- desktop;
- telas largas.

Regras:

- não apenas reduzir a tela;
- reorganizar layout quando necessário;
- formulários em mobile devem usar uma coluna;
- botões devem ter área de toque confortável;
- tabelas devem se adaptar;
- menus devem ser utilizáveis no toque;
- textos não devem quebrar de forma ruim;
- ações importantes não devem sumir no mobile;
- modais devem caber na altura da tela;
- cards devem reorganizar sem perder sentido.

Critérios mínimos:

- nenhuma rolagem horizontal indevida;
- botões clicáveis em telas pequenas;
- textos legíveis;
- campos acessíveis;
- navegação funcional;
- estados de erro visíveis;
- ação principal disponível;
- conteúdo importante não cortado;
- tabelas ou listas utilizáveis.

### 7.1 Breakpoints recomendados

Quando o projeto não definir breakpoints próprios, considere:

| Faixa | Uso |
|---|---|
| até `640px` | mobile |
| `641px–1024px` | tablet |
| `1025px–1440px` | desktop |
| acima de `1440px` | telas largas |

Não dependa apenas de breakpoints. A interface também deve se adaptar por conteúdo.

---

## 8. Microcopy

Textos da interface devem ser claros, diretos e úteis.

Regras:

- usar verbos de ação;
- evitar frases vagas;
- evitar linguagem exageradamente comercial;
- evitar frases típicas de template IA;
- mensagens de erro devem orientar correção;
- textos vazios devem dizer o que fazer;
- botões devem dizer exatamente a ação;
- textos devem reduzir dúvida;
- títulos devem explicar função, não vender promessa abstrata.

Exemplos ruins:

- `Transforme sua experiência`
- `Gerencie tudo em um só lugar`
- `Desbloqueie seu potencial`
- `Dashboard inteligente e poderoso`
- `Comece sua jornada`
- `Experiência fluida e moderna`
- `A solução definitiva para seu negócio`

Exemplos bons:

- `Criar orçamento`
- `Adicionar cliente`
- `Salvar alterações`
- `Ver pedidos pendentes`
- `Corrigir campos obrigatórios`
- `Nenhum orçamento encontrado`
- `Cadastrar primeiro produto`
- `Enviar proposta`
- `Editar dados do cliente`

---

## 9. Acessibilidade básica

Regras mínimas:

- contraste adequado;
- labels visíveis;
- foco de teclado perceptível;
- botões com texto claro;
- não depender apenas de cor;
- mensagens de erro associadas ao campo;
- ordem de navegação lógica;
- áreas clicáveis confortáveis;
- textos legíveis em mobile;
- imagens com texto alternativo quando necessário;
- ícones importantes com rótulo acessível;
- modais com foco adequado;
- elementos interativos distinguíveis.

---

## 10. Padrões proibidos

O agente ou desenvolvedor NÃO deve:

- usar gradientes chamativos sem necessidade;
- criar cards decorativos sem função;
- usar ícones aleatórios;
- usar textos genéricos de marketing;
- criar dashboard artificial;
- usar animações excessivas;
- misturar estilos visuais;
- alterar paleta sem autorização;
- criar componentes duplicados se já existir padrão;
- sacrificar legibilidade por estética;
- usar sombra forte em todos os elementos;
- usar roxo/azul neon como estética padrão de IA;
- criar telas visualmente bonitas, mas confusas;
- esconder ações importantes;
- ignorar mobile;
- ignorar estados vazios, loading e erro;
- inventar componentes fora do padrão do projeto;
- criar telas com "cara de demo" em vez de produto real;
- usar textos abstratos para ações concretas;
- criar muitos badges coloridos sem função;
- criar gráficos sem necessidade de decisão;
- usar animação para disfarçar falta de clareza;
- criar variações visuais sem padrão.

---

## 11. Critérios de aceite visual

Uma tela só deve ser considerada aprovada se:

- a hierarquia visual for clara;
- houver uma ação principal evidente;
- o espaçamento for consistente;
- os componentes seguirem o mesmo padrão;
- os estados de erro, loading e vazio existirem quando aplicáveis;
- a tela funcionar em mobile;
- a tela funcionar em desktop;
- não houver poluição visual;
- não houver textos genéricos;
- não houver elementos decorativos inúteis;
- a interface parecer produto real, não protótipo IA;
- os botões tiverem rótulos claros;
- formulários tiverem labels;
- mensagens de erro forem úteis;
- cores e tipografia estiverem consistentes;
- ações destrutivas forem tratadas com cuidado;
- o usuário conseguir entender a tela em poucos segundos;
- o fluxo principal não depender de adivinhação.

---

## 12. Checklist para cada nova tela

Antes de aprovar uma tela, verificar:

- [ ] título claro;
- [ ] descrição curta, se necessária;
- [ ] ação principal visível;
- [ ] ações secundárias discretas;
- [ ] formulário com labels claros;
- [ ] feedback de erro;
- [ ] feedback de sucesso;
- [ ] loading state;
- [ ] empty state;
- [ ] responsividade mobile;
- [ ] responsividade desktop;
- [ ] acessibilidade básica;
- [ ] consistência com componentes existentes;
- [ ] ausência de aparência genérica de IA;
- [ ] ausência de decoração inútil;
- [ ] botões com verbos claros;
- [ ] mensagens úteis;
- [ ] ações destrutivas protegidas;
- [ ] comportamento compatível com o PRD.

---

## 13. Instruções para agentes coders

Antes de criar ou alterar qualquer elemento visual, o agente deve:

1. Ler este guia.
2. Verificar componentes existentes.
3. Reutilizar padrões visuais já existentes.
4. Evitar criar novo estilo sem necessidade.
5. Não implementar decoração gratuita.
6. Validar mobile e desktop.
7. Registrar no relatório final como a UI segue este guia.
8. Explicar qualquer desvio.
9. Separar correção funcional de melhoria estética.
10. Não alterar fluxo ou regra de negócio em nome de estética.
11. Não criar componente novo se houver equivalente existente.
12. Não trocar identidade visual sem autorização.

Se a tarefa não tiver impacto visual, o agente deve registrar:

```text
Impacto UI/UX: Não aplicável.
```

Se houver impacto direto ou indireto, o agente deve registrar:

- quais regras do guia foram aplicadas;
- quais estados foram tratados;
- como a responsividade foi validada;
- se há risco visual restante;
- quais componentes foram reutilizados;
- se houve qualquer desvio do padrão.

---

## 14. Design Quality Gate

Antes de considerar uma alteração visual concluída, o agente deve responder:

| Pergunta | Resposta |
|---|---|
| A tela tem uma ação principal clara? | Sim/Não/Não aplicável |
| A hierarquia visual está clara? | Sim/Não/Não aplicável |
| A tela tem estados de loading, erro e vazio quando aplicável? | Sim/Não/Não aplicável |
| A tela funciona em mobile? | Sim/Não/Não verificado |
| A tela funciona em desktop? | Sim/Não/Não verificado |
| Os textos são objetivos? | Sim/Não/Não aplicável |
| Os componentes seguem padrão existente? | Sim/Não/Não verificado |
| Há aparência genérica de IA? | Sim/Não |
| Alguma regra de negócio foi alterada por estética? | Sim/Não |
| Há pendência de validação humana? | Sim/Não |

Se qualquer resposta crítica for `Não` ou `Não verificado`, o agente deve registrar a limitação no relatório final.

---

## 15. Maturidade visual esperada

Classifique a maturidade visual da tela ou componente como:

- `Pronto`;
- `Aceitável com ressalvas`;
- `Funcional, mas visualmente fraco`;
- `Confuso`;
- `Não verificável`.

Use esta classificação em auditorias visuais, validações de UI/UX e relatórios finais de tarefa com impacto visual.

Critérios:

| Classificação | Significado |
|---|---|
| Pronto | Visual claro, consistente, responsivo e alinhado ao guia |
| Aceitável com ressalvas | Funciona bem, mas tem ajustes menores |
| Funcional, mas visualmente fraco | Entrega função, mas precisa refinamento visual |
| Confuso | Pode gerar erro, dúvida ou fricção ao usuário |
| Não verificável | Não há evidência suficiente para avaliar |

---

## 16. Referências internas e componentes aprovados

### 16.1 Biblioteca de componentes aprovados

Componentes implementados, auditados e aprovados. Consulte antes de criar componente novo.

| Componente | Arquivo | Variantes aprovadas | Data de aprovação |
|---|---|---|---|

Se nenhum componente foi aprovado:

`Nenhum componente aprovado registrado. Esta seção deve ser preenchida após a primeira auditoria aprovada.`

### 16.2 Decisões visuais permanentes

| Decisão | Valor adotado | Motivo | Data |
|---|---|---|---|
| Paleta oficial | | | |
| Tipografia principal | | | |
| Framework CSS | | | |
| Design system base | | | |
| Raio de borda padrão | | | |

### 16.3 Telas aprovadas como referência visual

| Tela | Arquivo | Print/descrição | Aprovada em |
|---|---|---|---|

### 16.4 Padrões proibidos específicos do projeto

| Padrão proibido | Motivo | Alternativa aprovada |
|---|---|---|

Se não houver proibições específicas:

`Nenhuma proibição adicional. Seguir apenas os padrões gerais da seção 10.`

### 16.5 Prompt de registro de componente

Use após auditoria visual aprovar uma tela ou componente.

```markdown
# Registro de Componente/Tela Aprovado

## Identificação
- Nome:
- Arquivo de implementação:
- Data de aprovação:
- Auditoria de referência:

## Variantes aprovadas
- [ ] Default
- [ ] Hover
- [ ] Focus
- [ ] Disabled
- [ ] Error
- [ ] Loading
- [ ] Empty state
- [ ] Success

## Decisões visuais específicas
[descrever]

## Como reutilizar
[instrução objetiva]

## Restrições de uso
[o que não deve ser feito]
```

---

## 17. Instrução final para uso deste guia

Sempre que uma tarefa envolver UI/UX, o agente deve usar este guia como referência obrigatória.

O agente não deve transformar este guia em justificativa para:

- alterar escopo;
- mudar regra de negócio;
- alterar arquitetura;
- criar telas extras;
- trocar biblioteca visual;
- redesenhar todo o produto;
- fazer refatoração ampla.

Este guia serve para melhorar a qualidade visual e a experiência de uso dentro do escopo já aprovado.

Quando houver conflito entre estética e escopo, o escopo prevalece.

Quando houver conflito entre estética e clareza, a clareza prevalece.

Quando houver conflito entre estética e regra de negócio, a regra de negócio prevalece.
