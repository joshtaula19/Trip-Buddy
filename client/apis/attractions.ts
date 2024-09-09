import request from 'superagent'
import { SearchData } from '../../models/search'

const rootUrl = '/api/v1'
export async function getAttractions(){
  try {
    const res = await request.get(rootUrl + '/attractions/') //need more data in .send()
    //console.log('attraction data api',res.body)
    return res.body
  } catch (error) {
    throw new Error('Sorry,can not find anything')
  }
}
export async function getRandomAttractions(){
  try {
    const res = await request.get(rootUrl + '/attractions/random-activities') //need more data in .send()
    
    return res.body
  } catch (error) {
    throw new Error('Sorry,can not find anything')
  }
}

export async function addAttractions({attraction, trip_id}) {
  console.log('api add attraction',{attraction, trip_id})
  
  try {
    const res = await request.post(rootUrl + '/attractions').send({attraction, trip_id}) //in server side, when added new attraction in table should return new attraction.id,then add tripId and attraction.id into trip-attraction table
    return res.body
  } catch (error) {
    throw new Error('Sorry,can not find anything')
  }
}
export async function delAttractions(id: number) {
  console.log('api ID',id)
  if (isNaN(Number(id))) {
    throw new Error('Fail to delete the attraction')
  }
  try {
    const res = await request.delete(rootUrl + `/attractions/${id}`) 
    return res.body
  } catch (error) {
    throw new Error('Fail to delete the attraction')
  }
}
