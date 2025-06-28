/** @type {import('tailwindcss').Config} */
import tailwindcss from '@tailwindcss/vite'
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ fix this line
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui:{
    themes: ["sunset"],
  }
};