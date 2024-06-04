// function for automated slideshow and on click
let Index = 1;
var t;
showSlides(Index);

function plusSlides(n) {
    clearTimeout(t);
    showSlides(Index += n);
}

function showSlides(n) {
let i;
let slides = document.getElementsByClassName("mySlides");
if (n == undefined) {
    n = ++Index;
}
if (n > slides.length) {
    Index = 1;
}    
if (n < 1) {
    Index = slides.length;
}
for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
}
slides[Index-1].style.display = "block";  
t = setTimeout(showSlides, 5000); 
}

// function to store data from forms in objects
function addReservation() {
let reservations=[];
        let reservation={
            Title: document.getElementById('inputTitle').value,
            Pax: document.getElementById('inputPersons').value,
            FirstName: document.getElementById('inputFirstname').value,
            LastName: document.getElementById('inputLastname').value,
            Address1: document.getElementById('inputAddress1').value,
            Address2: document.getElementById('inputAddress2').value,
            Email: document.getElementById('inputEmail').value,
            Phone: document.getElementById('inputPhone').value,
            Date: document.getElementById('inputDate').value,
            Time: document.getElementById('inputTime').value,
            Other: document.getElementById('inputOther').value,
            Choco: document.getElementById('CheckChoco').value,
            Eggs: document.getElementById('CheckEggs').value,
            Nuts: document.getElementById('CheckNuts').value,
            Gluten: document.getElementById('CheckGluten').value,
            Seafood: document.getElementById('CheckSeafood').value,
            Veg: document.getElementById('CheckVeg').value,
            Vegan: document.getElementById('CheckVegan').value,
        }
        reservations.push(reservation);
        document.getElementById("myForm").reset();
        localStorage.setItem('Reservation', JSON.stringify(reservations));
        alert("Thank you for Reserving at the ROYAL RESTAURANT. The Team will send you a confirmation message shortly");
}

//data validation input on the form
function validateForm() {
    let date2 = new Date(document.getElementById('inputDate').value);
    let date22 = date2.setHours(0,0,0,0);
    let date1 = new Date();
    let date11 = date1.setHours(0,0,0,0);
    let time1 = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
    if ((document.getElementById('inputLastname').value=="") || (document.getElementById('inputFirstname').value=="")) {
        alert("Please fill in the names properly");
        return false;
    }   
    if (date22<date11) {
        alert("You have entered a past date for your reservation");
        return false;
    }
    if ((document.getElementById('inputTime').value<"11:00")||(document.getElementById('inputTime').value>"22:00")) {
        alert("The time does not correspond to our kitchen opening hours please reselect");
        return false;
    }
    if ((date22==date11) && (document.getElementById('inputTime').value<=time1)) {
        alert("The time you have entered is already passed or too short notice");
        return false;
    }
    if ((document.getElementById('inputPhone').value>=59999999) || (document.getElementById('inputPhone').value<=1000000)) {
        alert("The phone number entered is incorrect, please retry");
        return false;
    }
    // need to add validation for total number of pax booked same time and validate with number of seats available
    addReservation();
}


// to insert the actual date in the date field in the form
// document.getElementById('inputDate').valueAsDate = new Date();