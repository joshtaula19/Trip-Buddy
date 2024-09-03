import React, { useState } from 'react';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('accommodation');
  const [searchResults, setSearchResults] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleSearch = () => {
    const mockResults = [
      { id: 1, name: "Cozy Apartment", type: "accommodation", rating: 4.5, price: "$120/night", image: "/api/placeholder/300/200" },
      { id: 2, name: "Luxury Hotel", type: "accommodation", rating: 4.8, price: "$250/night", image: "/api/placeholder/300/200" },
      { id: 3, name: "City Museum", type: "attraction", rating: 4.6, price: "$15/person", image: "/api/placeholder/300/200" },
      { id: 4, name: "Adventure Park", type: "attraction", rating: 4.7, price: "$30/person", image: "/api/placeholder/300/200" },
    ];
    setSearchResults(mockResults.filter(result => result.type === searchType));
  };

  return (
    <div className="search-page">
      <h1>TripBuddy Search</h1>
      
      <div className="search-tabs">
        <button 
          className={`tab ${searchType === 'accommodation' ? 'active' : ''}`}
          onClick={() => setSearchType('accommodation')}
        >
          Accommodation
        </button>
        <button 
          className={`tab ${searchType === 'attractions' ? 'active' : ''}`}
          onClick={() => setSearchType('attractions')}
        >
          Attractions
        </button>
      </div>
      
      <div className="search-form">
        <input type="text" placeholder="Where are you going?" />
        <input type="date" placeholder="Check-in" />
        <input type="date" placeholder="Check-out" />
        {searchType === 'accommodation' && (
          <input type="number" placeholder="Number of guests" min="1" />
        )}
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="results-grid">
            {searchResults.map((result) => (
              <div 
                key={result.id} 
                className="result-card"
                onMouseEnter={() => setHoveredCard(result.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <img src={result.image} alt={result.name} />
                <h3>{result.name}</h3>
                <p>{result.price}</p>
                {hoveredCard === result.id && (
                  <div className="rating-overlay">
                    <span className="star">★</span>
                    <span>{result.rating}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .search-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .search-tabs {
          display: flex;
          margin-bottom: 20px;
        }
        .tab {
          padding: 10px 20px;
          border: none;
          background-color: #f0f0f0;
          cursor: pointer;
        }
        .tab.active {
          background-color: #007bff;
          color: white;
        }
        .search-form {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .search-form input {
          flex: 1;
          min-width: 200px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .search-form button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .result-card {
          border: 1px solid #ccc;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        .result-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .result-card h3 {
          padding: 10px;
          margin: 0;
        }
        .result-card p {
          padding: 0 10px 10px;
          margin: 0;
        }
        .rating-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
        }
        .star {
          color: gold;
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default SearchPage;