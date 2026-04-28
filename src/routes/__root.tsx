import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CursorGlow } from "../components/CursorGlow";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Error · 404</div>
        <h1 className="mt-4 font-display text-7xl font-bold text-gradient">Lost Signal</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The route you're scanning for is not in our network mesh.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan to-electric px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_oklch(0.78_0.2_210/0.4)] transition-all hover:scale-[1.02]"
        >
          Return to base
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Omiros Innovation — Securing Tomorrow, Today" },
      { name: "description", content: "Omiros Innovation: ICT Challenge team from Korçë, Albania, engineering future-ready cybersecurity, smart surveillance, and digital protection systems." },
      { name: "author", content: "Omiros Innovation" },
      { property: "og:title", content: "Omiros Innovation — Securing Tomorrow, Today" },
      { property: "og:description", content: "Omiros Innovation: ICT Challenge team from Korçë, Albania, engineering future-ready cybersecurity, smart surveillance, and digital protection systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Omiros Innovation — Securing Tomorrow, Today" },
      { name: "twitter:description", content: "Omiros Innovation: ICT Challenge team from Korçë, Albania, engineering future-ready cybersecurity, smart surveillance, and digital protection systems." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/09c60d50-8566-488e-ac8a-815290043c0f" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/09c60d50-8566-488e-ac8a-815290043c0f" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <CursorGlow />
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
