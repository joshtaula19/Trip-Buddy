import request from 'superagent'
import { SearchData } from '../../models/search'

const rootUrl = '/api/v1'
export async function getAttractions(){
  try {
    const res = await request.get(rootUrl + '/attractions') //need more data in .send()
    return res.body
  } catch (error) {
    throw new Error('Sorry,can not find anything')
  }
}


export async function addAttractions({name, imageUrl, userRating, tripId}) {
  try {
    const res = await request.post(rootUrl + '/attractions').send({
      name,
      imageUrl,
      userRating,
      tripId,
    }) //in server side, when added new attraction in table should return new attraction.id,then add tripId and attraction.id into trip-attraction table
    return res.body
  } catch (error) {
    throw new Error('Sorry,can not find anything')
  }
}
export async function delAttractions(id: number) {
  if (isNaN(Number(id))) {
    throw new Error('Fail to delete the attraction')
  }
  try {
    const res = await request.delete(rootUrl + `trips/`) //need more data in .send()
    return res.body
  } catch (error) {
    throw new Error('Fail to delete the attraction')
  }
}
