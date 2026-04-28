import { Link } from "@tanstack/react-router";
import { Shield, Github, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background/50">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan/20 to-electric/20 ring-1 ring-cyan/30">
                <Shield className="h-5 w-5 text-cyan" />
              </div>
              <div>
                <div className="font-display text-base font-bold">OMIROS INNOVATION</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Building the Future of Security
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              An ICT Challenge team from Korçë, Albania — engineering intelligent systems
              that protect people, data, and infrastructure across the digital and physical world.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-cyan">Navigate</div>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { to: "/about", label: "About" },
                { to: "/solutions", label: "Solutions" },
                { to: "/team", label: "Team" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground transition-colors hover:text-cyan">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-cyan">Contact</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-cyan/60" />
                Korçë, Albania
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-cyan/60" />
                omirosinnovation@gmail.com
              </li>
              <li className="flex items-start gap-2">
                <Github className="mt-0.5 h-4 w-4 text-cyan/60" />
                @omirosinnovation-netizen
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/40 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} OMIROS INNOVATION · ICT CHALLENGE 2026
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
            <span className="text-muted-foreground">SYSTEMS NOMINAL · SECURED CONNECTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
