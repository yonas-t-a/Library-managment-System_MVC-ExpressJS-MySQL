document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "/api/transaction";

    const handleDate = (date) => {
        try {
        const dateString = new Date(date).toISOString().slice(0, 10); 
        return dateString;
        } catch (error) {
          console.log(error);
        }
      }

    // Add Transaction
    document.getElementById("addTransactionForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const issueDate = document.getElementById("issueDate").value;
        const dueDate = document.getElementById("dueDate").value;
        const returnDate = document.getElementById("returnDate").value;
        const tl_memberID = document.getElementById("tl_memberID").value;
        const tl_borrowID = document.getElementById("tl_borrowID").value;
        const tl_bookID = document.getElementById("tl_bookID").value;

        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID }),
            });

            if (response.ok) {
                alert("Transaction successfully added!");
                fetchAllTransactions(); // Refresh the table
            } else {
                const error = await response.text();
                alert(`Error: ${error}`);
            }
        } catch (err) {
            console.error("Error adding transaction:", err);
        }
    });

    // Fetch All Transactions
    async function fetchAllTransactions() {
        try {
            const response = await fetch(baseUrl);
            if (response.ok) {
                const transactions = await response.json();
                populateTransactionTable(transactions);
            } else {
                alert("Failed to fetch transactions.");
            }
        } catch (err) {
            console.error("Error fetching transactions:", err);
        }
    }

    function populateTransactionTable(transactions) {
        const tbody = document.getElementById("transactionTable").querySelector("tbody");
        tbody.innerHTML = ""; // Clear the table first

        transactions.forEach((transaction) => {
            const dateIssue = handleDate(transaction.issueDate);
            const dateDue = handleDate(transaction.dueDate);
            const dateReturn = handleDate(transaction.returnDate)
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${transaction.transactionID}</td>
                <td>${dateIssue}</td>
                <td>${dateDue}</td>
                <td>${dateReturn}</td>
                <td>${transaction.tl_memberID}</td>
                <td>${transaction.tl_borrowID}</td>
                <td>${transaction.tl_bookID}</td>
                <td>
                    <button class="update-btn" data-id="${transaction.transactionID}">Update</button>
                    <button class="delete-btn" data-id="${transaction.transactionID}">Delete</button>
                </td>
            `;

            tbody.appendChild(row);
        });

        addTableEventListeners(); // Attach event listeners for update and delete buttons
    }

    // Fetch Transaction by ID
    document.getElementById("findTransactionForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const transactionID = document.getElementById("transactionID").value;

        try {
            const response = await fetch(`${baseUrl}/${transactionID}`);
            if (response.ok) {
                const [transaction] = await response.json();
                console.log(transaction)
                displayTransactionDetails(transaction);
            } else {
                alert("Transaction not found.");
            }
        } catch (err) {
            console.error("Error fetching transaction by ID:", err);
        }
    });

    function displayTransactionDetails(transaction) {
        const detailsDiv = document.getElementById("transactionDetails");
        const dateIssue = handleDate(transaction.issueDate);
        const dateDue = handleDate(transaction.dueDate);
        const dateReturn = handleDate(transaction.returnDate)
        detailsDiv.innerHTML = `
            <p><strong>ID:</strong> ${transaction.transactionID}</p>
            <p><strong>Issue Date:</strong> ${dateIssue}</p>
            <p><strong>Due Date:</strong> ${dateDue}</p>
            <p><strong>Return Date:</strong> ${dateReturn}</p>
            <p><strong>Member ID:</strong> ${transaction.tl_memberID}</p>
            <p><strong>Borrower ID:</strong> ${transaction.tl_borrowID}</p>
            <p><strong>Book ID:</strong> ${transaction.tl_bookID}</p>
        `;
    }

    // Update Transaction
    document.getElementById("updateTransactionForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const transactionID = document.getElementById("updateTransactionID").value;
        const issueDate = document.getElementById("updateIssueDate").value;
        const dueDate = document.getElementById("updateDueDate").value;
        const returnDate = document.getElementById("updateReturnDate").value;
        const tl_memberID = document.getElementById("updateTl_memberID").value;
        const tl_borrowID = document.getElementById("updateTl_borrowID").value;
        const tl_bookID = document.getElementById("updateTl_bookID").value;

        try {
            const response = await fetch(`${baseUrl}/${transactionID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID }),
            });

            if (response.ok) {
                alert("Transaction successfully updated!");
                fetchAllTransactions(); // Refresh the table
            } else {
                const error = await response.text();
                alert(`Error: ${error}`);
            }
        } catch (err) {
            console.error("Error updating transaction:", err);
        }
    });

    // Delete Transaction
    function addTableEventListeners() {
        // Attach delete event listeners
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", async () => {
                const transactionID = button.dataset.id;
                const confirmDelete = confirm("Are you sure you want to delete this transaction?");
                if (!confirmDelete) return;
    
                try {
                    const response = await fetch(`${baseUrl}/${transactionID}`, { method: "DELETE" });
                    if (response.ok) {
                        alert("Transaction successfully deleted!");
                        fetchAllTransactions(); // Refresh the table after deletion
                    } else {
                        alert("Failed to delete transaction.");
                    }
                } catch (error) {
                    console.error("Error deleting transaction:", error);
                }
            });
        });
    
        // Attach update event listeners
        document.querySelectorAll(".update-btn").forEach((button) => {
            button.addEventListener("click", () => {
                const transactionRow = button.closest("tr");
                if (!transactionRow || !transactionRow.children) {
                    console.error("Failed to locate transaction row or children.");
                    return;
                }
    
                const transactionID = button.dataset.id;
    
                // Ensure the transaction row contains sufficient columns
                const requiredColumns = 7; // Update this if your table changes
                if (transactionRow.children.length < requiredColumns) {
                    console.error("Insufficient columns in the transaction row for update.");
                    return;
                }
    
                // Prefill the update form with the selected transaction's details
                document.getElementById("updateTransactionID").value = transactionID;
                document.getElementById("updateIssueDate").value = transactionRow.children[1].textContent.trim();
                document.getElementById("updateDueDate").value = transactionRow.children[2].textContent.trim();
                document.getElementById("updateReturnDate").value = transactionRow.children[3].textContent.trim();
                document.getElementById("updateTl_memberID").value = transactionRow.children[4].textContent.trim();
                document.getElementById("updateTl_borrowID").value = transactionRow.children[5].textContent.trim();
                document.getElementById("updateTl_bookID").value = transactionRow.children[6].textContent.trim();
            });
        });
    }
    
    // Initial fetch of all transactions
    fetchAllTransactions();
});
