const clientId = process.env.TINA_CLIENT_ID;
const token = process.env.TINA_TOKEN;
const branch = process.env.CF_PAGES_BRANCH || "main";

if (!clientId || !token) {
  console.log("TinaCloud credentials are not available; skipping branch bootstrap.");
  process.exit(0);
}

const url =
  `https://content.tinajs.io/db/${clientId}/reset/${encodeURIComponent(branch)}?refreshSchema=true&skipIfSchemaCurrent=false`;

const response = await fetch(url, {
  method: "POST",
  headers: {
    "X-API-KEY": token,
    "Content-Type": "application/json",
  },
});

const body = await response.text();

if (!response.ok) {
  console.error(`TinaCloud branch bootstrap failed (${response.status}): ${body}`);
  process.exit(1);
}

console.log(`TinaCloud branch bootstrap response: ${body}`);
