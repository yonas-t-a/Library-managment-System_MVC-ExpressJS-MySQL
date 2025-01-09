import {fileURLToPath} from 'url'
import {dirname, join} from 'path'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = dirname(__fileName)

const staticAdminFileLocation       = join(__dirname, "..", 'views', 'admin', 'admin.html')
const staticBranchesFileLocation    = join(__dirname, "..", 'views', 'admin', 'branches.html')
const staticStaffsFileLocation      = join(__dirname, "..", 'views', 'admin', 'staffs.html')
const staticShelfsFileLocation      = join(__dirname, "..", 'views', 'admin', 'shelfs.html')


const staticBooksFileLocation       = join(__dirname, "..", 'views', 'staff', 'books.html')
const staticFinesFileLocation       = join(__dirname, "..", 'views', 'staff', 'fines.html')
const staticMembersFileLocation     = join(__dirname, "..", 'views', 'staff', 'members.html')
const staticNonMembersFileLocation  = join(__dirname, "..", 'views', 'staff', 'nonMembers.html')
const staticReservationFileLocation = join(__dirname, "..", 'views', 'staff', 'reservation.html');
const staticTransactionFileLocation = join(__dirname, "..", 'views', 'staff', 'transaction.html')


const staticshelfWithCatagoryFileLocation = join(__dirname, '..', 'views',"shelfWithCatagory.html")
const staticCategoryFileLocation    = join(__dirname, '..', 'views', 'catagory.html');
const staticIndexFileLocation       = join(__dirname, '..', 'views', 'index.html')


export async function adminPageHtml         (req, res) {
    try {
        res.sendFile(staticAdminFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticAdminFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function branchesPageHtml      (req, res) {
    try {
        res.sendFile(staticBranchesFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticBranchesFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function indexPageHtml         (req, res) {
    try {
        res.sendFile(staticIndexFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticIndexFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function shelfsPageHtml        (req, res) {
    try {
        res.sendFile(staticShelfsFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticStaffsFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function staffsPageHtml        (req, res) {
    try {
        res.sendFile(staticStaffsFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticStaffsFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function booksPageHtml         (req, res) {
    try {
        res.sendFile(staticBooksFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticBooksFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function finesPageHtml         (req, res) {
    try {
        res.sendFile(staticFinesFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticFinesFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function membersPageHtml       (req, res) {
    try {
        res.sendFile(staticMembersFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticMembersFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function nonMembersPageHtml    (req, res) {
    try {
        res.sendFile(staticNonMembersFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticNonMembersFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function reservationPageHtml   (req, res) {
    try {
        res.sendFile(staticReservationFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticReservationFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function transactionPageHtml   (req, res) {
    try {
        res.sendFile(staticTransactionFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticTransactionFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function catagoryPageHtml(req, res) {
    try {
        res.sendFile(staticCategoryFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticCategoryFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
export async function shelfWithCatagoryPageHtml(req, res) {
    try {
        res.sendFile(staticshelfWithCatagoryFileLocation);
    } catch (error) {
        console.log(`Error in dealing with ${staticshelfWithCatagoryFileLocation}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
}
