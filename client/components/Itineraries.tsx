import LocationGrid from './LocationGrid'

const Itineraries = () => {
  const staticData = [
    {
      id: 1,
      name: 'Statue of Liberty',
      imageUrl: 'https://placeimg.com/400/300/city',
      price: 'Free',
      userRating: 4.5,
    },
    {
      id: 2,
      name: 'Eiffel Tower',
      imageUrl: 'https://placeimg.com/400/300/city',
      price: '25 EUR',
      userRating: 4.8,
    },
  ]

  return (
    <div>
      <h2>Itineraries</h2>
      <LocationGrid data={staticData} />
    </div>
  )
}

export default Itineraries
