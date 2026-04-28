import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/solutions", label: "Solutions" },
  { to: "/scanner", label: "Scanner" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass" : "bg-transparent"
          }`}
        >
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan/20 to-electric/20 ring-1 ring-cyan/30">
              <Shield className="h-5 w-5 text-cyan" strokeWidth={2.2} />
              <div className="absolute inset-0 rounded-lg bg-cyan/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-sm font-bold tracking-wide">OMIROS</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Innovation</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-cyan"
                activeProps={{ className: "text-cyan" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 rounded-lg border border-cyan/30 bg-cyan/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-cyan transition-all hover:bg-cyan/10 hover:shadow-[0_0_20px_oklch(0.78_0.2_210/0.3)]"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </header>
  );
}
