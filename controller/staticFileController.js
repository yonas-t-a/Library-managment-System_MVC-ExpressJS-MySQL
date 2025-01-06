import {fileURLToPath} from 'url'
import {dirname, join} from 'path'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = dirname(__fileName)

const staticAdminFileLocation       = join(__dirname, "..", 'view', 'admin', 'admin.html')
const staticBranchesFileLocation    = join(__dirname, "..", 'view', 'admin', 'branches.html')
const staticStaffsFileLocation      = join(__dirname, "..", 'view', 'admin', 'staffs.html')
const staticShelfsFileLocation      = join(__dirname, "..", 'view', 'admin', 'shelfs.html')


const staticBooksFileLocation       = join(__dirname, "..", 'view', 'staff', 'books.html')
const staticFinesFileLocation       = join(__dirname, "..", 'view', 'staff', 'fines.html')
const staticMembersFileLocation     = join(__dirname, "..", 'view', 'staff', 'members.html')
const staticNonMembersFileLocation  = join(__dirname, "..", 'view', 'staff', 'nonMembers.html')
const staticResercationFileLocation = join(__dirname, "..", 'view', 'staff', 'reservation.html')
const staticTransactionFileLocation = join(__dirname, "..", 'view', 'staff', 'transaction.html')




const staticCatagoryFileLocation    = join(__dirname, '..', 'view', 'catagory.html')
const staticIndexFileLocation       = join(__dirname, '..', 'view', 'index.html')


export async function adminPageHtml         (req, res) {
    try {
        res.sendFile(staticAdminFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticAdminFileLocation}: ${error.message}`)
    }
}
export async function branchesPageHtml      (req, res) {
    try {
        res.sendFile(staticBranchesFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticBranchesFileLocation}: ${error.message}`)
    }
}
export async function indexPageHtml         (req, res) {
    try {
        res.sendFile(staticIndexFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticIndexFileLocation}: ${error.message}`)
    }
}
export async function shelfsPageHtml        (req, res) {
    try {
        res.sendFile(staticShelfsFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticStaffsFileLocation}: ${error.message}`)
    }
}
export async function staffsPageHtml        (req, res) {
    try {
        res.sendFile(staticStaffsFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticStaffsFileLocation}: ${error.message}`)
    }
}
export async function booksPageHtml         (req, res) {
    try {
        res.sendFile(staticBooksFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticBooksFileLocation}: ${error.message}`)
    }
}
export async function finesPageHtml         (req, res) {
    try {
        res.sendFile(staticFinesFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticFinesFileLocation}: ${error.message}`)
    }
}
export async function membersPageHtml       (req, res) {
    try {
        res.sendFile(staticMembersFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticMembersFileLocation}: ${error.message}`)
    }
}
export async function nonMembersPageHtml    (req, res) {
    try {
        res.sendFile(staticNonMembersFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticNonMembersFileLocation}: ${error.message}`)
    }
}
export async function reservationPageHtml   (req, res) {
    try {
        res.sendFile(staticResercationFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticResercationFileLocation}: ${error.message}`)
    }
}
export async function transactionPageHtml   (req, res) {
    try {
        res.sendFile(staticTransactionFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticTransactionFileLocation}: ${error.message}`)
    }
}
export async function catagoryPageHtml(req, res) {
    try {
        res.sendFile(staticCatagoryFileLocation)
    } catch (error) {
        console.log(`Error in dealing with ${staticCatagoryFileLocation}: ${error.message}`)
    }
}
