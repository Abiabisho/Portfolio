import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 ስልክህንም ሆነ ፖርቱን ሙሉ በሙሉ እንዲቀበል ሁለቱንም አማራጭ እንስጠው
  allowedDevOrigins: [
    '192.168.1.6',
    '192.168.1.6:3000',
    'localhost:3000'
  ]
};

export default nextConfig;