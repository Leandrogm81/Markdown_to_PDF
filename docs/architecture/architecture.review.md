# Revisão Conceitual da Arquitetura

Projeto: `markdown-para-pdf`
Gerado em: 2026-06-09
Fonte: análise direta da codebase (16 arquivos-fonte lidos)

---

## 1. Resumo em linguagem simples

O `markdown-para-pdf` é um aplicativo web que funciona inteiramente no navegador. Você digita texto em Markdown (uma linguagem simples de formatação), e o app mostra em tempo real como o documento vai ficar em formato de folha A4. Quando você clica em "Baixar PDF", o app gera um arquivo PDF visualmente idêntico ao preview.

Não há servidor, banco de dados ou login. Tudo acontece no navegador do usuário. O app é hospedado como um site estático na Vercel.

---

## 2. Partes principais do sistema

### 2.1 App (Orquestrador Principal)
- **Função:** É o "cérebro" do aplicativo. Guarda todas as informações (texto, configurações, template escolhido) e coordena todos os outros componentes.
- **Arquivos:** `App.tsx` (~789 linhas)
- **Observado:** diretamente no código-fonte
- **Confiança:** alta

### 2.2 A4DocPreview (Preview Paginado)
- **Função:** Pega o texto em Markdown, transforma em HTML bonito, e mostra como páginas de papel A4 na tela. Faz a paginação automática — se o conteúdo não cabe em uma página, cria outra.
- **Arquivos:** `components/A4DocPreview.tsx` (~808 linhas)
- **Observado:** diretamente no código-fonte
- **Confiança:** alta

### 2.3 Toolbar (Barra de Ferramentas)
- **Função:** Barra com botões para formatar o texto (negrito, itálico, títulos, listas, tabelas, etc.) e para importar arquivos .md/.txt.
- **Arquivos:** `components/Toolbar.tsx` (~230 linhas)
- **Observado:** diretamente no código-fonte
- **Confiança:** alta

### 2.4 SettingsPanel (Painel de Configurações)
- **Função:** Painel lateral com 4 abas para configurar: templates prontos, estilo visual (fontes, cores), capa do documento (título, autor, tema) e estrutura da página (tamanho, margens, header/footer).
- **Arquivos:** `components/SettingsPanel.tsx` (~625 linhas)
- **Observado:** diretamente no código-fonte
- **Confiança:** alta

### 2.5 Heuristics Engine (Extração Automática)
- **Função:** Lê o texto em Markdown e extrai informações automaticamente: título, subtítulo, autor, data, instituição. Tudo isso sem inteligência artificial — usa apenas regras de texto (regex).
- **Arquivos:** `utils/heuristics.ts` (~154 linhas)
- **Observado:** diretamente no código-fonte
- **Confiança:** alta

### 2.6 Templates (Modelos Prontos)
- **Função:** 4 modelos de documento prontos para usar: Relatório Executivo, Currículo, Artigo Acadêmico e Manual Técnico.
- **Arquivos:** `templates.ts` (~314 linhas)
- **Observado:** diretamente no código-fonte
- **Confiança:** alta

### 2.7 Styles (Estilos Visuais)
- **Função:** Configurações visuais: 5 estilos de fonte (Moderno, Clássico, Técnico, Moleskine, Executivo), 7 cores de destaque, 5 temas do editor (claro, escuro, areia, floresta, oceano).
- **Arquivos:** `styles.ts` (~175 linhas)
- **Observado:** diretamente no código-fonte
- **Confiança:** alta

### 2.8 PDF Generator (Gerador de PDF)
- **Função:** Quando o usuário clica para baixar, captura cada página do preview como uma imagem e monta o arquivo PDF.
- **Arquivos:** função `handleGeneratePdf` dentro de `App.tsx`
- **Observado:** diretamente no código-fonte
- **Confiança:** alta

### 2.9 Types (Definições de Tipo)
- **Função:** Define a estrutura das configurações do documento em TypeScript para garantir que todos os componentes "falem a mesma língua".
- **Arquivos:** `types.ts` (~55 linhas)
- **Observado:** diretamente no código-fonte
- **Confiança:** alta

---

## 3. Como as partes conversam entre si

