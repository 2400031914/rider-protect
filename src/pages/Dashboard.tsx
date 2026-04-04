import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, CloudRain, Wind, WifiOff, CheckCircle2, Clock, AlertTriangle,
  IndianRupee, TrendingUp, Bell, ArrowUpRight, Zap, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const triggerIcon: Record<string, any> = {
  "Heavy Rain": CloudRain,
  "AQI Spike": Wind,
  "Platform Outage": WifiOff,
};

const statusColor: Record<string, string> = {
  "Auto-Approved": "text-success bg-success/10",
  "Under Review": "text-warning bg-warning/10",
  "Payout Processed": "text-primary bg-primary/10",
  "Created": "text-muted-foreground bg-muted",
  "Paid": "text-success bg-success/10",
};

interface Alert {
  id: number;
  type: string;
  zone: string;
  severity: string;
  timestamp: string;
  impact: string;
  status: string;
}

interface Claim {
  id: string;
  trigger: string;
  date: string;
  amount: number;
  status: string;
  paidVia: string;
}

const zones = ["Kukatpally, Hyderabad", "Madhapur, Hyderabad", "Gachibowli, Hyderabad", "Andheri East, Mumbai", "Whitefield, Bengaluru"];

const triggerConfigs: Record<string, { severity: string; impact: string; payout: () => number }> = {
  "Heavy Rain": { severity: "High", impact: "Estimated 3-hour delivery disruption", payout: () => 350 + Math.floor(Math.random() * 150) },
  "AQI Spike": { severity: "Medium", impact: "AQI crossed 350 — delivery slowdown expected", payout: () => 200 + Math.floor(Math.random() * 120) },
  "Platform Outage": { severity: "High", impact: `${30 + Math.floor(Math.random() * 30)} mins downtime — orders halted`, payout: () => 250 + Math.floor(Math.random() * 100) },
};

let claimCounter = 900;

function now() {
  const d = new Date();
  return `Today, ${d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })}`;
}

