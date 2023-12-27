// script.js
// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display patients list on page load
    fetchPatientsList();
  
    // Add event listener to the Add Patient button
    const addPatientBtn = document.getElementById('submitBtn');
    addPatientBtn.addEventListener('click', addPatient);
  });
  
// Fetch Patients List
const fetchPatientsList = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/patients');
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
      const data = await response.json();
      displayPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error.message);
    }
  };
  
  // Display Patients List
  const displayPatients = (patients) => {
    const patientsList = document.getElementById('patientsList');
    patientsList.innerHTML = '';
    patients.forEach(patient => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${patient.first_name} ${patient.last_name} - ${patient.email} (${patient.gender})</span>
        <button onclick="editPatient('${patient._id}', '${patient.first_name}', '${patient.last_name}', '${patient.email}', '${patient.gender}')">Edit</button>
        <button onclick="deletePatient('${patient._id}')">Delete</button>
      `;
      patientsList.appendChild(li);
    });
  };
  
  // Add Patient
  const addPatient = async () => {
    console.log("Its not working")
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
  
    try {
      const response = await fetch('http://localhost:4000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, gender }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add patient');
      }
  
      // Fetch and display updated patient list
      fetchPatientsList();
    } catch (error) {
      console.error('Error adding patient:', error.message);
    }
  };
  
  
  // Edit Patient
  const editPatient = async (id, firstName, lastName, email, gender) => {
    const updatedFirstName = prompt('Enter new first name:', firstName);
    const updatedLastName = prompt('Enter new last name:', lastName);
    const updatedEmail = prompt('Enter new email:', email);
    const updatedGender = prompt('Enter new gender:', gender);
  
    try {
      const response = await fetch(`http://localhost:4000/api/patients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: updatedFirstName, last_name: updatedLastName, email: updatedEmail, gender: updatedGender }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to edit patient');
      }
  
      // Fetch and display updated patient list
      fetchPatientsList();
    } catch (error) {
      console.error('Error editing patient:', error.message);
    }
  };
  
  // Delete Patient
  const deletePatient = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/patients/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete patient');
      }
  
      // Fetch and display updated patient list
      fetchPatientsList();
    } catch (error) {
      console.error('Error deleting patient:', error.message);
    }
  };
  
  // Fetch and display patients list on page load
  window.onload = fetchPatientsList;
  