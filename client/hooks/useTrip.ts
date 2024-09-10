import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import * as tripsApi from '../apis/trip'
import * as attractionsApi from '../apis/attractions'

export default function useTrips(getAccessTokenSilently) {
  //trip_name,Auth0ID?,start_date?,end_date?,id?

  const allTrips = useQuery(
    {
      queryKey: ['trips'],
      queryFn: async() => {
        const accessToken = await getAccessTokenSilently()
       return  await tripsApi.getTripsByUserId(accessToken)},
    },
    // may be can use data or location for queryKey
  )

  return { ...allTrips, add: useAddTrips(), delete: useDelTrips() ,delAttraction:useDelAttraction(),addAttraction:useAddAttractions()
}}

export function useTripsMutation(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] })
    },
  })
  return mutation
}
export function useAddTrips() {
  return useTripsMutation(tripsApi.addTrip)
}
export function useDelTrips() {
  return useTripsMutation(tripsApi.delTrip)
}
export function useDelAttraction() {
  return useTripsMutation(attractionsApi.delAttractions)
}
export function useAddAttractions() {
  return useTripsMutation(attractionsApi.addAttractions)
}