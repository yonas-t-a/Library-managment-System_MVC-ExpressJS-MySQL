CREATE TABLE IF NOT EXISTS reservation(
    reservationID VARCHAR(100) PRIMARY KEY,
    reservationDate DATE NOT NULL,
    status VARCHAR(100) NOT NULL,
    res_bookID INT NOT NULL,
    res_memberID VARCHAR(100) NOT NULL,
    FOREIGN KEY (res_bookID) REFERENCES book(bookID) ON DELETE CASCADE,
    FOREIGN KEY (res_memberID) REFERENCES member(memberID) ON DELETE CASCADE
);