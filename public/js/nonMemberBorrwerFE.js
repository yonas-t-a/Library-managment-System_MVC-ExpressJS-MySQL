document.addEventListener("DOMContentLoaded", () => {
    const apiBaseUrl = "/api/nonMember"; // Base URL for the backend API
  
    // Add Non-Member Borrower
    const addNonMemberBorrowerForm = document.getElementById("addNonMemberBorrowerForm");
    addNonMemberBorrowerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = {
        name: document.getElementById("borrowerName").value,
        address: document.getElementById("borrowerAddress").value,
        phone_number: document.getElementById("borrowerPhoneNumber").value,
        IDProof_Status: document.getElementById("IDProof_Status").checked,
        status: document.getElementById("borrowerStatus").value,
      };
      try {
        const response = await fetch(apiBaseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert("Non-Member Borrower added successfully");
          fetchAllNonMembers();
          addNonMemberBorrowerForm.reset();
        } else {
          alert("Failed to add Non-Member Borrower");
        }
      } catch (error) {
        console.error("Error adding borrower:", error);
      }
    });
  
    // Fetch Non-Member Borrower by ID
    const findNonMemberBorrowerForm = document.getElementById("findNonMemberBorrowerForm");
    findNonMemberBorrowerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const borrowerId = document.getElementById("borrowID").value;
      try {
        const response = await fetch(`${apiBaseUrl}/${borrowerId}`);
        if (response.ok) {
          const [borrower] = await response.json();
          displayBorrowerDetails(borrower);
        } else {
          alert("Borrower not found");
        }
      } catch (error) {
        console.error("Error fetching borrower:", error);
      }
    });
  
    // Display Borrower Details
    function displayBorrowerDetails(borrower) {
      const borrowerDetails = document.getElementById("nonMemberBorrowerDetails");
      borrowerDetails.innerHTML = `
        <p><strong>ID:</strong> ${borrower.borrowID}</p>
        <p><strong>Name:</strong> ${borrower.name}</p>
        <p><strong>Address:</strong> ${borrower.address}</p>
        <p><strong>Phone Number:</strong> ${borrower.phone_number}</p>
        <p><strong>ID Proof Verified:</strong> ${borrower.IDProof_Status ? "Yes" : "No"}</p>
        <p><strong>Status:</strong> ${borrower.status}</p>
      `;
    }
  
    // Fetch All Non-Member Borrowers
    async function fetchAllNonMembers() {
      try {
        const response = await fetch(apiBaseUrl);
        if (response.ok) {
          const borrowers = await response.json();
          populateBorrowerTable(borrowers);
        } else {
          console.error("Failed to fetch borrowers");
        }
      } catch (error) {
        console.error("Error fetching borrowers:", error);
      }
    }
  
    // Populate Borrower Table
    function populateBorrowerTable(borrowers) {
      const tableBody = document.querySelector("#nonMemberBorrowerTable tbody");
      tableBody.innerHTML = ""; // Clear existing rows
      borrowers.forEach((borrower) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${borrower.borrowID}</td>
          <td>${borrower.name}</td>
          <td>${borrower.address}</td>
          <td>${borrower.phone_number}</td>
          <td>${borrower.IDProof_Status ? "Yes" : "No"}</td>
          <td>${borrower.status}</td>
          <td>
            <button class="edit-btn" data-id="${borrower.borrowID}">Edit</button>
            <button class="delete-btn" data-id="${borrower.borrowID}">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
  
      // Add event listeners for edit and delete buttons
      document.querySelectorAll(".edit-btn").forEach((btn) =>
        btn.addEventListener("click", handleEdit)
      );
      document.querySelectorAll(".delete-btn").forEach((btn) =>
        btn.addEventListener("click", handleDelete)
      );
    }
  
    // Handle Edit Borrower
    function handleEdit(e) {
      const borrowerId = e.target.getAttribute("data-id");
      const row = e.target.closest("tr");
      document.getElementById("updateBorrowID").value = borrowerId;
      document.getElementById("updateBorrowerName").value = row.children[1].textContent;
      document.getElementById("updateBorrowerAddress").value = row.children[2].textContent;
      document.getElementById("updateBorrowerPhoneNumber").value = row.children[3].textContent;
      document.getElementById("updateIDProof_Status").checked = row.children[4].textContent === "Yes";
      document.getElementById("updateBorrowerStatus").value = row.children[5].textContent;
    }
  
    // Handle Delete Borrower
    async function handleDelete(e) {
      const borrowerId = e.target.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this borrower?")) {
        try {
          const response = await fetch(`${apiBaseUrl}/${borrowerId}`, {
            method: "DELETE",
          });
          if (response.ok) {
            alert("Borrower deleted successfully");
            fetchAllNonMembers();
          } else {
            alert("Failed to delete borrower");
          }
        } catch (error) {
          console.error("Error deleting borrower:", error);
        }
      }
    }
  
    // Update Non-Member Borrower
    const updateNonMemberBorrowerForm = document.getElementById("updateNonMemberBorrowerForm");
    updateNonMemberBorrowerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const borrowerId = document.getElementById("updateBorrowID").value;
      const formData = {
        name: document.getElementById("updateBorrowerName").value,
        address: document.getElementById("updateBorrowerAddress").value,
        phone_number: document.getElementById("updateBorrowerPhoneNumber").value,
        IDProof_Status: document.getElementById("updateIDProof_Status").checked,
        status: document.getElementById("updateBorrowerStatus").value,
      };
      try {
        const response = await fetch(`${apiBaseUrl}/${borrowerId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert("Borrower updated successfully");
          fetchAllNonMembers();
          updateNonMemberBorrowerForm.reset();
        } else {
          alert("Failed to update borrower");
        }
      } catch (error) {
        console.error("Error updating borrower:", error);
      }
    });
  
    // Initial Fetch
    fetchAllNonMembers();
  });
  