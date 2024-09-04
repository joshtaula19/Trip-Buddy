export interface Trip {
  trip_name: string
  destination: string
  start_date: string // format: 'YYYY-MM-DD'
  end_date: string  // format: 'YYYY-MM-DD'
  notes?: string
  created_at?: Date
  updated_at?: Date
}

export interface TripData extends Trip {
  id: number
}