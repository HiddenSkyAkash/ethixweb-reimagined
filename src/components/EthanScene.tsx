import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BarChart3, PhoneCall, Palette, MousePointerClick, Sparkles } from "lucide-react";
import ethan from "@/assets/ethan.png";

/**
 * Cinematic "3D-feel" Ethan hero scene.
 * - Layered parallax with cursor-driven tilt + eye tracking
 * - Idle breathing + floating
 * - Blink overlay (timed eyelid)
 * - Particle canvas backdrop
 * - Spring-physics floating UI cards
 * - Orbit rings + radial glow
 *
 * NOTE: Swap the <img> for a <Canvas> + GLTF model when a Ethan .glb asset
 * is provided. The surrounding scene rig (cards, particles, rings, lighting)
 * is engineered to drop in around a 3D model without changes.
 */
export function EthanScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cursor → motion values (normalized -1..1)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });

  // Character tilt
  const rotateY = useTransform(sx, [-1, 1], [-12, 12]);
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);
  const translateX = useTransform(sx, [-1, 1], [-18, 18]);
  const translateY = useTransform(sy, [-1, 1], [-12, 12]);

  // Eye tracking offsets
  const eyeX = useTransform(sx, [-1, 1], [-5, 5]);
  const eyeY = useTransform(sy, [-1, 1], [-3, 3]);

  // Glow follows cursor too
  const glowX = useTransform(sx, [-1, 1], [-40, 40]);
  const glowY = useTransform(sy, [-1, 1], [-30, 30]);

  // Cards float independently with subtle parallax
  const card1X = useTransform(sx, [-1, 1], [10, -10]);
  const card1Y = useTransform(sy, [-1, 1], [6, -6]);
  const card2X = useTransform(sx, [-1, 1], [-14, 14]);
  const card2Y = useTransform(sy, [-1, 1], [-8, 8]);
  const card3X = useTransform(sx, [-1, 1], [8, -8]);
  const card3Y = useTransform(sy, [-1, 1], [-10, 10]);
  const card4X = useTransform(sx, [-1, 1], [-10, 10]);
  const card4Y = useTransform(sy, [-1, 1], [12, -12]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mx.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 1.4))));
      my.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 1.4))));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // Particle backdrop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; hue: number };
    const W = () => canvas.clientWidth;
    const H = () => canvas.clientHeight;
    const COUNT = 42;
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? 0 : 350, // red / pink
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W()) p.vx *= -1;
        if (p.y < 0 || p.y > H()) p.vy *= -1;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 60%, ${p.a})`);
        grad.addColorStop(1, "hsla(0,0%,0%,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex justify-center items-center min-h-[560px] w-full"
      style={{ perspective: 1200 }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial backdrop glow that tracks cursor */}
      <motion.div
        className="absolute inset-0 m-auto h-[460px] w-[460px] rounded-full blur-[100px] opacity-70 pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.55), transparent 70%)",
        }}
      />

      {/* Orbit rings */}
      <motion.div
        className="absolute inset-0 m-auto h-[440px] w-[440px] rounded-full border border-primary/25 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-glow" />
        <span className="absolute top-1/2 -right-1.5 h-2 w-2 -translate-y-1/2 rounded-full bg-accent" />
      </motion.div>
      <motion.div
        className="absolute inset-0 m-auto h-[540px] w-[540px] rounded-full border border-white/5 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rounded-full bg-primary/70" />
        <span className="absolute -bottom-1 left-1/3 h-2 w-2 rounded-full bg-primary/40" />
      </motion.div>
      <motion.div
        className="absolute inset-0 m-auto h-[640px] w-[640px] rounded-full border border-white/[0.03] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      {/* Character rig with cinematic tilt + breathing + float */}
      <motion.div
        className="relative z-10"
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          // breathing
          animate={{ scale: [1, 1.018, 1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            // idle floating
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <img
              src={ethan}
              alt="Ethan — Senior creative founder at Ethixweb"
              className="relative max-h-[540px] w-auto drop-shadow-[0_40px_80px_rgba(220,38,38,0.5)] select-none pointer-events-none"
              draggable={false}
            />

            {/* Eye tracking overlay (subtle iris dots that drift with cursor).
                Positions are approximate to ride over the rendered face. */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                x: eyeX,
                y: eyeY,
                top: "22%",
                left: "50%",
                translateX: "-50%",
              }}
            >
              <div className="flex gap-[28px]">
                <span className="block h-1.5 w-1.5 rounded-full bg-black/70 mix-blend-multiply" />
                <span className="block h-1.5 w-1.5 rounded-full bg-black/70 mix-blend-multiply" />
              </div>
            </motion.div>

            {/* Blink eyelid overlay */}
            <motion.div
              className="absolute pointer-events-none rounded-[40%] bg-[#1a0a0a]"
              style={{
                top: "21%",
                left: "50%",
                translateX: "-50%",
                width: 68,
                height: 6,
                mixBlendMode: "multiply",
              }}
              animate={{ scaleY: [0, 0, 1, 0, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                times: [0, 0.92, 0.95, 0.98, 1],
                ease: "easeInOut",
              }}
            />

            {/* Soft chest accent (subtle red neon hint) */}
            <span className="absolute inset-x-0 bottom-10 mx-auto h-24 w-24 rounded-full bg-primary/30 blur-3xl" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating spec cards (spring physics + parallax) */}
      <FloatCard
        text="More booked jobs"
        icon={PhoneCall}
        style={{ top: "6%", left: "2%", x: card1X, y: card1Y }}
        delay={0}
      />
      <FloatCard
        text="Revenue tracked"
        icon={BarChart3}
        style={{ bottom: "10%", right: "2%", x: card2X, y: card2Y }}
        delay={0.4}
      />
      <FloatCard
        text="UI/UX Systems"
        icon={Palette}
        style={{ top: "44%", left: "-4%", x: card3X, y: card3Y }}
        delay={0.8}
      />
      <FloatCard
        text="More conversions"
        icon={MousePointerClick}
        style={{ top: "12%", right: "-2%", x: card4X, y: card4Y }}
        delay={1.2}
      />
      <FloatCard
        text="Design that converts"
        icon={Sparkles}
        style={{ bottom: "4%", left: "20%", x: card1X, y: card1Y }}
        delay={1.6}
        accent
      />
    </motion.div>
  );
}

function FloatCard({
  text,
  icon: Icon,
  style,
  delay,
  accent,
}: {
  text: string;
  icon: any;
  style: any;
  delay: number;
  accent?: boolean;
}) {
  return (
    <motion.div
      className={`absolute z-20 glass-strong rounded-2xl px-4 py-2.5 flex items-center gap-2 text-sm shadow-elegant ${
        accent ? "ring-1 ring-primary/40" : ""
      }`}
      style={style}
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { type: "spring", stiffness: 160, damping: 14, delay },
        y: { duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay },
      }}
      whileHover={{ scale: 1.08, rotate: -2 }}
    >
      <Icon className="h-4 w-4 text-primary" />
      <span className="font-medium whitespace-nowrap">{text}</span>
    </motion.div>
  );
}
