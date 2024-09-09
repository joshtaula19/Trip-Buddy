import request from 'superagent'
import { SearchData } from '../../models/search'
// import { Attraction } from '../../models/attraction'

const rootUrl = '/api/v1'

export async function Search(search: SearchData) {
  //console.log('query data:',search)
  if (search) {
    const { searchType, content, start_date, end_date, numOfGuests } = search

    try {
      const endpoint =
        searchType === 'accommodation'
          ? '/accommodation'
          : '/activities-by-city' // Correct endpoint based on searchType
      console.log('endpointtttttttttt:', endpoint)
      const res = await request.get(rootUrl + '/attractions' + endpoint).query({
        // Use .query() for query parameters
        content,
        start_date,
        end_date,
        numOfGuests,
      })
      console.log('query return:', res.body)
      return res.body
    } catch (error) {
      throw new Error('Sorry, cannot find anything')
    }
  }
}
