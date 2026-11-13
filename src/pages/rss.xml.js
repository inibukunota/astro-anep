import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getPostUrl } from "../utils/content";

export async function GET(context) {
	const posts = await getCollection("blog");
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.metaDescription || "",
			pubDate: post.data.pubDate,
			link: getPostUrl(post),
		})),
	});
}
