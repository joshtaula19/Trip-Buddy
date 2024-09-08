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
        const data = await res.json()

        console.log('Raw API data:', data)

        // Ensure `data` is an array
        if (!Array.isArray(data)) {
          console.error('Unexpected data format:', data)
          return
        }

        // Group attractions and select random ones as before
        const groupedByCity = data.reduce((acc: any, attraction: any) => {
          const city = attraction.city || 'Unknown'
          if (!acc[city]) acc[city] = []
          acc[city].push(attraction)
          return acc
        }, {})

        const selectedAttractions = Object.keys(groupedByCity).flatMap((city) =>
          groupedByCity[city].sort(() => 0.5 - Math.random()).slice(0, 20),
        )

        const formattedData = selectedAttractions.map((activity: any) => ({
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
      <h2>Explore </h2>
      <LocationGrid data={placesData} /> {/* Pass the data to LocationGrid */}
    </div>
  )
}

export default Explorer
