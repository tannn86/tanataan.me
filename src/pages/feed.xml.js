import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
	const blogs = await getCollection("blogs");
	return rss({
		title: "Tan Nguyen blog",
		description: "Personal blog of Tan Nguyen (tanataan)",
		site: context.site,
		items: blogs
			.filter((blog) => !blog.data.draft)
			.map((blog) => ({
				title: blog.data.title,
				link: new URL(`blog/${blog.slug}`, context.site).toString(),
				pubDate: blog.data.publishedAt,
				description: blog.data.description,
			})),
		stylesheet: new URL("rss/styles.xsl", context.site).toString(),
	});
}
