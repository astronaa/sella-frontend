const baseUrlMediaPattern = new URL(
  "/api/media/**",
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 600,
  images: {
    remotePatterns: [
      {
        hostname: baseUrlMediaPattern.hostname,
        pathname: baseUrlMediaPattern.pathname,
        port: baseUrlMediaPattern.port,
        protocol: baseUrlMediaPattern.protocol.startsWith("https")
          ? "https"
          : "http",
      },
    ],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                      cleanupIds: false,
                    },
                  },
                },
              ],
            },
          },
        },
      }
    );
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
