import { useState } from 'react'
import '../styles/searchBar.css'
export default function SearchBar() {
  const [searchType, setSearchType] = useState('accommodation')
  const [searchResults, setSearchResults] = useState([])
  const [search, setSearch] = useState({
    content: '',
    startDate: '',
    endDate: '',
    numOfGuests: '',
  })
  // const [hoveredCard, setHoveredCard] = useState(null);

  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
                     
    // const results = search-api functuion (search)
    // setSearchResults(results)

    
    //   setSearchResults(mockResults.filter((result) => result.type === searchType))
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const id = e.target.id
    switch (id) {
      case 'content':
        setSearch((prev) => ({ ...prev, content: value }))
        break
      case 'startDate':
        setSearch((prev) => ({ ...prev, startDate: value }))
        break
      case 'endDate':
        setSearch((prev) => ({ ...prev, endDate: value }))
        break
      case 'numOfGuests':
        setSearch((prev) => ({ ...prev, numOfGuests: value }))
        break
      default:
        break
    }}
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
          <form id='searchForm' onSubmit={handleSearch}>
          <input
            type="text"
            id="content"
            value={search.content}
            placeholder="Where are you going?"
            onChange={handleChange}
          />
          <input
            type="date"
            id="startDate"
            value={search.startDate}
            placeholder="Check-in"
            onChange={handleChange}
          />
          <input
            type="date"
            id="endDate"
            value={search.endDate}
            placeholder="Check-out"
            onChange={handleChange}
          />
          {searchType === 'accommodation' && (
            <input
              type="number"
              id="numOfGuests"
              value={search.numOfGuests}
              placeholder="Number of guests"
              min="1"
              onChange={handleChange}
            />
          )}
          <button >Search</button></form>
        </div>
      </div>
    )
  }

