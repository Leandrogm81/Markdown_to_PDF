import { describe, it, expect } from 'vitest';
import { STYLE_PRESETS, EDITOR_THEME_CLASSES, ACCENT_COLORS, FONT_SIZES, LINE_HEIGHTS, MARGINS } from '../styles';

describe('STYLE_PRESETS', () => {
  it('tem 5 presets', () => {
    expect(Object.keys(STYLE_PRESETS)).toHaveLength(5);
  });

  it('contém presets: modern, classic, tech, moleskine, executive', () => {
    expect(STYLE_PRESETS).toHaveProperty('modern');
    expect(STYLE_PRESETS).toHaveProperty('classic');
    expect(STYLE_PRESETS).toHaveProperty('tech');
    expect(STYLE_PRESETS).toHaveProperty('moleskine');
    expect(STYLE_PRESETS).toHaveProperty('executive');
  });

  it('cada preset tem fontFamily definido', () => {
    for (const preset of Object.values(STYLE_PRESETS)) {
      expect(preset.fontFamily).toBeTruthy();
      expect(typeof preset.fontFamily).toBe('string');
    }
  });

  it('cada preset tem accentColor definido', () => {
    for (const preset of Object.values(STYLE_PRESETS)) {
      expect(preset.accentColor).toBeTruthy();
      expect(preset.accentColor).toMatch(/^#/);
    }
  });
});

describe('EDITOR_THEME_CLASSES', () => {
  it('tem 5 temas', () => {
    expect(Object.keys(EDITOR_THEME_CLASSES)).toHaveLength(5);
  });

  it('contém temas: light, dark, sand, forest, ocean', () => {
    expect(EDITOR_THEME_CLASSES).toHaveProperty('light');
    expect(EDITOR_THEME_CLASSES).toHaveProperty('dark');
    expect(EDITOR_THEME_CLASSES).toHaveProperty('sand');
    expect(EDITOR_THEME_CLASSES).toHaveProperty('forest');
    expect(EDITOR_THEME_CLASSES).toHaveProperty('ocean');
  });

  it('cada tema tem bg e text definidos', () => {
    for (const theme of Object.values(EDITOR_THEME_CLASSES)) {
      expect(theme.bg).toBeTruthy();
      expect(theme.text).toBeTruthy();
    }
  });
});

describe('ACCENT_COLORS', () => {
  it('tem 7 cores', () => {
    expect(ACCENT_COLORS).toHaveLength(7);
  });

  it('cada cor tem name, value e class', () => {
    for (const color of ACCENT_COLORS) {
      expect(color.name).toBeTruthy();
      expect(color.value).toMatch(/^#/);
      expect(color.class).toBeTruthy();
    }
  });
});

describe('FONT_SIZES', () => {
  it('tem 3 tamanhos: sm, md, lg', () => {
    expect(FONT_SIZES).toHaveProperty('sm');
    expect(FONT_SIZES).toHaveProperty('md');
    expect(FONT_SIZES).toHaveProperty('lg');
  });
});

describe('LINE_HEIGHTS', () => {
  it('tem 3 alturas: snug, normal, relaxed', () => {
    expect(LINE_HEIGHTS).toHaveProperty('snug');
    expect(LINE_HEIGHTS).toHaveProperty('normal');
    expect(LINE_HEIGHTS).toHaveProperty('relaxed');
  });
});

describe('MARGINS', () => {
  it('tem 4 margens: none, narrow, normal, wide', () => {
    expect(MARGINS).toHaveProperty('none');
    expect(MARGINS).toHaveProperty('narrow');
    expect(MARGINS).toHaveProperty('normal');
    expect(MARGINS).toHaveProperty('wide');
  });
});
