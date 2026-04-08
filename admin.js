// Mock database for demo
let users = [
    { id: 1, username: 'admin', email: 'admin@ethiocoders.com', role: 'admin' },
    { id: 2, username: 'john_doe', email: 'john@example.com', role: 'user' }
];

let courses = [
    { id: 1, title: 'HTML5 & CSS3 Mastery', category: 'frontend', description: 'Learn modern HTML and CSS' },
    { id: 2, title: 'JavaScript Essentials', category: 'frontend', description: 'Master JavaScript' }
];

// Check login status
if (localStorage.getItem('adminLoggedIn') === 'true') {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    loadDashboard();
}

// Login handler
document.getElementById('adminLogin')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Demo login (in production, verify with backend)
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadDashboard();
    } else {
        alert('Invalid credentials! Use admin/admin123');
    }
});

function loadDashboard() {
    updateStats();
    loadUsers();
    loadCourses();
}

function updateStats() {
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalCourses').textContent = courses.length;
    document.getElementById('activeUsers').textContent = Math.floor(Math.random() * 50) + 10;
}

function loadUsers() {
    const tbody = document.getElementById('usersList');
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="editUser(${user.id})" class="btn-edit">Edit</button>
                <button onclick="deleteUser(${user.id})" class="btn-delete">Delete</button>
            </td>
        </tr>
    `).join('');
}

function loadCourses() {
    const tbody = document.getElementById('coursesList');
    tbody.innerHTML = courses.map(course => `
        <tr>
            <td>${course.id}</td>
            <td>${course.title}</td>
            <td>${course.category}</td>
            <td>
                <button onclick="editCourse(${course.id})">Edit</button>
                <button onclick="deleteCourse(${course.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function showAddUserModal() {
    document.getElementById('addUserModal').style.display = 'flex';
}

function showAddCourseModal() {
    document.getElementById('addCourseModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Add user
document.getElementById('addUserForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = e.target.elements;
    const newUser = {
        id: users.length + 1,
        username: inputs[0].value,
        email: inputs[1].value,
        role: inputs[3].value
    };
    users.push(newUser);
    loadUsers();
    updateStats();
    closeModal('addUserModal');
    alert('User added successfully!');
});

// Add course
document.getElementById('addCourseForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = e.target.elements;
    const newCourse = {
        id: courses.length + 1,
        title: inputs[0].value,
        description: inputs[1].value,
        category: inputs[2].value
    };
    courses.push(newCourse);
    loadCourses();
    updateStats();
    closeModal('addCourseModal');
    alert('Course added successfully!');
});

function deleteUser(id) {
    if (confirm('Are you sure?')) {
        users = users.filter(u => u.id !== id);
        loadUsers();
        updateStats();
    }
}

function deleteCourse(id) {
    if (confirm('Are you sure?')) {
        courses = courses.filter(c => c.id !== id);
        loadCourses();
        updateStats();
    }
}

function updateWebsiteSettings() {
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    document.documentElement.style.setProperty('--primary', primaryColor);
    document.documentElement.style.setProperty('--secondary', secondaryColor);
    localStorage.setItem('websiteColors', JSON.stringify({ primary: primaryColor, secondary: secondaryColor }));
    alert('Settings saved!');
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    location.reload();
}