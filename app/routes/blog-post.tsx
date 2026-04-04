import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Route } from "./+types/blog-post";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getPostBySlug } from "~/lib/posts";

export function meta({ data }: Route.MetaArgs) {
  const title = data?.post?.title ?? "Post";
  return [
    { title: `${title} | Blog | softwarechip.de` },
    { name: "description", content: data?.post?.excerpt ?? "Blog post" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug;
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const post = getPostBySlug(slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return { post };
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  return (
    <main className="pixel-page min-h-screen pb-20">
      <section className="mx-auto max-w-4xl px-5 pt-12 sm:px-8 md:pt-16">
        <div className="flex items-center justify-between border-y border-border/70 py-3 text-[10px] tracking-[0.22em] text-muted-foreground sm:text-xs">
          <Link to="/blog" className="hover:text-foreground">
            BACK TO BLOG
          </Link>
          <Link to="/" className="hover:text-foreground">
            HOME
          </Link>
        </div>

        <article className="mt-8">
          <Card className="pixel-panel">
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{post.date}</p>
              <CardTitle className="font-mono text-3xl tracking-tight sm:text-4xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={`${post.slug}-${tag}`}
                      className="inline-flex border border-border/80 px-2 py-1 font-mono text-[11px] uppercase text-foreground/85"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="markdown-content text-sm leading-relaxed text-muted-foreground sm:text-base">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </article>
      </section>
    </main>
  );
}
