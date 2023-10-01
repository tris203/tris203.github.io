import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          '0%': {
            width: '0%',
            visibility: 'hidden',
          },
          '33%': {
            width: '100%',
          },
        },
        typing2: {
          '0%': {
            width: '0%',
            visibility: 'hidden',
          },
          '33%': {
            width: '0%',
            visibility: 'hidden',
          },
          '66%': {
            width: '100%',
          },
        },
        typing3: {
          '0%': {
            width: '0%',
            visibility: 'hidden',
          },
          '66%': {
            width: '0%',
            visibility: 'hidden',
          },
          '100%': {
            width: '100%',
          },
        },
        blink: {
          '50%': {
            borderColor: 'white',
          },
          '100%': {
            borderColor: 'transparent',
          },
        },
        fadein: {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        typing: 'typing 3s steps(20)  alternate, blink .7s 1.5',
        typing2: 'typing2 3s steps(15)  alternate, blink .7s 2',
        typing3: 'typing3 3s steps(18)  alternate, blink .7s infinite',
        fadein: 'fadein 3.5s ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
