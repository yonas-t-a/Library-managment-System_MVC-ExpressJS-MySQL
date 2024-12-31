CREATE TABLE IF NOT EXISTS staff(
    staffID VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hire_Date DATE,
    salary int NOT NULL,
    st_brancheID VARCHAR(100) NOT NULL,
    st_adminID VARCHAR(100) NOT NULL,
    FOREIGN KEY (st_brancheID) REFERENCES branches(brancheID) ON DELETE CASCADE,
    FOREIGN KEY (st_adminID) REFERENCES admin(adminID) ON DELETE CASCADE
);