O aplicativo tem uma estrutura centralizada: o **App** é o ponto central que conecta tudo.

- **App → Toolbar:** O App passa funções para a Toolbar (inserir texto, limpar, importar arquivo). A Toolbar chama essas funções quando o usuário clica nos botões.
- **App → A4DocPreview:** O App envia o texto Markdown e as configurações. O Preview renderiza as páginas visuais.
- **App → SettingsPanel:** O App envia as configurações atuais. O Painel permite alterar e devolve as mudanças.
- **App → Heuristics Engine:** Sempre que o texto muda, o App chama o extrator de metadados para atualizar automaticamente o título, autor, etc.
- **PDF Generator → A4DocPreview:** O gerador de PDF "olha" as páginas renderizadas no preview e as captura como imagens.

```
                    ┌──────────────┐
                    │   Toolbar    │
                    └──────┬───────┘
                           │ callbacks
                    ┌──────▼───────┐
                    │              │
  ┌─────────────►  │     App      │  ◄─────────────┐
  │ templates      │ (Orquestrador)│    config       │
  │ styles         │              │                 │
  │ heuristics     └──┬───────┬──┘    ┌────────────┴──┐
  │                   │       │       │ SettingsPanel  │
  └───────────────────┘       │       └───────────────┘
                              │
                    ┌─────────▼────────┐
                    │  A4DocPreview    │
                    │ (Preview Paginado)│
                    └─────────┬────────┘
                              │ DOM query
                    ┌─────────▼────────┐
                    │  PDF Generator   │
                    │ (jsPDF+html2canvas)│
                    └──────────────────┘
```

---

## 4. Fluxos principais de dados

### Fluxo 1: Digitar Markdown → Ver Preview

1. Usuário digita texto no editor (textarea).
2. App atualiza o estado com o novo texto.
3. Heuristics Engine extrai título, autor, data, etc. automaticamente.
4. Configurações da capa e header/footer são atualizadas (se não foram editadas manualmente).
5. A4DocPreview recebe o texto e as configurações.
6. O texto é dividido onde há `---` (marcadores de página).
7. Cada seção é convertida de Markdown para HTML (biblioteca `marked`).
8. O HTML é sanitizado (biblioteca DOMPurify) para remover código perigoso.
9. O HTML sanitizado é dividido em páginas físicas A4 (medição de altura real no navegador).
10. As páginas são renderizadas na tela com header, footer e numeração.

### Fluxo 2: Baixar PDF

1. Usuário clica no botão "Baixar PDF Elegante".
2. O gerador encontra todas as páginas renderizadas no preview.
3. Para cada página: captura como imagem de alta resolução (2x), converte para JPEG.
4. Cada imagem é adicionada como uma página no arquivo PDF (via jsPDF).
5. O nome do arquivo é gerado automaticamente (título da capa > heading > nome do arquivo importado).
6. O PDF é baixado pelo navegador.

### Fluxo 3: Importar Arquivo

1. Usuário seleciona um arquivo .md/.txt/.markdown (botão ou arrastar).
2. Se o arquivo for maior que 8MB, é rejeitado.
3. O arquivo é lido como UTF-8. Se houver problemas de encoding, tenta Latin-1.
4. Se já houver texto no editor, um modal pede confirmação antes de substituir.
5. O texto é carregado, o nome do arquivo vira o título da capa.

---

## 5. Riscos identificados

### 5.1 Bundle size 953KB (Baixa severidade)
- **Descrição:** O arquivo JavaScript principal tem ~953KB porque as bibliotecas jsPDF e html2canvas não são carregadas sob demanda.
- **Evidência:** Warning no `npm run build`; documentado na retrospectiva v1.
- **Confiança:** alta
- **Sugestão:** Implementar `dynamic import()` para jsPDF e html2canvas (2 linhas de código).

### 5.2 Ausência de testes de componente (Média severidade)
- **Descrição:** Os 37 testes existentes testam funções isoladas (heurísticas, constantes, sanitização). Não há teste que renderize componentes React ou teste de integração.
- **Evidência:** 3 arquivos de teste analisados; documentado na auditoria final.
- **Confiança:** alta
- **Sugestão:** Adicionar pelo menos 1 teste de componente (A4DocPreview render) usando React Testing Library.

