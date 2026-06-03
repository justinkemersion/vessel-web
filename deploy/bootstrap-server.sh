#!/usr/bin/env bash
# First-time (or re-) bootstrap: git clone at /srv/apps/vessel-web on the production host.
# Preserves an existing .env when replacing a non-git tree.
#
# Usage (from repo root, after git push origin main):
#   ./deploy/bootstrap-server.sh
set -euo pipefail

HOST="${VESSEL_DEPLOY_HOST:-root@178.104.205.138}"
APP_DIR="${VESSEL_DEPLOY_DIR:-/srv/apps/vessel-web}"
REPO="${VESSEL_GIT_REPO:-git@github.com:justinkemersion/vessel-web.git}"
BRANCH="${VESSEL_DEPLOY_BRANCH:-main}"

ssh "$HOST" "set -euo pipefail
  if [ -d '$APP_DIR/.git' ]; then
    echo 'ERROR: $APP_DIR is already a git clone.'
    echo 'Use ./deploy/relaunch.sh for routine deploys.'
    exit 1
  fi

  ENV_BACKUP=''
  if [ -f '$APP_DIR/.env' ]; then
    ENV_BACKUP=\$(mktemp)
    cp '$APP_DIR/.env' \"\$ENV_BACKUP\"
    echo '=== preserved existing .env ==='
  fi

  if [ -d '$APP_DIR' ]; then
    echo '=== removing non-git tree at $APP_DIR ==='
    rm -rf '$APP_DIR'
  fi

  mkdir -p /srv/apps
  echo '=== git clone ==='
  git clone '$REPO' '$APP_DIR'
  cd '$APP_DIR'
  git checkout '$BRANCH'

  if [ -n \"\$ENV_BACKUP\" ] && [ -f \"\$ENV_BACKUP\" ]; then
    cp \"\$ENV_BACKUP\" .env
    rm \"\$ENV_BACKUP\"
  elif [ ! -f .env ]; then
    cp .env.example .env
    echo '=== created .env from example — edit secrets, then re-run compose ==='
    exit 0
  fi

  echo '=== docker compose up --build -d ==='
  docker compose up --build -d
  docker compose ps
"

echo "=== smoke test ==="
curl -sS -o /dev/null -w "https portal: %{http_code}\n" https://www.vsl-base.com/portal || true
