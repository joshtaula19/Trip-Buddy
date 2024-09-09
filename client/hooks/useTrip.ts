import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import * as tripsApi from '../apis/trip'

export default function useTrips(auth0Id:string) {
  //trip_name,Auth0ID?,start_date?,end_date?,id?

  const allTrips = useQuery(
    {
      queryKey: ['trips'],
      queryFn: async() => await tripsApi.getTripsByUserId(auth0Id),
    },
    // may be can use data or location for queryKey
  )

  return { ...allTrips, add: useAddTrips(), delete: useDelTrips() }
}

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
