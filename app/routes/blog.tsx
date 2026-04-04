import { Link, useLoaderData } from "react-router";

import type { Route } from "./+types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getAllPosts, type BlogPost } from "~/lib/posts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog | softwarechip.de" },
    { name: "description", content: "Build logs and product notes from softwarechip." },
  ];
}

export function loader() {
  return { posts: getAllPosts() };
}

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main className="pixel-page min-h-screen pb-20">
      <section className="mx-auto max-w-4xl px-5 pt-12 sm:px-8 md:pt-16">
        <div className="flex items-center justify-between border-y border-border/70 py-3 text-[10px] tracking-[0.22em] text-muted-foreground sm:text-xs">
          <Link to="/" className="hover:text-foreground">
            SOFTWARECHIP.DE
          </Link>
          <Link to="/about" className="hover:text-foreground">
            ABOUT
          </Link>
        </div>

        <h1 className="mt-8 font-mono text-4xl tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Posts are auto-indexed from markdown files in app/posts and sorted by date.
        </p>

        <div className="mt-8 space-y-4">
          {posts.length === 0 ? (
            <Card className="pixel-panel">
              <CardContent className="p-6 text-sm text-muted-foreground">
                No posts yet. Add a markdown file in app/posts to publish one.
              </CardContent>
            </Card>
          ) : (
            posts.map((post: BlogPost) => (
              <Card key={post.slug} className="pixel-panel">
                <CardHeader>
                  <CardTitle className="font-mono text-2xl tracking-tight">
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{post.date}</p>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={`${post.slug}-${tag}`}
                        className="inline-flex border border-border/80 px-2 py-1 font-mono text-[11px] uppercase text-foreground/85"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex border border-border/80 px-2 py-1 font-mono text-xs uppercase tracking-[0.14em] text-foreground hover:bg-muted"
                  >
                    Read Post
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
