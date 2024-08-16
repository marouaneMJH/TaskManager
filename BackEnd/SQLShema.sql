
--  Customize for Ts types


-- Creating the users table
CREATE TABLE "users" (
    "userID" INT PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "passwordHash" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating the boards table
CREATE TABLE "boards" (
    "boardID" INT PRIMARY KEY,
    "boardName" VARCHAR(255) NOT NULL,
    "userID" INT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userID") REFERENCES "users"("userID")
);

-- Creating the lists table
CREATE TABLE "lists" (
    "listID" INT PRIMARY KEY,
    "listName" VARCHAR(255) NOT NULL,
    "boardID" INT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("boardID") REFERENCES "boards"("boardID")
);

-- Creating the cards table
CREATE TABLE "cards" (
    "cardID" INT PRIMARY KEY,
    "cardTitle" VARCHAR(255) NOT NULL,
    "cardDescription" TEXT,
    "listID" INT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("listID") REFERENCES "lists"("listID")
);

-- Creating the comments table
CREATE TABLE "comments" (
    "commentID" INT PRIMARY KEY,
    "commentText" TEXT NOT NULL,
    "userID" INT,
    "cardID" INT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userID") REFERENCES "users"("userID"),
    FOREIGN KEY ("cardID") REFERENCES "cards"("cardID")
);

-- Creating the labels table
CREATE TABLE "labels" (
    "labelID" INT PRIMARY KEY,
    "labelName" VARCHAR(255) NOT NULL,
    "labelColor" VARCHAR(7) NOT NULL
);

-- Creating the card_labels table
CREATE TABLE "cardLabels" (
    "cardID" INT,
    "labelID" INT,
    PRIMARY KEY ("cardID", "labelID"),
    FOREIGN KEY ("cardID") REFERENCES "cards"("cardID"),
    FOREIGN KEY ("labelID") REFERENCES "labels"("labelID")
);

-- Creating the activity_log table
CREATE TABLE "activityLog" (
    "activityID" INT PRIMARY KEY,
    "userID" INT,
    "activityType" VARCHAR(50) NOT NULL,
    "activityDescription" TEXT,
    "boardID" INT,
    "listID" INT,
    "cardID" INT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userID") REFERENCES "users"("userID"),
    FOREIGN KEY ("boardID") REFERENCES "boards"("boardID"),
    FOREIGN KEY ("listID") REFERENCES "lists"("listID"),
    FOREIGN KEY ("cardID") REFERENCES "cards"("cardID")
);


