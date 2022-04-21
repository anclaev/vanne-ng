import { ROLE } from '../enums'
import { ITeam } from './team.interface'

export interface IUser {
  _id: string
  login: string
  username: string | null
  role: ROLE
  team: ITeam
}

export type User = IUser | null
