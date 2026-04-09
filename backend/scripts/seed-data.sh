#!/bin/bash

echo "🔧 Creating databases & tables + seeding data..."

# =========================
# AUTH DB
# =========================
docker exec -i auth-db psql -U auth_user -d auth_db <<EOF

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

INSERT INTO users (email,password_hash)
VALUES
('user1@test.com','\$2b\$10\$OjLJmKpsUGJpl71LDRulHuv0rWX4DaXLQ1uLSGD8f3PVkE.pbP8ee'),
('user2@test.com','\$2b\$10\$OjLJmKpsUGJpl71LDRulHuv0rWX4DaXLQ1uLSGD8f3PVkE.pbP8ee')
ON CONFLICT DO NOTHING;

EOF


# =========================
# BILLING DB
# =========================
docker exec -i billing-db psql -U billing_user -d billing_db <<EOF

CREATE TABLE IF NOT EXISTS balances (
  user_id TEXT PRIMARY KEY,
  balance NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS invoices (
  invoice_id UUID PRIMARY KEY,
  call_id TEXT UNIQUE,
  amount NUMERIC,
  created_at TIMESTAMP DEFAULT now()
);

INSERT INTO balances VALUES
('user1',1000),
('user2',1000)
ON CONFLICT DO NOTHING;

EOF


# =========================
# CALL HISTORY DB
# =========================
docker exec -i call-history-db psql -U history_user -d history_db <<EOF

CREATE TABLE IF NOT EXISTS call_history (
  call_id TEXT PRIMARY KEY,
  caller_id TEXT,
  callee_id TEXT,
  duration_seconds INT,
  ended_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_call_history_caller
ON call_history (caller_id, ended_at DESC);

CREATE INDEX IF NOT EXISTS idx_call_history_callee
ON call_history (callee_id, ended_at DESC);

INSERT INTO call_history
SELECT
'call_'||g,
'user1',
'user2',
(random()*300)::int,
NOW() - (g||' seconds')::interval
FROM generate_series(1,50000) g
ON CONFLICT DO NOTHING;

EOF

echo "✅ Seed complete"