import localFont from 'next/font/local'

export const fontTTNorms = localFont({
	src: [
		{
			path: './demibold.ttf',
			weight: '600'
		},
		{
			path: './medium.ttf',
			weight: '500'
		}
	],
	display: 'swap',
	variable: '--font-tt-norms'
})
