import LocationGrid from './LocationGrid'

export default function Itineraries() {
  const placesData = [
    {
      id: 1,
      name: 'Place 1',
      imageUrl:
        'https://i.ytimg.com/vi/qedwsH0nofQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC98eu3OAlqBu0GKHXi-qT_ma_NfQ',
      userRating: '4.5',
    },
    {
      id: 2,
      name: 'Place 2',
      imageUrl: 'https://i.ytimg.com/vi/BpdDN9d9Jio/maxresdefault.jpg',
      userRating: '4.7',
    },
  ]

  return (
    <>
      <h2>Itineraries</h2>
      <LocationGrid data={placesData} />
    </>
  )
}
