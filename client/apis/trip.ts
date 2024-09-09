import request from 'superagent'

const rootUrl = '/api/v1'

export async function getTripsByUserId(auth0Id: string) {
  try {
    const res = await request.get(rootUrl + `/trips/auth0id?auth0Id=${auth0Id}`)//do we nedd an auth0Id?
    
    return res.body
    console.log('api trip data',res.body)
  } catch (error) {
    throw new Error('Sorry,can not find anything')
  }
}

export async function addTrip({ trip_name, auth0Id }:{trip_name:string,auth0Id:string}) {
  try {
    console.log('inside api/trip.ts trip_name, auth0Id', trip_name, auth0Id)
    const res = await request.post(rootUrl + '/trips').send({
      trip_name,
      auth0Id,
    }) //need more data in .send()

    return res.body
  } catch (error) {
    throw new Error('Sorry,can not find anything')
  }
}
export async function delTrip(id: number) {
  if (isNaN(Number(id))) {
    throw new Error('Sorry,can not find anything')
  }
  try {
    const res = await request.delete(rootUrl + `trips/`) //need more data in .send()
    return res.body
  } catch (error) {
    throw new Error('Sorry,can not find anything')
  }
}
