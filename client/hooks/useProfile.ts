import { useQuery } from '@tanstack/react-query'
import { fetchUserTrips } from '../apis/trip' // Assume this function is defined elsewhere

export default function useProfile(auth0Id, getAccessTokenSilently) {
  return useQuery({
    queryKey: ['userTrips', auth0Id],
    queryFn: async () => {
      if (!auth0Id) {
        throw new Error('User ID is not available.')
      }

      const accessToken = await getAccessTokenSilently()
      //console.log('accessToken in hookssssss',accessToken)
      return await fetchUserTrips(auth0Id, accessToken)
    },
  })
}
