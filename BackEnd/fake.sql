-- Inserting data into "users" table
INSERT INTO "users" ("userID", "username", "email", "passwordHash", "createdAt")
VALUES
(1, "john_doe", "john.doe@example.com", "hashpassword123", "2024-08-01 12:34:56"),
(2, "jane_smith", "jane.smith@example.com", "hashpassword456", "2024-08-02 14:20:30"),
(3, "sam_wilson", "sam.wilson@example.com", "hashpassword789", "2024-08-03 09:15:22");

-- Inserting data into "boards" table
INSERT INTO "boards" ("boardID", "boardName", "userID", "createdAt")
VALUES
(1, "Project Alpha", 1, "2024-08-03 10:00:00"),
(2, "Marketing Strategy", 2, "2024-08-04 11:45:12"),
(3, "Development Sprint", 3, "2024-08-05 08:30:45");

-- Inserting data into "lists" table
INSERT INTO "lists" ("listID", "listName", "boardID", "createdAt")
VALUES
(1, "To Do", 1, "2024-08-03 10:15:00"),
(2, "In Progress", 1, "2024-08-03 10:30:00"),
(3, "Done", 1, "2024-08-03 10:45:00"),
(4, "Ideas", 2, "2024-08-04 12:00:00"),
(5, "Backlog", 3, "2024-08-05 08:45:00");

-- Inserting data into "cards" table
INSERT INTO "cards" ("cardID", "cardTitle", "cardDescription", "listID", "createdAt")
VALUES
(1, "Design UI", "Create the initial UI design for the app.", 1, "2024-08-03 10:20:00"),
(2, "Write API Docs", "Document the API endpoints for the project.", 2, "2024-08-03 10:35:00"),
(3, "Deploy to Production", "Deploy the latest version to the production server.", 3, "2024-08-03 10:50:00"),
(4, "Brainstorm Ideas", "Collect marketing ideas for the new campaign.", 4, "2024-08-04 12:15:00"),
(5, "Review Code", "Review the code for any potential issues.", 5, "2024-08-05 09:00:00");

-- Inserting data into "comments" table
INSERT INTO "comments" ("commentID", "commentText", "userID", "cardID", "createdAt")
VALUES
(1, "Great work on the UI design!", 2, 1, "2024-08-03 11:00:00"),
(2, "Please add more details to the API docs.", 1, 2, "2024-08-03 11:15:00"),
(3, "Make sure to test thoroughly before deploying.", 3, 3, "2024-08-03 11:30:00"),
(4, "I like the idea of using social media influencers.", 2, 4, "2024-08-04 12:30:00"),
(5, "Code looks good, just a few minor tweaks needed.", 1, 5, "2024-08-05 09:15:00");

-- Inserting data into "labels" table
INSERT INTO "labels" ("labelID", "labelName", "labelColor")
VALUES
(1, "Urgent", "#FF0000"),
(2, "High Priority", "#FFA500"),
(3, "Low Priority", "#00FF00"),
(4, "Bug", "#0000FF"),
(5, "Enhancement", "#800080");

-- Inserting data into "card_labels" table
INSERT INTO "cardLabels" ("cardID", "labelID")
VALUES
(1, 2),
(2, 5),
(3, 1),
(4, 3),
(5, 4);

-- Inserting data into "activityLog" table
INSERT INTO "activityLog" ("activityID", "userID", "activityType", "activityDescription", "boardID", "listID", "cardID", "createdAt")
VALUES
(1, 1, "create_card", "Created a new card 'Design UI'.", 1, 1, 1, "2024-08-03 10:20:00"),
(2, 2, "add_comment", "Added a comment to card 'Design UI'.", 1, 1, 1, "2024-08-03 11:00:00"),
(3, 3, "move_card", "Moved card 'Write API Docs' to 'In Progress'.", 1, 2, 2, "2024-08-03 10:35:00"),
(4, 2, "create_board", "Created a new board 'Marketing Strategy'.", 2, NULL, NULL, "2024-08-04 11:45:12"),
(5, 3, "create_list", "Created a new list 'Backlog'.", 3, 5, NULL, "2024-08-05 08:45:00");
