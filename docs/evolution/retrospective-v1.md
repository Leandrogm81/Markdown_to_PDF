# Retrospectiva v1 — markdown-para-pdf

Gerada em: 2026-06-08
Ciclo encerrado: MVP v1.0 (Sprints 0–5 + auditoria + correção pós-auditoria + validação)
Maturidade: **MVP validado com débitos técnicos menores**

---

## 1. O que o PRD acertou

| Decisão/funcionalidade | Por que funcionou bem |
|---|---|
| SPA client-side sem backend | Eliminou complexidade de infra. Deploy na Vercel como site estático foi trivial. Zero dependência de servidor. |
| DOMPurify para sanitização | Biblioteca madura, leve, amplamente usada. Whitelist configurável permitiu controle fino. Bloqueou todos os 14 vetores XSS testados. |
| PDF visual/rasterizado (html2canvas + jsPDF) | Abordagem simples que garante fidelidade visual — o PDF é literalmente uma captura do preview. Sem necessidade de motor de layout PDF separado. |
| 5 sprints pequenas com tarefas verificáveis | Permitiu execução sequencial com validação intermediária. Cada sprint tinha critérios de aceite objetivos. |
| Decisões de produto documentadas (PD-01 a PD-11) | 19 decisões ativas impediram ambiguidade durante implementação. Nenhum item de escopo foi discutido duas vezes. |
| Confirmação antes de substituir conteúdo | Proteção simples contra perda acidental. Decisão humana explícita (PD-04) evitou implementação de autosave complexo. |
| Templates existentes sem alteração (PD-07) | Eliminou risco de criar templates com bugs. Estabilizou o escopo. |
| Sem limite de páginas/tamanho (PD-09) | Simplificou implementação. Timeout 30s como proteção suficiente para MVP. |
| UI/UX Guide como documento obrigatório | Critérios visuais claros antes da implementação. Evitou decisões estéticas ad-hoc durante coding. |
| Framework de continuidade (HANDOFF, CURRENT_STATE, DECISIONS) | Permitiu troca de sessão/sem perda de contexto. 7 sprints executadas sem recomeçar do zero. |

---

## 2. O que gerou retrabalho

| Área problemática | Causa raiz provável | Como especificar melhor no próximo PRD |
|---|---|---|
| XSS não testado durante implementação | PRD especificou DOMPurify mas não exigiu teste de sanitização como critério de aceite. Sprint 2 implementou mas não testou com payloads reais. | Adicionar "teste com N payloads XSS" como critério de aceite explícito na seção de sanitização. |
| Fidelidade preview/PDF nunca validada visualmente | PRD exigiu fidelidade (seção 7.3) mas não definiu como validar. Não havia critério de aceite mensurável (ex: "screenshots lado a lado com 0 divergências"). | Definir critério de aceite visual com método de validação explícito (screenshots, testes visuais automatizados). |
| Checklist `- [x]`/`- [ ]` sem checkbox | DOMPurify whitelist não incluía `input`. O PRD mencionou sanitização mas não listou quais tags Markdown/GFM devem ser preservadas. | Listar explicitamente no PRD quais elementos GFM (task lists, tables, etc.) devem ser preservados após sanitização. |
| Cobertura de testes insuficiente | Sprint 00B criou 22 smoke tests mas não definiu meta de cobertura. PRD não exigiu cobertura mínima. | Definir meta mínima de cobertura (ex: "pelo menos 1 teste de componente, 1 de integração, cobertura > 50%"). |
| Chunk size 953KB sem code splitting | PRD mencionou performance (seção 15) mas não definiu limite de bundle size. | Adicionar critério de aceite: "bundle principal < 500KB ou code splitting implementado". |
| Sem screenshots/prints em nenhuma etapa | Framework de auditoria dependeu de análise de código. Nunca houve inspeção visual real. | Exigir evidência visual (screenshots) como critério de aceite para funcionalidades visuais. |

---

## 3. Padrões de falha recorrentes

