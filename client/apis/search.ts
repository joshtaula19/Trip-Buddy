import request from 'superagent'
import { SearchData } from '../../models/search'

const rootUrl = '/api/v1'

export async function Search(search:SearchData){
  if (search.numOfGuests){
  const res = await request.get(rootUrl + '/accommodation').send(search)//need more data in .send()
  return res.body
  }else{
    const res = await request.get(rootUrl + '/attractions').send(search)//need more data in .send()
  return res.body
  }
}