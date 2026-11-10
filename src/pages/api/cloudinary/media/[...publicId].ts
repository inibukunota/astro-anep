import type { APIRoute } from "astro";

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

async function sha1(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-1", bytes);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function signatureParams(params: Record<string, string>, secret: string) {
  return (
    Object.entries(params)
      .filter(([, value]) => value !== "" && value !== undefined && value !== null)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => key + "=" + value)
      .join("&") + secret
  );
}

export const DELETE: APIRoute = async (context) => {
  const runtimeEnv = (context.locals as any)?.runtime?.env || {};
  const cloudName = runtimeEnv.CLOUDINARY_CLOUD_NAME || import.meta.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = runtimeEnv.CLOUDINARY_API_KEY || import.meta.env.CLOUDINARY_API_KEY;
  const apiSecret = runtimeEnv.CLOUDINARY_API_SECRET || import.meta.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return json({ message: "Cloudinary environment variables are missing." }, 500);
  }

  const publicId = (context.params.publicId || "").replace(/^\/+|\/+$/g, "");
  if (!publicId) return json({ message: "Missing public ID." }, 400);

  const timestamp = String(Math.floor(Date.now() / 1000));
  const params = { public_id: publicId, timestamp };
  const signature = await sha1(signatureParams(params, apiSecret));
  const body = new URLSearchParams({
    public_id: publicId,
    timestamp,
    api_key: apiKey,
    signature,
  });

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/" + cloudName + "/image/destroy",
    { method: "POST", body },
  );
  const data = await response.json();

  if (!response.ok || data.result !== "ok") {
    return json(
      { message: data.error?.message || "Cloudinary delete failed." },
      response.status || 500,
    );
  }

  return json({ ok: true });
};
