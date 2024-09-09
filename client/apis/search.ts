import request from 'superagent'
import { SearchData } from '../../models/search'

const rootUrl = '/api/v1'

export async function Search(search: SearchData) {
  const { searchType, content, start_date, end_date, numOfGuests } = search

  try {
    const endpoint =
      searchType === 'accommodation' ? '/accommodation' : '/activities-by-city' // Correct endpoint based on searchType

    const res = await request.get(rootUrl + '/attractions' + endpoint).query({
      // Use .query() for query parameters
      content,
      start_date,
      end_date,
      numOfGuests,
    })

    return res.body
  } catch (error) {
    console.error('Error in Search function:', error)
    throw new Error('Sorry, cannot find anything')
  }
}
