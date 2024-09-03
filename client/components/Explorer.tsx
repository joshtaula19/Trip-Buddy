import useExplore from '../hooks/use-explore.ts'
import LoadingIndicator from './LoadingIndicator'
import LocationGrid from './LocationGrid.tsx'

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

  return (
    <>
      <LocationGrid data={data} />

      {/* <div className="location-grid">
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
      </div> */}
    </>
  )
}
