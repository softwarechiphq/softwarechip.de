import type { PageServerLoad } from './$types';

interface Metadata {
	[key: string]: string | string[];
}

function getStringField(metadata: Metadata, key: string): string | null {
	const value = metadata[key];
	return typeof value === 'string' ? value : null;
}

function getTagsField(metadata: Metadata): string[] {
	const value = metadata.tags;
	if (Array.isArray(value)) {
		return value;
	}
	if (typeof value === 'string' && value.trim()) {
		return value
			.split(',')
			.map((tag) => tag.trim())
			.filter(Boolean);
	}
	return [];
}

function parseStrictDate(date: string): number | null {
	const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date.trim());
	if (!match) {
		return null;
	}

	const day = Number(match[1]);
	const month = Number(match[2]);
	const year = Number(match[3]);

	const parsed = new Date(year, month - 1, day);
	if (
		parsed.getFullYear() !== year ||
		parsed.getMonth() !== month - 1 ||
		parsed.getDate() !== day
	) {
		return null;
	}

	return parsed.getTime();
}

// Simple frontmatter parser
function parseFrontmatter(content: string): { metadata: Metadata; body: string } {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		return { metadata: {}, body: content };
	}

	const metadata: Metadata = {};
	const lines = match[1].split('\n');

	for (const line of lines) {
		const [key, ...valueParts] = line.split(':');
		if (key && valueParts.length > 0) {
			const value = valueParts.join(':').trim();
			// Handle tags as array
			if (key.trim() === 'tags') {
				metadata[key.trim()] = value.split(',').map((tag) => tag.trim());
			} else {
				metadata[key.trim()] = value;
			}
		}
	}

	return {
		metadata,
		body: match[2]
	};
}

export const load: PageServerLoad = async () => {
	const posts: {
		slug: string;
		title: string;
		date: string;
		tags: string[];
		excerpt?: string;
		sortTime: number;
	}[] = [];

	// Import all markdown files from the posts directory
	const modules = import.meta.glob('/src/routes/blog/posts/*.md', { as: 'raw' });

	for (const [path, content] of Object.entries(modules)) {
		const text = await content();
		const slug = path.split('/').pop()?.replace('.md', '') || '';

		const { metadata, body } = parseFrontmatter(text);
		const title = getStringField(metadata, 'title');
		const date = getStringField(metadata, 'date');
		const tags = getTagsField(metadata);
		const sortTime = date ? parseStrictDate(date) : null;

		if (title && date && sortTime !== null) {
			posts.push({
				slug,
				title,
				date,
				tags,
				excerpt: body.split('\n').slice(0, 2).join(' ').substring(0, 140) + '...',
				sortTime
			});
		}
	}

	// Sort by date (newest first)
	posts.sort((a, b) => {
		return b.sortTime - a.sortTime;
	});

	return {
		posts: posts.map((post) => ({
			slug: post.slug,
			title: post.title,
			date: post.date,
			tags: post.tags,
			excerpt: post.excerpt
		}))
	};
};
