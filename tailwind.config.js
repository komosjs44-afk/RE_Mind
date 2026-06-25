/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: '#FAF8F4',
        card: '#ffffff',
        border: '#E9E5DD',
        ai: '#5C6AC4',
        healthy: '#A7D7C5',
        warning: '#F4C27A',
        risk: '#EFA8A8',
        navy: '#2B2F38',
        'risk-soft': '#FCEFEF',
        'warning-soft': '#FDF6EA',
        'healthy-soft': '#EFF8F5',
        'ai-soft': '#EBEDF8',
        'text-primary': '#2B2F38',
        'text-secondary': '#7A7F87',
      },
      borderRadius: {
        '4xl': '28px',
        '5xl': '32px',
      },
    },
  },
  plugins: [],
};
