document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');
    const resultsContainer = document.querySelector('#booking .container');
    const suggestionsContainer = document.querySelector('#autocompleteSuggestions');

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();

        if (searchTerm === '') {
            alert('Please enter a search term.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/search', {
                method: 'POST', // Ensure this is POST
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ search: searchTerm }) // Send body with POST request
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            resultsContainer.innerHTML = '<p>An error occurred while fetching the results.</p>';
        }
    });

    searchInput.addEventListener('input', async () => {
        const searchTerm = searchInput.value.trim();

        if (searchTerm === '') {
            suggestionsContainer.innerHTML = ''; // Clear suggestions if input is empty
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/suggestions?term=${encodeURIComponent(searchTerm)}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const suggestions = await response.json();
            displaySuggestions(suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            suggestionsContainer.innerHTML = '<p>An error occurred while fetching suggestions.</p>';
        }
    });

    function displayResults(hotels) {
        if (!hotels.length) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        resultsContainer.innerHTML = ''; // Clear previous results

        hotels.forEach(hotel => {
            const hotelItem = document.createElement('div');
            hotelItem.className = 'hotel-item';

            hotelItem.innerHTML = `
                <div class="hotel-info">
                    <h3>${hotel.name}</h3>
                    <p>Location: ${hotel.city}, ${hotel.state}</p>
                    <p>Rating: ${'★'.repeat(Math.round(hotel.rating))}${'☆'.repeat(5 - Math.round(hotel.rating))}</p>
                    <p>Price per Night: $${hotel.per_day_price}</p>
                    <a href="detail.html?hotel_id=${hotel.id}&user_id=1" class="book-now-btn">Book Now</a>
                </div>
            `;

            resultsContainer.appendChild(hotelItem);
        });
    }

    function displaySuggestions(suggestions) {
        if (!suggestions.length) {
            suggestionsContainer.innerHTML = '<p>No suggestions found.</p>';
            return;
        }

        suggestionsContainer.innerHTML = ''; // Clear previous suggestions

        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', () => {
                searchInput.value = suggestion;
                suggestionsContainer.innerHTML = ''; // Clear suggestions
                searchButton.click(); // Trigger search
            });

            suggestionsContainer.appendChild(suggestionItem);
        });
    }
});
