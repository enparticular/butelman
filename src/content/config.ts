import { defineCollection, z } from "astro:content";

// Schema for Event collection
const eventsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.string().transform((str: string) => new Date(str)),
		image: z.object({
			src: z.string(),
			alt: z.string().optional().default("Event image"),
		}),
		link: z.string().url().optional(),
		featured: z.boolean().optional().default(false),
	}),
});

// Schema for Project collection
const projectsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.enum(["music", "cinema/theater"]).default("music"),
		image: z.object({
			src: z.string(),
			alt: z.string().optional().default("Project image"),
		}),
		// Flexible links array
		links: z
			.array(
				z.object({
					title: z.string(),
					url: z.string().url(),
				})
			)
			.optional()
			.default([]),
		tags: z
			.array(z.enum(["composición", "intérprete", "producción", "arreglos"]))
			.optional()
			.default([]),
		featured: z.boolean().optional().default(false),
		order: z.number().optional(),
	}),
});

// Schema for Pages collection
const pagesCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z
			.object({
				src: z.string(),
				alt: z.string().optional().default("Page image"),
			})
			.optional(),
		featured: z.boolean().optional().default(false),
		order: z.number().optional(),
	}),
});

// Export collections to register them
export const collections = {
	events: eventsCollection,
	projects: projectsCollection,
	pages: pagesCollection,
};
