#!/usr/bin/env bash
# Keep the Next.js dev server alive. Checks if port 3000 is listening; if not,
# restarts it. Designed to run via cron.
set -u
cd /home/z/my-project
LOG=/home/z/my-project/dev.log

if (ss -ltn 2>/dev/null || netstat -ltn 2>/dev/null) | grep -q ':3000'; then
  # Already running — nothing to do.
  exit 0
fi

# Port not listening — restart.
pkill -9 -f "next" 2>/dev/null
sleep 1
setsid bash -c 'exec ./node_modules/.bin/next dev -p 3000' > "$LOG" 2>&1 < /dev/null & disown
echo "[$(date -Iseconds)] restarted dev server" >> /home/z/my-project/dev-keepalive.log
