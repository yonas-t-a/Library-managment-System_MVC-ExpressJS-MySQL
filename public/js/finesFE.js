document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = '/api/fines';

    const handleDate = (date) => {
        try {
        const dateString = new Date(date).toISOString().slice(0, 10); 
        return dateString;
        } catch (error) {
          console.log(error);
        }
      }
      

    // Form and table elements
    const addFineForm = document.getElementById('addFineForm');
    const findFineForm = document.getElementById('findFineForm');
    const updateFineForm = document.getElementById('updateFineForm');
    const fineTableBody = document.querySelector('#fineTable tbody');
    const fineDetailsDiv = document.getElementById('fineDetails');

    // Fetch and display all fines
    const fetchAllFines = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch fines');
            const fines = await response.json();
            
            fineTableBody.innerHTML = fines.map(fine => 
                `
                <tr>
                    <td>${fine.fineID}</td>
                    <td>${fine.amount}</td>
                    <td>${fine.paidStatus ? 'Yes' : 'No'}</td>
                    <td>${ handleDate(fine.datePaid)|| 'N/A'}</td>
                    <td>${fine.fs_transactionID}</td>
                    <td>
                        <button onclick="populateUpdateForm('${fine.fineID}')">Edit</button>
                        <button onclick="deleteFine('${fine.fineID}')">Delete</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error(error);
        }
    };

    // Add a new fine
    addFineForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // const formData = new FormData(addFineForm);
        const fine = {
            amount: document.getElementById("amount").value,
            paidStatus: document.getElementById("paidStatus").value  === 'on',
            datePaid: document.getElementById("datePaid").value,
            fs_transactionID: document.getElementById("fs_transactionID").value,
        };
        console.log(fine)
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fine),
            });
            if (!response.ok) throw new Error('Failed to add fine');
            alert('Fine added successfully');
            addFineForm.reset();
            fetchAllFines();
        } catch (error) {
            console.error(error);
        }
    });

    // Find fine by ID
    findFineForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fineID = findFineForm.fineID.value;

        try {
            const response = await fetch(`${apiUrl}/${fineID}`);
            if (!response.ok) throw new Error('Fine not found');
            const [fine] = await response.json();
            console.log(fine)
            fineDetailsDiv.innerHTML = `
                <p>ID: ${fine.fineID}</p>
                <p>Amount: ${fine.amount}</p>
                <p>Paid Status: ${fine.paidStatus ? 'Yes' : 'No'}</p>
                <p>Date Paid: ${fine.datePaid || 'N/A'}</p>
                <p>Transaction ID: ${fine.fs_transactionID}</p>
            `;
        } catch (error) {
            console.error(error);
            fineDetailsDiv.innerHTML = '<p>Fine not found</p>';
        }
    });

    // Populate update form with fine data
    window.populateUpdateForm = async (fineID) => {
        try {
            const response = await fetch(`${apiUrl}/${fineID}`);
            if (!response.ok) throw new Error('Fine not found');
            const [fine] = await response.json();
            updateFineForm.updateFineID.value = fine.fineID;
            updateFineForm.updateAmount.value = fine.amount;
            updateFineForm.updatePaidStatus.checked = fine.paidStatus;
            updateFineForm.updateDatePaid.value = handleDate(fine.datePaid)|| '';
            updateFineForm.updateFs_transactionID.value = fine.fs_transactionID;
        } catch (error) {
            console.error(error);
        }
    };

    // Update fine
    updateFineForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fineID = updateFineForm.updateFineID.value;
        const fine = {
            amount: updateFineForm.updateAmount.value,
            paidStatus: updateFineForm.updatePaidStatus.checked,
            datePaid: updateFineForm.updateDatePaid.value || null,
            fs_transactionID: updateFineForm.updateFs_transactionID.value,
        };

        try {
            const response = await fetch(`${apiUrl}/${fineID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fine),
            });
            if (!response.ok) throw new Error('Failed to update fine');
            alert('Fine updated successfully');
            updateFineForm.reset();
            fetchAllFines();
        } catch (error) {
            console.error(error);
        }
    });

    // Delete fine
    window.deleteFine = async (fineID) => {
        if (!confirm('Are you sure you want to delete this fine?')) return;

        try {
            const response = await fetch(`${apiUrl}/${fineID}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete fine');
            alert('Fine deleted successfully');
            fetchAllFines();
        } catch (error) {
            console.error(error);
        }
    };

    // Initial fetch
    fetchAllFines();
});
