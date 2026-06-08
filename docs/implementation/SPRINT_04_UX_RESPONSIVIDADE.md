# Sprint 4 — UX e Responsividade

Status: PENDENTE
Depende de: Sprint 1 (recomendado após Sprint 3)

---

## Objetivo

Validar e corrigir responsividade mobile (320px), garantir 44px de área de toque em botões, validar notificações de sucesso/erro (5s) e validar spinner no botão de exportar (30s timeout).

---

## Impacto UI/UX

**Classificação:** Sim

- Responsividade mobile afeta layout completo.
- Área de toque afeta botões da toolbar.
- Notificações e spinner são componentes visuais.

- Deve seguir `/docs/design/UI_UX_GUIDE.md`.
- Deve validar mobile e desktop.
- Deve verificar estados de loading, erro e estado vazio.
- Deve evitar aparência genérica de IA.

---

## Escopo da sprint

1. Validar responsividade mobile (320px, botões Editor/Preview).
2. Garantir 44px de área de toque em botões.
3. Validar notificações de sucesso/erro (5s).
4. Validar spinner no botão de exportar (30s timeout).

---

## Fora do escopo

- Não alterar templates, presets ou temas.
- Não alterar sanitização.
- Não alterar regras de negócio.
- Não alterar deploy.

---

## Arquivos prováveis a criar/alterar

| Arquivo | Ação | Observação |
|---|---|---|
| `App.tsx` | Alterar | Layout mobile, notificações, spinner |
| `Toolbar.tsx` | Alterar | Área de toque 44px |
| `SettingsPanel.tsx` | Alterar | Área de toque em mobile |

---

## Tarefas em ordem

### Tarefa 4.1 — Validar responsividade mobile

**Descrição:**
Testar o app em mobile (< 768px). Verificar:
- App abre sem erro em 320px.
- Editor e preview alternam via botões "Editor" / "Preview" no header.
- Não há sobreposição de elementos.
- Não há scroll horizontal obrigatório em 320px.
- Configurações são acessíveis via overlay/modal.

**Impacto UI/UX:** Sim.

**Arquivos prováveis:**
- `App.tsx`
- `Toolbar.tsx`

**Critério de aceite:**
- App funciona em 320px sem scroll horizontal.
- Botões Editor/Preview alternam corretamente.
- Configurações acessíveis via overlay.

**Validação:**
- Abrir DevTools → 320px → testar cada funcionalidade.

---

### Tarefa 4.2 — Garantir 44px de área de toque

**Descrição:**
Verificar que todos os botões interativos têm ao menos 44px de área de toque em mobile. Incluir botões da toolbar, botões de ação e botões de configuração.

**Impacto UI/UX:** Sim.

**Arquivos prováveis:**
- `Toolbar.tsx`
- `SettingsPanel.tsx`

**Critério de aceite:**
- Botões da toolbar ≥ 44px.
- Botões de ação ≥ 44px.
- Botões de configuração ≥ 44px.

**Validação:**
- Inspecionar no DevTools → verificar dimensões.

---

### Tarefa 4.3 — Validar notificações de sucesso/erro

**Descrição:**
Verificar que notificações de sucesso/erro aparecem e desaparecem após 5 segundos. Incluir notificação de importação e exportação.

**Impacto UI/UX:** Sim.

**Arquivos prováveis:**
- `App.tsx`

**Critério de aceite:**
- Notificação de sucesso aparece ao exportar.
- Notificação de erro aparece se exportação falhar.
- Notificação desaparece após 5 segundos.

**Validação:**
- Exportar PDF → verificar notificação.
- Esperar 5s → verificar que desaparece.

---

### Tarefa 4.4 — Validar spinner no botão de exportar

**Descrição:**
Verificar que o botão de exportar mostra spinner e fica desabilitado durante geração. Múltiplos cliques não devem disparar múltiplas gerações. Timeout de 30s com mensagem de erro.

**Impacto UI/UX:** Sim.

**Arquivos prováveis:**
- `App.tsx`

**Critério de aceite:**
- Botão mostra spinner durante geração.
- Botão fica desabilitado.
- Múltiplos cliques não disparam múltiplas gerações.
- Timeout de 30s com mensagem de erro.

**Validação:**
- Clicar exportar → verificar spinner.
- Clicar múltiplas vezes → verificar que não duplica.

---

## Comandos de validação da sprint

```bash
npx tsc --noEmit
npm run build
npm run dev
```

---

## Testes necessários

- [ ] App funciona em 320px.
- [ ] Botões Editor/Preview alternam.
- [ ] Botões ≥ 44px.
- [ ] Notificações 5s.
- [ ] Spinner exportar.
- [ ] Timeout 30s.
- [ ] Build funciona.

---

## Riscos da sprint

- **MÉDIO:** Layout mobile pode quebrar em telas muito pequenas.
- **BAIXO:** 44px pode conflitar com design atual.

---

## Critérios finais de aceite da sprint

- [ ] App funciona em 320px sem scroll horizontal.
- [ ] Botões ≥ 44px.
- [ ] Notificações funcionam (5s).
- [ ] Spinner funciona.
- [ ] Build e typecheck passam.

---

## O que NÃO deve ser alterado nesta sprint

- Não alterar templates, presets ou temas.
- Não alterar sanitização.
- Não alterar regras de negócio.
- Não alterar deploy.
