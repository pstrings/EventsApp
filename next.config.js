/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				pathname: "/photos/**"
			}
		]
	},
	reactStrictMode: true
};

module.exports = nextConfig;
