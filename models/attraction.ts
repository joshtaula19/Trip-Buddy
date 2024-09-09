export interface Attraction {
  id: number
  name: string
  city?: string
  pictures?: string[]
  price?: {
    amount: number
    currencyCode?: string
  }
  rating?: string
}

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
