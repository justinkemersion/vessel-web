import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle at .next/standalone so the
  // Docker runner image can ship `node server.js` without needing
  // node_modules or the rest of the source tree.
  output: "standalone",
};

export default nextConfig;
