import Explorer from './Explorer'
import Itineraries from './Itineraries'
import SearchBar from './SearchBar'
import User from './User'

export default function Home() {
  return (
    <>
      <User />
      <hr />
      <hr />
      <Itineraries />
      <hr />
      <hr />
      <SearchBar />
      <hr />
      <hr />
      <Explorer />
    </>
  )
}
