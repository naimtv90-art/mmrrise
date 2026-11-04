/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Luxury deep dark canvas harmonized with corporate navy
          dark: '#060E1C',
          navy: '#0A1931',
          navyLight: '#12284D',
          
          // Official Logo Corporate Azure Blue (#1F74B9)
          blue: '#1F74B9',
          blueLight: '#3E92D8',
          blueDark: '#135489',
          
          // Official Logo Solar Amber / Executive Orange (#F4951D)
          accent: '#F4951D',
          accentLight: '#FBB04D',
          accentDark: '#D87A0B',
          
          // Clean, modern surfaces with subtle oceanic tint
          surface: '#F4F7FB',
          card: '#FFFFFF',
          textMuted: '#62758F',
          textDark: '#0A1931'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'executive': '0 20px 40px -15px rgba(10, 25, 49, 0.08), 0 0 2px 1px rgba(0,0,0,0.03)',
        'accent-glow': '0 10px 25px -5px rgba(244, 149, 29, 0.40)',
        'blue-glow': '0 10px 25px -5px rgba(31, 116, 185, 0.40)',
        'gold-glow': '0 10px 25px -5px rgba(244, 149, 29, 0.40)',
      }
    },
  },
  plugins: [],
}
