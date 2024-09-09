import { useState, useEffect } from 'react'
import LocationGrid from './LocationGrid'
import SearchBar from './SearchBar'
import { SearchData } from '../../models/search'
import { FormattedAttraction, Attraction } from '../../models/attraction'
import { Search } from '../apis/search'

const Explorer = () => {
  const [placesData, setPlacesData] = useState<FormattedAttraction[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchRandomAttractions()
  }, [])

  const fetchRandomAttractions = async () => {
    setLoading(true) // Set loading to true when starting the fetch
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
      const formattedData: FormattedAttraction[] = attractions.map(
        (activity: any) => ({
          id: activity.id,
          name: activity.name,
          imageUrl:
            activity.pictures && activity.pictures.length > 0
              ? activity.pictures[0]
              : 'https://placeimg.com/400/300/nature',
          price:
            activity.price &&
            activity.price.amount &&
            activity.price.currencyCode
              ? `${activity.price.amount} ${activity.price.currencyCode}`
              : 'Price not available',
          userRating: activity.rating ? parseFloat(activity.rating) : 0,
        }),
      )

      setPlacesData(formattedData)
    } catch (error) {
      console.error('Error fetching random activities data:', error)
    } finally {
      setLoading(false) // Set loading to false after the fetch is complete
    }
  }

  const handleSearch = async (searchData: SearchData) => {
    setLoading(true) // Set loading to true when starting the search
    try {
      const results: Attraction[] = await Search(searchData)
      const formattedResults: FormattedAttraction[] = results.map(
        (activity: Attraction) => ({
          id: activity.id,
          name: activity.name,
          imageUrl:
            activity.pictures && activity.pictures.length > 0
              ? activity.pictures[0]
              : 'https://placeimg.com/400/300/nature',
          price: activity.price?.amount
            ? {
                amount:
                  typeof activity.price.amount === 'string'
                    ? parseFloat(activity.price.amount)
                    : activity.price.amount,
                currencyCode: activity.price.currencyCode,
              }
            : null,
          userRating: activity.rating ? parseFloat(activity.rating) : 0,
        }),
      )

      setPlacesData(formattedResults)
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      setLoading(false) // Set loading to false after the search is complete
    }
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <h2>Explore</h2>
      {loading ? <p>Loading...</p> : <LocationGrid data={placesData} />}
    </div>
  )
}

export default Explorer
