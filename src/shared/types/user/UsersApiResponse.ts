import type { UIUser } from "./UIUser"

export interface UsersApiResponse {
  users: UIUser[]
  pagination: {
    page: number
    count: number
    total: number
  }
}