# SurakshaPay
### AI-Powered Parametric Income Protection for Delivery Partners

## Problem Statement

India’s delivery partners earn week to week, not salary to salary. A few hours of heavy rain, severe pollution, flood-like waterlogging, platform outage, or local movement restriction can immediately reduce delivery volume and working hours. That means direct loss of income.

Most existing insurance products do not solve this problem. They usually focus on health, life, accidents, or vehicle repairs. Our project focuses strictly on **loss of income due to external disruptions**, which is the exact gap this challenge highlights.

SurakshaPay is designed as a **weekly-priced parametric protection platform** for food delivery workers. Instead of waiting for manual claim proof, the system monitors external disruption signals and triggers claim workflows when predefined conditions are met.

---

## Why This User / Persona

Our user is not “a gig worker” in general. That is too broad to design well.

We focus on a narrow, high-relevance persona:

- Food delivery rider in an urban area such as Hyderabad
- Works mainly in lunch and dinner peak slots
- Depends on predictable weekly cash flow
- Usually operates in a small set of familiar delivery zones
- Highly affected by weather, AQI spikes, app outages, and mobility restrictions
- Cannot afford slow claims or complex paperwork

### Sample Persona

**Name:** Ravi Kumar  
**Platform:** Zomato  
**Work Zone:** Kukatpally, Hyderabad  
**Work Pattern:** Lunch + Dinner peak hours, 6 days a week  
**Weekly Income Band:** ₹4,500 – ₹7,000  
**Biggest Risk:** Sudden external disruptions causing loss of active work hours and reduced order completion

This persona matters because our whole system is built around:
- weekly pricing
- peak-hour disruption risk
- fast payout logic
- zone-based trigger evaluation

---

## What SurakshaPay Does

SurakshaPay is a parametric income protection platform for delivery workers.

It offers:
- **Weekly protection plans**
- **AI-based risk scoring**
- **Dynamic weekly premium recommendation**
- **Disruption-triggered claims workflow**
- **Payout simulation**
- **Fraud-aware decisioning**
- **Worker and admin dashboards**

The system monitors measurable external disruptions such as:
- heavy rainfall
- severe AQI
- flood / waterlogging alerts
- platform outage
- local movement restrictions

If a disruption event matches policy conditions in the rider’s registered zone and time window, the system initiates a claim workflow automatically.

---

## Why Parametric Insurance Fits This Problem

Traditional insurance claims are slow because they rely on manual proof collection, document verification, and long approval cycles.

That model is a bad fit for delivery workers who need fast financial support for short-term disruption.

Parametric insurance is better here because:
- the disruption can be measured objectively
- trigger conditions can be defined in advance
- claims can be initiated automatically
- payouts can happen faster than manual claim systems

### Example

If heavy rain crosses a threshold in Kukatpally during Ravi’s dinner work window for more than the allowed duration, and his policy is active, the system marks the event as potentially eligible for payout. It then checks user validity and fraud signals before initiating payout.

---

## Coverage Scope

SurakshaPay covers only:

- **Loss of income caused by external disruptions**

It does **not** cover:
- health insurance
- life insurance
- accident treatment
- hospitalization
- vehicle repairs

This is intentional and fully aligned with the challenge rules.

---

## Weekly Pricing Model

Gig workers operate week to week, so our model is designed on a **weekly pricing basis**.

### Sample Weekly Plans

| Plan | Weekly Premium | Max Payout |
|------|----------------|------------|
| Basic | ₹29 | ₹500 |
| Standard | ₹49 | ₹900 |
| High | ₹79 | ₹1500 |

### Premium Logic

The weekly premium is based on:
- base plan amount
- zone-level disruption risk
- expected payout exposure
- selected coverage tier
- weekly income band

### Example Formula

`Weekly Premium = Base Premium + Zone Risk Factor + Coverage Tier Factor - Safe Zone Discount`

This makes the model simple, explainable, and suitable for a hackathon prototype.

---

## User Journey

### 1. Onboarding
The rider provides:
- name
- mobile number
- delivery platform
- primary work zone
- typical work slots
- weekly income band
- payout method

