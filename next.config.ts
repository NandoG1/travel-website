import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'res.cloudinary.com', protocol: 'https', port: '' }
        ]
    },
    webpack(config:any) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    }
}

export default nextConfig;