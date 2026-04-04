import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { ArrowRight, Boxes, Cpu, Sparkles, Workflow } from "lucide-react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { DottedGlowBackground } from "~/components/ui/dotted-glow-background";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import logo from "~/assets/logo.svg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "softwarechip.de | Product Engineering Studio" },
    {
      name: "description",
      content:
        "softwarechip.de builds distinct products across AI, SaaS, and automation.",
    },
  ];
}

export default function Home() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY, visible: true });
    };

    const onLeave = () => {
      setCursor((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <main className="pixel-page relative overflow-x-clip pb-16">
      <div
        aria-hidden="true"
        className="plus-cursor"
        style={{
          opacity: cursor.visible ? 1 : 0,
          transform: `translate(${cursor.x}px, ${cursor.y}px) translate(-50%, -50%)`,
        }}
      >
        <span />
        <span />
      </div>

      <div className="pixel-grid-bg" aria-hidden="true" />
      <div className="pixel-glow" aria-hidden="true" />

      <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 md:pt-20">
        <div className="flex items-center justify-between border-y border-border/70 py-3 text-[10px] tracking-[0.22em] text-muted-foreground sm:text-xs">
          <img src={logo} alt="softwarechip logo" className="h-8 w-8" />
          <nav className="flex items-center gap-4 sm:gap-6">
            <a
              href="https://github.com/softwarechiphq"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              GITHUB
            </a>
            <Link to="/about" className="hover:text-foreground">
              ABOUT
            </Link>
            <Link to="/blog" className="hover:text-foreground">
              BLOG
            </Link>
          </nav>
        </div>

        <div className="hero-spotlight relative mt-8 overflow-hidden border border-border/70 bg-card/30 px-6 py-12 md:mt-14 md:px-10 md:py-16">
          <div className="chip-frame" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="hero-title-wrap relative mx-auto mt-8 max-w-fit px-2 py-2 md:px-6 md:py-5">
              <DottedGlowBackground
                className="hero-title-dots absolute -inset-8 md:-inset-12"
                gap={24}
                radius={1}
                opacity={0.55}
                speedScale={0.3}
              />
              <h1 className="relative z-10 font-mono text-4xl leading-[0.93] tracking-tight text-foreground sm:text-6xl md:text-7xl">
                IDEAS TURN INTO PRODUCTS
                <br />
                AND SHIP FAST
              </h1>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              softwarechip.de designs and ships different product types across
              AI, SaaS, and automation with a fast build-measure-iterate loop.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button className="pixel-button" asChild>
                <a
                  href="https://github.com/softwarechiphq"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore On GitHub <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button variant="outline" className="pixel-button" asChild>
                <Link to="/blog">Read The Blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <Card
            key={pillar.title}
            className="pixel-panel stagger-in"
            style={{ animationDelay: `${220 + index * 110}ms` }}
          >
            <CardHeader>
              <CardTitle className="font-mono text-base tracking-wide">
                {pillar.title}
              </CardTitle>
              <CardDescription>{pillar.copy}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="inline-flex border border-border/80 px-2 py-1 font-mono text-xs text-foreground/90">
                {pillar.tag}
              </span>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">
        <Card className="pixel-panel stagger-in [animation-delay:120ms]">
          <CardHeader>
            <CardTitle className="font-mono text-xl tracking-tight">
              CURRENT MODE
            </CardTitle>
            <CardDescription>
              Shipping across different categories with one principle:
              momentum over meetings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
              <li className="flex items-center gap-2">
                <Sparkles className="size-4 text-foreground" />
                Idea To MVP In Days
              </li>
              <li className="flex items-center gap-2">
                <Workflow className="size-4 text-foreground" />
                Experimental Product Loops
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="size-4 text-foreground" />
                AI-Native Engineering
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5 sm:px-8">
        <Card className="pixel-panel p-0">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                softwarechip shipping system
              </p>
              <h2 className="mt-2 font-mono text-2xl leading-tight sm:text-3xl">
                Experiments become products.
                <br />
                Products become platforms.
              </h2>
            </div>
            <Button className="pixel-button" size="lg" asChild>
              <a
                href="https://github.com/softwarechiphq"
                target="_blank"
                rel="noreferrer"
              >
                Follow On GitHub <Boxes className="size-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

const pillars = [
  {
    title: "Productized Tools",
    copy: "Sharp utilities that solve one frustrating workflow with zero fluff.",
    tag: "SaaS + Internal",
  },
  {
    title: "Audience Experiments",
    copy: "Fast public iterations with real feedback loops and measurable demand.",
    tag: "Social + Content",
  },
  {
    title: "Automation Systems",
    copy: "Backend flows that replace repetitive tasks and compound over time.",
    tag: "Ops + AI",
  },
];
