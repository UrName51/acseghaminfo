// Initialize users object
let users = {};

// Load existing users from localStorage
if (localStorage.getItem('users')) {
  users = JSON.parse(localStorage.getItem('users'));
}

// Get the form by its id
const form = document.getElementById('login-form');

// Add a 'submit' event listener to the form
form.addEventListener('submit', function(event) {
  // Prevent the default form action (page reload)
  event.preventDefault();

  // Get the form data
  const formData = new FormData(form);
  const username = formData.get('username');
  const password = formData.get('password');

  // Check if username exists and the password matches
  if (users[username] && users[username].password === password) {

    // Optionally: Redirect to another page
     window.location.href = 'map.html';
  } else {
    alert('Invalid username or password.');
  }
});

