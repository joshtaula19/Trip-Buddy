export interface SearchData {
  content: string
  start_date: string // format: 'YYYY-MM-DD'
  end_date: string // format: 'YYYY-MM-DD'
  numOfGuests: number
  searchType: 'accommodation' | 'attractions'
}
