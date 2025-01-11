// Base API URL
const BASE_URL = '/api/catagorie';

// Function to fetch and display all categories
async function fetchAllCategories() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch categories');
        
        const categories = await response.json();
        const tableBody = document.querySelector('#categoryTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        categories.forEach(category => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${category.catagoryID}</td>
                <td>${category.catagoryName}</td>
                <td>${category.description || 'N/A'}</td>
                <td>
                    <button class="edit-btn" data-id="${category.catagoryID}">Edit</button>
                    <button class="delete-btn" data-id="${category.catagoryID}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', handleEdit));
        document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', handleDelete));
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Function to handle adding a new category
async function addCategory(event) {
    event.preventDefault();
    const name = document.getElementById('catagoryName').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ catagoryName: name, description }),
        });
        if (!response.ok) throw new Error('Failed to add category');

        alert('Category added successfully!');
        event.target.reset();
        fetchAllCategories();
    } catch (error) {
        console.error('Error adding category:', error);
    }
}

// Function to fetch a category by ID
async function fetchCategoryById(event) {
    event.preventDefault();
    const id = document.getElementById('catagoryID').value;

    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Category not found');
        
        const [category] = await response.json();
        const detailsDiv = document.getElementById('categoryDetails');
        detailsDiv.innerHTML = `
            <p>ID: ${category.catagoryID}</p>
            <p>Name: ${category.catagoryName}</p>
            <p>Description: ${category.description || 'N/A'}</p>
        `;
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}

// Function to handle editing a category
function handleEdit(event) {
    const id = event.target.dataset.id;
    document.getElementById('updateCatagoryID').value = id;

    const row = event.target.closest('tr');
    document.getElementById('updateCatagoryName').value = row.children[1].textContent;
    document.getElementById('updateDescription').value = row.children[2].textContent;
}

// Function to update a category
async function updateCategory(event) {
    event.preventDefault();
    const id = document.getElementById('updateCatagoryID').value;
    const name = document.getElementById('updateCatagoryName').value;
    const description = document.getElementById('updateDescription').value;

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ catagoryName: name, description }),
        });
        if (!response.ok) throw new Error('Failed to update category');

        alert('Category updated successfully!');
        event.target.reset();
        fetchAllCategories();
    } catch (error) {
        console.error('Error updating category:', error);
    }
}

// Function to delete a category
async function handleDelete(event) {
    const id = event.target.dataset.id;

    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete category');

        alert('Category deleted successfully!');
        fetchAllCategories();
    } catch (error) {
        console.error('Error deleting category:', error);
    }
}

// Event listeners
document.getElementById('addCategoryForm').addEventListener('submit', addCategory);
document.getElementById('findCategoryForm').addEventListener('submit', fetchCategoryById);
document.getElementById('updateCategoryForm').addEventListener('submit', updateCategory);

// Fetch all categories on page load
fetchAllCategories();
