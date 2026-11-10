import type { Media, MediaList, MediaListOptions, MediaStore, MediaUploadOptions } from "tinacms";

export class CloudinaryMediaStore implements MediaStore {
  accept = "image/*";
  searchable = true;
  extensionFilterable = true;
  private baseUrl = "/api/cloudinary/media";

  async persist(files: MediaUploadOptions[]): Promise<Media[]> {
    const uploaded: Media[] = [];
    for (const item of files) {
      const formData = new FormData();
      formData.append("file", item.file, item.file.name);
      formData.append("directory", item.directory || "");
      formData.append("filename", item.file.name);
      const response = await fetch(this.baseUrl, { method: "POST", body: formData });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Cloudinary upload failed.");
      }
      const data = await response.json();
      uploaded.push({
        type: "file",
        id: data.public_id,
        filename: data.original_filename || item.file.name,
        directory: item.directory || "/",
        src: data.secure_url,
        thumbnails: { "75x75": data.secure_url, "400x400": data.secure_url, "1000x1000": data.secure_url },
      });
    }
    return uploaded;
  }

  async delete(media: Media): Promise<void> {
    const response = await fetch(this.baseUrl + "/" + encodeURIComponent(media.id), { method: "DELETE" });
    if (!response.ok) throw new Error("Cloudinary delete failed.");
  }

  async list(options: MediaListOptions = {}): Promise<MediaList> {
    const params = new URLSearchParams();
    if (options.directory) params.set("directory", options.directory);
    if (options.limit) params.set("limit", String(options.limit));
    if (options.offset) params.set("offset", String(options.offset));
    if (options.search) params.set("search", options.search);
    if (options.ext?.length) params.set("ext", options.ext.join(","));
    if (options.filesOnly) params.set("filesOnly", "true");
    const response = await fetch(this.baseUrl + "?" + params.toString());
    if (!response.ok) throw new Error("Cloudinary media listing failed.");
    return response.json();
  }

  parse(media: Media): string {
    return media.src || "";
  }
}
