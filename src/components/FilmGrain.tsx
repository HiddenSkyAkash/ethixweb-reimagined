/**
 * Cinematic film-grain + dust overlay.
 * Pure CSS/SVG, fixed to viewport, pointer-events disabled.
 */
export function FilmGrain() {
  return (
    <>
      {/* Fine animated grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay opacity-[0.08] animate-grain"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />
      {/* Soft dust specks */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[59] opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 23% 17%, rgba(255,255,255,0.7), transparent 60%)," +
            "radial-gradient(1.5px 1.5px at 71% 42%, rgba(255,255,255,0.5), transparent 60%)," +
            "radial-gradient(1px 1px at 44% 78%, rgba(255,255,255,0.6), transparent 60%)," +
            "radial-gradient(1px 1px at 88% 12%, rgba(255,255,255,0.45), transparent 60%)," +
            "radial-gradient(1.5px 1.5px at 12% 63%, rgba(255,255,255,0.5), transparent 60%)",
          backgroundSize: "600px 600px",
        }}
      />
      {/* Vignette for cinematic depth */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[58]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </>
  );
}
