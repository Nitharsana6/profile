async function fetchUsers() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function createProfileCard(user) {
    const card = document.createElement('div');
    card.className = 'profile-card';
    
    const img = document.createElement('img');
    img.src = user.picture.medium;
    card.appendChild(img);
    const name = document.createElement('h3');
    name.textContent = `${user.name.first} ${user.name.last}`;
    card.appendChild(name);
    
    const email = document.createElement('p');
    email.textContent = user.email;
    card.appendChild(email);
    
    return card;
}

function updateTable(users) {
    const tbody = document.querySelector('#user-table tbody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = `${user.name.first} ${user.name.last}`;
        row.appendChild(nameCell);
        
        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);
        
        tbody.appendChild(row);
    });
}

async function displayUsers() {
    const profilesContainer = document.getElementById('profiles-container');
    profilesContainer.innerHTML = '';

    const users = await fetchUsers();
    if (users) {
        users.forEach(user => {
            const profileCard = createProfileCard(user);
            profilesContainer.appendChild(profileCard);
        });
        updateTable(users);
    }
}

document.getElementById('more-users-btn').addEventListener('click', displayUsers);


displayUsers();