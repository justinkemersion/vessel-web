#!/usr/bin/env bash
# Pull latest main and rebuild Vessel on the production host.
# Usage (from repo root):
#   ./deploy/relaunch.sh
set -euo pipefail

HOST="${VESSEL_DEPLOY_HOST:-root@178.104.205.138}"
APP_DIR="${VESSEL_DEPLOY_DIR:-/srv/apps/vessel-web}"
BRANCH="${VESSEL_DEPLOY_BRANCH:-main}"

ssh "$HOST" "set -euo pipefail
  cd '$APP_DIR'
  if [ ! -d .git ]; then
    echo 'ERROR: $APP_DIR is not a git repository.'
    echo 'Run ./deploy/bootstrap-server.sh once (see _contract/deployment.md).'
    exit 1
  fi
  echo '=== git fetch + reset to origin/$BRANCH ==='
  git fetch origin '$BRANCH'
  git reset --hard origin/'$BRANCH'
  echo '=== docker compose rebuild ==='
  docker compose up --build -d
  echo '=== container status ==='
  docker compose ps
  echo '=== health (after brief wait) ==='
  sleep 15
  docker inspect vessel-web --format 'Health: {{.State.Health.Status}} | Running: {{.State.Running}}' 2>/dev/null || true
  echo '=== recent runtime logs ==='
  docker compose logs --tail=15 web 2>&1
"

echo "=== smoke test ==="
curl -sS -o /dev/null -w "https portal: %{http_code}\n" https://www.vsl-base.com/portal || true
