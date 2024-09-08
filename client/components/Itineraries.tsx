import LocationGrid from './LocationGrid'
import { useState } from 'react'
import useTrips from '../hooks/useTrip'
import { useAuth0 } from '@auth0/auth0-react'

export default function Itineraries() {
  //Placeholder Data
  const { user } = useAuth0()

  const trips = useTrips()

  const [input, setInput] = useState(false)
  const [tripName, setTripName] = useState('')

  function handleAddInput() {
    setInput(!input)
    // console.log(input)
  }

  function handleChangeTripName(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setTripName(event.target.value)
    // console.log(tripName)
  }

  const handleAddTrip = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      trips.add.mutate({ trip_name: tripName, Auth0Sub: user.sub })
    } catch (error) {
      console.error('Error adding trip:', error)
    }

    setTripName('')
    setInput(false)
  }

  // customs hooks here....
  const placesData = 
    {
      Bali: [
        {
          id: 1,
          name: 'Ocean',
          imageUrl:
            'https://media.cntraveller.com/photos/63eb5a36b515236831979f64/16:9/w_2580,c_limit/GettyImages-1145042281.jpeg',
          userRating: '4.5',
          itineraryID: 2,
        },
        {
          id: 2,
          name: 'Temple',
          imageUrl: 'https://www.outlooktravelmag.com/media/bali-tg.png',
          userRating: '4.7',
          itineraryID: 2,
        },
      ],
      Sydney: [
        {
          id: 1,
          name: 'Bridge',
          imageUrl:
            'https://static.independent.co.uk/2024/03/20/17/newFile.jpg',
          userRating: '4.5',
          itineraryID: 1,
        },
        {
          id: 2,
          name: 'Beach',
          imageUrl:
            'https://www.qantas.com/content/dam/qantas/destinations/australia/nsw/long-shot-manly-beach-through-foliage.jpg/jcr:content/renditions/hero.mobile.jpg',
          userRating: '4.7',
          itineraryID: 1,
        },
        {
          id: 3,
          name: 'Sunset',
          imageUrl:
            'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/cf/69/07/sydney-harbour.jpg?w=1200&h=1200&s=1',
          userRating: '4.7',
          itineraryID: 1,
        },
      ],
      Brisbane: [
        {
          id: 1,
          name: 'River',
          imageUrl:
            'https://content.r9cdn.net/rimg/dimg/97/d4/1dc3de6e-city-27249-163f5014ee8.jpg?crop=true&width=1020&height=498',
          userRating: '4.5',
          itineraryID: 3,
        },
        {
          id: 2,
          name: 'Skyline',
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/d/dc/River_views_of_Brisbane_CBD_seen_from_Kangaroo_Point%2C_Queensland_in_April_2019%2C_04.jpg',
          userRating: '4.7',
          itineraryID: 3,
        },
        {
          id: 3,
          name: 'Island',
          imageUrl:
            'https://teq.queensland.com/au/en/news-and-media/media-resources/fact-sheets/bay-islands-of-brisbane.thumb.800.480.png',
          userRating: '4.7',
          itineraryID: 3,
        },
      ],
    }
  

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2>Trips:</h2>
        <button onClick={handleAddInput}>➕</button>

        {input && (
          <form>
            <input
              type="text"
              placeholder="Trip name..."
              value={tripName}
              onChange={handleChangeTripName}
            />
            <button onClick={handleAddTrip}>Add</button>
          </form>
        )}
      </div>
      {placesData.map((destinations) =>
        Object.keys(destinations).map((location) => (
          <div key={location}>
            <h3>{location}</h3>
            <LocationGrid data={destinations[location]} />
          </div>
        )),
      )}
    </>
  )

  // return (
  //   <>
  //     <h2>Itineraries</h2>
  //     <LocationGrid data={placesData} />
  //   </>
  // )
}
