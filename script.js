// Navigation between pages
function navigateTo(page) {
    window.location.href = page;
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevents page refresh

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Basic mock authentication (replace with backend call later)
    if (username === "admin" && password === "password123") {
        alert("Login successful!");
        window.location.href = "profile.html"; // Redirect to profile page
    } else {
        alert("Invalid username or password.");
    }
});


const rides = [
    { driver: "Smarth Jain", start: "Pune", destination: "Mumbai", seats: 3, price: 200 },
    { driver: "Alex Smith", start: "Delhi", destination: "Agra", seats: 2, price: 150 },
    { driver: "Akshay Singh", start: "Bangalore", destination: "Hyderabad", seats: 4, price: 300 }
];

function searchRides() {
    const start = document.getElementById('start').value.trim().toLowerCase();
    const destination = document.getElementById('destination').value.trim().toLowerCase();
    const date = document.getElementById('date').value.trim();
    const passengers = parseInt(document.getElementById('passengers').value.trim());

    if (start === '' || destination === '' || date === '' || isNaN(passengers) || passengers <= 0) {
        alert('Please enter valid start, destination, date, and number of passengers!');
        return;
    }

    const foundRides = rides.filter(ride => 
        ride.start.toLowerCase() === start && 
        ride.destination.toLowerCase() === destination &&
        ride.date === date &&
        ride.seats >= passengers
    );

    let output = "<h2>Available Rides</h2>";
    if (foundRides.length > 0) {
        foundRides.forEach(ride => {
            output += `<div class='ride-result'>
                            <p>✅ <strong>Driver:</strong> ${ride.driver}</p>
                            <p><strong>Date:</strong> ${ride.date}</p>
                            <p><strong>Seats Available:</strong> ${ride.seats}</p>
                            <p><strong>Price:</strong> ₹${ride.price}</p>
                            <button onclick="alert('🚗 Ride booked with ${ride.driver}!')">Book Ride</button>
                        </div>`;
        });
    } else {
        output += "<p>❌ No rides found for this route, date, or passenger count.</p>";
    }

    document.getElementById('ride-results').innerHTML = output;
}
// Book Ride Function
function bookRide(start, destination) {
    alert(`🎉 Ride from ${start} to ${destination} booked successfully!`);
}

document.getElementById('offerRideForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const start = document.getElementById('startLocation').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const seats = document.getElementById('seats').value;
    const price = document.getElementById('price').value;

    if (!start || !destination || !date || !seats || !price) {
        alert('Please fill in all fields!');
        return;
    }

    // Save ride details to local storage
    const newRide = { start, destination, date, seats, price };
    let rides = JSON.parse(localStorage.getItem('rides')) || [];
    rides.push(newRide);
    localStorage.setItem('rides', JSON.stringify(rides));

    alert(`✅ Ride from ${start} to ${destination} offered successfully!`);
    document.getElementById('offerRideForm').reset();
});

document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("review-form");
    const nameInput = document.getElementById("name");
    const reviewInput = document.getElementById("review");
    const reviewsList = document.getElementById("reviews-list");
    const stars = document.querySelectorAll(".star");
    let selectedRating = 0;

    // Load saved reviews (if any) from localStorage
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // ⭐ Handle star rating click
    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            selectedRating = index + 1; // Rating is index+1
            stars.forEach((s, i) => s.classList.toggle("selected", i < selectedRating));
        });
    });

    // 🔥 Render saved reviews from local storage
    function renderReviews() {
        reviewsList.innerHTML = ""; // Clear old content
        savedReviews.forEach((review) => {
            const reviewItem = document.createElement("div");
            reviewItem.classList.add("review-item");
            reviewItem.innerHTML = `
                <strong>${review.name}</strong>: ${review.text}
                <div class="star-rating-display">${"⭐".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
            `;
            reviewsList.appendChild(reviewItem);
        });
    }

    // Show reviews on page load
    renderReviews();

    // 🚀 Handle form submission
    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload

        const name = nameInput.value.trim();
        const reviewText = reviewInput.value.trim();

        if (name === "" || reviewText === "") {
            alert("Please enter both your name and review!");
            return;
        }

        if (selectedRating === 0) {
            alert("Please select a star rating!");
            return;
        }

        // Create and save new review
        const newReview = { name, text: reviewText, rating: selectedRating };
        savedReviews.push(newReview);

        // Save to local storage
        localStorage.setItem("reviews", JSON.stringify(savedReviews));

        // Re-render reviews immediately
        renderReviews();

        // Reset form and stars
        nameInput.value = "";
        reviewInput.value = "";
        stars.forEach(s => s.classList.remove("selected"));
        selectedRating = 0;

        alert("Thank you for your review!");
    });
});


// Smooth scroll for navigation
const links = document.querySelectorAll('nav a');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});
const editBtn = document.getElementById("edit-btn");
const username = document.getElementById("username");
const email = document.getElementById("email");

editBtn.addEventListener("click", () => {
    if (editBtn.innerText === "Edit") {
        // Switch to "Save" mode
        editBtn.innerText = "Save";

        // Turn profile data into editable inputs
        const userInput = `<input type="text" id="new-username" value="${username.innerText}">`;
        const emailInput = `<input type="email" id="new-email" value="${email.innerText}">`;

        username.innerHTML = userInput;
        email.innerHTML = emailInput;

    } else {
        // Switch back to "Edit" mode
        editBtn.innerText = "Edit";

        // Save and replace inputs with new data
        const newUsername = document.getElementById("new-username").value;
        const newEmail = document.getElementById("new-email").value;

        username.innerText = newUsername;
        email.innerText = newEmail;

        alert("Profile updated successfully!");
    }
});

    // Logout functionality
    logoutButton.addEventListener("click", () => {
        alert("Logging out...");
        window.location.href = "login.html"; // Redirect to login page
    });
const toggleButton = document.getElementById("darkModeToggle");

// Check local storage to keep mode consistent on reload
if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
}

// Add toggle functionality
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
    } else {
        localStorage.setItem("dark-mode", "disabled");
    }
});

