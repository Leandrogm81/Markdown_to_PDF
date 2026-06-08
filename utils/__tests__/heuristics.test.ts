import { describe, it, expect } from 'vitest';
import { extractHeuristics } from '../heuristics';

describe('extractHeuristics', () => {
  it('extrai título do primeiro H1', () => {
    const md = '# Meu Relatório\n\nConteúdo aqui.';
    const result = extractHeuristics(md);
    expect(result.title).toBe('Meu Relatório');
  });

  it('extrai subtítulo de linha em itálico após título', () => {
    const md = '# Título\n*Subtítulo em itálico*\n\nConteúdo.';
    const result = extractHeuristics(md);
    expect(result.subtitle).toBe('Subtítulo em itálico');
  });

  it('extrai autor de padrão "Autor:"', () => {
    const md = '# Título\nAutor: João Silva\n\nConteúdo.';
    const result = extractHeuristics(md);
    expect(result.author).toBe('João Silva');
  });

  it('extrai data de mês em português', () => {
    const md = '# Título\nData: Junho de 2026\n\nConteúdo.';
    const result = extractHeuristics(md);
    expect(result.date).toBe('Junho de 2026');
  });

  it('extrai instituição de padrão "Empresa:"', () => {
    const md = '# Título\nEmpresa: Acme Corp\n\nConteúdo.';
    const result = extractHeuristics(md);
    expect(result.institution).toBe('Acme Corp');
  });

  it('retorna strings vazias para markdown vazio', () => {
    const result = extractHeuristics('');
    expect(result.title).toBe('');
    expect(result.subtitle).toBe('');
    expect(result.author).toBe('');
    expect(result.date).toBe('');
    expect(result.institution).toBe('');
  });

  it('retorna strings vazias para string nula/undefined', () => {
    const result = extractHeuristics(null as any);
    expect(result.title).toBe('');
  });

  it('gera headerText automaticamente', () => {
    const md = '# Relatório Q2\nEmpresa: Beta S/A';
    const result = extractHeuristics(md);
    expect(result.headerText).toContain('Beta S/A');
    expect(result.headerText).toContain('Relatório Q2');
  });

  it('detecta footer "Confidencial"', () => {
    const md = '# Título\nConfidencial';
    const result = extractHeuristics(md);
    expect(result.footerText).toContain('Confidencial');
  });

  it('limpa markup de título com bold', () => {
    const md = '# **Título em Bold**\n\nConteúdo.';
    const result = extractHeuristics(md);
    expect(result.title).toBe('Título em Bold');
  });
});
