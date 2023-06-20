const defaultTheme = require('tailwindcss/defaultTheme')
const greenhouse = require('greenhouse-react-ui/config')

/** @type {import('tailwindcss').Config} */
module.exports = greenhouse({
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
	darkMode: 'class',
})
