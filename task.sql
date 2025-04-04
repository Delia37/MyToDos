-- Add tasks for each user
-- INSERT INTO task (title, description, due_date, priority, status, user_id) VALUES
-- ('Task for Alice', 'Do Alice thing', '2025-04-05', 'HIGH', 'PENDING', 1),
-- ('Task for Bob', 'Bob time!', '2025-04-06', 'LOW', 'COMPLETED', 2);
-- ALTER TABLE app_user ADD COLUMN username VARCHAR(255);
-- ALTER TABLE app_user ADD COLUMN description TEXT;

-- Insert users
-- INSERT INTO app_user (id, email, password, username, description) VALUES
--   (6, 'lola@example.com', 'pass1', 'Alice', 'Loves productivity'),
--   (7, 'andrew@example.com', 'pass2', 'Bob', 'Builder of great things'),
--   (8, 'carol@example.com', 'pass3', 'Carol', 'Deadline chaser');

-- -- Insert tasks
-- INSERT INTO task (id, title, description, due_date, priority, status, user_id) VALUES
--   (1, 'Buy groceries', 'Get milk and eggs', '2025-04-06', 'MEDIUM', 'PENDING', 6),
--   (2, 'Finish report', 'Due by Friday!', '2025-04-07', 'HIGH', 'PENDING', 6),
--   (3, 'Gym workout', 'Leg day', '2025-04-05', 'LOW', 'COMPLETED', 7),
--   (4, 'Prepare presentation', 'Marketing deck', '2025-04-10', 'HIGH', 'PENDING', 8);

-- -- Insert friendships (mutual entries for bi-directional)
-- INSERT INTO friends (user_id, friend_id) VALUES
--   (6, 7),
--   (7, 6),
--   (6, 8),
--   (8, 7);

-- -- Insert friend requests (pending)
-- INSERT INTO friend_request (id, sender_id, receiver_id, status, timestamp) VALUES
--   (9, 6, 8, 'PENDING', now());

SELECT * FROM task;
SELECT * FROM app_user;
SELECT * FROM friends;