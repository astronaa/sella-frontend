import type { Config } from "tailwindcss";
import { parkwindPlugin } from '@park-ui/tailwind-plugin';
import plugin from 'tailwindcss/plugin'

const config = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				'accent-100': '#FFDD00',
				'accent-hover': '#EC9515',

				'cyan-100': '#80B4DB',

				'black-100': '#0A0A0A',
				'black-74': '#bdbdbd',
				'black-60': '#999',
				'black-40': '#666',
				'black-08': '#141414',
				'black-06': '#0F0F0F',

				'red-100': '#F44336',
				'green-100': '#60B04D',
				'error-100': '#E25728'
			},
			fontFamily: {
				inter: ['var(--font-inter)'],
				manrope: ['var(--font-manrope)'],
			},
			borderColor: {
				secondary: 'rgba(255, 255, 255, 0.06)'
			},
			zIndex: {
				dropdown: '60',
				dialog: '70',
				drawer: '70',
				header: '100',
			},
			maxWidth: {
				'content': '72.5rem'
			}
		},
	},
	parkUI: {
		accentColor: 'yellow',
		grayColor: 'neutral',
		borderRadius: 'sm',
	},
	plugins: [
		parkwindPlugin,
		plugin(function ({ addVariant }) {
			addVariant('hocus', ['&:hover', '&:focus'])
			addVariant('filled', '&:not(:placeholder-shown)')
			addVariant('light', '&:is(.light *)')
		}),
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-hide': {
					/* IE and Edge */
					'-ms-overflow-style': 'none',

					/* Firefox */
					'scrollbar-width': 'none',

					/* Safari and Chrome */
					'&::-webkit-scrollbar': {
						display: 'none'
					}
				}
			}
			)
		})
	],
	darkMode: ['class'],
} satisfies Config;

export default config;
