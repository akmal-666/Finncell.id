-- Migration 0003: Add missing auth columns to users table

-- Add 'role' column (stores role name directly, e.g. 'super_admin')
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'admin';

-- Add 'is_active' column
ALTER TABLE users ADD COLUMN is_active INTEGER DEFAULT 1;

-- Add 'last_login_at' column
ALTER TABLE users ADD COLUMN last_login_at DATETIME;

-- Add 'ip_address' column to sessions table (needed by auth route)
ALTER TABLE sessions ADD COLUMN ip_address TEXT;

-- Create activity_logs table if not exists (needed by logActivity in auth route)
CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_name TEXT,
  action TEXT NOT NULL,
  entity TEXT,
  entity_id TEXT,
  details TEXT,
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed default super admin (password: admin123, hashed with fincell2024: prefix)
-- Hash: SHA-256 of "fincell2024:admin123"
INSERT OR IGNORE INTO users (id, name, email, password_hash, role, is_active, created_at)
VALUES (
  'user-super-001',
  'Super Admin',
  'admin@fincell.id',
  'ff8da1d73bef26b442aac773c1345ad2cf3cd0420765d914226b5bfd7d78ce75',
  'super_admin',
  1,
  CURRENT_TIMESTAMP
);
