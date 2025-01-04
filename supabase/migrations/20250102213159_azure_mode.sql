/*
  # Support Ticket System Schema

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `priority` (enum)
      - `status` (enum)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `assigned_to` (uuid, references auth.users)
      - `reported_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on `tickets` table
    - Add policies for:
      - Users can read all tickets
      - Users can create tickets (automatically sets reported_by)
      - Users can update tickets assigned to them
*/

-- Create enums for ticket priority and status
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE ticket_status AS ENUM ('open', 'in-progress', 'resolved', 'closed');

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  priority ticket_priority NOT NULL DEFAULT 'medium',
  status ticket_status NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  assigned_to uuid REFERENCES auth.users,
  reported_by uuid REFERENCES auth.users NOT NULL
);

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all tickets"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create tickets"
  ON tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Users can update assigned tickets"
  ON tickets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = assigned_to);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();