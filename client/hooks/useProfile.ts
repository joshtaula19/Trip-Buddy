import { useQuery } from '@tanstack/react-query'
import { fetchUserTrips } from '../apis/trip' // Assume this function is defined elsewhere

export default function useProfile(auth0Id, getAccessTokenSilently) {
  

  return useQuery({
    queryKey: ['userTrips', auth0Id],
    queryFn: async () => {
      if (!auth0Id) {
        throw new Error('User ID is not available.')
      }

      try {
        const accessToken = await getAccessTokenSilently()
        
        return fetchUserTrips(auth0Id, accessToken)
      } catch (tokenError) {
        throw new Error('Failed to retrieve access token.')
      }
    },
  })
}
