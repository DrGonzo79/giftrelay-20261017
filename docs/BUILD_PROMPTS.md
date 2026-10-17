# Phased build prompts

1. **Concierge ledger:** Add Postgres-backed briefs/offers with tenant isolation, expiry, audit events and operator auth. Write API contract tests and migrations first.
2. **Boutique loop:** Add SMS/email adapters, signed one-time offer links, photo upload and inventory holds. Simulate providers in CI; prove idempotent duplicate webhooks.
3. **Commerce:** Add payment authorization after offer selection and courier quote/dispatch adapters behind feature flags. Reconcile every external transition and implement compensation for dispatch failure.
4. **Assisted intake:** Extract structured interests, exclusions and tone from free text with a schema-constrained model. Show the extracted brief to the buyer before submission; log overrides and never infer allergens.
5. **EA Pro:** Add recipient memory, repeat-gift warnings, approval roles, consolidated invoices and retention analytics only after the concierge test meets thresholds.
