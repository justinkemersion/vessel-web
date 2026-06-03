# Production deployment contract

Authoritative operator runbook for **Vessel** (landing + `/portal`) on the Hetzner host.
Same Foundry pattern as sibling apps: **Git is the source of truth**; never rsync or scp the
repo tree for routine releases.

## Constants

| Constant | Value |
|----------|--------|
| Host | `root@178.104.205.138` |
| App path | `/srv/apps/vessel-web` |
| Public URLs | `https://vsl-base.com`, `https://www.vsl-base.com` |
| Git remote | `git@github.com:justinkemersion/vessel-web.git` |
| Branch | `main` |
| Docker network | `flux-network` (external) |
| Production env file | `.env` (server only, gitignored) |

## Source of truth

1. **All application code** reaches production via `git pull origin main` on the server (or
   `git reset --hard origin/main` after fetch in `deploy/relaunch.sh`).
2. **Never** rsync or scp source files for routine deploys. That bypasses audit trail and can
   ship uncommitted laptop state (e.g. portal manifest edits).
3. **Secrets** live only in `/srv/apps/vessel-web/.env` on the server. Template:
   `.env.example`. Never commit `.env`.
4. **Portal manifest** data lives in [`src/lib/portal-content.ts`](../src/lib/portal-content.ts).
   After adding or renumbering fleet rows, merge to `main`, deploy vessel-web, then verify
   `/portal` links match live Traefik hosts. Ordering rules:
   [`portal-manifest.md`](portal-manifest.md).

## Environment (production)

Copy `.env.example` → `.env` on first bootstrap. Clerk keys and other secrets are server-only.

```bash
docker compose up --build -d
```

Compose reads `.env` automatically for `CLERK_*` and build args.

## First-time server bootstrap

The app directory **must** be a git clone. If a non-git tree exists, run from repo root:

```bash
./deploy/bootstrap-server.sh
```

Manual equivalent:

```bash
mkdir -p /srv/apps
git clone git@github.com:justinkemersion/vessel-web.git /srv/apps/vessel-web
cd /srv/apps/vessel-web
cp .env.example .env
# edit .env
docker compose up --build -d
```

## Routine deploy

After `git push origin main`:

```bash
./deploy/relaunch.sh
```

Or on the server:

```bash
cd /srv/apps/vessel-web
git fetch origin main
git reset --hard origin/main
docker compose up --build -d
```

The deploy host must not accumulate local commits. `relaunch.sh` resets to `origin/main` so
orphan edits (e.g. from a past scp) cannot block pulls.

## Pre-deploy gates (operator machine)

```bash
npm run build
```

For portal manifest edits, also verify:

- Gate order and renumbering per `portal-manifest.md`
- No em dashes in UI copy (`copy-style.md`)
- `destination` host matches the target app's Traefik router

## Post-deploy verification

| Check | Expected |
|-------|----------|
| `curl -sS -o /dev/null -w '%{http_code}' https://www.vsl-base.com/` | `200` |
| `https://www.vsl-base.com/portal` | Manifest renders; alpha links open |
| New fleet row | Destination URL returns app (not Vessel 404) |
| Container | `docker inspect vessel-web` → healthy |

Registering a **sibling app** (e.g. Habitat Ledger, Logos Engine): deploy that app from its
own repo first (see the app’s `_contract/deploy.md` or `deployment.md`), soak, then add the
portal row and deploy vessel-web via this contract.

## Forbidden

- Rsync/scp of the application tree for routine releases
- Committing `.env` or Clerk secrets
- Portal `destination` that does not match a live Traefik host
- Renumbering gates without updating `portal-manifest.md` checklist
