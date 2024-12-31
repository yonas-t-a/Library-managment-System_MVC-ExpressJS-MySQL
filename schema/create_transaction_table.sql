CREATE TABLE IF NOT EXISTS transaction(
    transactionID VARCHAR(100) PRIMARY KEY,
    issueDate DATE NOT NULL,
    dueDate DATE NOT NULL,
    returnDate DATE NOT NULL,
    tl_memberID  VARCHAR(100) NOT NULL, 
    tl_borrowID VARCHAR(100) NOT NULL,
    tl_bookID INT NOT NULL,
    FOREIGN KEY (tl_memberID) REFERENCES member(memberID) ON DELETE CASCADE,
    FOREIGN KEY (tl_borrowID) REFERENCES nonMemberBorrower(borrowID) ON DELETE CASCADE,
    FOREIGN KEY (tl_bookID) REFERENCES book(bookID) ON DELETE CASCADE
);