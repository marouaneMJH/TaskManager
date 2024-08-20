
--  Customize for Ts types


-- Creating the users table
CREATE TABLE "users" (
    "userID" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "passwordHash" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating the boards table
CREATE TABLE "boards" (
    "boardID" SERIAL PRIMARY KEY,
    "boardName" VARCHAR(255) NOT NULL,
    "userID" INT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userID") REFERENCES "users"("userID") ON DELETE CASCADE
);

-- Creating the lists table
CREATE TABLE "lists" (
    "listID" SERIAL PRIMARY KEY,
    "listName" VARCHAR(255) NOT NULL,
    "boardID" INT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("boardID") REFERENCES "boards"("boardID") ON DELETE CASCADE
);

-- Creating the cards table
CREATE TABLE "cards" (
    "cardID" SERIAL PRIMARY KEY,
    "cardTitle" VARCHAR(255) NOT NULL,
    "cardDescription" TEXT,
    "listID" INT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("listID") REFERENCES "lists"("listID") ON DELETE CASCADE
);

-- Creating the comments table
CREATE TABLE "comments" (
    "commentID" SERIAL PRIMARY KEY,
    "commentText" TEXT NOT NULL,
    "userID" INT,
    "cardID" INT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userID") REFERENCES "users"("userID") ON DELETE CASCADE,
    FOREIGN KEY ("cardID") REFERENCES "cards"("cardID") ON DELETE CASCADE
);

-- Creating the labels table
CREATE TABLE "labels" (
    "labelID" SERIAL PRIMARY KEY,
    "labelName" VARCHAR(255) NOT NULL,
    "labelColor" VARCHAR(7) NOT NULL
);

-- Creating the card_labels table
CREATE TABLE "cardLabels" (
    "cardID" INT,
    "labelID" INT,
    PRIMARY KEY ("cardID", "labelID"),
    FOREIGN KEY ("cardID") REFERENCES "cards"("cardID") ON DELETE CASCADE,
    FOREIGN KEY ("labelID") REFERENCES "labels"("labelID") ON DELETE CASCADE
);

-- Creating the activity_log table
CREATE TABLE "activityLog" (
    "activityID" SERIAL PRIMARY KEY,
    "userID" INT,
    "activityType" VARCHAR(50) NOT NULL,
    "activityDescription" TEXT,
    "boardID" INT,
    "listID" INT,
    "cardID" INT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userID") REFERENCES "users"("userID") ON DELETE CASCADE,
    FOREIGN KEY ("boardID") REFERENCES "boards"("boardID") ON DELETE CASCADE,
    FOREIGN KEY ("listID") REFERENCES "lists"("listID") ON DELETE CASCADE,
    FOREIGN KEY ("cardID") REFERENCES "cards"("cardID") ON DELETE CASCADE
);
