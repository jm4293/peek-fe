/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './asset/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Main Brand Colors
        'theme-main-color': 'var(--main-color)',
        'theme-main-color-light': 'var(--main-color-light)',
        'theme-main-color-dark': 'var(--main-color-dark)',

        // Backgrounds
        'theme-bg-header': 'var(--bg-header)',
        'theme-bg-main': 'var(--bg-main)',
        'theme-bg-section': 'var(--bg-section)',
        'theme-bg-blue': 'var(--bg-blue)',
        'theme-bg-card': 'var(--bg-card)',
        'theme-bg-card-hover': 'var(--bg-card-hover)',

        // Borders
        'theme-border-light': 'var(--border-light)',
        'theme-border-medium': 'var(--border-medium)',

        // Text
        'theme-txt-default': 'var(--txt-default)',
        'theme-txt-secondary': 'var(--txt-secondary)',
        'theme-txt-gray': 'var(--txt-gray)',
        'theme-txt-blue': 'var(--txt-blue)',
        'theme-txt-red': 'var(--txt-red)',

        // Other
        'theme-skeleton-bg': 'var(--skeleton-bg)',
      },
    },
  },
  plugins: [],
};
