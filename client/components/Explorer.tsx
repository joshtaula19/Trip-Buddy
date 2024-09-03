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
    </>
  )
}
