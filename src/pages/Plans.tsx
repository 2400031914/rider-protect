import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "@/data/mockData";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function Plans() {
  const navigate = useNavigate();
  const recommended = "standard";

  return (
    <div className="min-h-screen py-10">
      <div className="container">
        <motion.div initial="hidden" animate="show" variants={fade} className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-2xl font-bold md:text-3xl">Choose Your Weekly Plan</h1>
          <p className="mt-2 text-muted-foreground">
            Pay weekly, cancel anytime. Coverage is <span className="font-semibold text-foreground">only for income loss</span> from verified external disruptions.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={stagger} className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isRec = plan.id === recommended;
            return (
              <motion.div
                key={plan.id}
                variants={fade}
                className={`relative rounded-xl border-2 bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover ${
                  isRec ? "border-primary" : "border-border"
                }`}
              >
                {plan.tag && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold ${
                    isRec ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {plan.tag}
                  </div>
                )}
                <div className="mt-2 text-center">
                  <h3 className="font-display text-lg font-bold">{plan.name}</h3>
                  <div className="mt-3">
                    <span className="font-display text-4xl font-extrabold text-foreground">₹{plan.price}</span>
                    <span className="text-sm text-muted-foreground">/week</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Payout up to <span className="font-semibold text-foreground">₹{plan.maxPayout.toLocaleString("en-IN")}</span>/week</p>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`mt-6 w-full ${isRec ? "bg-gradient-primary text-primary-foreground hover:opacity-90" : ""}`}
                  variant={isRec ? "default" : "outline"}
                  onClick={() => navigate("/dashboard")}
                >
                  {isRec ? "Activate Protection" : "Select Plan"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Premium Logic */}
        <motion.div initial="hidden" animate="show" variants={fade} className="mx-auto mt-12 max-w-lg">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold">How Your Premium is Calculated</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Example: Standard Plan for Kukatpally zone</p>
            <div className="mt-4 space-y-2">
              {[
                { label: "Base Premium", value: "₹35.00" },
                { label: "Zone Risk Factor (Medium)", value: "×1.15" },
                { label: "Coverage Tier Factor (Standard)", value: "×1.10" },
                { label: "Safe Zone Discount", value: "−₹5.00" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between rounded-lg bg-accent px-4 py-2.5 text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-semibold">{r.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg bg-primary/5 px-4 py-3 text-sm font-bold">
                <span>Final Weekly Premium</span>
                <span className="text-primary">₹49.00</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
