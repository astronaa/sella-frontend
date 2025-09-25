import localFont from 'next/font/local'

export const fontManrope = localFont({
	src: './font.ttf',
	display: 'swap',
	variable: '--font-manrope',
	fallback: ['system-ui', 'arial'],
	preload: true
})