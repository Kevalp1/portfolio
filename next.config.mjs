/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // Use Rust-based SWC minifier (faster on Windows)
  reactStrictMode: true, 
};

export default nextConfig;
