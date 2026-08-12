/** @type {import('tailwindcss').confg} */

import { plugin } from 'postcss';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
