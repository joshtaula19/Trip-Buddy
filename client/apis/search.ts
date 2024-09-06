import request from 'superagent'
import { SearchData } from '../../models/search'

const rootUrl = '/api/v1'

export async function Search(search: SearchData) {
  if (search.numOfGuests) {
    try {
      const res = await request.get(rootUrl + '/accommodation').send(search) //need more data in .send()
      return res.body
    } catch (error) {
      throw new Error('Sorry,can not find anything')
    }
  } else {
    try {
      const res = await request.get(rootUrl + '/attractions').send(search) //need more data in .send()
      return res.body
    } catch (error) {
      throw new Error('Sorry,can not find anything')
    }
  }
}
