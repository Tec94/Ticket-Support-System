/*
  # Create sample data

  1. Creates a test user
  2. Creates sample tickets for testing
  3. Ensures proper foreign key relationships
*/

-- Create a test user and sample tickets
DO $$ 
DECLARE
  test_user_id uuid;
BEGIN
  -- First create the user in auth.users
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data
  ) VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000'::uuid,
    'test@example.com',
    '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEF',  -- This is a dummy hash
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}'
  )
  RETURNING id INTO test_user_id;

  -- The profile will be created automatically by the trigger we created earlier

  -- Now we can safely create the tickets
  INSERT INTO tickets (
    title,
    description,
    priority,
    status,
    reported_by,
    created_at
  ) VALUES
    (
      'Login page not responding',
      'Users are experiencing intermittent issues when trying to log in to the dashboard.',
      'high',
      'open',
      test_user_id,
      now() - interval '2 days'
    ),
    (
      'Update user profile picture',
      'Add the ability for users to upload and update their profile pictures.',
      'medium',
      'in-progress',
      test_user_id,
      now() - interval '5 days'
    ),
    (
      'Optimize database queries',
      'Several dashboard pages are loading slowly. Need to optimize queries.',
      'critical',
      'open',
      test_user_id,
      now() - interval '1 day'
    );
END $$;