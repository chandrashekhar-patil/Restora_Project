// register.js

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Trim input values
        const formData = {
            name: document.querySelector('input[name="name"]').value.trim(),
            lastName: document.querySelector('input[name="lastname"]').value.trim(),
            email: document.querySelector('input[name="email"]').value.trim(),
            phone: document.querySelector('input[name="phone"]').value.trim(),
            password: document.querySelector('input[name="password"]').value
        };
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData) // Send form data as JSON
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful!");
                // Optionally, redirect to the login page
                window.location.href = "login.html";
            } else {
                alert("Registration failed: " + data.message);
            }
        } catch (error) {

            alert("An error occurred during registration.");
        }
    });
});
