# Portal flight manifest

Authoritative data: [`src/lib/portal-content.ts`](../src/lib/portal-content.ts) (`manifestRows`).

## Sort order (required)

1. **All `ACTIVE` services appear before any `IN_DEVELOPMENT` service.** When a project goes live, move its row into the active block (and renumber gates).
2. **Within `ACTIVE`,** preserve this product priority unless the operator explicitly reorders:
   - Flux (gate 01 — orchestration hub, always first)
   - Ledger
   - Bloom Atelier
   - YeastCoast
3. **Within `IN_DEVELOPMENT`,** list remaining services in gate order (05, 06, …). No required sub-order beyond staying below every active row.
4. **Alpha preview (exception):** MailPilot AI is always **last** in the manifest (below YeastCoast and other in-development rows). It may set `linkInDevelopment: true` and `developmentNote` so the destination links while status remains `IN_DEVELOPMENT`.

## Gate numbers

- Gates are two-digit strings (`"01"` … `"99"`) assigned top-to-bottom in display order.
- Renumber the full list whenever rows move between active and development blocks.

## Status and links

| Status | Portal behavior |
|--------|-----------------|
| `ACTIVE` | Green status, clickable `https://{destination}` |
| `IN_DEVELOPMENT` | Muted row, destination plain text (no link) |
| `IN_DEVELOPMENT` + `linkInDevelopment` | Amber-accent row; destination links; optional `developmentNote` in expanded copy |

`destination` must match the Traefik host the app actually serves.

## Editing checklist

- [ ] Row order follows active-first policy above
- [ ] Gates renumbered sequentially
- [ ] Matching `portalProjects` entry (same `repo`, README path, description)
- [ ] Deploy vessel-web on Hetzner after merge (`/srv/apps/vessel-web`)
