/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      'primary-100': '#13677C',
      'primary-200': '#1C93B0',
      'primary-300': '#1EA1C2',
      'dark-100': '#141515',
      'dark-200': '#46494C',
      'dark-300': '#4C5C68',
      'light-200': '#DCDCDD',
      'light-100': '#C5C3C6',
      disabled: '#999999',
    },
  },
  plugins: [],
};
