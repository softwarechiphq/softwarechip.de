export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  timestamp: number;
  excerpt: string;
};

export type BlogPostDetail = BlogPost & {
  content: string;
};

type Frontmatter = {
  title?: string;
  date?: string;
  tags?: string[];
};

export function getAllPosts(): BlogPost[] {
  const modules = import.meta.glob<string>("../posts/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  });

  const posts = Object.entries(modules).map(([path, content]) => {
    const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "untitled";
    const { frontmatter, body } = parseMarkdown(content);
    const title = frontmatter.title?.trim() || slugToTitle(slug);
    const date = frontmatter.date?.trim() || "01/01/1970";
    const tags = frontmatter.tags ?? [];

    return {
      slug,
      title,
      date,
      tags,
      timestamp: parseDateToTimestamp(date),
      excerpt: makeExcerpt(body),
    } satisfies BlogPost;
  });

  return posts.sort((a, b) => b.timestamp - a.timestamp);
}

export function getPostBySlug(slug: string): BlogPostDetail | null {
  const modules = import.meta.glob<string>("../posts/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  });

  const matched = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${slug}.md`),
  );

  if (!matched) {
    return null;
  }

  const [, content] = matched;
  const { frontmatter, body } = parseMarkdown(content);
  const title = frontmatter.title?.trim() || slugToTitle(slug);
  const date = frontmatter.date?.trim() || "01/01/1970";
  const tags = frontmatter.tags ?? [];

  return {
    slug,
    title,
    date,
    tags,
    timestamp: parseDateToTimestamp(date),
    excerpt: makeExcerpt(body),
    content: body,
  };
}

function parseMarkdown(content: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  if (!content.startsWith("---")) {
    return { frontmatter: {}, body: content.trim() };
  }

  const lines = content.split(/\r?\n/);
  const closingIndex = lines.slice(1).findIndex((line) => line.trim() === "---");

  if (closingIndex < 0) {
    return { frontmatter: {}, body: content.trim() };
  }

  const frontmatterLines = lines.slice(1, closingIndex + 1);
  const body = lines.slice(closingIndex + 2).join("\n").trim();
  const frontmatter: Frontmatter = {};

  for (const rawLine of frontmatterLines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.toLowerCase().startsWith("title:")) {
      frontmatter.title = line.slice("title:".length).trim();
      continue;
    }

    if (line.toLowerCase().startsWith("date:")) {
      frontmatter.date = line.slice("date:".length).trim();
      continue;
    }

    if (line.toLowerCase().startsWith("tags:")) {
      frontmatter.tags = line
        .slice("tags:".length)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      continue;
    }

    if (line.toLowerCase().startsWith("tags,")) {
      frontmatter.tags = line
        .slice("tags,".length)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
  }

  return { frontmatter, body };
}

function parseDateToTimestamp(date: string): number {
  const match = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return 0;

  const [, dd, mm, yyyy] = match;
  const day = Number(dd);
  const month = Number(mm);
  const year = Number(yyyy);

  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1970) {
    return 0;
  }

  return Date.UTC(year, month - 1, day);
}

function makeExcerpt(body: string): string {
  const normalized = body.replace(/[#>*_`\-]/g, " ").replace(/\s+/g, " ").trim();
  if (!normalized) return "No excerpt yet.";
  return normalized.length > 140 ? `${normalized.slice(0, 137)}...` : normalized;
}

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
