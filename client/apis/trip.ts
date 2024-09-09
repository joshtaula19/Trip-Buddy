import request from 'superagent'

const rootUrl = '/api/v1'

export async function getTripsByUserId(auth0Id: string) {
  try {
    const res = await request.get(rootUrl + `/trips/auth0id?auth0Id=${auth0Id}`)//do we nedd an auth0Id?
    
    return res.body
  } catch (error) {
    throw new Error('Sorry,can not find anything')
  }
}

export async function addTrip({ trip_name, Auth0Sub }) {
  try {
    // console.log('inside api/trip.ts trip_name, Auth0Sub', trip_name, Auth0Sub)
    const res = await request.post(rootUrl + '/trips').send({
      trip_name,
      Auth0Sub,
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
