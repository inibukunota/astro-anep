import type { APIRoute } from "astro";

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

function env(context: Parameters<APIRoute>[0]) {
  const runtimeEnv = (context.locals as any)?.runtime?.env || {};
  return {
    cloudName: runtimeEnv.CLOUDINARY_CLOUD_NAME || import.meta.env.CLOUDINARY_CLOUD_NAME,
    apiKey: runtimeEnv.CLOUDINARY_API_KEY || import.meta.env.CLOUDINARY_API_KEY,
    apiSecret: runtimeEnv.CLOUDINARY_API_SECRET || import.meta.env.CLOUDINARY_API_SECRET,
  };
}

async function sha1(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-1", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function signatureParams(params: Record<string, string>, secret: string) {
  return Object.entries(params)
    .filter(([, value]) => value !== "" && value !== undefined && value !== null)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => key + "=" + value)
    .join("&") + secret;
}

function safePublicId(directory: string, filename: string) {
  const cleanDirectory = directory.replace(/^\/+|\/+$/g, "").replace(/\.\./g, "");
  const cleanFilename = filename.replace(/^.*[\\\\/]/, "").replace(/\.\./g, "");
  const base = cleanFilename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9._-]+/g, "-");
  return cleanDirectory ? cleanDirectory + "/" + base : base;
}

export const POST: APIRoute = async (context) => {
  const { cloudName, apiKey, apiSecret } = env(context);
  if (!cloudName || !apiKey || !apiSecret) return json({ message: "Cloudinary environment variables are missing." }, 500);

  const form = await context.request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return json({ message: "No file supplied." }, 400);

  const directory = String(form.get("directory") || "");
  const filename = String(form.get("filename") || file.name);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const publicId = safePublicId(directory, filename);
  const params = { overwrite: "true", public_id: publicId, timestamp };
  const signature = await sha1(signatureParams(params, apiSecret));

  const upload = new FormData();
  upload.append("file", file);
  upload.append("api_key", apiKey);
  upload.append("timestamp", timestamp);
  upload.append("public_id", publicId);
  upload.append("overwrite", "true");
  upload.append("signature", signature);

  const response = await fetch("https://api.cloudinary.com/v1_1/" + cloudName + "/auto/upload", { method: "POST", body: upload });
  const data = await response.json();
  if (!response.ok) return json({ message: data.error?.message || "Cloudinary upload failed." }, response.status);
  return json(data);
};

export const GET: APIRoute = async (context) => {
  const { cloudName, apiKey, apiSecret } = env(context);
  if (!cloudName || !apiKey || !apiSecret) return json({ message: "Cloudinary environment variables are missing." }, 500);

  const url = new URL(context.request.url);
  const directory = url.searchParams.get("directory") || "";
  const search = url.searchParams.get("search") || "";
  const limit = Math.min(Number(url.searchParams.get("limit") || 36), 100);
  const offset = url.searchParams.get("offset") || "";
  const ext = url.searchParams.get("ext") || "";

  const expressionParts = ["resource_type:image"];
  const folder = directory.replace(/^\/+|\/+$/g, "");
  if (folder) expressionParts.push("folder:" + folder + "/*");
  if (search) expressionParts.push("filename:*" + search + "*");
  if (ext) expressionParts.push("format:" + ext.split(",").map((x) => x.replace(/^\./, "")).join(","));

  const body: Record<string, unknown> = { expression: expressionParts.join(" AND "), max_results: limit };
  if (offset) body.next_cursor = offset;

  const auth = btoa(apiKey + ":" + apiSecret);
  const response = await fetch("https://api.cloudinary.com/v1_1/" + cloudName + "/resources/search", {
    method: "POST",
    headers: { authorization: "Basic " + auth, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) return json({ message: data.error?.message || "Cloudinary listing failed." }, response.status);

  const items = (data.resources || []).map((item: any) => ({
    type: "file",
    id: item.public_id,
    filename: item.filename || item.public_id.split("/").pop(),
    directory: item.public_id.includes("/") ? item.public_id.slice(0, item.public_id.lastIndexOf("/")) : "/",
    src: item.secure_url,
    thumbnails: { "75x75": item.secure_url, "400x400": item.secure_url, "1000x1000": item.secure_url },
  }));
  return json({ items, nextOffset: data.next_cursor });
};