function todayStr() {
  return new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function Dashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [simulating, setSimulating] = useState<string | null>(null);

  const totalPayouts = claims.filter(c => c.status === "Paid" || c.status === "Auto-Approved" || c.status === "Payout Processed").reduce((s, c) => s + c.amount, 0);

  const simulateTrigger = useCallback((type: string) => {
    if (simulating) return;
    setSimulating(type);
    const cfg = triggerConfigs[type];
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const alertId = Date.now();
    const payoutAmt = cfg.payout();
    claimCounter++;
    const claimId = `CLM-2026-${String(claimCounter).padStart(4, "0")}`;

    // Step 1: Add alert
    const newAlert: Alert = { id: alertId, type, zone, severity: cfg.severity, timestamp: now(), impact: cfg.impact, status: "active" };
    setAlerts(prev => [newAlert, ...prev]);

    // Step 2: Create claim after 1s
    setTimeout(() => {
      const newClaim: Claim = { id: claimId, trigger: `${type} — ${zone.split(",")[0]}`, date: todayStr(), amount: payoutAmt, status: "Created", paidVia: "—" };
      setClaims(prev => [newClaim, ...prev]);

      // Step 3: Auto-approve after 2s
      setTimeout(() => {
        setClaims(prev => prev.map(c => c.id === claimId ? { ...c, status: "Auto-Approved" } : c));

        // Step 4: Mark paid after 2s
        setTimeout(() => {
          setClaims(prev => prev.map(c => c.id === claimId ? { ...c, status: "Paid", paidVia: "UPI" } : c));
          setSimulating(null);
        }, 2000);
      }, 2000);
    }, 1000);
  }, [simulating]);

  const recentTriggerCount = alerts.filter(a => a.type === "Heavy Rain").length;
  const riskLevel = alerts.length >= 3 ? "High" : alerts.length >= 1 ? "Medium" : "Low";

  return (
    <div className="min-h-screen py-10">
      <div className="container">
        <motion.div initial="hidden" animate="show" variants={fade}>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Worker Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Ravi Kumar · Zomato · Kukatpally, Hyderabad</p>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={stagger} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={fade}><StatCard title="Active Plan" value="Standard" icon={Shield} /></motion.div>
          <motion.div variants={fade}><StatCard title="Weekly Premium" value="₹49" icon={IndianRupee} /></motion.div>
          <motion.div variants={fade}><StatCard title="Total Payouts" value={`₹${totalPayouts.toLocaleString("en-IN")}`} icon={TrendingUp} trend={claims.length > 0 ? `${claims.length} claim(s) this session` : undefined} trendUp /></motion.div>
          <motion.div variants={fade}><StatCard title="Claims Filed" value={claims.length} icon={CheckCircle2} /></motion.div>
        </motion.div>

        {/* Active Protection */}
        <motion.div initial="hidden" animate="show" variants={fade} className="mt-8">
          <div className="rounded-xl border-2 border-success/30 bg-success/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success">
                <Shield className="h-5 w-5 text-success-foreground" />
              </div>
              <div>
                <p className="font-display font-semibold text-success">Protected This Week</p>
                <p className="text-sm text-muted-foreground">Coverage active until Sunday, 23 Mar 2026 · Auto-renews weekly</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Simulate Triggers */}
        <motion.div initial="hidden" animate="show" variants={fade} className="mt-8">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-warning" />
              <h2 className="font-display font-semibold">Simulate Disruption Trigger</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Click a button to simulate a real-world disruption. A claim will be auto-created and processed.</p>
            <div className="flex flex-wrap gap-3">
              {(["Heavy Rain", "AQI Spike", "Platform Outage"] as const).map(type => {
                const Icon = triggerIcon[type];
                const isActive = simulating === type;
                return (
                  <Button
                    key={type}
                    variant="outline"
                    onClick={() => simulateTrigger(type)}
                    disabled={!!simulating}
                    className="gap-2"
                  >
                    {isActive ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
                    Simulate {type}
                  </Button>
                );
              })}
            </div>
            {simulating && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-warning font-medium flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" /> Processing: {simulating} → Claim auto-creation → Approval → Payout…
              </motion.p>
            )}
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          {/* Disruption Alerts */}
          <motion.div initial="hidden" animate="show" variants={stagger} className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-warning" />
                <h2 className="font-display font-semibold">Disruption Alerts</h2>
                {alerts.length > 0 && <span className="ml-auto rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-semibold text-warning">{alerts.length} active</span>}
              </div>
              <div className="mt-4 space-y-3">
                {alerts.length === 0 && (
                  <p className="text-sm text-muted-foreground py-6 text-center">No disruptions detected. Use the simulate buttons above to trigger alerts.</p>
                )}
                <AnimatePresence>
                  {alerts.map((d) => {
                    const Icon = triggerIcon[d.type] || AlertTriangle;
                    return (
                      <motion.div
                        key={d.id}
                        initial={{ opacity: 0, y: -10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-3 rounded-lg border border-border p-4"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10">
                          <Icon className="h-4 w-4 text-warning" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{d.type}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${d.severity === "High" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`}>{d.severity}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{d.zone} · {d.timestamp}</p>
                          <p className="mt-1 text-xs text-foreground">{d.impact}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Claims */}
            <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-card">
              <h2 className="font-display font-semibold">Claims & Payouts</h2>
              <div className="mt-4 overflow-x-auto">
                {claims.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center">No claims yet. Simulate a disruption to auto-generate a claim.</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs text-muted-foreground">
                        <th className="pb-2 font-medium">Claim ID</th>
                        <th className="pb-2 font-medium">Trigger</th>
                        <th className="pb-2 font-medium">Amount</th>
                        <th className="pb-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {claims.map((c) => (
                          <motion.tr
                            key={c.id}
                            initial={{ opacity: 0, backgroundColor: "hsl(var(--warning) / 0.1)" }}
                            animate={{ opacity: 1, backgroundColor: "transparent" }}
                            transition={{ duration: 0.6 }}
                            className="border-b border-border last:border-0"
                          >
                            <td className="py-3 font-mono text-xs">{c.id}</td>
                            <td className="py-3 text-xs">{c.trigger}<br /><span className="text-muted-foreground">{c.date}</span></td>
                            <td className="py-3 font-semibold">₹{c.amount}</td>
                            <td className="py-3">
                              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusColor[c.status] || "bg-muted text-muted-foreground"}`}>
                                {c.status === "Created" && <Loader2 className="h-3 w-3 animate-spin" />}
                                {c.status === "Auto-Approved" && <Clock className="h-3 w-3" />}
                                {c.status === "Paid" && <CheckCircle2 className="h-3 w-3" />}
                                {c.status}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <div className="space-y-6 lg:col-span-2">
            {/* Payout History */}
            <motion.div initial="hidden" animate="show" variants={fade} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-display font-semibold">Payout History</h3>
              <div className="mt-4 space-y-3">
                {claims.filter(c => c.status === "Paid").length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Payouts will appear here after claims are processed.</p>
                ) : (
                  claims.filter(c => c.status === "Paid").map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between rounded-lg bg-accent p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{p.trigger}</p>
                        <p className="text-xs text-muted-foreground">via {p.paidVia} · {p.date}</p>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-success">
                        <ArrowUpRight className="h-3 w-3" /> ₹{p.amount}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Risk-Based Recommendation */}
            <motion.div initial="hidden" animate="show" variants={fade} className="rounded-xl border border-primary/20 bg-primary/5 p-5 shadow-card">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-display font-semibold text-primary">Risk-Based Recommendation</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed">
                {alerts.length === 0 ? (
                  <>Your zone currently shows <span className="font-semibold">low disruption activity</span>. Continue your <span className="font-semibold">Standard Plan</span> for uninterrupted coverage.</>
                ) : (
                  <>
                    <span className="font-semibold">{alerts.length} disruption(s)</span> detected this session. Zone risk is <span className="font-semibold">{riskLevel}</span>.
                    {recentTriggerCount >= 2
                      ? <> Consider upgrading to <span className="font-semibold">High Protection</span> for maximum coverage.</>
                      : <> We recommend continuing your <span className="font-semibold">Standard Plan</span>.</>
                    }
                  </>
                )}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Based on recent triggers + zone risk analysis</p>
              <Button size="sm" className="mt-4 bg-gradient-primary text-primary-foreground hover:opacity-90">
                {recentTriggerCount >= 2 ? "Upgrade to High Plan · ₹79" : "Renew Standard Plan · ₹49"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
