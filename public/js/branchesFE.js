// branchesFE.js

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "/api/branch";
  
    // Elements
    const insertForm = document.getElementById("insertBranchForm");
    const findForm = document.getElementById("findForm");
    const branchesTableBody = document.querySelector("#branchesTable tbody");
    const updateForm = document.getElementById("updateBranchForm");
  
    // Add Branch
    insertForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const address = document.getElementById("address").value;
      const phone_number = document.getElementById("phone_number").value;
      const email = document.getElementById("email").value;
      const br_adminID = document.getElementById("br_adminID").value;
  
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address, phone_number, email, br_adminID }),
        });
  
        if (response.ok) {
          alert("Branch added successfully!");
          insertForm.reset();
          fetchAllBranches();
        } else {
          alert("Failed to add branch. Please try again.");
        }
      } catch (error) {
        console.error("Error adding branch:", error);
      }
    });
  
    // Fetch All Branches
    async function fetchAllBranches() {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const branches = await response.json();
          branchesTableBody.innerHTML = branches
            .map(
              (branch) => `
              <tr>
                <td>${branch.brancheID}</td>
                <td>${branch.address}</td>
                <td>${branch.phone_number}</td>
                <td>${branch.email}</td>
                <td>${branch.br_adminID}</td>
                <td>
                  <button class="edit-btn" data-id="${branch.brancheID}">Edit</button>
                  <button class="delete-btn" data-id="${branch.brancheID}">Delete</button>
                </td>
              </tr>
            `
            )
            .join("");
          addTableEventListeners();
        } else {
          alert("Failed to fetch branches.");
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    }
  
    // Fetch Branch by ID
    findForm.addEventListener("submit", async (event) => {
        console.log(event)
      event.preventDefault();
      const id = document.getElementById("idInput").value;
  
      try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (response.ok) {
          const [branch] = await response.json();
          const detailsDiv = document.getElementById("branchDetails");
          detailsDiv.innerHTML = `
            <p><strong>Address:</strong> ${branch.address}</p>
            <p><strong>Phone Number:</strong> ${branch.phone_number}</p>
            <p><strong>Email:</strong> ${branch.email}</p>
            <p><strong>Admin ID:</strong> ${branch.br_adminID}</p>
          `;
        } else {
          alert("Branch not found.");
        }
      } catch (error) {
        console.error("Error fetching branch by ID:", error);
      }
    });
  
    // Delete Branch
    async function deleteBranch(id) {
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          alert("Branch deleted successfully!");
          fetchAllBranches();
        } else {
          alert("Failed to delete branch.");
        }
      } catch (error) {
        console.error("Error deleting branch:", error);
      }
    }
  
    // Edit Branch
    async function editBranch(id) {
      try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (response.ok) {
          const [branch] = await response.json();
          document.getElementById("updateBranchID").value = id;
          document.getElementById("updateAddress").value = branch.address;
          document.getElementById("updatePhoneNumber").value = branch.phone_number;
          document.getElementById("updateEmail").value = branch.email;
          document.getElementById("updateAdminID").value = branch.br_adminID;
        } else {
          alert("Failed to fetch branch for editing.");
        }
      } catch (error) {
        console.error("Error fetching branch for editing:", error);
      }
    }
  
    // Update Branch
    updateForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const id = document.getElementById("updateBranchID").value;
      const address = document.getElementById("updateAddress").value;
      const phone_number = document.getElementById("updatePhoneNumber").value;
      const email = document.getElementById("updateEmail").value;
      const br_adminID = document.getElementById("updateAdminID").value;
  
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address, phone_number, email, br_adminID }),
        });
  
        if (response.ok) {
          alert("Branch updated successfully!");
          updateForm.reset();
          fetchAllBranches();
        } else {
          alert("Failed to update branch.");
        }
      } catch (error) {
        console.error("Error updating branch:", error);
      }
    });
  
    // Add Event Listeners to Table Buttons
    function addTableEventListeners() {
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const id = button.dataset.id;
          deleteBranch(id);
        });
      });
  
      document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const id = button.dataset.id;
          editBranch(id);
        });
      });
    }
  
    // Initial Fetch
    fetchAllBranches();
  });
  