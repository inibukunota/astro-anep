const catalog = {
  specVersion: "1.0",
  host: {
    displayName: "BUKUNOTA",
    documentationUrl: "https://bukunota.my/about/",
  },
  entries: [],
};

export const GET = () =>
  new Response(JSON.stringify(catalog), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
