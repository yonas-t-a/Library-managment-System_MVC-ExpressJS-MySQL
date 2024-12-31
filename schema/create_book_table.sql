CREATE TABLE IF NOT EXISTS book(
    bookID int AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(50) NOT NULL,
    ISBN VARCHAR(13),
    publisher VARCHAR(100) NOT NULL,
    book_catagoryID VARCHAR(100) NOT NULL,
    book_shelveCode VARCHAR(100) NOT NULL,
    FOREIGN KEY (book_catagoryID) REFERENCES catagories(catagoryID) ON DELETE CASCADE,
    FOREIGN KEY (book_shelveCode) REFERENCES shelves(shelveCode) ON DELETE CASCADE 
);