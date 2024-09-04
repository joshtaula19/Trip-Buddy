import { useQuery } from '@tanstack/react-query'
import { Search } from '../apis/search'
export function useSearch({ props }) {
  //need pass data to queryFn
  return useQuery(
    {
      queryKey: ['${}'],
      queryFn: () => {
        Search(props.location)
      },
    }, // may be can use data or location for queryKey
  )
}
