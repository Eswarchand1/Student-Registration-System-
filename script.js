// Array to hold student records, loaded from localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// DOM elements
const form = document.getElementById('studentForm');
const nameInput = document.getElementById('name');
const idInput = document.getElementById('id');
const emailInput = document.getElementById('email');
const contactInput = document.getElementById('contact');
const submitBtn = document.getElementById('submitBtn');
const studentBody = document.getElementById('studentBody');
const displaySection = document.getElementById('display');

// Variable to track if editing (index of student being edited, -1 if not)
let editingIndex = -1;

// Load and display students on page load
document.addEventListener('DOMContentLoaded', () => {
    renderStudents();
    checkScrollbar();
});

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get input values
    const name = nameInput.value.trim();
    const id = idInput.value.trim();
    const email = emailInput.value.trim();
    const contact = contactInput.value.trim();
    
    // Validation
    if (!validateInputs(name, id, email, contact)) {
        return; // Stop if validation fails
    }
    
    if (editingIndex === -1) {
        // Add new student
        students.push({ name, id, email, contact });
    } else {
        // Update existing student
        students[editingIndex] = { name, id, email, contact };
        editingIndex = -1;
        submitBtn.textContent = 'Register Student';
    }
    
    // Save to localStorage and re-render
    saveStudents();
    renderStudents();
    checkScrollbar();
    form.reset();
});

// Validation function
function validateInputs(name, id, email, contact) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const idRegex = /^\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10,}$/;
    
    if (!name || !id || !email || !contact) {
        alert('All fields are required.');
        return false;
    }
    if (!nameRegex.test(name)) {
        alert('Name must contain only letters and spaces.');
        return false;
    }
    if (!idRegex.test(id)) {
        alert('Student ID must contain only numbers.');
        return false;
    }
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    if (!contactRegex.test(contact)) {
        alert('Contact number must be at least 10 digits and contain only numbers.');
        return false;
    }
    return true;
}

// Render students in the table
function renderStudents() {
    studentBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="actions">
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentBody.appendChild(row);
    });
}

// Edit student function
function editStudent(index) {
    const student = students[index];
    nameInput.value = student.name;
    idInput.value = student.id;
    emailInput.value = student.email;
    contactInput.value = student.contact;
    editingIndex = index;
    submitBtn.textContent = 'Update Student';
}

// Delete student function
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        saveStudents();
        renderStudents();
        checkScrollbar();
    }
}

// Save students to localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Dynamically add vertical scrollbar if content overflows
function checkScrollbar() {
    // Check if the table body's scroll height exceeds the display section's client height
    if (studentBody.scrollHeight > displaySection.clientHeight) {
        displaySection.style.overflowY = 'auto';
    } else {
        displaySection.style.overflowY = 'hidden';
    }
}