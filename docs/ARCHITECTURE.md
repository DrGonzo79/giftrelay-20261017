# Architecture

The static Next.js demo and Python API share the same transparent scoring rule: interest overlap + budget eligibility + deadline eligibility + rating tie-break. The browser runs fixtures locally so GitHub Pages works under its repository base path. FastAPI exposes the production-shaped `/rank` operation and returns a domain failure when nothing meets both hard constraints.

Production boundaries: buyer UI → brief service → boutique notification adapters → offer ledger → matching service → selection/payment authorization → courier adapter. Persist immutable timestamps and provider responses for dispute resolution. Use idempotency keys for acceptance/payment/dispatch, expiring inventory holds, webhooks with signature checks, and an operator queue for stale offers. OpenTelemetry traces should join brief, offer, payment and courier IDs; alert on p95 first-response latency, fill rate, substitution, refunds and delivery SLO misses.

GitHub Pages hosts only the frontend. The FastAPI backend is runnable and tested source, not deployed.
