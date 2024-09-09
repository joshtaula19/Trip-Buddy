export interface GroupedByCity {
  [city: string]: Attraction[]
}

export interface Attraction {
  id: number
  name: string
  imageUrl: string
  price: {
    amount?: number
    currencyCode?: string
  } | null
  userRating: number
  trip_id?: number
}

export interface FormattedAttraction {
  id: number
  name: string
  imageUrl: string
  price: string
  userRating: number
 
}
export interface TripAttraction {
  id: number
  name: string
  imageUrl: string
  userRating: number
  trip_id: number
}