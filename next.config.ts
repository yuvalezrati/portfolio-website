import os from "node:os";
import type { NextConfig } from "next";

// Let phones on the same Wi-Fi use the dev server (http://<this-mac>:3000). Next only
// trusts localhost by default and blocks dev scripts for other hosts, so allow this
// machine's current LAN addresses and its Bonjour name (e.g. yuvals-macbook-pro.local).
const lanAddresses = Object.values(os.networkInterfaces())
  .flat()
  .filter((net) => net && net.family === "IPv4" && !net.internal)
  .map((net) => net!.address);
const bonjourName = `${os.hostname().replace(/\.local$/, "").toLowerCase()}.local`;

const nextConfig: NextConfig = {
  allowedDevOrigins: [...lanAddresses, bonjourName],
  images: {
    // Photography: serve modern formats at a higher quality than Next's default 75.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};

export default nextConfig;
