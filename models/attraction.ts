export interface Attraction {
  id: number
  name: string
  city?: string
  pictures: string[]
  price: {
    amount?: number
    currencyCode?: string
  }
  rating?: string
}

export interface GroupedByCity {
  [city: string]: Attraction[]
}

export interface FormattedAttraction {
  id: number
  name: string
  imageUrl: string
  price: string
  userRating: number
}
