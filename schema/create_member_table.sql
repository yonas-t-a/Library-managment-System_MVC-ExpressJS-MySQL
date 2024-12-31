CREATE TABLE IF NOT EXISTS member(
    memberID VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_membership DATE NOT NULL,
    memberhip_status VARCHAR(100) NOT NULL
);