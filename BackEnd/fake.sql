-- Insert fake users
INSERT INTO Users (Username, Email, PasswordHash)
VALUES 
('john_doe', 'john@example.com', 'hashedpassword1'),
('jane_smith', 'jane@example.com', 'hashedpassword2'),
('alice_jones', 'alice@example.com', 'hashedpassword3'),
('bob_brown', 'bob@example.com', 'hashedpassword4');

-- Insert fake boards
INSERT INTO Boards (BoardName, UserID)
VALUES 
('Project Alpha', 1),
('Marketing Plan', 2),
('Development', 3),
('Design', 4);

-- Insert fake lists
INSERT INTO Lists (ListName, BoardID)
VALUES 
('To Do', 1),
('In Progress', 1),
('Completed', 1),
('Backlog', 2),
('To Do', 2),
('In Progress', 3),
('Completed', 3),
('Ideas', 4);

-- Insert fake cards
INSERT INTO Cards (CardTitle, CardDescription, ListID)
VALUES 
('Task 1', 'Description for Task 1', 1),
('Task 2', 'Description for Task 2', 2),
('Task 3', 'Description for Task 3', 3),
('Task 4', 'Description for Task 4', 4),
('Task 5', 'Description for Task 5', 5),
('Task 6', 'Description for Task 6', 6),
('Task 7', 'Description for Task 7', 7),
('Task 8', 'Description for Task 8', 8);

-- Insert fake comments
INSERT INTO Comments (CommentText, UserID, CardID)
VALUES 
('This is a comment on Task 1', 1, 1),
('This is a comment on Task 2', 2, 2),
('This is a comment on Task 3', 3, 3),
('This is a comment on Task 4', 4, 4),
('This is a comment on Task 5', 1, 5),
('This is a comment on Task 6', 2, 6),
('This is a comment on Task 7', 3, 7),
('This is a comment on Task 8', 4, 8);

-- Insert fake labels
INSERT INTO Labels (LabelName, LabelColor)
VALUES 
('Urgent', '#FF0000'),
('High Priority', '#FFA500'),
('Medium Priority', '#FFFF00'),
('Low Priority', '#00FF00');

-- Insert fake card-label relationships
INSERT INTO Card_Labels (CardID, LabelID)
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 1),
(6, 2),
(7, 3),
(8, 4);

-- Insert fake activities
INSERT INTO Activity_Log (UserID, ActivityType, ActivityDescription, BoardID, ListID, CardID)
VALUES 
(1, 'Create Board', 'Created board Project Alpha', 1, NULL, NULL),
(2, 'Create Board', 'Created board Marketing Plan', 2, NULL, NULL),
(3, 'Create Board', 'Created board Development', 3, NULL, NULL),
(4, 'Create Board', 'Created board Design', 4, NULL, NULL),
(1, 'Add Card', 'Added card Task 1 to To Do list', 1, 1, 1),
(2, 'Add Card', 'Added card Task 2 to In Progress list', 1, 2, 2),
(3, 'Add Card', 'Added card Task 3 to Completed list', 1, 3, 3),
(4, 'Add Card', 'Added card Task 4 to Backlog list', 2, 4, 4);