### 5.3 Fidelidade preview/PDF não verificada (Média severidade)
- **Descrição:** Nunca foi feita uma comparação visual (screenshot lado a lado) entre o preview e o PDF gerado.
- **Evidência:** Documentado na auditoria final (achado 9.2) e retrospectiva.
- **Confiança:** alta
- **Sugestão:** Capturar screenshot do preview e do PDF e comparar visualmente.

### 5.4 Cross-browser não testado (Média severidade)
- **Descrição:** O app não foi testado em Firefox, Safari ou Edge. O html2canvas pode ter comportamento diferente em cada navegador.
- **Evidência:** Documentado no HANDOFF e CURRENT_STATE.
- **Confiança:** alta
- **Sugestão:** Testar manualmente pelo menos em Firefox e Safari.

### 5.5 PDF como imagem rasterizada (Baixa severidade)
- **Descrição:** O PDF gerado contém imagens, não texto selecionável. Decisão consciente para o MVP.
- **Evidência:** Decisão registrada em DECISIONS.md.
- **Confiança:** alta

### 5.6 App.tsx com muitas responsabilidades (Baixa severidade)
- **Descrição:** O componente App.tsx tem ~789 linhas e concentra estado, handlers, geração de PDF, heurísticas e lógica de UI.
- **Evidência:** Análise direta do arquivo.
- **Confiança:** média (é uma avaliação subjetiva de manutenibilidade)

---

## 6. O que foi observado diretamente

- Stack: Vite 6.2 + React 19 + TypeScript 5.8 (strict) + Tailwind CSS 4.3
- Ponto de entrada: `index.html` → `index.tsx` → `App.tsx`
- SPA client-side sem backend, sem banco de dados, sem autenticação
- 4 componentes React: App, A4DocPreview, Toolbar, SettingsPanel
- 4 módulos de dados: types.ts, styles.ts, templates.ts, utils/heuristics.ts
- Markdown é processado por `marked` e sanitizado por `DOMPurify`
- PDF é gerado por `jsPDF` + `html2canvas` (captura rasterizada)
- Paginação usa medição de altura real no DOM (scratchpad offscreen)
- Capa tem 4 temas: minimal, bold, split, stripe
- 5 presets de estilo: modern, classic, tech, moleskine, executive
- 4 templates prontos: Relatório, Currículo, Artigo, Manual Técnico
- Importação de arquivo: .md/.txt/.markdown, máx 8MB, fallback Latin-1
- Sanitização de nome do PDF: NFD, lowercase, hífens, máx 80 chars (PRD 7.10)
- Deploy na Vercel via vercel.json com SPA rewrite
- 37 testes passando (Vitest + RTL)

---

## 7. O que foi inferido

- O preview e o PDF provavelmente têm alta fidelidade visual (ambos usam renderização CSS real), mas isso não foi verificado com screenshots.
- O app provavelmente funciona em Firefox e Edge (Vite + React padrão), mas o html2canvas pode ter divergências sutis.
- A performance com documentos grandes (100+ páginas) pode ser prejudicada pela medição de DOM offscreen, mas isso não foi medido.

---

## 8. Dúvidas e pontos que precisam ser confirmados

1. **Compatibilidade cross-browser:** O app funciona corretamente em Firefox, Safari e Edge? (html2canvas e jsPDF podem ter comportamento diferente)
2. **Performance com documentos grandes:** Como o app se comporta com 100+ páginas? (paginação via medição de DOM pode ficar lenta)
3. **html2canvas edge cases:** Captura corretamente tabelas complexas, imagens externas e CSS avançado?

---

## 9. Próximos passos recomendados

1. **Code splitting:** Implementar `dynamic import()` para jsPDF e html2canvas — 2 linhas de código, melhora significativa no first paint.
2. **Teste de componente:** Adicionar teste de renderização do A4DocPreview com React Testing Library.
3. **Lighthouse audit:** Rodar `npx lighthouse` para verificar acessibilidade e performance.
4. **Screenshots de fidelidade:** Capturar preview e PDF lado a lado para validar fidelidade visual.
5. **Cross-browser:** Testar em Firefox e Safari pelo menos uma vez.
