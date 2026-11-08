# Romcal England & Wales — Diocese of Leeds

**v0.1.0 · Build 1** — initial validation scaffold.

This repository prepares a Diocese of Leeds particular calendar for the [Romcal](https://github.com/romcal/romcal) liturgical calendar engine. **It is not yet a functioning Romcal plugin or an approved diocesan Ordo.**

## Planned calendar layers
General Roman Calendar → England → Diocese of Leeds → optional parish calendar.

## Files
- `data/leeds.entries.json`: source-backed local records (currently empty)
- `schema/entry.schema.json`: proposed data contract
- `scripts/validate.mjs`: basic data checks
- `tests/validate.test.mjs`: regression tests
- `docs/verification.md`: Ordo verification procedure
- `.github/workflows/test.yml`: automated checks

Run `npm test` and `npm run validate` with Node.js 20+.

## Next milestone
Inspect Romcal v3 plugin source and England inheritance API, implement a real adapter, then transcribe and verify Diocese of Leeds observances against the current official Ordo. **No local observances have yet been verified.**
