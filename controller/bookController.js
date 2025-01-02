import bookModel from "../model/book.js";

// Create a new book
export async function createBook(req, res) {
    const { title, author, ISBN, publisher, book_catagoryID, book_shelveCode } = req.body;
    try {
        await bookModel.insertBook(title, author, ISBN, publisher, book_catagoryID, book_shelveCode);
        res.status(201).send('Book successfully added');
    } catch (error) {
        res.status(500).send(`Error in inserting data into Book table | Controller: ${error.message}`);
    }
}

// Get all books
export async function getAllBook(req, res) {
    try {
        const result = await bookModel.getAllBooks();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching all books | Controller: ${error.message}`);
    }
}

// Get book by ID
export async function getBookById(req, res) {
    const id = req.params.id;
    try {
        const result = await bookModel.getBookByID(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching the book by ID | Controller: ${error.message}`);
    }
}

// Update a book
export async function updateBook(req, res) {
    const id = req.params.id;
    const { title, author, ISBN, publisher, book_catagoryID, book_shelveCode } = req.body;

    const updatedTitle = title || await bookModel.bookTitle(id);
    const updatedAuthor = author || await bookModel.bookAuthor(id);
    const updatedISBN = ISBN || await bookModel.bookISBN(id);
    const updatedPublisher = publisher || await bookModel.bookPublisher(id);
    const updatedCatagoryID = book_catagoryID || await bookModel.bookCatagoryID(id);
    const updatedShelveCode = book_shelveCode || await bookModel.bookShelveCode(id);

    try {
        await bookModel.updateBook(id, updatedTitle, updatedAuthor, updatedISBN, updatedPublisher, updatedCatagoryID, updatedShelveCode);
        res.status(200).send('Book successfully updated');
    } catch (error) {
        res.status(500).send(`Error in updating the book | Controller: ${error.message}`);
    }
}

// Delete a book
export async function deleteBook(req, res) {
    const id = req.params.id;
    try {
        await bookModel.deleteBook(id);
        res.status(200).send('Book successfully deleted');
    } catch (error) {
        res.status(500).send(`Error in deleting the book | Controller: ${error.message}`);
    }
}

