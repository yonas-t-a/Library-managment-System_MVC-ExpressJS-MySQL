const bookList = document.getElementById('bookList');
const addBookForm = document.getElementById('addBookForm');

// Fetch and display all books
async function fetchBooks() {
    try {
        const response = await fetch('/api/book');
        const books = await response.json();
        bookList.innerHTML = '';
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.bookID}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.ISBN || '-'}</td>
                <td>${book.publisher}</td>
                <td>${book.book_catagoryID}</td>
                <td>${book.book_shelveCode}</td>
                <td>
                    <button onclick="editBook(${book.bookID})">Edit</button>
                    <button onclick="deleteBook(${book.bookID})">Delete</button>
                </td>
            `;
            bookList.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Add a new book
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        ISBN: document.getElementById('isbn').value,
        publisher: document.getElementById('publisher').value,
        book_catagoryID: document.getElementById('categoryId').value,
        book_shelveCode: document.getElementById('shelveCode').value,
    };

    try {
        const response = await fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
        });
        if (response.ok) {
            alert('Book added successfully!');
            fetchBooks();
            addBookForm.reset();
        } else {
            alert('Error adding book');
        }
    } catch (error) {
        console.error('Error adding book:', error);
    }
});

// Delete a book
async function deleteBook(bookID) {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
        const response = await fetch(`/api/book/${bookID}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Book deleted successfully!');
            fetchBooks();
        } else {
            alert('Error deleting book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

// Edit a book
async function editBook(bookID) {
    const newTitle = prompt('Enter new title:');
    const newAuthor = prompt('Enter new author:');
    const newPublisher = prompt('Enter new publisher:');
    const newCategoryId = prompt('Enter new category ID:');
    const newShelveCode = prompt('Enter new shelve code:');

    if (!newTitle || !newAuthor || !newPublisher || !newCategoryId || !newShelveCode) {
        alert('All fields are required!');
        return;
    }

    const updatedData = {
        title: newTitle,
        author: newAuthor,
        publisher: newPublisher,
        book_catagoryID: newCategoryId,
        book_shelveCode: newShelveCode,
    };

    try {
        const response = await fetch(`/api/book/${bookID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        if (response.ok) {
            alert('Book updated successfully!');
            fetchBooks();
        } else {
            alert('Error updating book');
        }
    } catch (error) {
        console.error('Error updating book:', error);
    }
}

// Initial fetch
fetchBooks();
