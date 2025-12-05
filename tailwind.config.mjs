/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Forest greens
                forest: {
                    50: '#F5F7F4',
                    100: '#E7ECE8',
                    200: '#CFE3CF',
                    300: '#A8C2A5',
                    400: '#7BA37A',
                    500: '#597A5B',
                    600: '#3E5E42',
                    700: '#2F4A31',
                    800: '#1E3320',
                    900: '#0E1A12',
                },
                // Moss tones
                moss: {
                    light: '#CFE3CF',
                    DEFAULT: '#A8C2A5',
                    dark: '#7BA37A',
                },
                // Bark browns
                bark: {
                    light: '#6B5B52',
                    DEFAULT: '#5A4A42',
                    dark: '#42372F',
                },
                // Misty neutrals
                mist: {
                    light: '#FFFFFF',
                    DEFAULT: '#F5F7F4',
                    medium: '#E7ECE8',
                    dark: '#D4DBD6',
                },
                // Deep night forest
                night: '#0E1A12',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Lora', 'Georgia', 'serif'],
                display: ['Work Sans', 'Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                // Calm, spacious typography scale
                'display-xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-lg': ['4rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
                'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
                'heading-lg': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
                'heading': ['1.75rem', { lineHeight: '1.4' }],
                'heading-sm': ['1.5rem', { lineHeight: '1.4' }],
                'body-lg': ['1.25rem', { lineHeight: '1.7' }],
                'body': ['1.125rem', { lineHeight: '1.8' }],
                'body-sm': ['1rem', { lineHeight: '1.7' }],
            },
            spacing: {
                // Extended spacing for breathing room
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
                '34': '8.5rem',
                '38': '9.5rem',
                'section': '8rem',
                'section-lg': '12rem',
            },
            borderRadius: {
                'organic': '60% 40% 30% 70% / 60% 30% 70% 40%',
                'organic-2': '30% 70% 70% 30% / 30% 30% 70% 70%',
            },
            boxShadow: {
                'soft': '0 4px 30px rgba(62, 94, 66, 0.08)',
                'soft-lg': '0 8px 50px rgba(62, 94, 66, 0.12)',
                'inner-soft': 'inset 0 2px 20px rgba(62, 94, 66, 0.05)',
            },
            backdropBlur: {
                'xs': '2px',
            },
            transitionDuration: {
                '2000': '2000ms',
                '3000': '3000ms',
                '4000': '4000ms',
            },
            transitionTimingFunction: {
                'gentle': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'soft-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'soft-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
            },
            animation: {
                'float-slow': 'float 20s ease-in-out infinite',
                'float-slower': 'float 30s ease-in-out infinite',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'pulse-soft': 'pulseSoft 8s ease-in-out infinite',
                'drift': 'drift 25s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0) translateX(0)' },
                    '33%': { transform: 'translateY(-10px) translateX(5px)' },
                    '66%': { transform: 'translateY(5px) translateX(-5px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '0.6', transform: 'scale(1.05)' },
                },
                drift: {
                    '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '25%': { transform: 'translate(10px, -15px) rotate(2deg)' },
                    '50%': { transform: 'translate(-5px, 10px) rotate(-1deg)' },
                    '75%': { transform: 'translate(-10px, -5px) rotate(1deg)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
