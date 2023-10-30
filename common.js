// common.js
let users = {};

function loadUsers() {
  if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
  }
}

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}
