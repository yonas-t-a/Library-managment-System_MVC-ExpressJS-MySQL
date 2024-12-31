CREATE TABLE IF NOT EXISTS nonMemberBorrower(
    borrowID VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    IDProof_Status BOOLEAN NOT NULL,
    status VARCHAR(100) NOT NULL
);