// shelfsFE.js

const baseUrl = "/api/shelves"; // Replace with your actual API base URL

// DOM Elements
const ShelfAddForm = document.getElementById("ShelfAddForm");
const findShelfForm = document.getElementById("findShelfForm");
const updateShelfForm = document.getElementById("updateAdminForm");
const ShelfTable = document.getElementById("ShelfTable").querySelector("tbody");
const ShelfDetails = document.getElementById("ShelfDetails");

// Fetch all shelves and populate the table
async function fetchAllShelves() {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();

        // Clear existing table rows
        ShelfTable.innerHTML = "";

        // Populate the table with data
        data.forEach(shelf => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${shelf.shelveCode}</td>
                <td>${shelf.shelveDescription}</td>
                <td>${shelf.capacity}</td>
                <td>${shelf.sh_adminID}</td>
                <td>${shelf.sh_brancheID}</td>
                <td>
                    <button class="edit-btn" data-id="${shelf.shelveCode}">Edit</button>
                    <button class="delete-btn" data-id="${shelf.shelveCode}">Delete</button>
                </td>
            `;
            ShelfTable.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching shelves:", error);
        alert("Failed to fetch shelves. Please try again later.");
    }
}

// Add a new shelf
ShelfAddForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newShelf = {
        description: document.getElementById("shelfs_shelveDescription").value,
        capacity: parseInt(document.getElementById("shelfs_capCacity").value),
        adminID: document.getElementById("shelfs_adminID").value,
        brancheID: document.getElementById("shelfs_brancheID").value
    };

    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newShelf)
        });

        if (response.ok) {
            alert("Shelf added successfully.");
            fetchAllShelves();
            ShelfAddForm.reset();
        } else {
            alert("Failed to add shelf. Please try again.");
        }
    } catch (error) {
        console.error("Error adding shelf:", error);
    }
});

// Find a shelf by ID
findShelfForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const shelveCode = document.getElementById("shelfs_shelveCode").value;
    const brancheID = document.getElementById("shelfs_brancheID").value;

    try {
        const response = await fetch(`${baseUrl}/${shelveCode}?brancheID=${brancheID}`);
        if (response.ok) {
            const shelf = await response.json();
            ShelfDetails.innerHTML = `
                <p><strong>Description:</strong> ${shelf.shelveDescription}</p>
                <p><strong>Capacity:</strong> ${shelf.capacity}</p>
                <p><strong>Admin ID:</strong> ${shelf.sh_adminID}</p>
                <p><strong>Branche ID:</strong> ${shelf.sh_brancheID}</p>
            `;
        } else {
            ShelfDetails.innerHTML = "<p>Shelf not found.</p>";
        }
    } catch (error) {
        console.error("Error fetching shelf:", error);
        ShelfDetails.innerHTML = "<p>Error fetching shelf details.</p>";
    }
});

// Handle edit and delete actions
ShelfTable.addEventListener("click", async (event) => {
    if (event.target.classList.contains("edit-btn")) {
        // Prefill the update form with shelf details
        const shelveCode = event.target.dataset.id;
        try {
            const response = await fetch(`${baseUrl}/${shelveCode}`);
            if (response.ok) {
                const shelf = await response.json();
                document.getElementById("updateShelfCode").value = shelf.shelveCode;
                document.getElementById("updateShelfDescription").value = shelf.shelveDescription;
                document.getElementById("updateShelfcapacity").value = shelf.capacity;
                document.getElementById("updateShelfadminID").value = shelf.sh_adminID;
                document.getElementById("updateShelfbrancheID").value = shelf.sh_brancheID;
            }
        } catch (error) {
            console.error("Error fetching shelf for edit:", error);
        }
    } else if (event.target.classList.contains("delete-btn")) {
        // Delete a shelf
        const shelveCode = event.target.dataset.id;
        if (confirm("Are you sure you want to delete this shelf?")) {
            try {
                const response = await fetch(`${baseUrl}/${shelveCode}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    alert("Shelf deleted successfully.");
                    fetchAllShelves();
                } else {
                    alert("Failed to delete shelf. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting shelf:", error);
            }
        }
    }
});

// Update shelf
updateShelfForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedShelf = {
        shelveDescription: document.getElementById("updateShelfDescription").value,
        capacity: parseInt(document.getElementById("updateShelfcapacity").value),
        sh_adminID: document.getElementById("updateShelfadminID").value,
        sh_brancheID: document.getElementById("updateShelfbrancheID").value
    };

    const shelveCode = document.getElementById("updateShelfCode").value;

    try {
        const response = await fetch(`${baseUrl}/${shelveCode}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedShelf)
        });

        if (response.ok) {
            alert("Shelf updated successfully.");
            fetchAllShelves();
            updateShelfForm.reset();
        } else {
            alert("Failed to update shelf. Please try again.");
        }
    } catch (error) {
        console.error("Error updating shelf:", error);
    }
});

// Initialize data on page load
fetchAllShelves();



