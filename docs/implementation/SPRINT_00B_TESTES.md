# Sprint 00B — Fundação de Testes

Status: PENDENTE
Depende de: Sprint 0 (CONCLUÍDA)
Executar entre: Sprint 0 e Sprint 1

---

## Objetivo

Configurar a infraestrutura mínima de testes antes de implementar funcionalidades.

Esta sprint:
- NÃO implementa funcionalidades.
- NÃO altera lógica de negócio.
- NÃO refatora código existente.
- Apenas configura a base para testar.

---

## Impacto UI/UX

**Classificação:** Não aplicável

Esta sprint não altera componentes visuais. Apenas configura ferramentas de teste.

---

## Ponto de decisão — Estratégia de testes

**Stack detectada:** Vite + React 19 + TypeScript

**Framework escolhido:** Vitest + React Testing Library

**Justificativa:**
- Vitest é nativo do Vite (mesma configuração, mesma velocidade).
- React Testing Library é padrão para testes de componente React.
- API compatível com Jest (familiaridade).
- Sem necessidade de configuração extra de ESM/babel.

**Tipos de teste configurados:**
- Unitários: Sim — funções puras (heurísticas, sanitização de nome, constantes).
- Integração: Sim — componentes React com renderização.
- E2E: Não no MVP — fora de escopo.

---

## Escopo da sprint

1. Instalar vitest, @testing-library/react, @testing-library/jest-dom, jsdom.
2. Configurar vitest.config.ts (ou estender vite.config.ts).
3. Adicionar script "test" no package.json.
4. Criar smoke test para `utils/heuristics.ts`.
5. Criar smoke test para `styles.ts`.
6. Documentar estratégia de testes.

---

## Fora do escopo

- Não testar componentes visuais complexos (A4DocPreview, SettingsPanel).
- Não configurar E2E (Playwright, Cypress).
- Não configurar cobertura de código.
- Não alterar lógica de negócio.

---

## Arquivos prováveis a criar/alterar

| Arquivo | Ação | Observação |
|---|---|---|
| `package.json` | Alterar | Adicionar deps de teste e script |
| `vitest.config.ts` | Criar | Configuração do Vitest (ou estender vite.config.ts) |
| `tsconfig.json` | Alterar | Adicionar types para teste se necessário |
| `utils/__tests__/heuristics.test.ts` | Criar | Smoke test heurísticas |
| `styles.test.ts` | Criar | Smoke test constantes de estilo |

---

## Tarefas em ordem

### Tarefa 00B.1 — Instalar e configurar framework

**Descrição:**
Executar:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event
```

Configurar Vitest em `vite.config.ts` (estender com `test` config) ou criar `vitest.config.ts`.

Adicionar script no package.json:
```json
"test": "vitest run",
"test:watch": "vitest"
```

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `package.json`
- `vite.config.ts` ou `vitest.config.ts`
- `tsconfig.json`

**Critério de aceite:**
- `npm test` executa sem erro de configuração.
- Scripts estão documentados no package.json.

**Validação:**
- `npm test` → executa (mesmo que sem testes).

---

### Tarefa 00B.2 — Criar smoke test para heurísticas

**Descrição:**
Criar `utils/__tests__/heuristics.test.ts` com testes para `extractHeuristics`:

1. Título extraído do primeiro `#` heading.
2. Subtítulo extraído da primeira linha após título.
3. Autor extraído de padrão "Autor:".
4. Data extraída de padrão de mês.
5. String vazia retorna objetos vazios.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `utils/__tests__/heuristics.test.ts`

**Critério de aceite:**
- `npm test` → testes passam.
- Testes testam algo real (não `expect(1).toBe(1)`).

**Validação:**
- `npm test` → 5+ testes passam.

---

### Tarefa 00B.3 — Criar smoke test para constantes

**Descrição:**
Criar `__tests__/styles.test.ts` com testes para constantes de estilo:

1. STYLE_PRESETS tem 5 presets.
2. EDITOR_THEME_CLASSES tem 5 temas.
3. Cada preset tem fontFamily definido.
4. ACCENT_COLORS tem 7 cores.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `__tests__/styles.test.ts`

**Critério de aceite:**
- `npm test` → testes passam.

**Validação:**
- `npm test` → 4+ testes passam.

---

### Tarefa 00B.4 — Documentar estratégia

**Descrição:**
Atualizar `docs/implementation/test-plan.md` com seção de framework configurado.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `docs/implementation/test-plan.md`

**Critério de aceite:**
- test-plan.md documenta Vitest + RTL.
- Comandos de teste documentados.

---

## Comandos de validação da sprint

```bash
# Instalar deps
npm install

# Executar testes
npm test

# Verificar build não quebrou
npm run build

# Verificar typecheck
npx tsc --noEmit
```

---

## Testes necessários

- [ ] `npm test` executa sem erro de configuração.
- [ ] Smoke test heurísticas passa.
- [ ] Smoke test constantes passa.
- [ ] `npm run build` continua funcionando.
- [ ] `npx tsc --noEmit` continua passando.

---

## Fluxo manual de validação

1. Executar `npm install`.
2. Executar `npm test` → todos os testes passam.
3. Executar `npm run build` → build OK.
4. Executar `npm run dev` → app funciona normalmente.

---

## Riscos da sprint

- **BAIXO:** Vitest pode ter conflito com configuração existente do Vite.
- **BAIXO:** jsdom pode não simular DOM corretamente para todos os casos.

---

## Critérios finais de aceite da sprint

- [ ] Framework configurado (Vitest + RTL).
- [ ] Smoke tests existem e passam.
- [ ] Script `npm test` funciona.
- [ ] `test-plan.md` atualizado.
- [ ] Build continua funcionando.
- [ ] Nenhuma lógica de negócio foi alterada.

---

## O que NÃO deve ser alterado nesta sprint

- Não alterar componentes React.
- Não alterar lógica de negócio.
- Não alterar templates, presets ou temas.
- Não alterar configuração de build (além de adicionar Vitest).
- Não configurar cobertura de código.
- Não configurar E2E.
