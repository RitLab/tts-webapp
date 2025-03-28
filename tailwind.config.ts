import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import daisyui from "daisyui";

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', '!./src/api/**/*'],

  theme: {
    extend: {}
  },

  plugins: [typography, forms, containerQueries,daisyui]
} satisfies Config;
