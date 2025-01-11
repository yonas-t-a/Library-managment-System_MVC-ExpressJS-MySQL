const API_BASE_URL = '/api/book'; // Base URL for book-related backend APIs

// Helper function to fetch and render all books in the table
async function fetchBooks() {
    try {
        const response = await fetch(`${API_BASE_URL}`);
        const books = await response.json();
        console.log(books)

        const bookTableBody = document.querySelector('#bookTable tbody');
        bookTableBody.innerHTML = ''; // Clear existing rows

        books.forEach((book) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.bookID}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.ISBN || 'N/A'}</td>
                <td>${book.publisher}</td>
                <td>${book.book_catagoryID}</td>
                <td>${book.book_shelveCode}</td>
                <td>
                    <button class="edit-btn" data-id="${book.bookID}">Edit</button>
                    <button class="delete-btn" data-id="${book.bookID}">Delete</button>
                </td>
            `;
            bookTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Add a new book
document.querySelector('#addBookForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const bookData = {
        title: document.querySelector('#bookTitle').value,
        author: document.querySelector('#bookAuthor').value,
        ISBN: document.querySelector('#bookISBN').value,
        publisher: document.querySelector('#bookPublisher').value,
        book_catagoryID: document.querySelector('#book_catagoryID').value,
        book_shelveCode: document.querySelector('#book_shelveCode').value,
    };

    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
        });

        if (response.ok) {
            alert('Book added successfully!');
            fetchBooks(); // Refresh the book table
        } else {
            const error = await response.json();
            alert(`Error adding book: ${error.message}`);
        }
    } catch (error) {
        console.error('Error adding book:', error);
    }
});

// Fetch a book by ID
document.querySelector('#findBookForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const bookId = document.querySelector('#bookId').value;

    try {
        const response = await fetch(`${API_BASE_URL}/${bookId}`);
        if (response.ok) {
            const [book] = await response.json();
            const bookDetails = `
                <p><strong>ID:</strong> ${book.bookID}</p>
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>ISBN:</strong> ${book.ISBN || 'N/A'}</p>
                <p><strong>Publisher:</strong> ${book.publisher}</p>
                <p><strong>Category ID:</strong> ${book.book_catagoryID}</p>
                <p><strong>Shelf Code:</strong> ${book.book_shelveCode}</p>
            `;
            document.querySelector('#bookDetails').innerHTML = bookDetails;
        } else {
            alert('Book not found!');
        }
    } catch (error) {
        console.error('Error fetching book:', error);
    }
});

// Handle book updates
document.querySelector('#updateBookForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const bookId = document.querySelector('#updateBookId').value;
    const updatedBookData = {
        title: document.querySelector('#updateBookTitle').value,
        author: document.querySelector('#updateBookAuthor').value,
        ISBN: document.querySelector('#updateBookISBN').value,
        publisher: document.querySelector('#updateBookPublisher').value,
        book_catagoryID: document.querySelector('#updateBook_catagoryID').value,
        book_shelveCode: document.querySelector('#updateBook_shelveCode').value,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/${bookId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBookData),
        });

        if (response.ok) {
            alert('Book updated successfully!');
            fetchBooks(); // Refresh the book table
        } else {
            const error = await response.json();
            alert(`Error updating book: ${error.message}`);
        }
    } catch (error) {
        console.error('Error updating book:', error);
    }
});

// Handle delete and edit button clicks in the table
document.querySelector('#bookTable').addEventListener('click', async (event) => {
    console.log(event)
    const target = event.target;
    const bookId = target.dataset.id;
    console.log(bookId)

    if (target.classList.contains('delete-btn')) {
        // Delete book
        try {
            const response = await fetch(`${API_BASE_URL}/${bookId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Book deleted successfully!');
                fetchBooks(); // Refresh the book table
            } else {
                const error = await response.json();
                alert(`Error deleting book: ${error.message}`);
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    } else if (target.classList.contains('edit-btn')) {
        // Populate the update form with book data
        try {
            const response = await fetch(`${API_BASE_URL}/${bookId}`);
            if (response.ok) {
                const [book]= await response.json();
                console.log(book)
                document.querySelector('#updateBookId').value = book.bookID;
                document.querySelector('#updateBookTitle').value = book.title;
                document.querySelector('#updateBookAuthor').value = book.author;
                document.querySelector('#updateBookISBN').value = book.ISBN || '';
                document.querySelector('#updateBookPublisher').value = book.publisher;
                document.querySelector('#updateBook_catagoryID').value = book.book_catagoryID;
                document.querySelector('#updateBook_shelveCode').value = book.book_shelveCode;
            }
        } catch (error) {
            console.error('Error fetching book for editing:', error);
        }
    }
});

// Initialize by fetching all books
fetchBooks();
