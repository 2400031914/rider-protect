import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, CloudRain, Wind, WifiOff, Droplets, AlertTriangle,
  ArrowRight, CheckCircle2, Brain, TrendingUp, Zap, Users,
  IndianRupee, Clock, Bike
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { workerPersona } from "@/data/mockData";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const triggers = [
  { icon: CloudRain, label: "Heavy Rain", desc: "Auto-detects rainfall above threshold in your work zone" },
  { icon: Wind, label: "Severe AQI", desc: "Covers income loss when air quality makes delivery unsafe" },
  { icon: Droplets, label: "Flood / Waterlogging", desc: "Road waterlogging verified via satellite + crowd signals" },
  { icon: WifiOff, label: "Platform Outage", desc: "Swiggy/Zomato app downtime causing order halt" },
  { icon: AlertTriangle, label: "Movement Restrictions", desc: "Local bandh, curfew, or police-imposed restrictions" },
];

const howItWorks = [
  { step: "1", title: "Sign Up in 2 Minutes", desc: "Enter your work zone, platform, and income details" },
  { step: "2", title: "Get AI Risk Score", desc: "Our AI analyzes your zone's disruption history and weather patterns" },
  { step: "3", title: "Choose Weekly Plan", desc: "Pick from ₹29, ₹49, or ₹79/week — cancel anytime" },
  { step: "4", title: "Auto-Claim & Payout", desc: "When disruption hits, we auto-verify and pay via UPI in hours" },
];

const aiSections = [
  { icon: Brain, title: "Risk Scoring", desc: "Analyzes 15+ signals — weather forecast, historical disruption frequency, zone density, platform reliability — to compute a real-time zone risk score for each rider." },
  { icon: IndianRupee, title: "Premium Recommendation", desc: "Uses your work pattern, zone risk, and income level to recommend the most cost-effective plan. Premiums start at just ₹4.14/day." },
  { icon: Shield, title: "Fraud Scoring", desc: "Detects GPS spoofing, impossible travel speeds, coordinated claim clusters, and duplicate payout accounts using behavioral ML models." },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-hero px-4 py-20 text-primary-foreground md:py-28">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger} className="mx-auto max-w-3xl text-center">
            <motion.div variants={fade} className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium">
              <Shield className="h-4 w-4" /> Income Protection · Not Insurance
            </motion.div>
            <motion.h1 variants={fade} className="font-display text-4xl font-extrabold leading-tight md:text-6xl">
              SurakshaPay
            </motion.h1>
            <motion.p variants={fade} className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
              AI-powered <span className="font-semibold text-primary-foreground">weekly income protection</span> for food delivery partners.
              When rain, AQI, or outages stop your rides — we pay you.
            </motion.p>
            <motion.p variants={fade} className="mt-2 text-sm text-primary-foreground/60">
              Only covers loss of income from verified external disruptions. Not health, accident, or vehicle insurance.
            </motion.p>
            <motion.div variants={fade} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-elevated">
                <Link to="/onboarding">Get Protected <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/dashboard">View Demo Dashboard</Link>
              </Button>
            </motion.div>
            <motion.div variants={fade} className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Weekly plans from ₹29</span>
              <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" /> Auto-claim payouts</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Built for gig workers</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-3xl text-center">
            <motion.h2 variants={fade} className="font-display text-2xl font-bold md:text-3xl">The Problem</motion.h2>
            <motion.p variants={fade} className="mt-4 text-muted-foreground leading-relaxed">
              India's <span className="font-semibold text-foreground">7.5 million gig delivery workers</span> earn ₹15,000–25,000/month. A single week of heavy rain or platform downtime can wipe out 30-40% of monthly income. Platforms offer <span className="font-semibold text-foreground">zero income compensation</span> for external disruptions. Traditional insurance doesn't cover income loss from weather or app outages.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Worker Persona */}
      <section className="bg-accent/50 py-16 md:py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-2xl">
            <motion.h2 variants={fade} className="text-center font-display text-2xl font-bold md:text-3xl">Meet Ravi — A Real Story</motion.h2>
            <motion.div variants={fade} className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-primary">
                  <Bike className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold">{workerPersona.name}, {workerPersona.age}</h3>
                  <p className="text-sm text-muted-foreground">{workerPersona.platform} rider · {workerPersona.zone}</p>
                  <p className="text-sm text-muted-foreground">Earns {workerPersona.weeklyIncome}/week · {workerPersona.workSlots}</p>
                </div>
              </div>
              <div className="mt-5 rounded-lg bg-destructive/5 p-4">
                <p className="text-sm font-medium text-destructive">❌ The Problem</p>
                <p className="mt-1 text-sm text-foreground">{workerPersona.challenge}</p>
              </div>
              <div className="mt-3 rounded-lg bg-success/5 p-4">
                <p className="text-sm font-medium text-success">✅ With SurakshaPay</p>
                <p className="mt-1 text-sm text-foreground">Pays {workerPersona.plan} · {workerPersona.benefit}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Disruption Triggers */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fade} className="text-center font-display text-2xl font-bold md:text-3xl">What We Cover</motion.h2>
            <motion.p variants={fade} className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
              Only verified external disruptions that directly cause income loss. Not health, accident, or theft.
            </motion.p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {triggers.map((t) => (
                <motion.div key={t.label} variants={fade} className="rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <t.icon className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <h3 className="mt-3 font-display font-semibold">{t.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-accent/50 py-16 md:py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fade} className="text-center font-display text-2xl font-bold md:text-3xl">How It Works</motion.h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((s) => (
                <motion.div key={s.step} variants={fade} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary font-display text-lg font-bold text-primary-foreground">
                    {s.step}
                  </div>
                  <h3 className="mt-4 font-display font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How AI Works */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fade} className="text-center font-display text-2xl font-bold md:text-3xl">How Our AI Works</motion.h2>
            <motion.p variants={fade} className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
              Three AI engines power every decision — from pricing your plan to catching fraud in real time.
            </motion.p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {aiSections.map((a) => (
                <motion.div key={a.title} variants={fade} className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary">
                    <a.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-accent/50 py-16 md:py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-2xl">
            <motion.h2 variants={fade} className="text-center font-display text-2xl font-bold md:text-3xl">Why SurakshaPay</motion.h2>
            <div className="mt-8 space-y-3">
              {[
                "Weekly micro-plans from just ₹29 — no long lock-ins",
                "Parametric auto-claims — no paperwork, no waiting",
                "UPI payouts within hours of verified disruption",
                "AI-powered risk scoring for fair, personalized pricing",
                "Built specifically for India's food delivery gig workers",
                "Coverage only for income loss — transparent and honest",
              ].map((b) => (
                <motion.div key={b} variants={fade} className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-card">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm font-medium">{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-hero py-16 text-primary-foreground md:py-20">
        <div className="container text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fade} className="font-display text-2xl font-bold md:text-3xl">
              Protect Your Weekly Income Today
            </motion.h2>
            <motion.p variants={fade} className="mt-3 text-primary-foreground/70">
              Plans start at ₹29/week. Cancel anytime. No paperwork.
            </motion.p>
            <motion.div variants={fade} className="mt-6">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link to="/onboarding">Get Protected Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
