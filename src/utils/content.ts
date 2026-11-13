import type { CollectionEntry } from 'astro:content';

export function getPostUrl(post: CollectionEntry<'blog'>) {
  return `/blog/${post.data.slug || post.id}/`;
}

export function getCloudinaryImageUrl(
  url: string | undefined,
  options: { width?: number; height?: number; crop?: 'fill' | 'fit' | 'limit' } = {},
) {
  if (!url) return undefined;

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith('cloudinary.com')) return url;

    const marker = '/image/upload/';
    const index = parsed.pathname.indexOf(marker);
    if (index === -1) return url;

    const transformations = ['f_auto', 'q_auto'];
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.crop) transformations.push(`c_${options.crop}`);

    parsed.pathname =
      parsed.pathname.slice(0, index + marker.length) +
      transformations.join(',') +
      '/' +
      parsed.pathname.slice(index + marker.length);

    return parsed.toString();
  } catch {
    return url;
  }
}
