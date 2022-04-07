import { IEnvironment, Environment } from './environment.interface'
import { ICredentials, Credentials } from './credentials.interface'
import { IRoute, IRouteData, Routes } from './route.interface'
import { ITeam, Team } from './team.interface'
import { IUser, User } from './user.interface'

type ComponentType = 'internal' | 'public'

export {
  IRoute,
  IRouteData,
  IEnvironment,
  Environment,
  ITeam,
  Team,
  IUser,
  User,
  ICredentials,
  Credentials,
  Routes,
  ComponentType,
}
