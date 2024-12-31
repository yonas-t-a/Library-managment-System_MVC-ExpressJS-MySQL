CREATE TABLE IF NOT EXISTS fines(
    fineID VARCHAR(100) PRIMARY KEY,
    amount INT NOT NULL,
    paidStatus BOOLEAN NOT NULL DEFAULT FALSE,
    datePaid DATE NOT NULL,
    fs_transactionID VARCHAR(100) NOT NULL,
    FOREIGN KEY (fs_transactionID) REFERENCES transaction(transactionID) ON DELETE CASCADE
);