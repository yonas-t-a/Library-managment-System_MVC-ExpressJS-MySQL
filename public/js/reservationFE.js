// reservationFE.js

const baseUrl = '/api/reservation';


const handleDate = (date) => {
    try {
    const dateString = new Date(date).toISOString().slice(0, 10); 
    return dateString;
    } catch (error) {
      console.log(error);
    }
  }
  

// Utility function to create table rows
function createTableRow(reservation) {
    const date =  handleDate(reservation.reservationDate);
    return `
        <tr>
            <td>${reservation.reservationID}</td>
            <td>${date}</td>
            <td>${reservation.status}</td>
            <td>${reservation.res_bookID}</td>
            <td>${reservation.res_memberID}</td>
            <td>
                <button class="edit-btn" data-id="${reservation.reservationID}">Edit</button>
                <button class="delete-btn" data-id="${reservation.reservationID}">Delete</button>
            </td>
        </tr>
    `;
}

// Fetch and display all reservations
async function fetchAllReservations() {
    const tableBody = document.querySelector('#reservationTable tbody');
    tableBody.innerHTML = ''; // Clear existing table rows
    try {
        const response = await fetch(baseUrl);
        const reservations = await response.json();
        reservations.forEach(reservation => {
            tableBody.innerHTML += createTableRow(reservation);
        });
    } catch (error) {
        console.error('Error fetching reservations:', error);
    }
}

// Add a new reservation
document.querySelector('#addReservationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const reservationDate = document.querySelector('#reservationDate').value;
    const status = document.querySelector('#reservationStatus').value;
    const res_bookID = document.querySelector('#res_bookID').value;
    const res_memberID = document.querySelector('#res_memberID').value;

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reservationDate, status, res_bookID, res_memberID })
        });

        if (response.ok) {
            alert('Reservation added successfully');
            fetchAllReservations(); // Refresh the table
            e.target.reset();
        } else {
            const error = await response.text();
            alert(`Failed to add reservation: ${error}`);
        }
    } catch (error) {
        console.error('Error adding reservation:', error);
    }
});

// Find reservation by ID
document.querySelector('#findReservationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const reservationID = e.target.querySelector('#reservationID').value;

    try {
        const response = await fetch(`${baseUrl}/${reservationID}`);
        if (response.ok) {
            const [reservation] = await response.json();
            const date =  handleDate(reservation.reservationDate);
            const detailsDiv = document.querySelector('#reservationDetails');
            detailsDiv.innerHTML = `
                <p>ID: ${reservation.reservationID}</p>
                <p>Date: ${date}</p>
                <p>Status: ${reservation.status}</p>
                <p>Book ID: ${reservation.res_bookID}</p>
                <p>Member ID: ${reservation.res_memberID}</p>
            `;
        } else {
            alert('Reservation not found');
        }
    } catch (error) {
        console.error('Error finding reservation:', error);
    }
});

// Update reservation
document.querySelector('#updateReservationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const reservationID = document.querySelector('#updateReservationID').value;
    const reservationDate = document.querySelector('#updateReservationDate').value;
    const status = document.querySelector('#updateReservationStatus').value;
    const res_bookID = document.querySelector('#updateRes_bookID').value;
    const res_memberID = document.querySelector('#updateRes_memberID').value;

    try {
        const response = await fetch(`${baseUrl}/${reservationID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reservationDate, status, res_bookID, res_memberID })
        });

        if (response.ok) {
            alert('Reservation updated successfully');
            fetchAllReservations(); // Refresh the table
            e.target.reset();
        } else {
            const error = await response.text();
            alert(`Failed to update reservation: ${error}`);
        }
    } catch (error) {
        console.error('Error updating reservation:', error);
    }
});

// Handle table actions (edit and delete)
document.querySelector('#reservationTable').addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const reservationID = e.target.dataset.id;
        try {
            const response = await fetch(`${baseUrl}/${reservationID}`);
            if (response.ok) {
                const [reservation] = await response.json();
                const date =  handleDate(reservation.reservationDate);
                document.querySelector('#updateReservationID').value = reservation.reservationID;
                document.querySelector('#updateReservationDate').value = date;
                document.querySelector('#updateReservationStatus').value = reservation.status;
                document.querySelector('#updateRes_bookID').value = reservation.res_bookID;
                document.querySelector('#updateRes_memberID').value = reservation.res_memberID;
            } else {
                alert('Reservation not found for editing');
            }
        } catch (error) {
            console.error('Error fetching reservation for editing:', error);
        }
    } else if (e.target.classList.contains('delete-btn')) {
        const reservationID = e.target.dataset.id;
        if (confirm('Are you sure you want to delete this reservation?')) {
            try {
                const response = await fetch(`${baseUrl}/${reservationID}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Reservation deleted successfully');
                    fetchAllReservations(); // Refresh the table
                } else {
                    const error = await response.text();
                    alert(`Failed to delete reservation: ${error}`);
                }
            } catch (error) {
                console.error('Error deleting reservation:', error);
            }
        }
    }
});

// Initial fetch of all reservations
fetchAllReservations();
