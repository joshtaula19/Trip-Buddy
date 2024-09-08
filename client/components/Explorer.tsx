import { useState, useEffect } from 'react'
import LocationGrid from './LocationGrid'

const Explorer = () => {
  const [placesData, setPlacesData] = useState<
    {
      id: number
      name: string
      imageUrl: string
      price: string
      userRating: number
    }[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
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
        interface Activity {
          id: number
          name: string
          pictures?: { imageUrl: string }[]
          price?: { amount: number; currencyCode: string }
          rating?: number
        }
        console.log(attractions) // Log the entire attractions array to inspect the structure

        const formattedData = attractions.map((activity: Activity) => ({
          id: activity.id,
          name: activity.name,
          imageUrl:
            activity.pictures && activity.pictures.length > 0
              ? activity.pictures[0] // Directly access the first image URL
              : 'https://placeimg.com/400/300/nature', // Fallback image if no pictures
          price: activity.price?.amount
            ? `${activity.price.amount} ${activity.price.currencyCode}`
            : 'Price not available',
          userRating: activity.rating
            ? parseFloat(activity.rating.toString())
            : 0,
        }))
        setPlacesData(formattedData)
      } catch (error) {
        console.error('Error fetching random activities data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>Explore</h2>
      <LocationGrid data={placesData} />
    </div>
  )
}

export default Explorer
