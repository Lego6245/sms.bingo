module.exports = {
    purge: {
        content: ['./pages/**/*.tsx', './components/**/*.tsx'],
        options: {
            safelist: [/.*bingosync.*/ /*fr-qc*/],
        },
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: theme => ({
                'tile-background': "url('/bingoleaguetile.png')",
                'fr-qc': "url('/fr-qc.svg')",
            }),
            colors: {
                'bingosync-orange': '#FF9C12',
                'bingosync-red': '#FF4944',
                'bingosync-blue': '#409CFF',
                'bingosync-green': '#31D814',
                'bingosync-purple': '#822DBF',
                'bingosync-navy': '#0D48B5',
                'bingosync-teal': '#419695',
                'bingosync-brown': '#AB5C23',
                'bingosync-pink': '#ED86AA',
                'bingosync-yellow': '#D8D014',
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: '#fff',
                        h1: {
                            color: '#fff',
                        },
                        h2: {
                            color: '#fff',
                        },
                        h3: {
                            color: '#fff',
                        },
                        th: {
                            color: '#fff',
                        },
                        strong: {
                            color: '#fff',
                        },
                    },
                },
            },
        },
    },
    variants: {},
    plugins: [require('@tailwindcss/typography')],
};
