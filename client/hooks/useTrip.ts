import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import * as tripsFn from '../apis/trip'
import { SearchData } from '../../models/search'
export default function useTrips({trip_name,Auth0ID?,start_date?,end_date?,id?}) {
  const queryClient = useQueryClient()
  const allTrips = useQuery(
    {
      queryKey: ['trips'],
      queryFn: () => tripsFn.getAllTrips(),
    },
    // may be can use data or location for queryKey
  )
  const addTrip = useMutation({
    mutationFn: ()=>tripsFn.addTrip({trip_name,Auth0ID?,start_date?,
      end_date?
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] })
    }
  })
  const delTrip = useMutation({
    mutationFn: ()=>tripsFn.delTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] })
    }
  })
  return {allTrips,addTrip,delTrip}
}
