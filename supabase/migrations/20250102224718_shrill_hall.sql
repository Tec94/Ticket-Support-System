/*
  # Fix database relationships and improve structure

  1. Changes
    - Drop existing foreign key constraints
    - Update tickets table to reference auth.users directly
    - Add proper indexes for performance
    - Update RLS policies
*/

-- Drop existing foreign keys
ALTER TABLE tickets 
  DROP CONSTRAINT IF EXISTS tickets_assigned_to_fkey,
  DROP CONSTRAINT IF EXISTS tickets_reported_by_fkey;

-- Add proper foreign key constraints
ALTER TABLE tickets
  ADD CONSTRAINT tickets_assigned_to_fkey
    FOREIGN KEY (assigned_to) REFERENCES auth.users(id),
  ADD CONSTRAINT tickets_reported_by_fkey
    FOREIGN KEY (reported_by) REFERENCES auth.users(id);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tickets_reported_by ON tickets(reported_by);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at DESC);

-- Update RLS policies
DROP POLICY IF EXISTS "Users can read all tickets" ON tickets;
DROP POLICY IF EXISTS "Users can create tickets" ON tickets;
DROP POLICY IF EXISTS "Users can update assigned tickets" ON tickets;

CREATE POLICY "Users can read all tickets"
  ON tickets FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create tickets"
  ON tickets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Users can update assigned tickets"
  ON tickets FOR UPDATE
  TO authenticated
  USING (auth.uid() = assigned_to OR auth.uid() = reported_by);