import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Calculator, MapPin, CloudRain, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { plans } from "@/data/mockData";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

function calcPremium(base: number, zoneRisk: string, rainProb: number, aqi: number) {
  let premium = base;
  const zoneAdd = zoneRisk === "high" ? 20 : zoneRisk === "medium" ? 10 : 0;
  const rainAdd = rainProb > 70 ? 15 : rainProb > 40 ? 7 : 0;
  const aqiAdd = aqi > 200 ? 10 : aqi > 150 ? 5 : 0;
  premium += zoneAdd + rainAdd + aqiAdd;
  return { premium, zoneAdd, rainAdd, aqiAdd };
}

const basePrices: Record<string, number> = { basic: 29, standard: 49, high: 79 };

export default function Plans() {
  const navigate = useNavigate();
  const [recommended] = useState("standard");
  const [zoneRisk, setZoneRisk] = useState("medium");
  const [rainProb, setRainProb] = useState([55]);
  const [aqi, setAqi] = useState([180]);

  const dynamicPremiums = useMemo(() => {
    const result: Record<string, ReturnType<typeof calcPremium>> = {};
    for (const plan of plans) {
      result[plan.id] = calcPremium(basePrices[plan.id], zoneRisk, rainProb[0], aqi[0]);
    }
    return result;
  }, [zoneRisk, rainProb, aqi]);

  const stdCalc = dynamicPremiums["standard"];

  const handleActivate = (planId: string) => {
    const dp = dynamicPremiums[planId];
    const policy = {
      planId,
      planName: plans.find(p => p.id === planId)?.name || planId,
      premium: dp.premium,
      maxPayout: plans.find(p => p.id === planId)?.maxPayout || 0,
      activatedAt: new Date().toISOString(),
      status: "active",
      zoneRisk,
      rainProb: rainProb[0],
      aqi: aqi[0],
    };
    localStorage.setItem("suraksha_policy", JSON.stringify(policy));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container">
        <motion.div initial="hidden" animate="show" variants={fade} className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-2xl font-bold md:text-3xl">Choose Your Weekly Plan</h1>
          <p className="mt-2 text-muted-foreground">
            Pay weekly, cancel anytime. Coverage is <span className="font-semibold text-foreground">only for income loss</span> from verified external disruptions.
          </p>
        </motion.div>

        {/* Dynamic Risk Inputs */}
        <motion.div initial="hidden" animate="show" variants={fade} className="mx-auto mt-8 max-w-2xl">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display font-semibold flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" /> Dynamic Premium Inputs
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">Adjust these to see how your premium changes in real-time</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5 text-xs"><MapPin className="h-3.5 w-3.5" /> Zone Risk Level</Label>
                <Select value={zoneRisk} onValueChange={setZoneRisk}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5"><CloudRain className="h-3.5 w-3.5" /> Rain Probability</span>
                  <span className="font-semibold text-foreground">{rainProb[0]}%</span>
                </Label>
                <Slider value={rainProb} onValueChange={setRainProb} min={0} max={100} step={5} className="mt-3" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5"><Wind className="h-3.5 w-3.5" /> AQI Level</span>
                  <span className="font-semibold text-foreground">{aqi[0]}</span>
                </Label>
                <Slider value={aqi} onValueChange={setAqi} min={50} max={400} step={10} className="mt-3" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={stagger} className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isRec = plan.id === recommended;
            const dp = dynamicPremiums[plan.id];
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
                    <span className="font-display text-4xl font-extrabold text-foreground">₹{dp.premium}</span>
                    <span className="text-sm text-muted-foreground">/week</span>
                  </div>
                  {dp.premium !== basePrices[plan.id] && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Base ₹{basePrices[plan.id]} + ₹{dp.premium - basePrices[plan.id]} risk adjustment
                    </p>
                  )}
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
                  onClick={() => handleActivate(plan.id)}
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
            <p className="mt-2 text-xs text-muted-foreground">Standard Plan — live calculation based on your inputs</p>
            <div className="mt-4 space-y-2">
              {[
                { label: "Base Premium", value: `₹${basePrices.standard}.00` },
                { label: `Zone Risk (${zoneRisk.charAt(0).toUpperCase() + zoneRisk.slice(1)})`, value: stdCalc.zoneAdd > 0 ? `+₹${stdCalc.zoneAdd}.00` : "₹0.00" },
                { label: `Rain Factor (${rainProb[0]}%)`, value: stdCalc.rainAdd > 0 ? `+₹${stdCalc.rainAdd}.00` : "₹0.00" },
                { label: `AQI Factor (${aqi[0]})`, value: stdCalc.aqiAdd > 0 ? `+₹${stdCalc.aqiAdd}.00` : "₹0.00" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between rounded-lg bg-accent px-4 py-2.5 text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-semibold">{r.value}</span>
                </div>
              ))}
              <motion.div
                key={stdCalc.premium}
                initial={{ scale: 1.03 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-between rounded-lg bg-primary/5 px-4 py-3 text-sm font-bold"
              >
                <span>Final Weekly Premium</span>
                <span className="text-primary">₹{stdCalc.premium}.00</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
