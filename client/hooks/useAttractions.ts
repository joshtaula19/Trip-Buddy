import { MutationFunction, useMutation, useQuery } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import * as attractionsApi from '../apis/attractions'

export default function useAttractions() {
  //dummy data
  const attraction = [
    {
      name: 'Eiffel Tower',
      imageUrl:
        'https://www.travelandleisure.com/thmb/SPUPzO88ZXq6P4Sm4mC5Xuinoik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg',
      price: 25.0,
      userRating: 4.8,
      id: 11,
    },
    {
      name: 'Great Wall of China',
      imageUrl:
        'https://cdn.britannica.com/89/179589-138-3EE27C94/Overview-Great-Wall-of-China.jpg?w=800&h=450&c=crop',
      price: 30.0,
      userRating: 4.7,
      id: 12,
    },
    {
      name: 'Statue of Liberty',
      imageUrl:
        'https://cdn.britannica.com/71/99571-050-DFF0A6E5/Statue-of-Liberty-Island-New-York.jpg',
      price: 20.0,
      userRating: 4.6,
      id: 13,
    },
    {
      name: 'Colosseum',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG52w2si9lBGrDOy8qTygNixJVTSIONmsv6A&s',
      price: 18.5,
      userRating: 4.5,
      id: 14,
    },
    {
      name: 'Taj Mahal',
      imageUrl:
        'https://www.travelandleisure.com/thmb/wdUcyBQyQ0wUVs4wLahp0iWgZhc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taj-mahal-agra-india-TAJ0217-9eab8f20d11d4391901867ed1ce222b8.jpg',
      price: 22.0,
      userRating: 4.9,
      id: 15,
    },
    {
      name: 'Machu Picchu',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKcntlnFMzTNk7Jl9HStjw82ByHy-opUvfPQ&s',
      price: 35.0,
      userRating: 4.8,
      id: 16,
    },
    {
      name: 'Sydney Opera House',
      imageUrl:
        'https://cdn.britannica.com/96/100196-050-C92064E0/Sydney-Opera-House-Port-Jackson.jpg',
      price: 28.0,
      userRating: 4.7,
      id: 17,
    },
    {
      name: 'Christ the Redeemer',
      imageUrl:
        'https://publisher-ncreg.s3.us-east-2.amazonaws.com/pb-ncregister/swp/hv9hms/media/20231122221124_45448c583eabca7ad6be347939c641312d4ce7570209ad29d3345175aea14fec.webp',
      price: 15.0,
      userRating: 4.6,
      id: 18,
    },
    {
      name: 'Santorini',
      imageUrl:
        'https://lp-cms-production.imgix.net/2024-06/GettyImages-1336913670.jpg?w=1440&h=810&fit=crop&auto=format&q=75',
      price: 40.0,
      userRating: 4.9,
      id: 19,
    },
    {
      name: 'Pyramids of Giza',
      imageUrl:
        'https://i.natgeofe.com/n/535f3cba-f8bb-4df2-b0c5-aaca16e9ff31/giza-plateau-pyramids.jpg?w=1280&h=853',
      price: 50.0,
      userRating: 4.8,
      id: 10,
    },
  ]

  const attractions = useQuery({
    queryKey: ['attractions'],
    queryFn: () =>{return attraction} //attractionsFn.getAttractions,
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
