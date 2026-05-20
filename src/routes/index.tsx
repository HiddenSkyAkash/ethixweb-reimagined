import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Sparkles, Code2, Bot, Megaphone, Search, Palette,
  Zap, Star, Globe, ShieldCheck, Rocket, Layers,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import ethan from "@/assets/ethan.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ethixweb — Premium Web, AI & Growth Agency" },
      { name: "description", content: "We build futuristic websites, AI automations and growth engines for ambitious brands. Meet Ethan, your guide to digital excellence." },
      { property: "og:title", content: "Ethixweb — Premium Web, AI & Growth Agency" },
      { property: "og:description", content: "Futuristic websites, AI automation and growth systems." },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Code2, title: "Web Development", desc: "High-performance sites & web apps engineered to convert.", to: "/web-development" },
  { icon: Bot, title: "AI & Automation", desc: "Custom agents and workflows that run your business 24/7.", to: "/ai-automation" },
  { icon: Megaphone, title: "Marketing", desc: "Paid, organic and lifecycle systems that compound growth.", to: "/marketing" },
  { icon: Search, title: "SEO", desc: "Technical, content & authority — engineered for rankings.", to: "/services" },
  { icon: Palette, title: "Branding", desc: "Identity systems that feel iconic across every surface.", to: "/services" },
  { icon: Zap, title: "Product Design", desc: "Interfaces users love. Flows that drive retention.", to: "/services" },
];

const stats = [
  { value: "120+", label: "Projects shipped" },
  { value: "40+", label: "Active clients" },
  { value: "9", label: "Industries served" },
  { value: "4.9", label: "Avg. client rating" },
];

const industries = ["SaaS", "FinTech", "Healthcare", "E-commerce", "Real Estate", "HVAC", "Fishing", "Hospitality", "Education"];

const techStack = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Python", "OpenAI", "Supabase", "Stripe", "Vercel", "AWS", "Figma"];

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Marquee />
      <Stats />
      <Services />
      <EthanFeature />
      <TechStack />
      <Industries />
      <Testimonials />
      <CTA />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden -mt-24 pt-32 pb-24 bg-gradient-hero">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/30 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Now booking Q3 — only 4 slots left
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] text-gradient">
              Premium digital agency<br />for <span className="text-gradient-brand">ambitious brands.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              We engineer futuristic websites, AI automations and growth systems —
              built to make modern startups look unstoppable.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 font-medium shadow-glow hover:scale-[1.03] transition-transform">
                Book a strategy call <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium hover:bg-white/10 transition">
                See our work
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gradient-brand" />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-primary">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-xs">Loved by 40+ startups globally</p>
              </div>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-glow blur-3xl" />
          <motion.img
            src={ethan}
            alt="Ethan mascot waving"
            className="relative z-10 mx-auto max-h-[600px] w-auto drop-shadow-[0_30px_60px_rgba(220,38,38,0.35)]"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <FloatingBadge className="top-10 left-0" icon={Sparkles} text="AI-powered" />
          <FloatingBadge className="bottom-24 right-0" icon={Rocket} text="Launch in 21 days" />
          <FloatingBadge className="top-1/2 -right-4" icon={ShieldCheck} text="Trusted" />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingBadge({ className, icon: Icon, text }: { className?: string; icon: any; text: string }) {
  return (
    <motion.div
      className={`absolute z-20 glass-strong rounded-2xl px-4 py-2.5 flex items-center gap-2 text-sm shadow-elegant ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() }}
    >
      <Icon className="h-4 w-4 text-primary" />
      <span className="font-medium">{text}</span>
    </motion.div>
  );
}

function Marquee() {
  const items = ["INNOVATE", "AUTOMATE", "ACCELERATE", "DESIGN", "ENGINEER", "LAUNCH", "SCALE"];
  return (
    <div className="border-y border-white/5 py-6 overflow-hidden">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((w, i) => (
          <span key={i} className="font-display text-2xl tracking-[0.3em] text-muted-foreground/40 flex items-center gap-12">
            {w} <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="glass rounded-2xl p-8 hover:bg-white/[0.06] transition group">
              <div className="font-display text-5xl font-bold text-gradient-brand">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-widest text-primary mb-4">What we do</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient">
              A full-stack agency for the modern internet.
            </h2>
          </div>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <Link to={s.to} className="group relative block h-full overflow-hidden rounded-3xl glass p-8 hover:bg-white/[0.06] transition">
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/30 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                <s.icon className="h-10 w-10 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm text-primary">
                  Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EthanFeature() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl glass-strong rounded-[2.5rem] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="relative grid lg:grid-cols-2 gap-8 p-10 lg:p-16 items-center">
          <div>
            <Reveal>
              <p className="text-sm uppercase tracking-widest text-primary mb-4">Meet Ethan</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient leading-tight">
                Your AI-powered guide to growth.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
                Ethan is the spirit behind Ethixweb — fast, curious, and always shipping.
                Together with our team, he helps your brand scale with intelligence.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  { icon: Layers, t: "Modular systems" },
                  { icon: Globe, t: "Global delivery" },
                  { icon: ShieldCheck, t: "Enterprise security" },
                  { icon: Zap, t: "Lightning fast" },
                ].map(({ icon: I, t }) => (
                  <div key={t} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                    <I className="h-5 w-5 text-primary" />
                    <span className="text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-glow blur-2xl" />
            <motion.img
              src={ethan}
              alt="Ethan"
              className="relative z-10 mx-auto max-h-[500px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-primary mb-4">Tech stack</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient">Engineered with the best.</h2>
          </div>
        </Reveal>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {techStack.map((t, i) => (
            <Reveal key={t} delay={i * 0.03}>
              <div className="glass rounded-full px-5 py-2.5 text-sm hover:bg-primary/20 hover:border-primary/40 transition">{t}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-widest text-primary mb-4">Industries</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient">Trusted across verticals.</h2>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {industries.map((ind, i) => (
            <Reveal key={ind} delay={i * 0.04}>
              <div className="group glass rounded-2xl p-6 flex items-center justify-between hover:bg-white/[0.06] transition">
                <span className="font-display text-lg">{ind}</span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "Ethixweb redefined how our brand shows up online. The team is sharp, fast, and obsessed with detail.", a: "Sarah K.", r: "Founder, NovaPay" },
    { q: "Our automations handle 70% of support now. ROI in under 60 days. Couldn't recommend them more.", a: "Marcus L.", r: "CEO, ShipForge" },
    { q: "From branding to a live site in 3 weeks. Pixel-perfect on every device. Just exceptional.", a: "Aisha R.", r: "Director, Lumen Studio" },
  ];
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-widest text-primary mb-4">Testimonials</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gradient">Loved by founders worldwide.</h2>
          </div>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <Reveal key={t.a} delay={i * 0.08}>
              <div className="glass rounded-3xl p-8 h-full flex flex-col">
                <div className="flex gap-0.5 text-primary mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-foreground/90 leading-relaxed flex-1">"{t.q}"</p>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="font-medium">{t.a}</p>
                  <p className="text-sm text-muted-foreground">{t.r}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand shadow-glow p-12 lg:p-20 text-center">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <Reveal>
            <h2 className="relative font-display text-4xl lg:text-6xl font-bold leading-tight">
              Ready to build the future<br />of your brand?
            </h2>
            <p className="relative mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto">
              Tell us where you want to go. We'll architect the path and ship the system.
            </p>
            <div className="relative mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 font-medium text-foreground hover:scale-[1.03] transition-transform">
                Start a project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium hover:bg-white/20">
                Explore services
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
