document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3500/api/branch";

    // Fetch all branches
    async function fetchBranches() {
        try {
            const response = await fetch(apiUrl);
            const branches = await response.json();
            renderBranchesTable(branches);
        } catch (error) {
            console.error("Error fetching branches:", error);
        }
    }

    // Render branches in a table
    function renderBranchesTable(branches) {
        const tableContainer = document.querySelector(".fetch-table");
        tableContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Branch ID</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Admin ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${branches.map(branch => `
                        <tr>
                            <td>${branch.brancheID}</td>
                            <td>${branch.address}</td>
                            <td>${branch.phone_number}</td>
                            <td>${branch.email}</td>
                            <td>${branch.br_adminID}</td>
                            <td>
                                <button class="update-btn" data-id="${branch.brancheID}">Edit</button>
                                <button class="delete-btn" data-id="${branch.brancheID}">Delete</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        // Attach event listeners for edit and delete buttons
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", () => editBranch(btn.dataset.id));
        });
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", () => deleteBranch(btn.dataset.id));
        });
    }

    // Add a new branch
    document.querySelector(".insert-to-table").addEventListener("submit", async (event) => {
        event.preventDefault();
        const address = document.getElementById("address").value;
        const phone_number = document.getElementById("phone_number").value;
        const email = document.getElementById("email").value;
        const br_adminID = document.getElementById("br_adminID").value;

        try {
            await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address, phone_number, email, br_adminID }),
            });
            fetchBranches();
        } catch (error) {
            console.error("Error adding branch:", error);
        }
    });

    // Delete a branch
    async function deleteBranch(id) {
        try {
            await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
            fetchBranches();
        } catch (error) {
            console.error("Error deleting branch:", error);
        }
    }

    // Edit a branch
    async function editBranch(id) {
        try {
            // Log the ID for debugging
            console.log("Editing branch with ID:", id);
    
            // Fetch branch details
            const response = await fetch(`${apiUrl}/${id}`);
            if (!response.ok) {
                throw new Error(`Error fetching branch: ${response.statusText}`);
            }
    
            const branch = await response.json();
    
            // Log the fetched branch for debugging
            console.log("Fetched branch details:", branch);
    
            // Populate the update form
            populateUpdateForm(branch);
        } catch (error) {
            console.error("Error fetching branch:", error);
        }
    }
    
    function populateUpdateForm(branch) {
        if (!branch) {
            console.error("Branch data is undefined. Cannot populate the form.");
            return;
        }
    
        document.getElementById("updateBranchID").value = branch[0].brancheID|| "";
        document.getElementById("updateAddress").value = branch[0].address || "";
        document.getElementById("updatePhoneNumber").value = branch[0].phone_number || "";
        document.getElementById("updateEmail").value = branch[0].email || "";
        document.getElementById("updateAdminID").value = branch[0].br_adminID || "";
    }
    // gat by id
    document.getElementById("findButton").addEventListener("click", async () => {
        const branchId = document.getElementById("idInput").value;

        try {
            const response = await fetch(`${apiUrl}/${branchId}`);
            const branch = await response.json();

            if (response.ok) {
                displayBranchDetails(branch);
            } else {
                document.getElementById("branchDetails").innerHTML = `<p>No branch found with ID: ${branchId}</p>`;
            }
        } catch (error) {
            console.error("Error finding branch by ID:", error);
        }
    });

    // Display branch details when found
    function displayBranchDetails(branch) {
        const detailsContainer = document.getElementById("branchDetails");
        detailsContainer.innerHTML = `
            <h3>Branch Details</h3>
            <p><strong>Branch ID:</strong> ${branch[0].brancheID}</p>
            <p><strong>Address:</strong> ${branch[0].address}</p>
            <p><strong>Phone Number:</strong> ${branch[0].phone_number}</p>
            <p><strong>Email:</strong> ${branch[0].email}</p>
            <p><strong>Admin ID:</strong> ${branch[0].br_adminID}</p>
        `;
    }
    // Update a branch
    document.querySelector(".right-update").addEventListener("submit", async (event) => {
        event.preventDefault();
        const id = document.getElementById("updateBranchID").value;
        const address = document.getElementById("updateAddress").value;
        const phone_number = document.getElementById("updatePhoneNumber").value;
        const email = document.getElementById("updateEmail").value;
        const br_adminID = document.getElementById("updateAdminID").value;

        try {
            await fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address, phone_number, email, br_adminID }),
            });
            fetchBranches();
        } catch (error) {
            console.error("Error updating branch:", error);
        }
    });

    // Initialize the table
    fetchBranches();
});

