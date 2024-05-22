/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
 daisyui: {
      themes: [
        {
          mytheme: {
          
          "primary": "#0284c7",
          
          "secondary": "#38bdf8",
          
          "accent": "#67e8f9",
          
          "neutral": "#111827",
          
          "base-100": "#1f2937",
          
          "info": "#009ade",

          "success": "#7ff878",
          
          "warning": "#f59e0b",
          
          "error": "#f43f5e",
          },
        },
      ],
    },
  plugins: [
    require('daisyui'),
  ],
}
