import Explorer from './Explorer'
import Itineraries from './Itineraries'
import SearchBar from './SearchBar'

export default function Home() {
  return (
    <>
      <SearchBar />
      <hr />
      <hr />
      <Itineraries />
      <hr />
      <hr />
      <Explorer />
    </>
  )
}
