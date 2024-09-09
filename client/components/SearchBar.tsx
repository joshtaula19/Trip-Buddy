import { useState } from 'react'
import '../styles/searchBar.css'
import { SearchData } from '../../models/search'

import SearchResults from './SearchResults'

// interface SearchBarProps {
//   onSearch: (searchData: SearchData) => void
// }

export default function SearchBar() {
  //{ onSearch }: SearchBarProps

  const [searchTerm, setSearchTerm] = useState<SearchData>({
    content: '',
    start_date: '',
    end_date: '',
    numOfGuests: 1,
    searchType: 'attractions',
  })
  const [search, setSearch] = useState<SearchData>({
    content: '',
    start_date: '',
    end_date: '',
    numOfGuests: 1,
    searchType: 'attractions',
  })

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchTerm(search)

    // const searchData: SearchData = {
    //   content: search.content,
    //   start_date: search.startDate,
    //   end_date: search.endDate,
    //   numOfGuests: parseInt(search.numOfGuests) || 0,
    //   searchType: 'attractions',
    // }

    // Pass the searchData to the parent component
    // onSearch(searchData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const id = e.target.id
    switch (id) {
      case 'content':
        setSearch((prev) => ({ ...prev, content: value }))
        break
      case 'startDate':
        setSearch((prev) => ({ ...prev, start_date: value }))
        break
      case 'endDate':
        setSearch((prev) => ({ ...prev, end_date: value }))
        break
      case 'numOfGuests':
        setSearch((prev) => ({ ...prev, numOfGuests: Number(value) }))
        break
      default:
        break
    }
  }
console.log('searchTerm in searchbar',searchTerm)
  return (
    <>
      <div className="search-page">
        <h1>TripBuddy Search</h1>

        <div className="search-tabs">
          <button
            className={`tab ${searchTerm.searchType === 'accommodation' ? 'active' : ''}`}
            onClick={() => {
              setSearch((prev) => ({ ...prev, searchType: 'accommodation' }))
            }}
          >
            Accommodation
          </button>
          <button
            className={`tab ${searchTerm.searchType === 'attractions' ? 'active' : ''}`}
            onClick={() => {
              {
                setSearch((prev) => ({ ...prev, searchType: 'attractions' }))
              }
            }}
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
              value={search.start_date}
              placeholder="Check-in"
              onChange={handleChange}
            />
            <input
              type="date"
              id="endDate"
              value={search.end_date}
              placeholder="Check-out"
              onChange={handleChange}
            />
            {searchTerm.searchType === 'accommodation' && (
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
      </div>
      <div>
        {searchTerm.content ? <SearchResults searchTerm={searchTerm}/>:null}
      </div>
    </>
  )
}
