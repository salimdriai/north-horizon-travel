// Fetch and display travel recommendations
document.addEventListener("DOMContentLoaded", () => {
    // Define the function to fetch recommendations
    function fetchRecommendations() {
        fetch('travel_recommendation_api.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Check if data is loaded successfully
                displayRecommendations(data);
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }

    // Define the function to display recommendations on the page
    function displayRecommendations(recommendations) {
        const container = document.getElementById('recommendations-container');
        container.innerHTML = ''; // Clear any previous content

        recommendations.forEach(item => {
            // Create the elements for each recommendation
            const recommendationCard = document.createElement('div');
            recommendationCard.classList.add('recommendation-card');

            const img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = item.name;
            img.classList.add('recommendation-image');

            const title = document.createElement('h3');
            title.textContent = item.name;

            const description = document.createElement('p');
            description.textContent = item.description;

            // Append elements to the recommendation card
            recommendationCard.appendChild(img);
            recommendationCard.appendChild(title);
            recommendationCard.appendChild(description);

            // Append the card to the container
            container.appendChild(recommendationCard);
        });
    }

    function handleSearch() {
        const searchInput = document.getElementById('search-bar').value.toLowerCase().trim();
        
        // Define keyword categories and map synonyms
        const keywords = {
            "beach": ["beach", "beaches"],
            "temple": ["temple", "temples"],
            "country": ["country", "countries"]
        };

        // Filter recommendations based on matching keywords
        const filteredRecommendations = allRecommendations.filter(item => {
            const itemName = item.name.toLowerCase();
            const itemDescription = item.description.toLowerCase();

            return Object.values(keywords).some(keywordList =>
                keywordList.some(keyword => 
                    itemName.includes(keyword) || itemDescription.includes(keyword)
                ) && keywordList.includes(searchInput)
            );
        });

        // Display filtered results
        displayRecommendations(filteredRecommendations);
    }

    // Add event listeners for search and reset buttons
    document.getElementById('search-button').addEventListener('click', handleSearch);

    document.getElementById('reset-button').addEventListener('click', () => {
        document.getElementById('search-bar').value = '';
        displayRecommendations(allRecommendations); // Reset to all recommendations
    });
    
    // Fetch recommendations when the page loads
    fetchRecommendations();
});
