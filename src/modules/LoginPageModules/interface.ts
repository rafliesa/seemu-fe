import { UUID } from "crypto"

export interface User {
  pk: UUID
  email: string
  first_name: string
  last_name: string
}

export interface LoginResponse {
  jwt: string
}
