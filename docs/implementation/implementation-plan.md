# Plano de Implementação

**Projeto:** Markdown para PDF
**PRD de origem:** `docs/product/PRD_v1.1.md`
**Data:** 2026-06-07
**Status:** Pronto para execução

---

## 1. Premissas

### Decisões assumidas com base no PRD

- O projeto já é um protótipo funcional com Vite + React + TypeScript.
- As CDNs (Tailwind, marked, jspdf, html2canvas) devem ser substituídas por dependências npm.
- A GEMINI_API_KEY deve ser removida do código e configuração.
- Os templates existentes em `templates.ts` serão usados sem alteração (PD-07 recomendação).
- A sanitização de HTML será implementada com DOMPurify (PD-10 recomendação).
- O autosave NÃO entra no MVP (PD-01 pendente — aguarda decisão humana).
- O tema do editor (claro/escuro) NÃO entra no MVP (PD-11 pendente — aguarda decisão humana).
- A confirmação antes de substituir conteúdo (PD-04) será implementada como padrão (melhor UX).
- O tamanho máximo de arquivo importado (PD-03) será definido como 1MB como padrão seguro.
- O limite de páginas do PDF (PD-09) será definido como 50 páginas como padrão seguro.

### O que foi inferido (precisa confirmação)

- PD-05 (presets de estilo): usar os existentes no código.
- PD-06 (temas de capa): usar os existentes no código.
- PD-08 (heurísticas além de título/subtítulo): implementar apenas título e subtítulo no MVP.

### Limites do PRD respeitados

- Não será implementada nenhuma funcionalidade fora do escopo do MVP.
- Não será alterada a arquitetura existente (estabilização, não redesenho).
- Componentes grandes serão mantidos intactos salvo correção de bug.
- Toda decisão visual seguirá `docs/design/UI_UX_GUIDE.md`.

### Pontos que NÃO devem ser expandidos sem autorização

- Não criar novos templates além dos existentes.
- Não adicionar presets de estilo além dos existentes.
- Não implementar upload de imagem (apenas URL).
- Não adicionar analytics ou error tracking.
- Não implementar autosave (salvo decisão PD-01).

---

## 2. Visão geral das sprints

| Sprint | Nome | Objetivo | Impacto UI/UX | Arquivo |
|---|---|---|---|---|
| Sprint 0 | Preparação e auditoria | Mapear codebase, validar dependências, Git | Não aplicável | `SPRINT_00_PREPARACAO.md` |
| Sprint 1 | Migração de dependências CDN para npm | Substituir CDNs, remover GEMINI_API_KEY, configurar Tailwind npm | Indireto | `SPRINT_01_MIGRACAO_DEPS.md` |
| Sprint 2 | Sanitização HTML e nome do PDF | Implementar DOMPurify, nome descritivo do PDF, encoding de importação | Não | `SPRINT_02_SANITIZACAO_NOME.md` |
| Sprint 3 | Correções de regra de negócio | `---` em code blocks, numeração de página, preview vazio, sessão | Sim | `SPRINT_03_REGRAS_NEGOCIO.md` |
| Sprint 4 | UX e responsividade | Loading/exportação, notificações, mobile, toolbar 44px | Sim | `SPRINT_04_UX_RESPONSIVIDADE.md` |
| Sprint 5 | Deploy Vercel e validação final | Config Vercel, meta tags, testes manuais, checklist final | Indireto | `SPRINT_05_DEPLOY_VALIDACAO.md` |

---

## 3. Ordem de execução recomendada

### Por que a Sprint 0 vem antes

A Sprint 0 é obrigatória para mapear a codebase real antes de qualquer alteração. Sem ela, o agente pode inventar caminhos, sobrescrever arquivos errados ou quebrar funcionalidades existentes.

### Dependências entre sprints

- Sprint 0 → independente (deve ser executada primeiro).
- Sprint 1 → depende de Sprint 0 (precisa conhecer a estrutura real).
- Sprint 2 → depende de Sprint 1 (precisa de DOMPurify instalado como npm).
- Sprint 3 → depende de Sprint 1 (precisa de build funcionando com npm).
- Sprint 4 → pode ser parcialmente paralela com Sprint 3, mas é mais segura sequencial.
- Sprint 5 → depende de todas as anteriores.

### Sprints validáveis isoladamente

- Sprint 0: validável apenas com leitura.
- Sprint 1: validável com `npm run build` + verificação de ausência de CDNs.
- Sprint 2: validável com teste manual de sanitização e nome do PDF.
- Sprint 3: validável com teste manual de `---` em code blocks e numeração.
- Sprint 4: validável com teste manual em mobile e desktop.
- Sprint 5: validável com deploy na Vercel.

### Sprints que NÃO devem ser iniciadas antes da anterior

- Sprint 2 não deve começar antes de Sprint 1 validada (DOMPurify precisa estar instalado).
- Sprint 5 não deve começar antes de Sprint 4 validada (deploy deve incluir todas as correções).

---

## 4. Checklist de validação geral

Para cada sprint, verificar:

- [ ] `npm run build` sem erros.
- [ ] Não há CDNs no `index.html` (após Sprint 1).
- [ ] GEMINI_API_KEY não está no bundle de produção (após Sprint 1).
- [ ] HTML `<script>` não é executado no preview (após Sprint 2).
- [ ] Nome do PDF não é genérico (após Sprint 2).
- [ ] `---` em code block não cria quebra de página (após Sprint 3).
- [ ] Numeração começa em 1 no corpo, capa não contada (após Sprint 3).
- [ ] Preview vazio mostra mensagem orientativa (após Sprint 3).
- [ ] Botão de exportar mostra spinner e fica desabilitado (após Sprint 4).
- [ ] App funciona em mobile 320px sem scroll horizontal (após Sprint 4).
- [ ] Não há erros no console do navegador.
- [ ] Verificação contra `docs/design/UI_UX_GUIDE.md` em sprints com impacto visual.
- [ ] Verificação de arquivos alterados (não saiu do escopo).
- [ ] Verificação de variáveis de ambiente (nenhum segredo exposto).

---

## 5. Pontos que exigem modelo mais forte

| Tarefa | Motivo |
|---|---|
| Migração de CDNs para npm (Sprint 1) | Alteração de build config; pode quebrar todo o app se incorreta |
| Sanitização de HTML com DOMPurify (Sprint 2) | Segurança; configuração incorreta pode deixar XSS ou quebrar conteúdo |
| Configuração Vercel (Sprint 5) | Deploy; configuração incorreta pode impedir acesso em produção |
| Remoção de GEMINI_API_KEY (Sprint 1) | Segurança; precisa garantir que não há referências residuais |

---

## 6. Observações finais

- **Escopo:** Este plano cobre apenas o MVP definido no PRD v1.1. Não inclui autosave, tema do editor, upload de imagem, error tracking ou qualquer item listado como "Fora de escopo".
- **Arquitetura:** O plano preserva a arquitetura existente (Vite + React + TypeScript). Não altera a estrutura de componentes, apenas estabiliza e corrige.
- **Riscos:** O maior risco é a migração de CDNs para npm (Sprint 1). Se o build quebrar, todas as sprints subsequentes são afetadas.
- **UI/UX:** Toda sprint com impacto visual (Sprints 3, 4, 5) DEVE seguir `docs/design/UI_UX_GUIDE.md`.
- **PDs pendentes:** PD-01 (autosave), PD-07 (templates), PD-10 (DOMPurify) e PD-11 (tema) exigem decisão humana antes ou durante a execução.
- **GEMINI_API_KEY:** A remoção é obrigatória. Se o usuário quiser manter, deve documentar o motivo.
