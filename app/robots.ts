import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://hackshastra.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/secret-admin", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
