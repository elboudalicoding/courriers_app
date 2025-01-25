module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1A4581',     // Bleu marine
        'secondary': '#5AB3F2',   // Bleu ciel
        'background': '#F5F5F5',  // Blanc cassé
        'text-dark': '#333333',   // Gris foncé
        'success': '#34A853',     // Vert sauge
        'warning': '#FF9F1C',     // Orange
        'error': '#E63946'        // Rouge corail
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif']
      },
      borderRadius: {
        'large': '0.75rem'
      }
    },
  },
  plugins: [],
}