document.addEventListener('DOMContentLoaded', function() {
    // Get the hotel_id from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('hotel_id');

    // Fetch hotel details from the server
    fetch(`/hotels/${hotelId}`)
        .then(response => response.json())
        .then(hotel => {
            // Populate the booking form with hotel details
            document.querySelector('.name').textContent = hotel.name;
            document.querySelector('.logo').style.backgroundImage = `url('${hotel.image}')`;
            document.getElementById('hotel_id').innerHTML = `
                <option value="${hotel.id}" selected>${hotel.name} (${hotel.city})</option>
            `;
        })
        .catch(error => console.error('Error fetching hotel details:', error));

    // Handle booking form submission
    document.getElementById('bookingForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = {
            hotel_id: hotelId,
            customer_id: formData.get('customer_id'),
            no_of_nights: formData.get('no_of_nights'),
            no_of_people: formData.get('no_of_people'),
            check_in: formData.get('check_in'),
            check_out: formData.get('check_out')
        };

        fetch('/booking/draft', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            if (result.bookingId) {
                document.getElementById('paymentSection').style.display = 'block';
                document.getElementById('paymentForm').dataset.draftBookingId = result.bookingId;
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Handle payment form submission
    document.getElementById('paymentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = {
            draft_booking_id: formData.get('draft_booking_id'),
            payment_details: formData.get('payment_details')
        };

        fetch('/booking/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            if (result.bookingId) {
                document.getElementById('completeSection').style.display = 'block';
                document.getElementById('completeForm').dataset.bookingId = result.bookingId;
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Handle complete form submission
    document.getElementById('completeForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = {
            booking_id: formData.get('booking_id')
        };

        fetch('/booking/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
        })
        .catch(error => console.error('Error:', error));
    });
});
