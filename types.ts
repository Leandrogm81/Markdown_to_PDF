export interface CoverPageConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  author: string;
  institution: string;
  date: string;
  theme: 'minimal' | 'bold' | 'split' | 'stripe';
  accentColor: string;
}

export type PresetType = 'modern' | 'classic' | 'tech' | 'moleskine' | 'executive';
export type FontSize = 'sm' | 'md' | 'lg';
export type LineHeight = 'snug' | 'normal' | 'relaxed';
export type Alignment = 'left' | 'justify';
export type PageSize = 'A4' | 'Letter';
export type Orientation = 'portrait' | 'landscape';
export type MarginSize = 'none' | 'narrow' | 'normal' | 'wide';

export interface LayoutConfig {
  preset: PresetType;
  fontSize: FontSize;
  lineHeight: LineHeight;
  alignment: Alignment;
  pageSize: PageSize;
  orientation: Orientation;
  margins: MarginSize;
}

export interface HeaderFooterConfig {
  showHeader: boolean;
  showFooter: boolean;
  headerText: string;
  footerText: string;
  showPageNumbers: boolean;
}

export type EditorTheme = 'light' | 'dark' | 'sand' | 'forest' | 'ocean';

export interface DocumentConfig {
  coverPage: CoverPageConfig;
  layout: LayoutConfig;
  headingColor: string;
  headerFooter: HeaderFooterConfig;
  editorTheme: EditorTheme;
}

export interface MarkdownTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  markdown: string;
  recommendedConfig?: Partial<DocumentConfig>;
}
