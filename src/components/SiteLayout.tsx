import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { EthanMascot } from "./EthanMascot";
import { ClickSound } from "./ClickSound";
import { ThemeProvider } from "./ThemeProvider";
import { FilmGrain } from "./FilmGrain";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground noise">
        <FilmGrain />
        <ClickSound />
        <Navbar />
        <main className="pt-24">{children}</main>
        <Footer />
        <EthanMascot />
      </div>
    </ThemeProvider>
  );
}
