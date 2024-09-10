import { MutationFunction, useMutation, useQuery } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import * as attractionsApi from '../apis/attractions'

export default function useAttractions() {
  
  

  const attractions = useQuery({
    queryKey: ['randomAttractions'],
    queryFn: async() =>  await attractionsApi.getRandomAttractions()
     
  })

  return { ...attractions, add: useAddAttractions(), del: useDelAttractions() }
}
export function useAttractionsMutation(
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
export function useAddAttractions() {
  return useAttractionsMutation(attractionsApi.addAttractions)
}
export function useDelAttractions() {
  return useAttractionsMutation(attractionsApi.delAttractions)
}
