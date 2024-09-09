import React, { useState, useEffect, useCallback } from 'react'
import LocationGrid from './LocationGrid'
import SearchBar from './SearchBar'
import { SearchData } from '../../models/search'
import { FormattedAttraction } from '../../models/attraction'
import { useSearch } from '../hooks/useSearch'

const Explorer = () => {
  const [randomPlacesData, setRandomPlacesData] = useState<
    FormattedAttraction[]
  >([])
  const [searchTerm, setSearchTerm] = useState<SearchData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const {
    data: searchData,
    isLoading: searchLoading,
    isSuccess: searchSuccess,
    refetch,
  } = useSearch(searchTerm)

  useEffect(() => {
    if (!searchTerm) {
      fetchRandomAttractions()
    } else {
      refetch()
    }
  }, [searchTerm, refetch])

  const fetchRandomAttractions = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/v1/attractions/random-activities', {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const errorBody = await res.text()
        console.error(
          'Error fetching data:',
          res.status,
          res.statusText,
          errorBody,
        )
        throw new Error('Network response was not ok')
      }

      const attractions = await res.json()
      const formattedData = formatAttractions(attractions)
      setRandomPlacesData(formattedData)
    } catch (error) {
      console.error('Error fetching random activities data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = useCallback((searchData: SearchData) => {
    setSearchTerm(searchData)
  }, [])

  const handleClearSearch = useCallback(() => {
    setSearchTerm(null)
  }, [])

  const formatAttractions = (attractions: any[]): FormattedAttraction[] => {
    return attractions.map((activity: any) => ({
      id: activity.id,
      name: activity.name,
      imageUrl:
        activity.pictures && activity.pictures.length > 0
          ? activity.pictures[0]
          : 'https://placeimg.com/400/300/nature',
      price:
        activity.price && activity.price.amount
          ? {
              amount:
                typeof activity.price.amount === 'string'
                  ? parseFloat(activity.price.amount)
                  : activity.price.amount,
              currencyCode: activity.price.currencyCode,
            }
          : undefined,
      userRating: activity.rating ? parseFloat(activity.rating) : 0,
    }))
  }

  const renderContent = () => {
    if (searchTerm) {
      if (searchLoading) {
        return <p>Loading search results...</p>
      }
      if (!searchData) {
        return <p>No results found</p>
      }
      const formattedSearchData = formatAttractions(searchData)
      return <LocationGrid data={formattedSearchData} />
    } else {
      if (loading) {
        return <p>Loading random activities...</p>
      }
      return <LocationGrid data={randomPlacesData} />
    }
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} onClearSearch={handleClearSearch} />
      <h2>{searchTerm ? 'Search Results' : 'Explore'}</h2>
      {renderContent()}
    </div>
  )
}

export default Explorer
