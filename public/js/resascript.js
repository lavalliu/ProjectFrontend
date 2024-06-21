function updateFormData() {
      const usernameElement = document.getElementById('inputUsername'); 
      const fnameElement = document.getElementById('inputFirstname');
      const lnameElement = document.getElementById('inputLastname');
      const emailElement = document.getElementById('inputEmail');
      const phonenoElement = document.getElementById('inputPhoneno');
      const formData = {
                          username: usernameElement.textContent,
                          fname: fnameElement.textContent,
                          lname: lnameElement.textContent,
                          email: emailElement.textContent,
                          phoneno: phonenoElement.textContent,
                          date: document.getElementById('inputDate').value,
                          time: document.getElementById('inputTime').value,
                          takeout: document.getElementById('inputTakeout').checked,
                          pax: document.getElementById('inputPersons').value,
                          other: document.getElementById('inputOther').value,
      };
      saveFormData(formData);
}
       
// Event Listener to display the username and fetch reservations
document.addEventListener('DOMContentLoaded', async function() {
let username = localStorage.getItem('username');
      try {
            const response = await fetch(`https://projectbackend-fndm.onrender.com/users/${username}`);
            const data = await response.json();
            const email = data.customer.email;
            const lname = data.customer.lname;
            const fname = data.customer.fname;
            const phoneno = data.customer.phoneno;
            
            if (id !== 'reservation') {
                  const storedData = localStorage.getItem('myResaData');
                  const parsedresData = JSON.parse(storedData);
                  date = new Date(parsedresData.date);
                  month = String(date.getMonth() + 1).padStart(2, '0');
                  formattedDate = date.getFullYear() + '-' + month + '-' + date.getDate().toString().padStart(2, '0');
                  const time = storedData.time;
                  const other = storedData.other;
                  const takeout = storedData.takeout;
                  const pax = storedData.pax;
            }
            if (username) {
                  const usernameElement = document.getElementById('inputUsername');
                  const emailElement = document.getElementById('inputEmail');
                  const fnameElement = document.getElementById('inputFirstname');
                  const lnameElement = document.getElementById('inputLastname');
                  const phonenoElement = document.getElementById('inputPhoneno');
                  usernameElement.textContent = username;
                  emailElement.textContent = email;
                  fnameElement.textContent = fname;
                  lnameElement.textContent = lname;
                  phonenoElement.textContent = phoneno;
                  if (id === 'reservation') {
                        displayResas(username);
                  }
            }
      } catch (error) {
            console.error('Failed to fetch reservations:', error);
      }
});

// function to display reservation with the information saved in localstorage
function displayFormData() {
      var savedData = localStorage.getItem('myResaData');
      var data = JSON.parse(savedData);
      document.getElementById('inputEmail').value = data.email;
      document.getElementById('inputFirstname').value = data.fname;
      document.getElementById('inputLastname').value = data.lname;
      document.getElementById('inputPersons').value = data.pax;
      document.getElementById('inputPhoneno').value = data.phoneno;
      document.getElementById('inputDate').value = data.date;
      document.getElementById('inputTime').value = data.time;
      document.getElementById('inputOther').value = data.other; 
      document.getElementById('inputTakeout').checked = data.takeout; 
}

function saveFormData(formData) {
      localStorage.setItem('myResaData', JSON.stringify(formData));
}
window.onload = displayFormData;