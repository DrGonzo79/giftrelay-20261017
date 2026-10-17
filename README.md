# GiftRelay

Runnable validation prototype for a reverse marketplace where an urgent gift buyer posts one brief and local boutiques answer with real, same-day options.

## What works

- Tune budget, deadline, and recipient interests; deterministic matching reranks four explicit fictional fixtures.
- Submit a brief with validation/loading states, compare eligible proposals, and select/change a gift.
- FastAPI `/rank` performs the same real domain operation and rejects impossible or invalid requests. The published Pages demo is frontend-only; the Python API is **not deployed**.

## Run

```bash
npm ci && npm run dev
uv sync --project api --locked && uv run --project api uvicorn api.main:app --reload
```

## Verify

```bash
npm run typecheck && npm run test:e2e && npm run build && npm run audit:prod
uv run --project api pytest api/tests
```

All inventory, shops, ETAs, and courier actions are fictional/simulated. Research is summarized in `research/notes.md`; product reasoning and phased build prompts are in `docs/`.
