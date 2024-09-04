export interface User { 
  username: string
  phone: string
  email: string
  Auth0ID: number
}

export interface UserData extends User {
  id: number
}

