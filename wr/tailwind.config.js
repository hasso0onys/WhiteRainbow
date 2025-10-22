/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './schemaTypes/**/*.{js,ts,jsx,tsx}',
    './sanity.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          primary: '#1e40af',
          'primary-light': '#3b82f6',
          secondary: '#10b981',
          bg: '#f9fafb',
          card: '#ffffff',
          border: '#e5e7eb',
          text: '#111827',
          muted: '#6b7280',
        }
      },
      borderRadius: {
        'studio': '12px',
        'studio-sm': '8px',
      },
      boxShadow: {
        'studio': '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        'studio-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
}
