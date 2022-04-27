import { IUser } from '../interfaces'

export interface IAccount extends IUser {
  email: string | null
  phone: string | null
  birthday: string | null
}

export const initialAccount: IAccount = {
  _id: null,
  avatar: null,
  birthday: null,
  email: null,
  login: null,
  phone: null,
  role: null,
  team: null,
  username: null,
}
