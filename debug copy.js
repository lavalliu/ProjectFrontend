document.addEventListener('DOMContentLoaded', async function() {
    const username = localStorage.getItem('username');
    try {
    const response = await fetch(`https://projectbackend-fndm.onrender.com/users/${username}`);
    const data = await response.json();
    const email = data.email;
    const lname = data.lname;
    const fname = data.fname;
    const phoneno = data.phoneno;
    if (username) {
    const usernameElement = document.getElementById('username'); // Assuming you have an element with id 'username'
    const emailElement = document.getElementById('email'); // Assuming you have an element with id 'email'
    const fnameElement = document.getElementById('fname'); // Assuming you have an element with id 'fname'
    const lnameElement = document.getElementById('lname'); // Assuming you have an element with id 'lname'
    const phonenoElement = document.getElementById('phoneno'); // Assuming you have an element with id 'phoneno'
    usernameElement.textContent = username;
    emailElement.textContent = email;
    fnameElement.textContent = fname;
    lnameElement.textContent = lname;
    phonenoElement.textContent = phoneno;
    displayResas(username); // Ensure this function is defined elsewhere
    }
    } catch (error) {
    console.error('Failed to fetch user data:', error);
    }
    });