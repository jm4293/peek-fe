/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './asset/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // 'light-bg-1': '#FDFDFD',
        // 'light-bg-2': '#F5F5F5',
        // 'light-txt-1': '#151515',
        // 'light-txt-2': '#949494',

        // 'dark-bg-1': '#1B1B1D',
        // 'dark-bg-2': '#1F1F22',
        // 'dark-txt-1': '#D0D0D4',
        // 'dark-txt-2': '#8B8B8E',

        'theme-bg-header': 'var(--bg-header)',
        'theme-bg-main': 'var(--bg-main)',
        'theme-bg-section': 'var(--bg-section)',
        'theme-bg-blue': 'var(--bg-blue)',

        'theme-txt-default': 'var(--txt-default)',
        'theme-txt-gray': 'var(--txt-gray)',
        'theme-txt-blue': 'var(--txt-blue)',
        'theme-txt-red': 'var(--txt-red)',

        'theme-skeleton-bg': 'var(--skeleton-bg)',
      },
    },
  },
  plugins: [],
};
