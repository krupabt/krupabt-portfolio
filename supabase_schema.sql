-- ==============================================================
-- Portfolio Visitor Analytics - Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor if using Supabase
-- ==============================================================

CREATE TABLE IF NOT EXISTS portfolio_visits (
  id BIGSERIAL PRIMARY KEY,
  visitor_hash TEXT NOT NULL,
  session_id TEXT NOT NULL,
  is_new_visitor BOOLEAN DEFAULT TRUE,
  page TEXT NOT NULL,
  referrer TEXT,
  source TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  screen_resolution TEXT,
  duration_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indices for high-performance dashboard aggregations
CREATE INDEX IF NOT EXISTS idx_portfolio_visits_created_at ON portfolio_visits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_visits_visitor_hash ON portfolio_visits(visitor_hash);
CREATE INDEX IF NOT EXISTS idx_portfolio_visits_source ON portfolio_visits(source);
CREATE INDEX IF NOT EXISTS idx_portfolio_visits_country ON portfolio_visits(country);

-- Enable Row Level Security (RLS)
ALTER TABLE portfolio_visits ENABLE ROW LEVEL SECURITY;

-- Allow server service role full access
CREATE POLICY "Service role has full access"
  ON portfolio_visits
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
