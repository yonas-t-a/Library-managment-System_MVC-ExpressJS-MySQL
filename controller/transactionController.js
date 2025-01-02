import transactionModel from "../model/transaction.js";

export async function createTransaction(req, res) {
    const { issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID } = req.body;
    try {
        await transactionModel.insertTransaction(issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID);
        res.status(201).send("Transaction successfully created");
    } catch (error) {
        res.status(500).send(`Error in inserting data into Transaction table | Controller: ${error.message}`);
    }
}

export async function getAllTransaction(req, res) {
    try {
        const result = await transactionModel.getAllTransactions();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching all transactions | Controller: ${error.message}`);
    }
}

export async function getTransactionById(req, res) {
    const { transactionID } = req.params;
    try {
        const result = await transactionModel.getTransactionByID(transactionID);
        if (!result) {
            return res.status(404).send("Transaction not found");
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching the transaction by ID | Controller: ${error.message}`);
    }
}

export async function updateTransaction(req, res) {
    const { transactionID } = req.params;
    const { issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID } = req.body;

    const updatedIssueDate = issueDate || await transactionModel.transactionIssueDate(transactionID);
    const updatedDueDate = dueDate || await transactionModel.transactionDueDate(transactionID);
    const updatedReturnDate = returnDate || await transactionModel.transactionReturnDate(transactionID);
    const updatedTlMemberID = tl_memberID || await transactionModel.transactionMemberID(transactionID);
    const updatedTlBorrowID = tl_borrowID || await transactionModel.transactionBorrowID(transactionID);
    const updatedTlBookID = tl_bookID || await transactionModel.transactionBookID(transactionID);

    try {
        await transactionModel.updateTransaction(
            transactionID,
            updatedIssueDate,
            updatedDueDate,
            updatedReturnDate,
            updatedTlMemberID,
            updatedTlBorrowID,
            updatedTlBookID
        );
        res.status(200).send("Transaction successfully updated");
    } catch (error) {
        res.status(500).send(`Error in updating transaction | Controller: ${error.message}`);
    }
}

export async function deleteTransaction(req, res) {
    const { transactionID } = req.params;
    try {
        await transactionModel.deleteTransaction(transactionID);
        res.status(200).send("Transaction successfully deleted");
    } catch (error) {
        res.status(500).send(`Error in deleting the transaction by ID | Controller: ${error.message}`);
    }
}
