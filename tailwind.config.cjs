module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef1ff',
          100: '#cbd6ff',
          500: '#7b76ff',
          700: '#4d4fe6'
        },
        ink: {
          500: 'var(--text-primary)'
        }
      },
      fontFamily: {
        serif: ['var(--font-display)', 'serif'],
        sans: ['var(--font-text)', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
