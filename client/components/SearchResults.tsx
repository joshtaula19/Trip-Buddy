import { FormattedAttraction } from '../../models/attraction'
import { useSearch } from '../hooks/useSearch'
import LocationGrid from './LocationGrid'

export default function SearchResults({ searchTerm }) {
  // console.log('searchTerm in Rrrrrrrr',searchTerm)

  const { data, isLoading, isSuccess } = useSearch(searchTerm)

  if (isLoading) {
    console.log('LOADING!!!!!!!!!!!!!')
    return <p>Loading.....</p>
  }
  console.log('search in RRRRRRRRR', data)

  if (!data) {
    console.log('No data available')
    return <p>No results found</p>
  }
  const formattedData: FormattedAttraction[] = data.map((activity: any) => ({
    id: activity.id,
    name: activity.name,
    imageUrl:
      activity.pictures && activity.pictures.length > 0
        ? activity.pictures[0]
        : 'https://placeimg.com/400/300/nature',
    price:
      activity.price && activity.price.amount && activity.price.currencyCode
        ? `${activity.price.amount} ${activity.price.currencyCode}`
        : 'Price not available',
    userRating: activity.rating ? parseFloat(activity.rating) : 0,
  }))
  console.log('formattedData', formattedData)
  return (
    <>
      <LocationGrid data={formattedData} />
    </>
  )
}
