        // Load users from local storage
        loadUsers();

        // Get the last used username
        const lastUsernameElement = document.getElementById('last-username');
        const lastUsedUsername = Object.keys(users).pop(); // Get the last key (username) in the object

        // Display the last used username
        lastUsernameElement.textContent = lastUsedUsername;