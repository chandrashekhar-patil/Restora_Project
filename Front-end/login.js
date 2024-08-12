document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get email and password values
    const email = document.getElementById("email").value;
    const password = document.getElementById("pwd").value;

    try {
        // Send POST request to the server
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }) // Include email and password in the request body
        });

        // Parse JSON response
        const data = await response.json();
        //alert(data.user.id);
        localStorage.setItem('s_id', data.user.id);
        // Check if the response status is OK
        if (response.ok) {
            alert("Login successful!");
            // Redirect to the homepage or dashboard
            window.location.href = "http://127.0.0.1:5501/login%20page/home.html"; // Update this path based on your actual homepage URL
        } else {
            // Log error message for debugging
            console.error('Login failed:', data.message);
            // Display error message on the page
            document.getElementById("error").textContent = data.message;
        }
    } catch (error) {
        // Log unexpected errors
        console.error('Error:', error);
        // Display general error message
        document.getElementById("error").textContent = "Incorrect Email Or Password";
    }
});
