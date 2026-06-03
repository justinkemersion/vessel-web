# Portal manifest

Authoritative data: [`src/lib/portal-content.ts`](../src/lib/portal-content.ts) (`manifestRows`, `registerWorks`).

Display copy rules: [`copy-style.md`](copy-style.md) (no em dashes in UI text).

## Public Register vs portal Manifest

- **`registerWorks`** on `/`: curated editorial index (7 works). No gate numbers.
- **`manifestRows`** on `/portal`: full operational table for operators (8 works).

PseudoChannel and Tone are **Private** in the portal only. The Golden Standard is **Concept** on the public Register only (no manifest row).

## Sort order (required)

1. **All `ACTIVE` works appear before any `IN_DEVELOPMENT` work.** When a project goes live, move its row into the active block (and renumber gates).
2. **Within `ACTIVE`,** preserve this product priority unless the operator explicitly reorders:
   - Flux (gate 01, orchestration hub, always first)
   - Ledger
   - Bloom Atelier
   - YeastCoast
3. **Within `IN_DEVELOPMENT`,** list remaining works in gate order (05, 06, …). No required sub-order beyond staying below every active row.
4. **Alpha preview (exception):** MailPilot AI is always **last** in the manifest (below YeastCoast, Logos Engine, and other in-development rows). It may set `linkInDevelopment: true` and `developmentNote` so the destination links while status remains `IN_DEVELOPMENT`.

## Gate numbers

- Gates are two-digit strings (`"01"` … `"99"`) assigned top-to-bottom in display order.
- Renumber the full list whenever rows move between active and development blocks.

## Internal status and portal display labels

Internal enum (`manifestRows.status`) stays `ACTIVE | IN_DEVELOPMENT`. UI labels come from [`vessel-vocabulary.ts`](../src/lib/vessel-vocabulary.ts):

| Internal | Display label | Portal behavior |
|----------|---------------|-----------------|
| `ACTIVE` | **Active** | Green status, clickable `https://{destination}` |
| `IN_DEVELOPMENT` + `linkInDevelopment` | **Alpha** | Amber-accent row; destination links; optional `developmentNote` |
| `IN_DEVELOPMENT` (PseudoChannel, Tone) | **Private** | Muted row, destination plain text |
| Register-only future work | **Concept** | Public Register only; no manifest row |

`destination` must match the Traefik host the app actually serves.

## Editing checklist

- [ ] Row order follows active-first policy above
- [ ] Gates renumbered sequentially
- [ ] Matching `portalProjects` entry (same `repo`, README path, description)
- [ ] No em dashes in display copy ([`copy-style.md`](copy-style.md))
- [ ] Deploy vessel-web on Hetzner after merge (`/srv/apps/vessel-web`) — see [`deployment.md`](deployment.md)
