const API_BASE_URL = '/api/staffs';


const handleDate = (date) => {
  try {
  const dateString = new Date(date).toISOString().slice(0, 10); 
  return dateString;
  } catch (error) {
    console.log(error);
  }
}

// Helper function to fetch API data
async function fetchAPI(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}

// Add staff
document.getElementById('addStaffForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const staffData = {
        name: document.getElementById('staffName').value,
        role: document.getElementById('staffRole').value,
        phone_number: document.getElementById('staffPhoneNumber').value,
        email: document.getElementById('staffEmail').value,
        hire_Date: document.getElementById('staffHireDate').value,
        salary: document.getElementById('staffSalary').value,
        st_brancheID: document.getElementById('staff_brancheID').value,
        st_adminID: document.getElementById('staff_adminID').value,
    };

    const result = await fetchAPI(`${API_BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffData),
    });

    if (result) {
        alert('Staff added successfully!');
        document.getElementById('addStaffForm').reset();
        loadStaffTable();
    }
});

// Fetch staff by ID
document.getElementById('findStaffForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const staffID = document.getElementById('staffId').value;

    const [result] = await fetchAPI(`${API_BASE_URL}/${staffID}`);
    console.log(result)

    const detailsDiv = document.getElementById('staffDetails');
    if (result) {
        detailsDiv.innerHTML = `
            <p><strong>ID:</strong> ${result.staffID}</p>
            <p><strong>Name:</strong> ${result.name}</p>
            <p><strong>Role:</strong> ${result.role}</p>
            <p><strong>Phone Number:</strong> ${result.phone_number}</p>
            <p><strong>Email:</strong> ${result.email}</p>
            <p><strong>Hire Date:</strong> ${result.hire_Date}</p>
            <p><strong>Salary:</strong> ${result.salary}</p>
            <p><strong>Branch ID:</strong> ${result.st_brancheID}</p>
            <p><strong>Admin ID:</strong> ${result.st_adminID}</p>
        `;
    } else {
        detailsDiv.innerHTML = `<p>Staff not found.</p>`;
    }
});

// Load all staff
async function loadStaffTable() {
    const staffTableBody = document.querySelector('#staffTable tbody');
    staffTableBody.innerHTML = '';

    const staffs = await fetchAPI(`${API_BASE_URL}`);

    if (staffs && staffs.length > 0) {
        staffs.forEach((staff) => {
            const row = document.createElement('tr');
            const date = handleDate(staff.hire_Date);
            row.innerHTML = `
                <td>${staff.staffID}</td>
                <td>${staff.name}</td>
                <td>${staff.role}</td>
                <td>${staff.phone_number}</td>
                <td>${staff.email}</td>
                <td>${date}</td>
                <td>${staff.salary}</td>
                <td>${staff.st_brancheID}</td>
                <td>${staff.st_adminID}</td>
                <td>
                    <button class="edit-btn" data-id="${staff.staffID}">Edit</button>
                    <button class="delete-btn" data-id="${staff.staffID}">Delete</button>
                </td>
            `;
            staffTableBody.appendChild(row);
        });
    }
}

// Update staff
document.getElementById('updateStaffForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const staffID = document.getElementById('updateStaffId').value;

    const updatedStaff = {
        name: document.getElementById('updateStaffName').value,
        role: document.getElementById('updateStaffRole').value,
        phone_number: document.getElementById('updateStaffPhoneNumber').value,
        email: document.getElementById('updateStaffEmail').value,
        hire_Date: document.getElementById('updateStaffHireDate').value,
        salary: document.getElementById('updateStaffSalary').value,
        st_brancheID: document.getElementById('updateStaff_brancheID').value,
        st_adminID: document.getElementById('updateStaff_adminID').value,
    };

    const result = await fetchAPI(`${API_BASE_URL}/${staffID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStaff),
    });

    if (result) {
        alert('Staff updated successfully!');
        document.getElementById('updateStaffForm').reset();
        loadStaffTable();
    }
});

// Delete staff
document.querySelector('#staffTable').addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const staffID = e.target.dataset.id;

        const result = await fetchAPI(`${API_BASE_URL}/${staffID}`, {
            method: 'DELETE',
        });

        if (result) {
            alert('Staff deleted successfully!');
            loadStaffTable();
        }
    } else if (e.target.classList.contains('edit-btn')) {
        const staffID = e.target.dataset.id;
        // console.log(staffID)

        const [staff] = await fetchAPI(`${API_BASE_URL}/${staffID}`);
        const date = await handleDate(staff.hire_Date);

        if (staff) {
            document.getElementById('updateStaffId').value = staff.staffID;
            document.getElementById('updateStaffName').value = staff.name;
            document.getElementById('updateStaffRole').value = staff.role;
            document.getElementById('updateStaffPhoneNumber').value = staff.phone_number;
            document.getElementById('updateStaffEmail').value = staff.email;
            document.getElementById('updateStaffHireDate').value = date;
            document.getElementById('updateStaffSalary').value = staff.salary;
            document.getElementById('updateStaff_brancheID').value = staff.st_brancheID;
            document.getElementById('updateStaff_adminID').value = staff.st_adminID;
        }
    }
});

// Initial load
loadStaffTable();

