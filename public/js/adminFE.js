const baseUrl = 'http://localhost:3500/api/adminstrator'; // Updated base URL

// Function to fetch all admins and update the table
async function fetchAdmins() {
    try {
        const response = await fetch(baseUrl);
        if (response.ok) {
            const admins = await response.json();
            const tbody = document.getElementById('adminTable').querySelector('tbody');
            tbody.innerHTML = ''; // Clear existing data

            admins.forEach((admin) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${admin.adminID || admin.id}</td>
                    <td>${admin.name}</td>
                    <td>${admin.email}</td>
                    <td>${admin.phone_number}</td>
                    <td>${admin.password}</td> <!-- Display password -->
                    <td>
                        <button class="update-btn" onclick="editAdmin('${admin.adminID || admin.id}', '${admin.name}', '${admin.email}', '${admin.phone_number}', '${admin.password}')">Update</button>
                        <button class="delete-btn" onclick="deleteAdmin('${admin.adminID || admin.id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } else {
            const errorData = await response.json();
            alert(`Error fetching admins: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch admins every 5 seconds (polling mechanism)
setInterval(fetchAdmins, 5000); // Adjust the interval (in milliseconds) if needed

// Fetch all admins immediately when the page loads
window.addEventListener('load', fetchAdmins);

// Edit Admin
function editAdmin(id, name, email, phoneNumber, password) {
    document.getElementById('updateAdminId').value = id;
    document.getElementById('updateAdminName').value = name;
    document.getElementById('updateAdminEmail').value = email;
    document.getElementById('updateAdminPhoneNumber').value = phoneNumber;
    document.getElementById('updateAdminPassword').value = password; // Include password for update
}

// Delete Admin
async function deleteAdmin(id) {
    if (confirm('Are you sure you want to delete this admin?')) {
        try {
            const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });

            if (response.ok) {
                alert('Admin deleted successfully');
                fetchAdmins(); // Refresh the table after deletion
            } else {
                const errorData = await response.json();
                alert(`Error deleting admin: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// Add Admin
document.getElementById('addAdminForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('adminName').value;
    const email = document.getElementById('adminEmail').value;
    const phoneNumber = document.getElementById('adminPhoneNumber').value;
    const password = document.getElementById('adminPassword').value;

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone_number: phoneNumber, password }),
        });

        if (response.ok) {
            alert('Admin added successfully');
            document.getElementById('addAdminForm').reset();
            fetchAdmins(); // Refresh table after adding
        } else {
            const errorData = await response.json();
            alert(`Error adding admin: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Update Admin
document.getElementById('updateAdminForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('updateAdminId').value;
    const name = document.getElementById('updateAdminName').value;
    const email = document.getElementById('updateAdminEmail').value;
    const phoneNumber = document.getElementById('updateAdminPhoneNumber').value;
    const password = document.getElementById('updateAdminPassword').value;

    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                phone_number: phoneNumber,
                password: password || undefined,  // Only include password if it is set
            }),
        });

        if (response.ok) {
            alert('Admin updated successfully');
            document.getElementById('updateAdminForm').reset();
            fetchAdmins(); // Refresh table after update
        } else {
            const errorData = await response.json();
            alert(`Error updating admin: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Find Admin by ID
document.getElementById('findAdminForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const adminId = document.getElementById('adminId').value;

    try {
        const response = await fetch(`${baseUrl}/${adminId}`);
        if (response.ok) {
            const admin = await response.json();
            const adminDetailsDiv = document.getElementById('adminDetails');
            adminDetailsDiv.innerHTML = `
                <p>ID: ${admin.adminID || admin.id}</p>
                <p>Name: ${admin.name}</p>
                <p>Email: ${admin.email}</p>
                <p>Phone Number: ${admin.phone_number}</p>
                <p>Password: ${admin.password}</p> <!-- Display password -->
            `;
        } else {
            const errorData = await response.json();
            alert(`Error finding admin: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
