import { useQuery } from '@tanstack/react-query'
import { Search } from '../apis/search'

import { SearchData } from '../../models/search'
export function useSearch(search:SearchData) {
  //need pass data to queryFn
  return useQuery(
    {
      queryKey: ['${}'],
      queryFn: () => {
        Search(search)
      },
    }, // may be can use data or location for queryKey
  )
}
