

export interface GroupedByCity {
  [city: string]: Attraction[]
}

export interface Attraction {
  id: number
  name: string
  imageUrl: string
  price: string
  userRating: number
  trip_id?: number
}
