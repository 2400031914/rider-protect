import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Brain, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Onboarding() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", mobile: "", platform: "", zone: "", slots: "", income: "", payout: "",
  });
  const [showRisk, setShowRisk] = useState(false);

  const filled = Object.values(form).every((v) => v.length > 0);

  const handleChange = (key: string, val: string) => {
    const next = { ...form, [key]: val };
    setForm(next);
    if (Object.values(next).every((v) => v.length > 0)) {
      setTimeout(() => setShowRisk(true), 300);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <motion.div initial="hidden" animate="show" variants={fade}>
            <h1 className="font-display text-2xl font-bold md:text-3xl">Get Protected</h1>
            <p className="mt-1 text-muted-foreground">Tell us about your delivery work — takes 2 minutes</p>
          </motion.div>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            {/* Form */}
            <motion.div initial="hidden" animate="show" variants={fade} className="lg:col-span-3">
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Ravi Kumar" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input id="mobile" placeholder="+91 98765 43210" value={form.mobile} onChange={(e) => handleChange("mobile", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Delivery Platform</Label>
                    <Select value={form.platform} onValueChange={(v) => handleChange("platform", v)}>
                      <SelectTrigger><SelectValue placeholder="Select platform" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="swiggy">Swiggy</SelectItem>
                        <SelectItem value="zomato">Zomato</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="zone">Primary Work Zone</Label>
                    <Input id="zone" placeholder="Kukatpally, Hyderabad" value={form.zone} onChange={(e) => handleChange("zone", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Typical Work Slots</Label>
                    <Select value={form.slots} onValueChange={(v) => handleChange("slots", v)}>
                      <SelectTrigger><SelectValue placeholder="Select slots" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lunch">Lunch (11 AM – 3 PM)</SelectItem>
                        <SelectItem value="dinner">Dinner (6 PM – 11 PM)</SelectItem>
                        <SelectItem value="both">Both Slots</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="income">Avg. Weekly Income (₹)</Label>
                    <Input id="income" type="number" placeholder="4200" value={form.income} onChange={(e) => handleChange("income", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label>Preferred Payout Method</Label>
                    <Select value={form.payout} onValueChange={(v) => handleChange("payout", v)}>
                      <SelectTrigger><SelectValue placeholder="Select payout method" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">UPI (Instant)</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  className="mt-6 w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
                  size="lg"
                  disabled={!filled}
                  onClick={() => navigate("/plans")}
                >
                  View Recommended Plans <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Risk Preview Sidebar */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={showRisk ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <h3 className="font-display font-semibold">AI Risk Preview</h3>
                </div>

                {showRisk ? (
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between rounded-lg bg-accent p-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <MapPin className="h-4 w-4 text-warning" /> Zone Risk
                      </div>
                      <span className="rounded-full bg-warning/10 px-3 py-0.5 text-xs font-semibold text-warning">Medium</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-accent p-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <TrendingUp className="h-4 w-4 text-secondary" /> Weekly Risk Score
                      </div>
                      <span className="text-lg font-bold text-foreground">68<span className="text-sm text-muted-foreground">/100</span></span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-accent p-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Shield className="h-4 w-4 text-primary" /> Suggested Plan
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">Standard</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Based on historical disruption data for your zone, weather patterns, and platform reliability. Score updates weekly.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 space-y-3">
                    <div className="h-10 animate-pulse rounded-lg bg-muted" />
                    <div className="h-10 animate-pulse rounded-lg bg-muted" />
                    <div className="h-10 animate-pulse rounded-lg bg-muted" />
                    <p className="text-xs text-muted-foreground">Complete the form to generate your AI risk preview</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
