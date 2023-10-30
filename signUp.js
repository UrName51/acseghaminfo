// Initialize users object
let users = {};

// Load existing users from localStorage
if (localStorage.getItem('users')) {
  users = JSON.parse(localStorage.getItem('users'));
}

// Get the form by its id
const form = document.getElementById('signup-form');

// Add a 'submit' event listener to the form
form.addEventListener('submit', function(event) {
  // Prevent the default form action (page reload)
  event.preventDefault();

  // Get the form data
  const formData = new FormData(form);
  const username = formData.get('username');
  const password = formData.get('password');

  // Check if username already exists
  if (users[username]) {
    alert('Username already exists.');
    return;
  }

  // Save the user data to the users object
  users[username] = { password };

  // Save the users object to localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Optionally: Redirect to a login page
   window.location.href = 'login.html';
});