import { motion } from "framer-motion";
import {
  Shield, Users, FileCheck, AlertOctagon, MapPin, Zap,
  ShieldAlert, Radar, Eye, Ban, Crosshair, Repeat
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  adminKPIs, fraudSignals, highRiskZones,
  claimsByStatus, triggersByType,
} from "@/data/mockData";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const severityStyle: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-warning/10 text-warning",
};

const fraudStatusStyle: Record<string, string> = {
  Flagged: "bg-destructive/10 text-destructive",
  "Under Investigation": "bg-warning/10 text-warning",
  Blocked: "bg-foreground/10 text-foreground",
};

const fraudIcons: Record<string, any> = {
  "Impossible Speed": Crosshair,
  "Repeated Location Jumps": Repeat,
  "Suspicious Cluster Behavior": Radar,
  "Duplicate Payout Destination": Ban,
};

export default function Admin() {
  return (
    <div className="min-h-screen py-10">
      <div className="container">
        <motion.div initial="hidden" animate="show" variants={fade}>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Operations Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Admin overview · Real-time monitoring</p>
        </motion.div>

        {/* KPIs */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={fade}><StatCard title="Active Policies" value={adminKPIs.activePolicies} icon={Users} trend="+847 this week" trendUp /></motion.div>
          <motion.div variants={fade}><StatCard title="Triggered Claims" value={adminKPIs.triggeredClaims} icon={FileCheck} /></motion.div>
          <motion.div variants={fade}><StatCard title="Auto-Approved" value={adminKPIs.autoApproved} icon={Shield} trend="89.8% approval rate" trendUp /></motion.div>
          <motion.div variants={fade}><StatCard title="Fraud Flags" value={adminKPIs.fraudFlags} icon={AlertOctagon} trend="+3 this week" trendUp={false} /></motion.div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* High Risk Zones */}
          <motion.div initial="hidden" animate="show" variants={fade} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-warning" />
              <h2 className="font-display font-semibold">High-Risk Zones</h2>
            </div>
            <div className="mt-4 space-y-2">
              {highRiskZones.map((z) => (
                <div key={z.zone} className="flex items-center justify-between rounded-lg bg-accent p-3">
                  <div>
                    <p className="text-sm font-medium">{z.zone}, {z.city}</p>
                    <p className="text-xs text-muted-foreground">{z.triggers} triggers this month</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{z.riskScore}</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Triggers by Type */}
          <motion.div initial="hidden" animate="show" variants={fade} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-secondary" />
              <h2 className="font-display font-semibold">Trigger Events by Type</h2>
            </div>
            <div className="mt-4 space-y-3">
              {triggersByType.map((t) => (
                <div key={t.type}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{t.type}</span>
                    <span className="text-muted-foreground">{t.count} ({t.percentage}%)</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-gradient-primary" style={{ width: `${t.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Claims by Status */}
          <motion.div initial="hidden" animate="show" variants={fade} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              <h2 className="font-display font-semibold">Claims by Status</h2>
            </div>
            <div className="mt-4 space-y-3">
              {claimsByStatus.map((c) => (
                <div key={c.status} className="flex items-center justify-between rounded-lg bg-accent p-3">
                  <span className="text-sm font-medium">{c.status}</span>
                  <div className="text-right">
                    <span className="font-semibold">{c.count.toLocaleString("en-IN")}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({c.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Adversarial Defense */}
          <motion.div initial="hidden" animate="show" variants={fade} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-destructive" />
              <h2 className="font-display font-semibold">Adversarial Defense & Anti-Spoofing</h2>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">ML-powered behavioral analysis detects GPS spoofing, coordinated fraud, and identity manipulation in real time.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "GPS Spoof Detection", value: "Active", icon: Crosshair },
                { label: "Cluster Analysis", value: "Active", icon: Radar },
                { label: "Identity Verification", value: "Active", icon: Eye },
                { label: "Payout Dedup", value: "Active", icon: Ban },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-2 rounded-lg bg-success/5 p-3">
                  <d.icon className="h-4 w-4 text-success" />
                  <div>
                    <p className="text-xs font-medium">{d.label}</p>
                    <p className="text-[10px] text-success font-semibold">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Fraud Alert Queue */}
        <motion.div initial="hidden" animate="show" variants={fade} className="mt-6 rounded-xl border border-destructive/20 bg-card p-5 shadow-card">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-destructive" />
            <h2 className="font-display font-semibold">Fraud Alert Queue</h2>
            <span className="ml-auto rounded-full bg-destructive/10 px-3 py-0.5 text-xs font-semibold text-destructive">{fraudSignals.length} Active</span>
          </div>
          <div className="mt-4 space-y-3">
            {fraudSignals.map((f) => {
              const Icon = fraudIcons[f.type] || AlertOctagon;
              return (
                <div key={f.id} className="rounded-lg border border-border p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Icon className="h-4 w-4 text-destructive" />
                    <span className="font-medium text-sm">{f.type}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${severityStyle[f.severity] || ""}`}>{f.severity}</span>
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${fraudStatusStyle[f.status] || ""}`}>{f.status}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{f.description}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{f.timestamp}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
