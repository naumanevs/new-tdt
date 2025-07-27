/*
  # Create users and credits tables
  1. New Tables: users (id uuid, email text, created_at timestamp), credits (id uuid, user_id uuid, amount integer, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
*/
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own data" ON users FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE TABLE IF NOT EXISTS credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  amount integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Credits read own data" ON credits FOR SELECT TO authenticated USING (auth.uid() = user_id);
