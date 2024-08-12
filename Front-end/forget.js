async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    
    try {
        const response = await fetch('http://localhost:3000/forget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();
        
        if (response.ok) {
            document.getElementById('error').textContent = result.message;
        } else {
            document.getElementById('error').textContent = result.error;
        }
    } catch (error) {
        document.getElementById('error').textContent = 'An error occurred. Please try again.';
        console.error('Error:', error);
    }
}

// Attach the form submission handler after the page has loaded
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('forgetForm').addEventListener('submit', handleSubmit);
});
