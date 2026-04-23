import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "AhrefsBot",
        crawlDelay: 10,
      },
      {
        userAgent: "SemrushBot",
        crawlDelay: 10,
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
