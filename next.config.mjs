/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportação estática para GitHub Pages
  output: "export",
  // GitHub Pages serve de /vivassol-site/ quando não tem domínio próprio
  // Quando apontar o domínio vivassol.com.br, remova a linha abaixo
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  reactStrictMode: true,
  images: {
    // Static export não suporta otimização de imagem do Next.js no servidor.
    // Quando migrar para Vercel, mude para false.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
