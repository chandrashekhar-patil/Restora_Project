document.getElementById('visitForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const hotelId = document.getElementById('hotel_id').value;
    const customerId = document.getElementById('customer_id').value;

    try {
        const response = await fetch('http://localhost:3000/visit', { // Adjust URL if necessary
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hotel_id: hotelId, customer_id: customerId })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('message').textContent = `Visit logged successfully! Visit ID: ${data.visitId}`;
            document.getElementById('visitForm').reset();
        } else {
            document.getElementById('message').textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An unexpected error occurred. Please try again.';
    }
});
