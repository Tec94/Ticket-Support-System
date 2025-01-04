-- Update foreign key references to use profiles table
ALTER TABLE tickets 
  DROP CONSTRAINT IF EXISTS tickets_assigned_to_fkey,
  DROP CONSTRAINT IF EXISTS tickets_reported_by_fkey;

ALTER TABLE tickets
  ADD CONSTRAINT tickets_assigned_to_fkey
    FOREIGN KEY (assigned_to) REFERENCES profiles(id),
  ADD CONSTRAINT tickets_reported_by_fkey
    FOREIGN KEY (reported_by) REFERENCES profiles(id);

-- Recreate indexes
DROP INDEX IF EXISTS idx_tickets_assigned_to;
DROP INDEX IF EXISTS idx_tickets_reported_by;
CREATE INDEX idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX idx_tickets_reported_by ON tickets(reported_by);

-- Update RLS policies to reference profiles
DROP POLICY IF EXISTS "Users can update assigned tickets" ON tickets;

CREATE POLICY "Users can update assigned tickets"
  ON tickets FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = assigned_to 
    OR auth.uid() = reported_by
  );