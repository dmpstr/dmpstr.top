import { z, defineCollection } from "astro:content";

function removeDuplicatesAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const posts = defineCollection({
	type: "content",
	schema: () =>
		z.object({
			title: z.string().max(60),
			description: z.string().max(160),
			published: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			tags: z.array(z.string()).default([]).transform(removeDuplicatesAndLowerCase),
		}),
});

export const collections = { posts };
