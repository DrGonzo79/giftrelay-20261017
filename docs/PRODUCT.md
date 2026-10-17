# Product plan

## ICP and JTBD
For time-poor EAs in a single city: “When an important gift is due today, give me a few tasteful, actually available local options without calling stores, so I can protect the relationship and move on.”

## MVP vertical slice
Structured brief → SMS blast to 15 vetted boutiques → photo/price/ETA response → transparent eligible ranking → buyer selection → operator-confirmed courier. GiftRelay’s demo implements brief validation, matching, comparison and selection using explicit fixtures. Checkout and dispatch are intentionally absent rather than faked.

## Data model
`Buyer`, `RecipientProfile`, `Brief(budget, deadline, interests, restrictions)`, `Boutique`, `Offer(price, photo, eta, inventoryHold)`, `Selection`, `CourierJob`, `Outcome`. Every promise carries expiry, actor and evidence timestamps.

## Architecture and model strategy
Next.js PWA for buyers/operators; FastAPI domain service; Postgres for briefs/offers; object storage for photos; provider adapters for SMS, payments and courier quotes; append-only audit events. Start deterministic for budget/deadline eligibility. Use a small language model later only to extract tags/restrictions and draft summaries, with schema validation and human confirmation. Never let a model assert inventory, allergens, or ETA.

## Economics
At $120 AOV, $9 fee + 15% yields $27 gross platform revenue. If courier exceptions, refunds, payment fees and support consume $12/order, contribution is $15 before fixed local ops. The report’s $23,050 month-nine MRR assumes 50 $299 seats and 300 used briefs; validate seat close rate and usage separately before extrapolating the $20M–$40M ceiling.

## Validation, moat, and risks
The first moat is response-performance data and trusted boutique relationships, not ranking code. Run the paid concierge test in Office Hours. Instrument time-to-first-offer, offers/brief, eligibility rate, selection rate, on-time rate, refund/substitution rate, repeat rate, contribution/order. Major risks: liquidity, fake/stale inventory, marketplace disintermediation, unsafe gifts, courier failure, incumbent bundling and weak consumer frequency.

## 30 / 60 / 90 days
- **30:** 15 Austin boutiques, 20 concierge briefs, paid fee experiment; no custom courier integration.
- **60:** operator console, inventory holds, payment authorization, delivery quote adapter; 100 briefs and cohort repeat read.
- **90:** sell first five EA Pro seats, recipient memory/repeat blocking, one consolidated invoice; expand neighborhoods only if service levels hold.
