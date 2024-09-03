import React, { useState } from 'react';
import "../styles/searchBar.css"
export default function  SearchBar() {
  const [searchType, setSearchType] = useState('accommodation');
  const [searchResults, setSearchResults] = useState([]);
  // const [hoveredCard, setHoveredCard] = useState(null);

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
      </div>)}
