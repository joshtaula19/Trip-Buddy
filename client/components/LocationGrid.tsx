const LocationGrid = ({ data }) => {
  return (
    <div className="location-grid">
      {data?.map((place) => (
        <div key={place.id} className="location-card">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="location-image"
          />
          <div className="location-overlay">
            <div className="location-info">
              <h3>{place.name}</h3>
              <p>{place.userRating}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LocationGrid
