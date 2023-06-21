/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'upcdn.io',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'replicate.delivery',
				port: '',
				pathname: '/**',
			},
		],
	},
}

module.exports = nextConfig
