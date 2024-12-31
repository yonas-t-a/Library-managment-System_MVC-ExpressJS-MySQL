CREATE TABLE IF NOT EXISTS shelves (
    shelveCode VARCHAR(100) NOT NULL,
    shelveDescription VARCHAR(100) NOT NULL,
    capacity int NOT NULL,
    sh_adminID VARCHAR(100) NOT NULL,
    sh_brancheID VARCHAR(100) NOT NULL,
    PRIMARY KEY(shelveCode, sh_brancheID),
    FOREIGN KEY (sh_adminID) REFERENCES admin(adminID) ON DELETE CASCADE,
    FOREIGN KEY (sh_brancheID) REFERENCES branches(brancheID) ON DELETE CASCADE
);