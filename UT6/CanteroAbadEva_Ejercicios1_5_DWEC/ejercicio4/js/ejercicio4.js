// js/app.js
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('nameInput');
    const searchBtn = document.getElementById('searchBtn');
    const userDataSection = document.getElementById('userDataSection');
    const userMessage = document.getElementById('userMessage');
    const ageInput = document.getElementById('ageInput');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const usersList = document.getElementById('usersList');
    const emptyMessage = document.querySelector('.empty-message');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const totalUsers = document.getElementById('totalUsers');
    const averageAge = document.getElementById('averageAge');
    
    loadUsers();
    
    searchBtn.addEventListener('click', searchUser);
    saveBtn.addEventListener('click', saveUser);
    cancelBtn.addEventListener('click', cancelAction);
    clearAllBtn.addEventListener('click', clearAllUsers);
    
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchUser();
    });
    
    ageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') saveUser();
    });
    
    function searchUser() {
        const name = nameInput.value.trim();
        
        if (!name) {
            alert('Por favor, introduce un nombre');
            return;
        }
        
        const users = getUsersFromStorage();
        const user = users.find(u => u.name.toLowerCase() === name.toLowerCase());
        
        userDataSection.classList.remove('hidden');
        
        if (user) {
            userMessage.textContent = `${user.name}, tu edad registrada es ${user.age} años.`;
            userMessage.className = 'existing-user';
            ageInput.value = user.age;
        } else {
            userMessage.textContent = `Hola ${name}, introduce tu edad:`;
            userMessage.className = 'new-user';
            ageInput.value = '';
        }
        
        ageInput.focus();
    }
    
    function saveUser() {
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);
        
        if (!name) {
            alert('Por favor, introduce un nombre');
            return;
        }
        
        if (!age || age < 1 || age > 120) {
            alert('Por favor, introduce una edad válida (1-120)');
            ageInput.focus();
            return;
        }
        
        const users = getUsersFromStorage();
        const userIndex = users.findIndex(u => u.name.toLowerCase() === name.toLowerCase());
        
        if (userIndex !== -1) {
            users[userIndex].age = age;
        } else {
            users.push({
                name: name,
                age: age,
                registrationDate: new Date().toISOString()
            });
        }
        
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
        
        nameInput.value = '';
        ageInput.value = '';
        userDataSection.classList.add('hidden');
        
        alert(`${name} ${userIndex !== -1 ? 'actualizado' : 'registrado'} correctamente.`);
    }
    
    function cancelAction() {
        userDataSection.classList.add('hidden');
        nameInput.value = '';
        ageInput.value = '';
        nameInput.focus();
    }
    
    function loadUsers() {
        const users = getUsersFromStorage();
        updateStats(users);
        
        usersList.innerHTML = '';
        
        if (users.length === 0) {
            emptyMessage.classList.remove('hidden');
            return;
        }
        
        emptyMessage.classList.add('hidden');
        users.sort((a, b) => a.name.localeCompare(b.name));
        
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'user-item';
            
            userElement.innerHTML = `
                <div>
                    <strong>${user.name}</strong> - ${user.age} años
                </div>
                <button class="delete-btn" data-name="${user.name}">Eliminar</button>
            `;
            
            usersList.appendChild(userElement);
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const userName = this.getAttribute('data-name');
                deleteUser(userName);
            });
        });
    }
    
    function deleteUser(userName) {
        if (!confirm(`¿Eliminar a ${userName}?`)) return;
        
        const users = getUsersFromStorage();
        const filteredUsers = users.filter(u => u.name !== userName);
        
        localStorage.setItem('users', JSON.stringify(filteredUsers));
        loadUsers();
        
        if (nameInput.value === userName) {
            cancelAction();
        }
    }
    
    function clearAllUsers() {
        const users = getUsersFromStorage();
        
        if (users.length === 0) {
            alert('No hay usuarios para eliminar');
            return;
        }
        
        if (!confirm(`¿Eliminar todos los usuarios (${users.length})?`)) return;
        
        localStorage.removeItem('users');
        loadUsers();
        cancelAction();
        
        alert('Todos los usuarios han sido eliminados');
    }
    
    function getUsersFromStorage() {
        const usersJSON = localStorage.getItem('users');
        return usersJSON ? JSON.parse(usersJSON) : [];
    }
    
    function updateStats(users) {
        totalUsers.textContent = users.length;
        
        if (users.length === 0) {
            averageAge.textContent = '0';
            return;
        }
        
        const totalAge = users.reduce((sum, user) => sum + user.age, 0);
        const avgAge = totalAge / users.length;
        averageAge.textContent = avgAge.toFixed(1);
    }
});