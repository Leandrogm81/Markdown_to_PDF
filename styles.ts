import { PresetType, FontSize, LineHeight, Alignment, MarginSize, EditorTheme } from './types';

export interface StylePreset {
  id: PresetType;
  name: string;
  fontFamily: string;
  headingFont: string;
  titleClass: string;
  headingClass: string;
  paragraphClass: string;
  blockquoteClass: string;
  codeBlockClass: string;
  inlineCodeClass: string;
  listClass: string;
  tableClass: string;
  accentColor: string;
}

export const ACCENT_COLORS = [
  { name: 'Azul Real', value: '#1E40AF', class: 'bg-blue-800' },
  { name: 'Esmeralda', value: '#065F46', class: 'bg-emerald-800' },
  { name: 'Monarca Ambar', value: '#D97706', class: 'bg-amber-600' },
  { name: 'Carmesim', value: '#991B1B', class: 'bg-red-800' },
  { name: 'Roxo Imperial', value: '#6B21A8', class: 'bg-purple-800' },
  { name: 'Ardósia / Carvão', value: '#334155', class: 'bg-slate-700' },
  { name: 'Azul Marinho', value: '#0F172A', class: 'bg-slate-900' },
];

export const STYLE_PRESETS: Record<PresetType, StylePreset> = {
  modern: {
    id: 'modern',
    name: 'Moderno Corporativo',
    fontFamily: 'font-sans',
    headingFont: 'font-sans font-semibold tracking-tight',
    titleClass: 'text-3xl font-extrabold pb-2 border-b-2 border-slate-200 text-slate-900 dark:text-white',
    headingClass: 'text-slate-800 dark:text-slate-100 font-bold mt-6 mb-3',
    paragraphClass: 'text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-sm md:text-base',
    blockquoteClass: 'border-l-4 border-blue-600 pl-4 py-1 my-4 italic text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-r-md',
    codeBlockClass: 'bg-slate-100 dark:bg-slate-900 rounded-md p-4 font-mono text-xs overflow-x-auto text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm my-4',
    inlineCodeClass: 'bg-slate-100 dark:bg-slate-800 rounded px-1.5 py-0.5 font-mono text-xs text-rose-600 dark:text-rose-400',
    listClass: 'list-disc pl-6 space-y-1 mb-4 text-slate-600 dark:text-slate-300',
    tableClass: 'min-w-full divide-y divide-slate-200 dark:divide-slate-700 my-4 text-sm text-left border border-slate-200 dark:border-slate-700',
    accentColor: '#1E40AF'
  },
  classic: {
    id: 'classic',
    name: 'Clássico Acadêmico',
    fontFamily: 'font-serif',
    headingFont: 'font-serif font-medium tracking-normal text-slate-900 dark:text-slate-50',
    titleClass: 'text-3xl text-center font-bold pb-4 border-b border-double border-slate-300 text-slate-900 dark:text-white mb-6 uppercase tracking-wider',
    headingClass: 'border-b border-slate-200 dark:border-slate-800 pb-1 font-semibold mt-8 mb-4 text-slate-900 dark:text-gray-100',
    paragraphClass: 'text-slate-800 dark:text-slate-200 mb-5 leading-relaxed text-[15px]',
    blockquoteClass: 'border-l-2 border-slate-400 pl-6 py-2 my-5 italic text-slate-600 dark:text-slate-300 font-serif blockquote-serif',
    codeBlockClass: 'bg-gray-50 dark:bg-zinc-950 rounded-lg p-4 font-mono text-[13px] overflow-x-auto text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 my-5',
    inlineCodeClass: 'bg-gray-50 dark:bg-zinc-900 rounded px-1.5 py-0.5 font-mono text-xs text-slate-800 dark:text-zinc-200 border border-slate-100 dark:border-zinc-800',
    listClass: 'list-decimal pl-6 space-y-1.5 mb-5 text-slate-800 dark:text-slate-200',
    tableClass: 'min-w-full text-sm text-left border-t border-b border-slate-800 dark:border-slate-200 my-5',
    accentColor: '#0F172A'
  },
  tech: {
    id: 'tech',
    name: 'Técnico Dev',
    fontFamily: 'font-mono',
    headingFont: 'font-mono font-bold uppercase tracking-tight text-teal-600 dark:text-teal-400',
    titleClass: 'text-2xl font-black py-2 bg-slate-900 text-emerald-400 text-center border-2 border-emerald-400 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.3)] mb-6',
    headingClass: 'text-slate-800 dark:text-emerald-500 font-bold mt-6 mb-3 border-l-4 border-teal-500 pl-3',
    paragraphClass: 'text-slate-700 dark:text-zinc-300 mb-4 leading-normal text-xs md:text-sm',
    blockquoteClass: 'bg-zinc-100 dark:bg-zinc-900 border-l-4 border-amber-500 pl-4 py-2 my-4 text-slate-600 dark:text-zinc-400',
    codeBlockClass: 'bg-zinc-900 rounded-lg p-4 font-mono text-xs overflow-x-auto text-zinc-100 border border-zinc-800 shadow-md my-4 relative',
    inlineCodeClass: 'bg-zinc-200 dark:bg-zinc-850 rounded px-1.5 py-0.5 font-mono text-xs text-indigo-600 dark:text-indigo-400 border border-zinc-300 dark:border-zinc-800',
    listClass: 'list-disc pl-6 space-y-1 mb-4 text-slate-700 dark:text-zinc-300',
    tableClass: 'min-w-full text-xs text-left border border-zinc-300 dark:border-zinc-700 my-4 font-mono',
    accentColor: '#0D9488'
  },
  moleskine: {
    id: 'moleskine',
    name: 'Escritor Criativo',
    fontFamily: 'font-serif',
    headingFont: 'font-serif italic font-semibold text-amber-950 dark:text-amber-100',
    titleClass: 'text-4xl text-amber-950 dark:text-amber-100 font-bold mb-8 text-center tracking-normal font-serif',
    headingClass: 'text-amber-900 dark:text-amber-200 font-bold mt-8 mb-4 border-b border-amber-200 dark:border-amber-900',
    paragraphClass: 'text-amber-900/90 dark:text-amber-250 mb-5 leading-loose text-base',
    blockquoteClass: 'border-l-4 border-amber-700 text-amber-800 dark:text-amber-400 pl-6 py-2 my-6 italic text-lg',
    codeBlockClass: 'bg-amber-100/50 dark:bg-zinc-950 rounded-xl p-5 font-mono text-xs overflow-x-auto text-amber-950 dark:text-amber-100 border border-amber-200 dark:border-zinc-900 my-6',
    inlineCodeClass: 'bg-amber-100/70 dark:bg-amber-950/40 rounded px-1 py-0.5 font-mono text-xs text-amber-800 dark:text-amber-200',
    listClass: 'list-disc pl-6 space-y-2 mb-5 text-amber-900/90 dark:text-amber-250',
    tableClass: 'min-w-full text-sm text-left border border-amber-200 dark:border-amber-900 my-5',
    accentColor: '#78350F'
  },
  executive: {
    id: 'executive',
    name: 'Executivo Elegante',
    fontFamily: 'font-sans',
    headingFont: 'font-sans font-medium tracking-tight text-slate-900 dark:text-white uppercase',
    titleClass: 'text-3xl font-extrabold pb-3 tracking-widest text-[#0c2340] border-b-4 border-[#0c2340] dark:text-slate-150 mb-8 uppercase',
    headingClass: 'text-slate-800 dark:text-slate-100 font-semibold mt-7 mb-3 border-l-4 border-[#0c2340] pl-3 py-0.5 bg-slate-50 dark:bg-slate-800 rounded-r-md',
    paragraphClass: 'text-slate-700 dark:text-slate-300 mb-4 leading-relaxed text-sm md:text-base text-justify',
    blockquoteClass: 'border-l-4 border-[#0c2340] pl-5 py-2 my-5 italic text-slate-600 dark:text-slate-400 font-sans uppercase text-xs tracking-wider bg-slate-100/70 dark:bg-slate-850',
    codeBlockClass: 'bg-gray-800 rounded-lg p-4 font-mono text-xs overflow-x-auto text-slate-100 my-5',
    inlineCodeClass: 'bg-slate-200 dark:bg-slate-700 rounded px-1 py-0.5 font-mono text-xs text-[#0c2340] dark:text-slate-200',
    listClass: 'list-disc pl-6 space-y-1 my-4 text-slate-700 dark:text-slate-300',
    tableClass: 'min-w-full text-sm text-left border-collapse border border-slate-300 dark:border-slate-700 my-5',
    accentColor: '#0E1E38'
  }
};

