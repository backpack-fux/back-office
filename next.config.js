/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/calendar",
        destination: "/dashboard/calendar",
      },
      {
        source: "/merchants",
        destination: "/dashboard/merchants",
      },
      {
        source: "/partners",
        destination: "/dashboard/partners",
      },
      {
        source: "/onboards",
        destination: "/dashboard/onboards",
      },
    ];
  },
};

module.exports = nextConfig;
