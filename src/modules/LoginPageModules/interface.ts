import { UUID } from "crypto"

export interface User {
  pk: UUID
  email: string
  first_name: string
  last_name: string
  role: "lecturer" | "student"
}

export interface LoginResponse {
  access: string
  refresh: string
  user: User
}
