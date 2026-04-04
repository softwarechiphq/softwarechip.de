import { Link } from "react-router";

import type { Route } from "./+types/about";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About | softwarechip.de" },
    { name: "description", content: "About softwarechip and what is being built." },
  ];
}

export default function About() {
  return (
    <main className="pixel-page min-h-screen pb-20">
      <section className="mx-auto max-w-4xl px-5 pt-12 sm:px-8 md:pt-16">
        <div className="flex items-center justify-between border-y border-border/70 py-3 text-[10px] tracking-[0.22em] text-muted-foreground sm:text-xs">
          <Link to="/" className="hover:text-foreground">
            SOFTWARECHIP.DE
          </Link>
          <Link to="/blog" className="hover:text-foreground">
            BLOG
          </Link>
        </div>

        <Card className="pixel-panel mt-8">
          <CardHeader>
            <CardTitle className="font-mono text-3xl tracking-tight">About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground sm:text-base">
            <p>
              softwarechip.de is focused on building practical software products across AI,
              SaaS, and automation.
            </p>
            <p>
              This site is the public home for product updates, experiments, and technical
              write-ups.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
