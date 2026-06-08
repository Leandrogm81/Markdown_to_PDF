/**
 * Teste de Sanitização XSS — DOMPurify
 *
 * Achado da auditoria: 9.1 — XSS não testado com payloads reais.
 * Este testa verifica que a configuração DOMPurify em A4DocPreview.tsx
 * bloqueia vetores comuns de XSS.
 */
// @vitest-environment node
import { describe, it, expect, beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

let DOMPurify: ReturnType<typeof createDOMPurify>;

beforeAll(() => {
  const window = new JSDOM('').window;
  DOMPurify = createDOMPurify(window as any);
});

// Configuração idêntica à de A4DocPreview.tsx (linha 123-127)
const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'strong', 'em', 'br', 'p', 'div', 'span', 'table', 'tr', 'td', 'th',
    'thead', 'tbody', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'hr', 'input',
  ],
  ALLOWED_ATTR: [
    'class', 'id', 'href', 'src', 'alt', 'title',
    'colspan', 'rowspan', 'align', 'type', 'checked', 'disabled',
  ],
  ALLOW_DATA_ATTR: false,
};

function sanitize(html: string): string {
  return DOMPurify.sanitize(html, PURIFY_CONFIG);
}

describe('DOMPurify — bloqueia XSS', () => {
  it('remove <script> tags', () => {
    const result = sanitize('<script>alert(1)</script>');
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('alert(1)');
  });

  it('remove onerror em <img>', () => {
    const result = sanitize('<img src=x onerror=alert(1)>');
    expect(result).not.toContain('onerror');
    expect(result).not.toContain('alert');
  });

  it('remove <svg> com onload', () => {
    const result = sanitize('<svg onload=alert(1)>');
    expect(result).not.toContain('<svg');
    expect(result).not.toContain('onload');
  });

  it('remove javascript: em href', () => {
    const result = sanitize('<a href="javascript:alert(1)">click</a>');
    expect(result).not.toContain('javascript:');
  });

  it('remove <iframe>', () => {
    const result = sanitize('<iframe src="javascript:alert(1)"></iframe>');
    expect(result).not.toContain('<iframe');
  });

  it('remove onload em <body>', () => {
    const result = sanitize('<body onload=alert(1)>');
    expect(result).not.toContain('<body');
    expect(result).not.toContain('onload');
  });

  it('remove onfocus em <input> mas preserva tag', () => {
    const result = sanitize('<input onfocus=alert(1) autofocus>');
    expect(result).toContain('<input');
    expect(result).not.toContain('onfocus');
    expect(result).not.toContain('autofocus');
    expect(result).not.toContain('alert');
  });

  it('remove ontoggle em <details>', () => {
    const result = sanitize('<details open ontoggle=alert(1)>');
    expect(result).not.toContain('<details');
    expect(result).not.toContain('ontoggle');
  });

  it('remove onmouseover em qualquer tag', () => {
    const result = sanitize('<div onmouseover="alert(1)">hover</div>');
    expect(result).not.toContain('onmouseover');
    expect(result).toContain('hover');
  });

  it('remove data-* atributos (ALLOW_DATA_ATTR: false)', () => {
    const result = sanitize('<div data-xss="payload">ok</div>');
    expect(result).not.toContain('data-xss');
    expect(result).toContain('ok');
  });

  it('remove style attribute', () => {
    const result = sanitize('<div style="background:url(javascript:alert(1))">ok</div>');
    expect(result).not.toContain('style');
  });

  it('preserve tags seguros na whitelist', () => {
    const html = '<p><strong>bold</strong> and <em>italic</em></p>';
    const result = sanitize(html);
    expect(result).toContain('<strong>');
    expect(result).toContain('<em>');
    expect(result).toContain('<p>');
  });

  it('preserve href seguro (http/https)', () => {
    const result = sanitize('<a href="https://example.com">link</a>');
    expect(result).toContain('href="https://example.com"');
  });

  it('preserve src seguro em img', () => {
    const result = sanitize('<img src="https://example.com/img.png" alt="foto">');
    expect(result).toContain('src="https://example.com/img.png"');
    expect(result).toContain('alt="foto"');
  });

  it('preserve checkbox (input type=checkbox) para task lists', () => {
    const checked = sanitize('<input checked="" disabled="" type="checkbox"> Feito');
    expect(checked).toContain('<input');
    expect(checked).toContain('type="checkbox"');
    expect(checked).toContain('checked');
    expect(checked).toContain('Feito');

    const unchecked = sanitize('<input disabled="" type="checkbox"> Pendente');
    expect(unchecked).toContain('<input');
    expect(unchecked).toContain('type="checkbox"');
    expect(unchecked).toContain('Pendente');
  });
});
