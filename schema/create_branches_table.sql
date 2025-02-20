CREATE TABLE IF NOT EXISTS branches(
    brancheID VARCHAR(100) PRIMARY KEY,
    address VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    br_adminID VARCHAR(100) NOT NULL,
    FOREIGN KEY (br_adminID) REFERENCES admin(adminID) ON DELETE CASCADE
);