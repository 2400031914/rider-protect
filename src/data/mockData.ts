export const plans = [
  {
    id: "basic",
    name: "Basic Protection",
    price: 29,
    maxPayout: 500,
    features: [
      "Covers heavy rain disruptions",
      "Up to ₹500/week payout",
      "Auto-claim on verified triggers",
      "UPI instant payout",
    ],
    tag: null,
  },
  {
    id: "standard",
    name: "Standard Protection",
    price: 49,
    maxPayout: 900,
    features: [
      "Covers rain, AQI & platform outage",
      "Up to ₹900/week payout",
      "Priority auto-claim processing",
      "Smart zone-based alerts",
      "Weekly risk insights",
    ],
    tag: "Recommended",
  },
  {
    id: "high",
    name: "High Protection",
    price: 79,
    maxPayout: 1500,
    features: [
      "All disruption triggers covered",
      "Up to ₹1,500/week payout",
      "Fastest payout processing",
      "Personalized risk coaching",
      "Flood & waterlogging coverage",
      "Local movement restriction cover",
    ],
    tag: "Maximum Cover",
  },
];

export const disruptions = [
  {
    id: 1,
    type: "Heavy Rain",
    icon: "cloud-rain",
    zone: "Kukatpally, Hyderabad",
    severity: "High",
    timestamp: "Today, 2:30 PM",
    impact: "Estimated 3-hour disruption",
    status: "active",
  },
  {
    id: 2,
    type: "AQI Spike",
    icon: "wind",
    zone: "Madhapur, Hyderabad",
    severity: "Medium",
    timestamp: "Today, 11:15 AM",
    impact: "AQI crossed 350 — delivery slowdown expected",
    status: "active",
  },
  {
    id: 3,
    type: "Platform Outage",
    icon: "wifi-off",
    zone: "Pan-city (Zomato)",
    severity: "High",
    timestamp: "Yesterday, 7:45 PM",
    impact: "42 mins downtime — orders halted",
    status: "resolved",
  },
];

export const claims = [
  {
    id: "CLM-2024-0847",
    trigger: "Heavy Rain — Kukatpally",
    date: "18 Mar 2026",
    amount: 420,
    status: "Auto-Approved",
    paidVia: "UPI",
  },
  {
    id: "CLM-2024-0831",
    trigger: "Platform Outage — Zomato",
    date: "15 Mar 2026",
    amount: 310,
    status: "Under Review",
    paidVia: "—",
  },
  {
    id: "CLM-2024-0812",
    trigger: "AQI Spike — Madhapur",
    date: "11 Mar 2026",
    amount: 280,
    status: "Payout Processed",
    paidVia: "UPI",
  },
  {
    id: "CLM-2024-0798",
    trigger: "Heavy Rain — Gachibowli",
    date: "6 Mar 2026",
    amount: 450,
    status: "Payout Processed",
    paidVia: "Bank Transfer",
  },
];

export const adminKPIs = {
  activePolicies: 12847,
  triggeredClaims: 3219,
  autoApproved: 2891,
  fraudFlags: 23,
};

export const fraudSignals = [
  {
    id: 1,
    type: "Impossible Speed",
    description: "Rider ID #8834 reported 85 km/h sustained for 20 mins in congested zone",
    severity: "High",
    timestamp: "18 Mar, 3:12 PM",
    status: "Under Investigation",
  },
  {
    id: 2,
    type: "Repeated Location Jumps",
    description: "Rider ID #5521 GPS jumped 12 km in 2 minutes — 4 occurrences this week",
    severity: "Critical",
    timestamp: "17 Mar, 8:45 PM",
    status: "Flagged",
  },
  {
    id: 3,
    type: "Suspicious Cluster Behavior",
    description: "7 riders from same zone filed claims within 3-minute window — coordinated pattern suspected",
    severity: "High",
    timestamp: "16 Mar, 1:30 PM",
    status: "Under Investigation",
  },
  {
    id: 4,
    type: "Duplicate Payout Destination",
    description: "3 different rider accounts routing payouts to same UPI ID: rider***@paytm",
    severity: "Critical",
    timestamp: "15 Mar, 6:00 PM",
    status: "Blocked",
  },
];

export const highRiskZones = [
  { zone: "Kukatpally", city: "Hyderabad", riskScore: 82, triggers: 47 },
  { zone: "Andheri East", city: "Mumbai", riskScore: 78, triggers: 39 },
  { zone: "Whitefield", city: "Bengaluru", riskScore: 74, triggers: 35 },
  { zone: "Rajouri Garden", city: "Delhi", riskScore: 71, triggers: 31 },
  { zone: "Salt Lake", city: "Kolkata", riskScore: 68, triggers: 28 },
];

export const claimsByStatus = [
  { status: "Auto-Approved", count: 2891, percentage: 89.8 },
  { status: "Under Review", count: 198, percentage: 6.2 },
  { status: "Rejected", count: 87, percentage: 2.7 },
  { status: "Fraud-Flagged", count: 43, percentage: 1.3 },
];

export const triggersByType = [
  { type: "Heavy Rain", count: 1420, percentage: 44.1 },
  { type: "AQI Spike", count: 890, percentage: 27.6 },
  { type: "Platform Outage", count: 524, percentage: 16.3 },
  { type: "Flood/Waterlogging", count: 245, percentage: 7.6 },
  { type: "Movement Restrictions", count: 140, percentage: 4.4 },
];

export const workerPersona = {
  name: "Ravi Kumar",
  age: 26,
  platform: "Zomato",
  zone: "Kukatpally, Hyderabad",
  weeklyIncome: "₹4,200",
  workSlots: "Lunch & Dinner",
  challenge: "Lost ₹2,800 in 2 weeks due to heavy monsoon rains — no compensation from platform",
  plan: "Standard Protection (₹49/week)",
  benefit: "Received ₹900 auto-payout within 2 hours of rain disruption",
};
