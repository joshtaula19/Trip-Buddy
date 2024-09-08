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
        const res = await fetch('/api/v1/attractions/random-activities')
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        const attractions = await res.json()

        // Assuming `attractions` is an array of objects with the correct structure
        const formattedData = attractions.map((activity: any) => ({
          id: activity.id,
          name: activity.name,
          imageUrl:
            activity.pictures[0] || 'https://placeimg.com/400/300/nature',
          price: activity.price.amount
            ? `${activity.price.amount} ${activity.price.currencyCode}`
            : 'Price not available',
          userRating: activity.rating ? parseFloat(activity.rating) : 0,
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
