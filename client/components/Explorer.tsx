import useAttractions from '../hooks/useAttractions.ts'
import LoadingIndicator from './LoadingIndicator'
import LocationGrid from './LocationGrid.tsx'

export default function Explorer() {
  const { isPending, isError, data } = useAttractions()
 console.log('data in explorer',data)
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
      <h2>Explore:</h2>
      <LocationGrid data={data} />
    </>
  )
}
