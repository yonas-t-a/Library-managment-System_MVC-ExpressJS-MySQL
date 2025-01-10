// membersFE.js

const apiBaseUrl = 'http://localhost:3500/api/member'; // Base URL for members API

// DOM Elements
const addMemberForm = document.getElementById('addMemberForm');
const findMemberForm = document.getElementById('findMemberForm');
const updateMemberForm = document.getElementById('updateMemberForm');
const memberTable = document.getElementById('memberTable').querySelector('tbody');
const memberDetailsDiv = document.getElementById('memberDetails');

const handleDate = (date) => {
  try {
  const dateString = new Date(date).toISOString().slice(0, 10); 
  return dateString;
  } catch (error) {
    console.log(error);
  }
}

// Helper function to fetch all members and populate the table
const fetchAllMembers = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}`);
    const members = await response.json();
    // console.log(members)
    // Clear existing table rows
    memberTable.innerHTML = '';
    

    // Populate table rows
    members.forEach((member) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${member.memberID}</td>
        <td>${member.name}</td>
        <td>${member.address}</td>
        <td>${member.phone_number}</td>
        <td>${member.email}</td>
        <td>${member.date_of_membership}</td>
        <td>${member.memberhip_status}</td>
        <td>
          <button class="edit-btn" data-id="${member.memberID}">Edit</button>
          <button class="delete-btn" data-id="${member.memberID}">Delete</button>
        </td>
      `;
      memberTable.appendChild(row);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach((btn) => {
      btn.addEventListener('click', () => loadMemberForUpdate(btn.dataset.id));
    });

    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', () => deleteMember(btn.dataset.id));
    });
  } catch (error) {
    console.error('Error fetching members:', error);
  }
};

// Add Member
addMemberForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const member = {
    name: document.getElementById('memberName').value,
    address: document.getElementById('memberAddress').value,
    phone_number: document.getElementById('memberPhoneNumber').value,
    email: document.getElementById('memberEmail').value,
    date_of_membership: document.getElementById('memberDateOfMembership').value,
    memberhip_status: document.getElementById('memberMembershipStatus').value,
  };

  try {
    const response = await fetch(`${apiBaseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member),
    });

    if (response.ok) {
      alert('Member added successfully!');
      addMemberForm.reset();
      fetchAllMembers();
    } else {
      alert('Error adding member.');
    }
  } catch (error) {
    console.error('Error adding member:', error);
  }
});

// Find Member by ID
findMemberForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const memberId = document.getElementById('memberId').value;

  try {
    const response = await fetch(`${apiBaseUrl}/${memberId}`);
    if (response.ok) {
      const [member] = await response.json();
      console.log(member)
      memberDetailsDiv.innerHTML = `
        <p><strong>Name:</strong> ${member.name}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone Number:</strong> ${member.phone_number}</p>
        <p><strong>Email:</strong> ${member.email}</p>
        <p><strong>Date of Membership:</strong> ${member.date_of_membership}</p>
        <p><strong>Membership Status:</strong> ${member.memberhip_status}</p>
      `;
    } else {
      memberDetailsDiv.innerHTML = '<p>Member not found.</p>';
    }
  } catch (error) {
    console.error('Error fetching member:', error);
  }
});

// Load Member for Update
const loadMemberForUpdate = async (memberId) => {
  try {
    const response = await fetch(`${apiBaseUrl}/${memberId}`);
    if (response.ok) {
      const [member] = await response.json();
      const date = await handleDate(member.date_of_membership);
      console.log(member)
      document.getElementById('updateMemberId').value = member.memberID;
      document.getElementById('updateMemberName').value = member.name;
      document.getElementById('updateMemberAddress').value = member.address;
      document.getElementById('updateMemberPhoneNumber').value = member.phone_number;
      document.getElementById('updateMemberEmail').value = member.email;
      document.getElementById('updateMemberDateOfMembership').value = date;
      document.getElementById('updateMemberMembershipStatus').value = member.memberhip_status;
    } else {
      alert('Error fetching member for update.');
    }
  } catch (error) {
    console.error('Error fetching member for update:', error);
  }
};

// Update Member
updateMemberForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const memberId = document.getElementById('updateMemberId').value;
  console.log(memberId)
  const member = {
    name: document.getElementById('updateMemberName').value,
    address: document.getElementById('updateMemberAddress').value,
    phone_number: document.getElementById('updateMemberPhoneNumber').value,
    email: document.getElementById('updateMemberEmail').value,
    date_of_membership: document.getElementById('updateMemberDateOfMembership').value,
    memberhip_status: document.getElementById('updateMemberMembershipStatus').value,
  };

  try {
    const response = await fetch(`${apiBaseUrl}/${memberId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member),
    });

    if (response.ok) {
      alert('Member updated successfully!');
      updateMemberForm.reset();
      fetchAllMembers();
    } else {
      alert('Error updating member.');
    }
  } catch (error) {
    console.error('Error updating member:', error);
  }
});

// Delete Member
const deleteMember = async (memberId) => {
  try {
    const response = await fetch(`${apiBaseUrl}/${memberId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Member deleted successfully!');
      fetchAllMembers();
    } else {
      alert('Error deleting member.');
    }
  } catch (error) {
    console.error('Error deleting member:', error);
  }
};

// Initial fetch of all members
fetchAllMembers();
