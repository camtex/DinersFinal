import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            container: {
                center: true, // Esto hace que el contenedor siempre esté centrado
                padding: {
                    DEFAULT: '1.5rem', // Margen pequeño para celulares
                    sm: '2rem',
                    lg: '6rem',       // Margen notable en laptops
                    xl: '10rem',      // Mucho aire en monitores grandes
                    '2xl': '14rem',   // Look editorial/lujo en pantallas gigantes
                },
            },
            // ... tus otros colores y extensiones
        },
    },
    plugins: [],
}

export default config