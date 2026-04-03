import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';

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

export const load: PageServerLoad = async ({ params }) => {
	try {
		// Import all markdown files and find the matching slug
		const modules = import.meta.glob('/src/routes/blog/posts/*.md', { as: 'raw' });

		let content: string | null = null;

		for (const [path, moduleFunc] of Object.entries(modules)) {
			const slug = path.split('/').pop()?.replace('.md', '') || '';
			if (slug === params.slug) {
				content = await moduleFunc();
				break;
			}
		}

		if (!content) {
			throw error(404, 'Post not found');
		}

		const { metadata, body } = parseFrontmatter(content);
		const title = getStringField(metadata, 'title');
		const date = getStringField(metadata, 'date');
		const tags = getTagsField(metadata);
		const validDate = date ? parseStrictDate(date) : null;

		if (!title || !date || validDate === null) {
			throw error(404, 'Post not found');
		}

		const html = await marked.parse(body);

		return {
			title,
			date,
			tags,
			html
		};
	} catch {
		throw error(404, 'Post not found');
	}
};
