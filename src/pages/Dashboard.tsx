import { motion } from "framer-motion";
import {
  Shield, CloudRain, Wind, WifiOff, CheckCircle2, Clock, AlertTriangle,
  IndianRupee, TrendingUp, Bell, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { disruptions, claims } from "@/data/mockData";

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
};

export default function Dashboard() {
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
          <motion.div variants={fade}><StatCard title="Total Payouts" value="₹1,460" icon={TrendingUp} trend="+₹420 this week" trendUp /></motion.div>
          <motion.div variants={fade}><StatCard title="Claims Filed" value="4" icon={CheckCircle2} /></motion.div>
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

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          {/* Disruption Alerts */}
          <motion.div initial="hidden" animate="show" variants={stagger} className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-warning" />
                <h2 className="font-display font-semibold">Disruption Alerts</h2>
              </div>
              <div className="mt-4 space-y-3">
                {disruptions.map((d) => {
                  const Icon = triggerIcon[d.type] || AlertTriangle;
                  return (
                    <motion.div key={d.id} variants={fade} className="flex items-start gap-3 rounded-lg border border-border p-4">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${d.status === "active" ? "bg-warning/10" : "bg-muted"}`}>
                        <Icon className={`h-4 w-4 ${d.status === "active" ? "text-warning" : "text-muted-foreground"}`} />
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
              </div>
            </div>

            {/* Claims */}
            <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-card">
              <h2 className="font-display font-semibold">Claims & Payouts</h2>
              <div className="mt-4 overflow-x-auto">
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
                    {claims.map((c) => (
                      <tr key={c.id} className="border-b border-border last:border-0">
                        <td className="py-3 font-mono text-xs">{c.id}</td>
                        <td className="py-3 text-xs">{c.trigger}<br /><span className="text-muted-foreground">{c.date}</span></td>
                        <td className="py-3 font-semibold">₹{c.amount}</td>
                        <td className="py-3">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusColor[c.status] || "bg-muted text-muted-foreground"}`}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <div className="space-y-6 lg:col-span-2">
            {/* Payout History */}
            <motion.div initial="hidden" animate="show" variants={fade} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-display font-semibold">Payout History</h3>
              <div className="mt-4 space-y-3">
                {[
                  { week: "Week of 17 Mar", amount: 420, method: "UPI" },
                  { week: "Week of 10 Mar", amount: 280, method: "UPI" },
                  { week: "Week of 3 Mar", amount: 450, method: "Bank" },
                  { week: "Week of 24 Feb", amount: 310, method: "UPI" },
                ].map((p) => (
                  <div key={p.week} className="flex items-center justify-between rounded-lg bg-accent p-3">
                    <div>
                      <p className="text-sm font-medium">{p.week}</p>
                      <p className="text-xs text-muted-foreground">via {p.method}</p>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-success">
                      <ArrowUpRight className="h-3 w-3" /> ₹{p.amount}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Recommendation */}
            <motion.div initial="hidden" animate="show" variants={fade} className="rounded-xl border border-primary/20 bg-primary/5 p-5 shadow-card">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-display font-semibold text-primary">AI Recommendation</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed">
                <span className="font-semibold">High rain probability next week</span> in Kukatpally zone. We recommend continuing your <span className="font-semibold">Standard Plan</span> for uninterrupted coverage.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Based on IMD forecast + historical disruption patterns</p>
              <Button size="sm" className="mt-4 bg-gradient-primary text-primary-foreground hover:opacity-90">
                Renew Standard Plan · ₹49
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
