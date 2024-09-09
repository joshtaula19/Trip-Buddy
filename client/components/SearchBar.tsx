import { useState } from 'react'
import '../styles/searchBar.css'
import { Search } from '../apis/search.ts'
import { SearchData } from '../../models/search'

interface Activity {
  id: number
  name: string
  imageUrl: string
  price: string
  userRating: number
}

export default function SearchBar() {
  const [searchType, setSearchType] = useState('accommodation')
  const [searchResults, setSearchResults] = useState<Activity[]>([])
  const [search, setSearch] = useState({
    content: '',
    startDate: '',
    endDate: '',
    numOfGuests: '',
  })

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const searchData: SearchData = {
      content: search.content,
      start_date: search.startDate,
      end_date: search.endDate,
      numOfGuests: parseInt(search.numOfGuests) || 0, // Convert to number
      searchType: 'attractions',
    }

    try {
      const results = await Search(searchData)
      setSearchResults(results)
    } catch (error) {
      console.error('Error fetching results:', error)
    }
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
    }
  }

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
        <form id="searchForm" onSubmit={handleSearch}>
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
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="search-results">
        {searchType === 'attractions' && searchResults.length > 0 && (
          <ul>
            {searchResults.map((activity) => (
              <li key={activity.id}>
                <img src={activity.imageUrl} alt={activity.name} />
                <h2>{activity.name}</h2>
                <p>{activity.price}</p>
                <p>Rating: {activity.userRating}</p>
              </li>
            ))}
          </ul>
        )}
        {/* Add similar rendering logic for 'accommodation' if needed */}
      </div>
    </div>
  )
}
