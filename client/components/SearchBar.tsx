import React, { useState } from 'react'
import '../styles/searchBar.css'
import { SearchData } from '../../models/search'

interface SearchBarProps {
  onSearch: (searchData: SearchData) => void
  onClearSearch: () => void
}

export default function SearchBar({ onSearch, onClearSearch }: SearchBarProps) {
  const [formData, setFormData] = useState<SearchData>({
    content: '',
    start_date: '',
    end_date: '',
    numOfGuests: 1,
    searchType: 'attractions',
  })

  const [showOptions, setShowOptions] = useState({
    showDates: false,
    showAccommodation: false,
  }) // State to manage the visibility of date inputs

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch({ ...formData })
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

  // const handleTabClick = (searchType: 'accommodation' | 'attractions') => {
  //   setFormData((prev) => ({ ...prev, searchType }))
  // }

  const handleClear = () => {
    setFormData({
      content: '',
      start_date: '',
      end_date: '',
      numOfGuests: 1,
      searchType: 'attractions',
    })
    setShowOptions({ showDates: false, showAccommodation: false }) // Hide date inputs when clearing
    onClearSearch()
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    const checkId = e.target.id

    setShowOptions((prev) => ({ ...prev, [checkId]: checked })) // Show or hide date inputs based on checkbox
    if (checkId === 'accommodation') {
      setFormData((prev) => ({
        ...prev,
        searchType: checked ? 'accommodation' : 'attractions',
      }))
    }
  }

  return (
    <div className="search-page">
      <h1 className="search-subtitle">Plan Your Next Trip</h1>

      <div className="search-tabs">
        {/* <button
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
        </button> */}
      </div>

      <div className="search-form">
        <form id="searchForm" onSubmit={handleSearch}>
          <input
            type="text"
            id="content"
            value={formData.content}
            placeholder={
              showOptions.showAccommodation
                ? 'Accommodtion Search'
                : 'Where are you going?'
            }
            onChange={handleChange}
          />

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="showAccommodation"
              checked={showOptions.showAccommodation}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="showAccommodation"> Accommodation</label>
            {/* <input
              type="checkbox"
              id="showDates"
              checked={showOptions.showDates}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="showDates"> Dates option</label> */}
          </div>

          {showOptions.showAccommodation && (
            <div className="date-group">
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
            </div>
          )}

          <div className="button-group">
            <button type="submit">TripBuddy Search</button>
            <button type="button" className="clear-btn" onClick={handleClear}>
              I am Feeling Lucky
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
