import useExplore from '../hooks/use-explore.ts'
import LoadingIndicator from './LoadingIndicator'

export default function Explorer() {
  const { isPending, isError, data } = useExplore()

  // console.log('this is explorer', explorer)

  if (isPending) {
    return (
      <>
        <LoadingIndicator />
      </>
    )
  }

  if (isError) {
    return <>Oops</>
  }

  // console.log(' I got the data', data)

  return (
    <>
      <div className="location-grid">
        {data?.map((place) => (
          <div key={place.id} className="location-card">
            <img
              src={place.imageUrl}
              alt={place.name}
              className="location-image"
            ></img>
            <div className="location-overlay">
              <div className="location-info">
                <h3>{place.name}</h3>
                <p>{place.userRating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
