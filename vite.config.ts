import path from 'path';
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Converte oklch() para sRGB hex.
 * html2canvas não suporta oklch (CSS Color Level 4).
 * Este plugin converte todas as cores oklch no CSS buildado para hex.
 */
function oklchToSrgb(L: number, C: number, H: number): [number, number, number] {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  r = Math.max(0, Math.min(1, r));
  g = Math.max(0, Math.min(1, g));
  bl = Math.max(0, Math.min(1, bl));

  return [r, g, bl];
}

function toHex(v: number): string {
  const n = Math.round(v * 255);
  return n.toString(16).padStart(2, '0');
}

function oklchToHex(L: number, C: number, H: number, alpha?: number): string {
  const [r, g, b] = oklchToSrgb(L, C, H);
  if (alpha !== undefined && alpha < 1) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function convertOklch(css: string): string {
  return css.replace(
    /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/g,
    (_, lStr, cStr, hStr, aStr) => {
      let L = parseFloat(lStr);
      if (lStr.endsWith('%')) L /= 100;
      const C = parseFloat(cStr);
      const H = parseFloat(hStr);
      let alpha: number | undefined;
      if (aStr !== undefined) {
        alpha = parseFloat(aStr);
        if (aStr.endsWith('%')) alpha /= 100;
      }
      return oklchToHex(L, C, H, alpha);
    }
  );
}

function oklchFallbackPlugin(): Plugin {
  return {
    name: 'oklch-to-srgb',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const fileName of Object.keys(bundle)) {
        const asset = bundle[fileName];
        if (asset.type === 'asset' && typeof asset.source === 'string' && asset.source.includes('oklch(')) {
          asset.source = convertOklch(asset.source);
        }
      }
    },
  };
}

export default defineConfig(({ mode }) => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss(), oklchFallbackPlugin()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: [],
        include: ['**/*.test.{ts,tsx}'],
      },
    };
});
