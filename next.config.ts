import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
      GEMINI_API_KEY: process.env.OPENAI_API_KEY
    },
};

export default nextConfig;
