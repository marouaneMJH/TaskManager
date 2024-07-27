-- Table to store user information
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table to store boards
CREATE TABLE Boards (
    BoardID SERIAL PRIMARY KEY,
    BoardName VARCHAR(100) NOT NULL,
    UserID INT,
    CreatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table to store lists within boards
CREATE TABLE Lists (
    ListID SERIAL PRIMARY KEY,
    ListName VARCHAR(100) NOT NULL,
    BoardID INT ,
    CreatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (BoardID) REFERENCES Boards(BoardID)
);

-- Table to store cards within lists
CREATE TABLE Cards (
    CardID SERIAL PRIMARY KEY,
    CardTitle VARCHAR(255) NOT NULL,
    CardDescription TEXT,
    ListID INT,
    CreatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ListID) REFERENCES Lists(ListID)
);

-- Table to store comments on cards
CREATE TABLE Comments (
    CommentID SERIAL PRIMARY KEY,
    CommentText TEXT NOT NULL,
    UserID INT,
    CardID INT,
    CreatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CardID) REFERENCES Cards(CardID)
);

-- Table to store labels
CREATE TABLE Labels (
    LabelID SERIAL PRIMARY KEY,
    LabelName VARCHAR(50) NOT NULL,
    LabelColor VARCHAR(7) NOT NULL -- Assuming color is stored in hex format
);

-- Table to manage many-to-many relationship between cards and labels
CREATE TABLE Card_Labels (
    CardID INT,
    LabelID INT,
    PRIMARY KEY (CardID, LabelID),
    FOREIGN KEY (CardID) REFERENCES Cards(CardID),
    FOREIGN KEY (LabelID) REFERENCES Labels(LabelID)
);

-- Table to track activities on boards, lists, and cards
CREATE TABLE Activity_Log (
    ActivityID SERIAL PRIMARY KEY,
    UserID INT,
    ActivityType VARCHAR(50),
    ActivityDescription TEXT,
    BoardID INT,
    ListID INT,
    CardID INT,
    CreatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (BoardID) REFERENCES Boards(BoardID),
    FOREIGN KEY (ListID) REFERENCES Lists(ListID),
    FOREIGN KEY (CardID) REFERENCES Cards(CardID)
);
