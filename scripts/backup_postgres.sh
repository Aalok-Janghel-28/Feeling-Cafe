#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/var/backups/feeling-cafe}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
POSTGRES_DB="${POSTGRES_DB:-FeelingCafe}"
POSTGRES_USER="${POSTGRES_USER:-postgres}"
POSTGRES_HOST="${POSTGRES_HOST:-127.0.0.1}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"

mkdir -p "$BACKUP_DIR"

timestamp="$(date +%Y%m%d-%H%M%S)"
target="$BACKUP_DIR/${POSTGRES_DB}-${timestamp}.sql.gz"

pg_dump \
  --host "$POSTGRES_HOST" \
  --port "$POSTGRES_PORT" \
  --username "$POSTGRES_USER" \
  --format plain \
  "$POSTGRES_DB" | gzip > "$target"

find "$BACKUP_DIR" -name "${POSTGRES_DB}-*.sql.gz" -type f -mtime +"$RETENTION_DAYS" -delete

echo "Backup written to $target"
