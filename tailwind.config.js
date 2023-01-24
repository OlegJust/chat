module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        loop: {
          'from': {
            transform: 'translateX(0)'
          },
          'to': {
            transform: 'translateX(-50%)'
          }
        },
      },
      animation: {
        'loop-rer': 'loop linear infinite',
      }
    },
  },
  plugins: [],
}