### 2. Risk Profiling
The system calculates a risk score based on:
- disruption history of the work zone
- rainfall / AQI trends
- time-slot vulnerability
- earnings band
- exposure level

### 3. Weekly Plan Recommendation
The rider sees a suggested weekly plan with premium and payout cap.

### 4. Trigger Monitoring
The system continuously watches live or mock feeds for:
- heavy rain
- AQI spikes
- flood alerts
- platform outages
- local restrictions

### 5. Event-Based Claim Initiation
If a valid disruption occurs in the rider’s registered zone and active window, the platform initiates a claim workflow.

### 6. Fraud-Aware Decisioning
Before payout, the system checks authenticity signals and fraud risk.

### 7. Payout / Status Update
Approved claims move to payout simulation, and the dashboard reflects claim and payout status.

---

## AI Strategy

We do not use AI as decoration. We use it in three concrete places.

### 1. Risk Scoring Model
Used during onboarding and renewal.

**Inputs**
- worker zone
- disruption history
- weather risk pattern
- AQI trend
- work-slot timing
- weekly income band

**Output**
- worker-zone risk score
- suggested protection plan
- premium band recommendation

### 2. Dynamic Premium Recommendation
Used to recommend fair weekly pricing.

**Inputs**
- base premium
- zone risk score
- expected disruption frequency
- selected payout cap
- coverage tier

**Output**
- weekly premium recommendation

### 3. Fraud Scoring Model
Used during claim validation.

**Inputs**
- location consistency
- movement continuity
- device consistency
- claim timing pattern
- repeated suspicious event participation
- account similarity / cluster behavior

**Output**
- low fraud risk → auto-approve
- medium fraud risk → delayed review
- high fraud risk → hold and investigate

---

## Technical Architecture

This project is currently designed as a **web-first prototype architecture**.

### Planned Stack
- **Frontend:** React / Vite / Tailwind CSS
- **Backend:** Node.js / Express
- **Database:** PostgreSQL or similar relational database
- **AI Layer:** Python-based scoring services or lightweight ML modules
- **External Feeds:** Weather API, AQI API, maps/location API, mock platform outage feed

### Main Modules
1. **User & Policy Module**
   - onboarding
   - weekly plan selection
   - policy management

2. **Trigger Intelligence Module**
   - monitors disruption feeds
   - maps events to user zones and active windows

3. **AI Decision Module**
   - risk scoring
   - premium recommendation
   - fraud scoring

4. **Claims Module**
   - event-triggered claims workflow
   - payout calculation
   - status tracking

5. **Dashboard Module**
   - worker dashboard
   - admin / operations dashboard

---

## Current Prototype Scope

In Phase 1, we focused on designing and prototyping the core experience rather than claiming a full production system.

### Current prototype includes
- Landing page
- Worker onboarding flow
- Weekly plan recommendation page
- Worker dashboard
- Admin dashboard
- Mock disruption alerts
- Mock claim and payout states
- Anti-fraud strategy design

### Current prototype uses
- frontend prototype screens
- mock data
- system design logic
- planned AI workflow

This keeps the Phase 1 submission honest, focused, and aligned with the timeline.

---

## Claims Workflow

1. External disruption is detected through live or mock feed  
2. Event is mapped to eligible worker zone and active slot  
3. Policy validity is checked  
4. Fraud score is evaluated  
5. Claim is auto-created or sent for review  
6. Payout amount is calculated  
7. Status is shown in dashboard

This reduces manual friction and matches the speed needs of gig workers.

---

## Adversarial Defense & Anti-Spoofing Strategy

The Market Crash scenario makes one thing clear:

**Simple GPS verification is not enough.**

If fake GPS and coordinated fraud rings can trigger mass payout attempts, then a payout engine based on one location signal is fundamentally weak.

So our architecture uses **multi-signal trust evaluation**, not single-signal approval.

### How do we distinguish a fake claimant from a genuinely stranded worker?

A genuine worker usually shows:
- stable historical work zones
- realistic movement over time
- normal route continuity
- expected app usage pattern
- claims that align with real disruption exposure

