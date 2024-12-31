CREATE TABLE IF NOT EXISTS shelfWithCatagory(
    swc_shelveCode VARCHAR(100) NOT NULL,
    swc_catagoryID VARCHAR(100) NOT NULL,
    FOREIGN KEY (swc_shelveCode) REFERENCES shelves(shelveCode) ON DELETE CASCADE,
    FOREIGN KEY (swc_catagoryID) REFERENCES catagories(catagoryID) ON DELETE CASCADE
);