| Padrão de falha | Frequência | Recomendação estrutural |
|---|---|---|
| Implementar sem testar o resultado visual | 2x (fidelidade preview/PDF, checklist) | Todo requisito visual deve ter critério de aceite validável visualmente (screenshot ou teste visual). |
| Whitelist/configuração inspecionada apenas durante auditoria | 1x (DOMPurify ALLOWED_TAGS) | Configurações de segurança devem ser inspecionadas durante implementação, não apenas na auditoria. |
| Dependência de biblioteca sem testar edge cases | 1x (marked + DOMPurify para task lists) | Ao usar bibliotecas que transformam HTML, testar os elementos de saída contra a sanitização. |
| Evidência de código inferida como evidência de comportamento | Múltiplas | Código que chama DOMPurify não prova que o resultado é correto. Validar output, não apenas presença de chamada. |
| Auditoria sem acesso visual ao produto | 1x (auditoria final) | Auditoria deve incluir pelo menos 1 screenshot do produto em produção. |

---

## 4. Sugestões fora de escopo acumuladas

| Sugestão | Valor estimado | Complexidade | Candidato para v2? |
|---|---|---|---|
| Code splitting (dynamic import jsPDF/html2canvas) | Médio — first paint mais rápido | Baixa — 2 linhas de código | Sim |
| Testes de componente (React render) | Alto — detecção de regressão | Baixa — RTL já configurado | Sim |
| Lighthouse accessibility audit | Alto — acessibilidade para público não técnico | Baixa — comando único | Sim |
| Error tracking (Sentry/Vercel Analytics) | Médio — visibilidade de erros em produção | Baixa — 10 min de config | Sim |
| Cross-browser testing (Firefox, Safari, Edge) | Alto — compatibilidade | Baixa — teste manual | Sim |
| Testes e2e (Playwright/Cypress) | Alto — cobertura de fluxo completo | Média — setup + testes | Talvez |
| ESLint com regras React/TS | Médio — qualidade de código | Baixa — config inicial | Sim |
| PDF com texto selecionável | Alto — acessibilidade do PDF | Alta — nova abordagem de geração | Não (v3) |
| Autosave local (localStorage) | Médio — UX de recuperação | Baixa — mas PD-01 decidiu NÃO | Não (requer nova decisão) |
| Tema escuro | Baixo — preferência estética | Baixa — mas PD-11 decidiu NÃO | Não (requer nova decisão) |
| Novos templates além dos 4 existentes | Médio — variedade | Baixa — mas PD-07 decidiu manter | Não (requer validação com usuário) |

---

## 5. Atualizações no UI/UX Guide

| Padrão novo | Contexto | Recomendação |
|---|---|---|
| Task lists (checkboxes) devem ter visual claro | Checklist `- [x]`/`- [ ]` eram renderizados como bullets sem distinção visual | Adicionar seção sobre renderização de task lists: checkbox visual com checked/unchecked distinguível, contraste adequado |
| Tags GFM preservadas após sanitização | DOMPurify pode remover elementos GFM legítimos (checkboxes, tabelas) | Documentar quais tags GFM devem estar na whitelist de sanitização |
| Evidência visual obrigatória para requisitos visuais | Fidelidade preview/PDF nunca validada por falta de screenshots | Exigir screenshot como critério de aceite para qualquer requisito visual |

---

## 6. Atualizações nas regras operacionais

| Problema ocorrido | Regra recomendada |
|---|---|
| Auditoria final sem inspeção visual do produto | Toda auditoria de produto visual deve incluir pelo menos 1 screenshot ou acesso ao browser. |
| Correção pós-auditoria sem validar no browser | Correções que afetam renderização devem ser validadas no browser, não apenas via testes unitários. |
| Configuração de segurança inspecionada apenas na auditoria | Whitelists, sanitizações e configurações de segurança devem ser inspecionadas durante implementação (Sprint 2), não apenas na auditoria final. |

---

## 7. Recomendação para o próximo ciclo

**O produto está pronto para novas funcionalidades?** Sim, com ressalvas.

**Débitos técnicos antes de novas features:**
1. Deploy da correção de checklist (já implementada, aguardando push/deploy)
2. Capturar screenshots para evidência visual de fidelidade
3. Adicionar 1 teste de componente mínimo (A4DocPreview render)

**Itens fora de escopo com maior ROI:**
1. **Code splitting** — 2 linhas de código, first paint significativamente mais rápido
2. **Testes de componente** — RTL já configurado, cobertura mínima de regressão
3. **Lighthouse accessibility** — comando único, identifica problemas para público não técnico
4. **Error tracking** — 10 min de config, visibilidade de erros em produção

**Maturidade atual:** `MVP validado` — funcionalmente completo, auditado, com débitos técnicos menores e 1 correção pontual pendente (checklist). Pronto para iteração incremental.
