import baryonConfig from '@ne/uikit-dex/tailwind-config/baryon';

import type { Config } from 'tailwindcss';
const config = {
  presets: [baryonConfig],
  content: [
    './app/**/*.tsx',
    './components/**/*.tsx',
    './view/**/*.tsx',
    './node_modules/@ne/uikit-dex/dist/**/*.js',
  ],
  darkMode: 'selector',
} as Config;

export default config;
