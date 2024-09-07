import request from 'superagent'


const rootUrl = '/api/v1'

export async function getAllTrips(Auth0ID?:string) {
 
    try {
      const res = await request.get(rootUrl + '/trips').send(Auth0ID) //need more data in .send()
      return res.body
    } catch (error) {
      throw new Error('Sorry,can not find anything')
    }
}

export async function addTrip(trip_name,Auth0ID?,
  
  start_date?,
  end_date?
  ) {
 
  try {
    const res = await request.post(rootUrl + '/trips').send({trip_name,Auth0ID,
  
      start_date,
      end_date
      }) //need more data in .send()
    return res.body
  } catch (error) {
    throw new Error('Sorry,can not find anything')
  }
}
export async function delTrip(id:number) {
  if(isNaN(Number(id))){throw new Error('Sorry,can not find anything')}
  try {
    const res = await request.delete(rootUrl + `trips/${id}`) //need more data in .send()
    return res.body
  } catch (error) {
    throw new Error('Sorry,can not find anything')
  }
}