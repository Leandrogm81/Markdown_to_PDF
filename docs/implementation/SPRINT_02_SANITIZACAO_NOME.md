# Sprint 2 — Sanitização HTML e nome descritivo do PDF

## Objetivo

Implementar sanitização de HTML no Markdown com DOMPurify, implementar a sequência de sanitização do nome do PDF e tratar encoding de importação de arquivos.

---

## Impacto UI/UX

**Classificação:** Não.

Esta sprint altera lógica de processamento (sanitização, nome do arquivo, encoding), não telas ou componentes visuais. O visual permanece idêntico.

---

## Escopo da sprint

- Instalar DOMPurify como dependência npm.
- Implementar sanitização de HTML antes de renderizar.
- Implementar função de nome descritivo do PDF com sequência de 8 passos.
- Implementar tratamento de encoding (UTF-8 com BOM, fallback Latin-1).

## Fora do escopo

- Alterar visual ou layout.
- Alterar templates.
- Alterar configurações visuais.
- Implementar loading/notificações (Sprint 4).

---

## Arquivos prováveis a criar/alterar

| Arquivo | Ação | Observação |
|---|---|---|
| `package.json` | Alterar | Nova dependência DOMPurify |
| Componente de preview ou App.tsx | Alterar | Aplicar sanitização antes de renderizar |
| Função utilitária (nova ou existente) | Criar/alterar | Nome descritivo do PDF |
| Função de importação | Alterar | Encoding UTF-8 com BOM |

**Nota:** Caminhos são prováveis. Confirmar após Sprint 0.

---

## Tarefas em ordem

### Tarefa 2.1 — Instalar DOMPurify

**Descrição:** Instalar dompurify e @types/dompurify como dependências npm.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `package.json`

**Critério de aceite:**
- `npm install dompurify` completa sem erros.

**Validação:**
- `cat package.json | grep dompurify`.

**Riscos:** Nenhum.

**O que NÃO alterar:** Nenhum arquivo além de `package.json`.

---

### Tarefa 2.2 — Implementar sanitização de HTML

**Descrição:** Aplicar DOMPurify no HTML gerado pelo marked antes de renderizar no preview. Configurar whitelist conforme PRD seção 7.11.

**Impacto UI/UX:** Não (lógica interna).

**Arquivos prováveis:**
- Componente que renderiza o preview (`App.tsx` ou `A4DocPreview.tsx`)

**Critério de aceite:**
- `<script>alert('xss')</script>` não é executado.
- `<strong>texto</strong>` é renderizado como negrito.
- `<a href="url">link</a>` é renderizado como link.
- `<img src="url" alt="desc">` é renderizado como imagem.
- `<iframe src="...">` é removido.
- `onclick` e atributos `on*` são removidos.
- HTML inválido é silenciosamente sanitizado.

**Configuração DOMPurify sugerida:**
- Tags permitidas: strong, em, br, p, div, span, table, tr, td, th, thead, tbody, ul, ol, li, blockquote, pre, code, h1-h6, a, img.
- Atributos permitidos: class, id, href, src, alt, title, colspan, rowspan.
- Tags bloqueadas: script, iframe, object, embed, form, input, button, style, link, meta, base.
- Atributos bloqueados: todos os `on*`.

**Validação:**
- Inserir cada cenário de XSS no editor e verificar no preview.
- Verificar que HTML válido continua funcionando.

**Riscos:**
- Sanitização muito restritiva pode quebrar documentos com HTML válido.
- Sanitização muito permissiva pode deixar XSS.

**O que NÃO alterar:**
- Não alterar o parser Markdown (marked).
- Não alterar a renderização do preview além de adicionar sanitização.

---

### Tarefa 2.3 — Implementar nome descritivo do PDF

**Descrição:** Implementar a sequência de sanitização de 8 passos conforme PRD seção 7.10.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- Função utilitária (nova ou em `utils/`)
- Local onde o PDF é gerado/baixado

**Critério de aceite:**
- Prioridade: título da capa > heading `#` > nome do arquivo importado > fallback.
- Sequência: NFD → minúsculas → hífens → remover especiais → colapsar → limitar 80 → fallback "documento".
- "Relatório Trimestral Q2" → `relatorio-trimestral-q2.pdf`.

**Validação:**
- Testar com título com acentos.
- Testar com título com caracteres especiais.
- Testar com título vazio.
- Testar com título muito longo (> 80 chars).

**Riscos:** Nenhum.

**O que NÃO alterar:**
- Não alterar a geração do PDF em si.

---

### Tarefa 2.4 — Implementar encoding de importação

**Descrição:** Garantir que a importação de arquivos aceita UTF-8 com ou sem BOM, com fallback para Latin-1.

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- Função de importação de arquivos

**Critério de aceite:**
- Arquivo UTF-8 com BOM é carregado corretamente.
- Arquivo UTF-8 sem BOM é carregado corretamente.
- Arquivo Latin-1 é tentado como fallback.
- Caracteres de substituição (U+FFFD) geram aviso.
- Encoding inválido gera mensagem de erro.

**Validação:**
- Criar arquivo de teste UTF-8 com BOM e importar.
- Criar arquivo de teste Latin-1 e importar.

**Riscos:** Nenhum.

**O que NÃO alterar:**
- Não alterar a interface de importação.

---

## Comandos de validação da sprint

```bash
# Build
npm run build

# Verificar DOMPurify no bundle
grep -r "dompurify" dist/ | head -5

# Preview local
npm run preview
```

---

## Testes necessários

- **Testes de segurança:** XSS com múltiplas variantes.
- **Testes manuais:** Nome do PDF, encoding de importação.
- **Testes de regressão:** Preview e exportação continuam funcionando.

---

## Fluxo manual de validação

1. Abrir app no navegador.
2. Inserir `<script>alert('xss')</script>` no Markdown → verificar que não executa.
3. Inserir `<strong>texto</strong>` → verificar que renderiza.
4. Inserir `<iframe src="...">` → verificar que é removido.
5. Definir título "Relatório Trimestral Q2" → exportar PDF → verificar nome.
6. Importar arquivo UTF-8 com BOM → verificar que carrega.

---

## Riscos da sprint

- Sanitização pode quebrar HTML válido se whitelist for muito restritiva.
- Nome do PDF pode não capturar o título correto se heurística falhar.

---

## Critérios finais de aceite da sprint

- [ ] `<script>` não é executado no preview.
- [ ] Tags permitidas funcionam.
- [ ] Atributos `on*` são removidos.
- [ ] Nome do PDF segue sequência de sanitização.
- [ ] Arquivo UTF-8 com BOM carrega.
- [ ] Build completa sem erros.

---

## O que NÃO deve ser alterado nesta sprint

- Visual ou layout.
- Templates.
- Configurações visuais.
- Responsividade.
