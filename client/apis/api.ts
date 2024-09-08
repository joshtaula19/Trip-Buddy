// import request from 'superagent'

// const rootUrl = 'https://api.opentripmap.com/0.1/en/places/autosuggest'
// const apiKey = '5ae2e3f221c38a28845f05b606a01c9087f952690f7d10d4da04b030'

// export async function fetchAttractions(
//   lat: number,
//   lon: number,
//   radius: number,
// ) {
//   try {
//     const response = await request.get(rootUrl).query({
//       lat: lat,
//       lon: lon,
//       radius: radius,
//       apikey: apiKey,
//     })
//     return response.body
//   } catch (error) {
//     console.error('Error fetching attractions:', error)
//     throw new Error('Failed to fetch attractions')
//   }
// }
