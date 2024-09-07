import request from 'superagent'

const rootUrl = '/api/v1'

// Search function
export async function Search(props: { searchType: string; date: string }) {
  try {
    let res
    if (props.searchType === 'accommodation') {
      // Adjust the query parameters as needed
      res = await request
        .get(`${rootUrl}/accommodation`)
        .query({ start_date: props.date })
    } else if (props.searchType === 'attraction') {
      // Adjust the query parameters as needed
      res = await request
        .get(`${rootUrl}/attraction`)
        .query({ start_date: props.date })
    } else {
      throw new Error('Invalid search type')
    }
    return res.body
  } catch (error) {
    console.error('Error performing search:', error)
    throw error // Re-throw the error to handle it in the calling code
  }
}
