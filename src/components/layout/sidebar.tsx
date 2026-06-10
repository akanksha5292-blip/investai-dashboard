"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Newspaper,
  Target,
  Baby,
  Star,
  Rocket,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/opportunities", label: "Opportunities", icon: Target },
  { href: "/ipos", label: "Upcoming IPOs", icon: Rocket },
  { href: "/news", label: "News Intelligence", icon: Newspaper },
  { href: "/research", label: "AI Research", icon: Search },
  { href: "/child-fund", label: "Child Future Fund", icon: Baby },
  { href: "/watchlist", label: "Watchlist", icon: Star },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight">InvestAI</h1>
          <p className="text-xs text-muted-foreground">Research Assistant</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground">
          Not financial advice. For research and education only.
        </p>
      </div>
    </>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavContent />
      </aside>
    </>
  );
}