A suspicious actor may show:
- sudden appearance only during payout-worthy events
- impossible speed or distance jumps
- weak work history but repeated claim participation
- inconsistent zone pattern
- behavior similar to many other suspicious accounts

---

## GPS Spoofing Detection Logic

We plan to detect spoofing using signals such as:
- impossible location jumps between timestamps
- unrealistic travel speed
- abrupt entry into disruption zone exactly near payout trigger
- repeated static/fake-looking coordinate behavior
- mismatch between historical work zone and current claim zone
- emulator or mocked-location indicators when available
- low actual activity but high claims frequency

GPS alone is treated as one signal, not the final truth.

---

## Fraud Ring Detection Logic

A fraud ring is more dangerous than one fake rider, so we also look for coordinated patterns across accounts.

Suspicious ring signals include:
- many synchronized claims in the same short window
- shared device fingerprints
- duplicate payout destination patterns
- highly similar movement traces
- onboarding burst from linked accounts
- repeated suspicious claims from newly created users
- cluster-level anomaly concentration in the same area

Instead of viewing claims one by one, SurakshaPay treats fraud detection as both:
- **individual anomaly detection**
- **group / cluster anomaly detection**

This is critical for defending the payout pool during a Market Crash event.

---

## False Positive Handling

Fraud defense should not punish honest workers.

So our decisioning is tiered:

- **Low fraud risk:** automatic payout
- **Medium fraud risk:** delayed payout + secondary review
- **High fraud risk:** payout hold + manual investigation

### Fairness Rules
- one anomaly alone does not cause automatic rejection
- severe city-wide events can trigger broader tolerance
- borderline cases go to review, not instant denial
- users can re-verify if claim is held

This gives the system defensive strength without becoming unfair.

---

## Worker Dashboard

The worker dashboard is designed to show:
- active weekly plan
- premium amount
- protection status
- disruption alerts
- claims filed
- payout history
- AI recommendation for next week

---

## Admin Dashboard

The admin / operations dashboard is designed to show:
- active policies
- triggered claims
- auto-approved claims
- fraud flags
- high-risk zones
- trigger events by type
- suspicious clusters
- payout summary

This helps demonstrate both business visibility and anti-fraud readiness.

---

## Challenges We Ran Into

The biggest challenge was **scope discipline**.

It was easy to drift into a generic insurance app, which would weaken the submission. We had to stay strict on:
- only one focused persona
- only loss-of-income coverage
- only weekly pricing

The second challenge was making AI logic concrete instead of vague.

The third challenge was the Market Crash scenario. Once GPS spoofing and organized fraud were introduced, it became clear that anti-fraud could not be an afterthought. It had to be part of the core architecture.

---

## Accomplishments We’re Proud Of

We are proud that the project:
- is tightly aligned with the challenge
- uses a believable user persona
- respects weekly earnings reality
- uses parametric event logic
- includes a clear AI strategy
- includes a serious anti-spoofing design
- is realistic for a hackathon prototype

---

## What We Learned

We learned that a strong hackathon solution is not broad. It is specific.

“Insurance for gig workers” is vague.  
“Weekly parametric income protection for food delivery riders with fraud-aware payout logic” is much stronger.

We also learned that fraud prevention is not about one clever rule. It is about combining multiple weak signals into a stronger confidence-based decision.

---

## Future Scope

In the next phases, we plan to strengthen the prototype with:
- live API integrations
- stronger fraud scoring
- event simulation engine
- payout workflow improvements
- claim review queue
- multilingual worker onboarding
- deeper cluster-risk analytics

---

## Conclusion

SurakshaPay is a focused, practical, and adversarially-aware concept for protecting delivery workers from income loss caused by external disruption.

By combining:
- weekly pricing
- parametric event triggers
- AI-based risk scoring
- fraud-aware payout logic

the platform creates a more realistic safety net for gig workers while protecting the payout system against abuse.

This is not a generic insurance concept. It is a narrow, buildable, challenge-aligned solution designed for both worker trust and system resilience.
