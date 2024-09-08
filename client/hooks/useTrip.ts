import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import * as tripsFn from '../apis/trip'

export default function useTrips() {
  //trip_name,Auth0ID?,start_date?,end_date?,id?

  const allTrips = useQuery(
    {
      queryKey: ['trips'],
      queryFn: () => tripsFn.getAllTrips(),
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
  return useTripsMutation(tripsFn.addTrip)
}
export function useDelTrips() {
  return useTripsMutation(tripsFn.delTrip)
}