export const EDITOR_THEME_CLASSES: Record<EditorTheme, {
  bg: string;
  editorBg: string;
  text: string;
  border: string;
  panelBg: string;
  activeItem: string;
}> = {
  light: {
    bg: 'bg-slate-50',
    editorBg: 'bg-white',
    text: 'text-slate-800',
    border: 'border-slate-200',
    panelBg: 'bg-white',
    activeItem: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  dark: {
    bg: 'bg-[#0f172a]',
    editorBg: 'bg-[#1e293b]',
    text: 'text-slate-100',
    border: 'border-slate-700',
    panelBg: 'bg-[#1e293b]',
    activeItem: 'bg-slate-800 text-teal-400 border-slate-700'
  },
  sand: {
    bg: 'bg-[#f4efe6]',
    editorBg: 'bg-[#fdfbf7]',
    text: 'text-amber-950',
    border: 'border-amber-200',
    panelBg: 'bg-[#fdfbf7]',
    activeItem: 'bg-amber-100 text-amber-950 border-amber-300'
  },
  forest: {
    bg: 'bg-[#f0f4f1]',
    editorBg: 'bg-[#f5f8f6]',
    text: 'text-[#1e3422]',
    border: 'border-emerald-200',
    panelBg: 'bg-[#e2ede4]',
    activeItem: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  ocean: {
    bg: 'bg-[#ecf5f6]',
    editorBg: 'bg-[#f5fafb]',
    text: 'text-[#132c33]',
    border: 'border-cyan-200',
    panelBg: 'bg-[#daf1f3]',
    activeItem: 'bg-cyan-100 text-cyan-800 border-cyan-300'
  }
};

export const FONT_SIZES: Record<FontSize, string> = {
  sm: 'text-sm leading-snug',
  md: 'text-base leading-relaxed',
  lg: 'text-lg leading-loose'
};

export const LINE_HEIGHTS: Record<LineHeight, string> = {
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed'
};

export const MARGINS: Record<MarginSize, string> = {
  none: 'p-0',
  narrow: 'p-6 md:p-8',
  normal: 'p-10 md:p-12',
  wide: 'p-14 md:p-16'
};
