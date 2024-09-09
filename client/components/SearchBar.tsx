import React, { useState } from 'react'
import '../styles/searchBar.css'
import { SearchData } from '../../models/search'
import SearchResults from './SearchResults'

export default function SearchBar() {
  const [formData, setFormData] = useState<SearchData>({
    content: '',
    start_date: '',
    end_date: '',
    numOfGuests: 1,
    searchType: 'attractions',
  })

  const [searchTerms, setSearchTerms] = useState<SearchData[]>([])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchTerms((prevTerms) => [...prevTerms, { ...formData }])
    // Clear the form after search
    setFormData({
      content: '',
      start_date: '',
      end_date: '',
      numOfGuests: 1,
      searchType: formData.searchType,
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'numOfGuests' ? Number(value) : value,
    }))
  }

  const handleTabClick = (searchType: 'accommodation' | 'attractions') => {
    setFormData((prev) => ({ ...prev, searchType }))
  }

  const handleClearSearch = (index: number) => {
    setSearchTerms((prevTerms) => prevTerms.filter((_, i) => i !== index))
  }

  return (
    <>
      <div className="search-page">
        <h1>TripBuddy Search</h1>

        <div className="search-tabs">
          <button
            className={`tab ${formData.searchType === 'accommodation' ? 'active' : ''}`}
            onClick={() => handleTabClick('accommodation')}
          >
            Accommodation
          </button>
          <button
            className={`tab ${formData.searchType === 'attractions' ? 'active' : ''}`}
            onClick={() => handleTabClick('attractions')}
          >
            Attractions
          </button>
        </div>

        <div className="search-form">
          <form id="searchForm" onSubmit={handleSearch}>
            <input
              type="text"
              id="content"
              value={formData.content}
              placeholder="Where are you going?"
              onChange={handleChange}
            />
            <input
              type="date"
              id="start_date"
              value={formData.start_date}
              placeholder="Check-in"
              onChange={handleChange}
            />
            <input
              type="date"
              id="end_date"
              value={formData.end_date}
              placeholder="Check-out"
              onChange={handleChange}
            />
            {formData.searchType === 'accommodation' && (
              <input
                type="number"
                id="numOfGuests"
                value={formData.numOfGuests}
                placeholder="Number of guests"
                min="1"
                onChange={handleChange}
              />
            )}
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div>
        {searchTerms.map((searchTerm, index) => (
          <div key={index}>
            <SearchResults searchTerm={searchTerm} />
            <button onClick={() => handleClearSearch(index)}>
              Clear this search
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
