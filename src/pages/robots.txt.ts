const robots = `User-agent: *
Allow: /

Sitemap: https://bukunota.my/sitemap-index.xml
`;

export const GET = () =>
  new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
