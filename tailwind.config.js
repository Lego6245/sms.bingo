module.exports = {
  purge: {
    content: ['./pages/**/*.tsx', './components/**/*.tsx'],
    options: {
      safelist: [/.*bingosync.*/]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'tile-background': "url('/bingoleaguetile.png')"
      }),
      colors: {
        'bingosync-orange': '#FF9C12',
        'bingosync-red': "#FF4944",
        "bingosync-blue": "#409CFF",
        "bingosync-green": "#31D814",
        "bingosync-purple": "#822DBF",
        "bingosync-navy": "#0D48B5",
        'bingosync-teal': "#419695",
        "bingosync-brown": "#AB5C23",
        "bingosync-pink": "#ED86AA",
        "bingosync-yellow": "#D8D014",
      }
    },
  },
  variants: {
  },
  plugins: [],
}
