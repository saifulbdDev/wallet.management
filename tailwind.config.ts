import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#f22f2f',
          200: '#ab0c0c',
          300: '#BD2217',
          400: '#4A56E2',
        },
       
      },
    
    },
  
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}
export default config
