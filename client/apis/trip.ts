import request from 'superagent'

const rootUrl = '/api/v1'

export async function getTripsByUserId(accessToken:string) {
  try {
    const response = await request
      .get(rootUrl + `/trips/`)
      .set('Authorization', `Bearer ${accessToken}`) 

    return response.body
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Sorry, there was an error fetching user trips: ${error.message}`)
    } else {
      throw new Error('Sorry, there was an unknown error fetching user trips.')
    }
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
