//
// THIS FILE IS GENERATED, DO NOT EDIT!
//

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

/** The access level to the tracked dashboard */
export type AccessLevelModel = {
  __typename?: 'AccessLevelModel'
  description: Scalars['String']
  id: Scalars['Int']
  name: Scalars['String']
  permissions: Array<Permission>
}

export type CreateSimCardDto = {
  apnAddress: Scalars['String']
  apnPassword: Scalars['String']
  apnUser: Scalars['String']
  phoneNumber: Scalars['String']
  ssn: Scalars['String']
}

/** Wrapper input for either a object with a existing SimCard ID or a DTO for creating a new SimCard */
export type CreateSimCardDtoOrId = {
  /** The data of the sim card to be created, if this is not null ID must be null */
  dto?: InputMaybe<CreateSimCardDto>
  /** The ID of the sim card to be used, DTO must be null if this is prop is not null */
  id?: InputMaybe<Scalars['Int']>
}

export type CreateTrackerDto = {
  identifier: Scalars['String']
  model: Scalars['String']
  simCards: Array<CreateSimCardDtoOrId>
}

export type CreateVehicleDto = {
  brand?: InputMaybe<Scalars['String']>
  chassisNumber?: InputMaybe<Scalars['String']>
  color?: InputMaybe<Scalars['String']>
  fabricationYear?: InputMaybe<Scalars['Float']>
  model?: InputMaybe<Scalars['String']>
  modelYear?: InputMaybe<Scalars['Float']>
  plate: Scalars['String']
  renavam?: InputMaybe<Scalars['String']>
}

/** JSON Web Token */
export type JwtModel = {
  __typename?: 'JwtModel'
  type: Scalars['String']
  value: Scalars['String']
}

export type LatLng = {
  __typename?: 'LatLng'
  lat: Scalars['Float']
  lng: Scalars['Float']
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginResponse = {
  __typename?: 'LoginResponse'
  token: JwtModel
  user: UserOrMasterUser
}

export enum Master_Permission {
  EditOtherUsers = 'EDIT_OTHER_USERS',
}

/** The access level to the tracker dashboard */
export type MasterAccessLevelModel = {
  __typename?: 'MasterAccessLevelModel'
  description: Scalars['String']
  id: Scalars['Int']
  name: Scalars['String']
  permissions: Array<Master_Permission>
}

/** master user (a user with access to the main panel) */
export type MasterUserModel = {
  __typename?: 'MasterUserModel'
  accessLevel: AccessLevelModel
  email: Scalars['String']
  emailVerified: Scalars['Boolean']
  id: Scalars['Int']
  masterAccessLevel: MasterAccessLevelModel
  username: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createVehicle: VehicleModel
  /** Creates a new tracker and/or its new simCards and associate the tracker with a existing vehicle */
  installNewTrackerOnVehicle: VehicleModel
  login: LoginResponse
  loginWithToken: LoginResponse
  register: LoginResponse
  /** Sets the trackers associated with the vehicle */
  setVehicleTrackers: VehicleModel
  updateMyProfile: UserModel
  updateVehicle: VehicleModel
}

export type MutationCreateVehicleArgs = {
  data: CreateVehicleDto
  photo?: InputMaybe<Scalars['Upload']>
}

export type MutationInstallNewTrackerOnVehicleArgs = {
  id: Scalars['Int']
  tracker: CreateTrackerDto
}

export type MutationLoginArgs = {
  credentials: LoginInput
}

export type MutationLoginWithTokenArgs = {
  token: Scalars['String']
}

export type MutationRegisterArgs = {
  user: RegisterUserDto
}

export type MutationSetVehicleTrackersArgs = {
  id: Scalars['Int']
  trackerIds: Array<Scalars['Int']>
}

export type MutationUpdateMyProfileArgs = {
  profileData: UpdateUserDto
}

export type MutationUpdateVehicleArgs = {
  data: UpdateVehicleDto
  id: Scalars['Int']
  photo?: InputMaybe<Scalars['Upload']>
}

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo'
  /** If you can increase the offset to fetch next records */
  hasMore: Scalars['Boolean']
  /** If you can decrease the offset to fetch previous records */
  hasPrevious: Scalars['Boolean']
  /** Quantity of all avaliable records */
  total: Scalars['Int']
}

export type OffsetPaginatedSimCard = {
  __typename?: 'OffsetPaginatedSimCard'
  nodes?: Maybe<Array<SimCardModel>>
  pageInfo: OffsetPageInfo
}

export type OffsetPaginatedTracker = {
  __typename?: 'OffsetPaginatedTracker'
  nodes?: Maybe<Array<TrackerModel>>
  pageInfo: OffsetPageInfo
}

export type OffsetPaginatedUser = {
  __typename?: 'OffsetPaginatedUser'
  nodes?: Maybe<Array<UserModel>>
  pageInfo: OffsetPageInfo
}

export type OffsetPaginatedVehicle = {
  __typename?: 'OffsetPaginatedVehicle'
  nodes?: Maybe<Array<VehicleModel>>
  pageInfo: OffsetPageInfo
}

/** organization */
export type OrganizationModel = {
  __typename?: 'OrganizationModel'
  billingEmail: Scalars['String']
  billingEmailVerified: Scalars['Boolean']
  blocked: Scalars['Boolean']
  id: Scalars['Int']
  name: Scalars['String']
  simCards: OffsetPaginatedSimCard
  trackers: OffsetPaginatedTracker
  users: OffsetPaginatedUser
  vehicles: OffsetPaginatedVehicle
}

/** organization */
export type OrganizationModelSimCardsArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** organization */
export type OrganizationModelTrackersArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** organization */
export type OrganizationModelUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

/** organization */
export type OrganizationModelVehiclesArgs = {
  descending?: InputMaybe<Scalars['Boolean']>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Scalars['String']>
  search?: InputMaybe<Scalars['String']>
}

export enum Permission {
  CreateVehicle = 'CREATE_VEHICLE',
  DeleteVehicle = 'DELETE_VEHICLE',
  EditOtherUsers = 'EDIT_OTHER_USERS',
  UpdateVehicle = 'UPDATE_VEHICLE',
}

export type Query = {
  __typename?: 'Query'
  /** All trackers that can recieve positions (trackers that have one or more sim cards) */
  activeTrackers: Array<TrackerModel>
  isEmailInUse: Scalars['Boolean']
  me: UserOrMasterUser
  organization?: Maybe<OrganizationModel>
  organizations: Array<OrganizationModel>
  /** Sim cards that belong to the request user organization */
  simCards: OffsetPaginatedSimCard
  /** Trackers that belong to the request user organization */
  trackers: OffsetPaginatedTracker
  unregisteredUser?: Maybe<UnregisteredUserModel>
  user?: Maybe<UserModel>
  vehicle?: Maybe<VehicleModel>
  /** Vehicles that belong to the request user organization */
  vehicles: OffsetPaginatedVehicle
}

export type QueryIsEmailInUseArgs = {
  email: Scalars['String']
}

export type QueryOrganizationArgs = {
  id: Scalars['Int']
}

export type QuerySimCardsArgs = {
  descending?: InputMaybe<Scalars['Boolean']>
  installedOnTracker?: InputMaybe<Scalars['Boolean']>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Scalars['String']>
  search?: InputMaybe<Scalars['String']>
}

export type QueryTrackersArgs = {
  descending?: InputMaybe<Scalars['Boolean']>
  installedOnVehicle?: InputMaybe<Scalars['Boolean']>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Scalars['String']>
  search?: InputMaybe<Scalars['String']>
}

export type QueryUnregisteredUserArgs = {
  uuid: Scalars['String']
}

export type QueryUserArgs = {
  id: Scalars['Int']
}

export type QueryVehicleArgs = {
  id: Scalars['Int']
}

export type QueryVehiclesArgs = {
  descending?: InputMaybe<Scalars['Boolean']>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Scalars['String']>
  search?: InputMaybe<Scalars['String']>
}

export type RegisterUserDto = {
  email: Scalars['String']
  password: Scalars['String']
  /** UUID of the unregistered user this registration refers to, once finished the referred unregistered user will be deleted, this is also used to determine wheter the user being registered uses oauth for authentication */
  refersToUnregisteredUser?: InputMaybe<Scalars['String']>
  username: Scalars['String']
}

/** sim card */
export type SimCardModel = {
  __typename?: 'SimCardModel'
  apnAddress: Scalars['String']
  apnPassword: Scalars['String']
  apnUser: Scalars['String']
  id: Scalars['Int']
  organization: SimpleOrganizationModel
  phoneNumber: Scalars['String']
  ssn: Scalars['String']
  tracker?: Maybe<TrackerModel>
}

/** organization but without nested fields */
export type SimpleOrganizationModel = {
  __typename?: 'SimpleOrganizationModel'
  billingEmail: Scalars['String']
  billingEmailVerified: Scalars['Boolean']
  blocked: Scalars['Boolean']
  id: Scalars['Int']
  name: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  listenToTracker: TrackerModel
}

export type SubscriptionListenToTrackerArgs = {
  ids?: InputMaybe<Array<Scalars['Int']>>
}

/** tracker */
export type TrackerModel = {
  __typename?: 'TrackerModel'
  id: Scalars['Int']
  /** A human readable identifier, ex: MXT013-BOX-33, Tracker 123 lote 2 */
  identifier: Scalars['String']
  lastPosition?: Maybe<LatLng>
  model: Scalars['String']
  organization: SimpleOrganizationModel
  simCards: Array<SimCardModel>
  vehicle: VehicleModel
}

/** unregistered user */
export type UnregisteredUserModel = {
  __typename?: 'UnregisteredUserModel'
  email: Scalars['String']
  emailVerified: Scalars['Boolean']
  username?: Maybe<Scalars['String']>
  uuid: Scalars['String']
}

export type UpdateUserDto = {
  email?: InputMaybe<Scalars['String']>
  /** The user old password, required when changing the user password with the password prop */
  oldPassword?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
  removeGoogleProfileLink?: InputMaybe<Scalars['Boolean']>
  username?: InputMaybe<Scalars['String']>
}

export type UpdateVehicleDto = {
  brand?: InputMaybe<Scalars['String']>
  chassisNumber?: InputMaybe<Scalars['String']>
  color?: InputMaybe<Scalars['String']>
  fabricationYear?: InputMaybe<Scalars['Float']>
  model?: InputMaybe<Scalars['String']>
  modelYear?: InputMaybe<Scalars['Float']>
  plate?: InputMaybe<Scalars['String']>
  removePhoto?: InputMaybe<Scalars['Boolean']>
  renavam?: InputMaybe<Scalars['String']>
}

/** user */
export type UserModel = {
  __typename?: 'UserModel'
  accessLevel: AccessLevelModel
  email: Scalars['String']
  emailVerified: Scalars['Boolean']
  googleProfileId?: Maybe<Scalars['String']>
  id: Scalars['Int']
  organization: SimpleOrganizationModel
  username: Scalars['String']
}

export type UserOrMasterUser = MasterUserModel | UserModel

/** vehicle */
export type VehicleModel = {
  __typename?: 'VehicleModel'
  additionalInfo?: Maybe<Scalars['String']>
  brand?: Maybe<Scalars['String']>
  chassisNumber?: Maybe<Scalars['String']>
  color?: Maybe<Scalars['String']>
  fabricationYear?: Maybe<Scalars['Float']>
  fuelConsumption?: Maybe<Scalars['Float']>
  fuelType?: Maybe<Scalars['String']>
  id: Scalars['Int']
  model?: Maybe<Scalars['String']>
  modelYear?: Maybe<Scalars['Float']>
  organization: SimpleOrganizationModel
  photo?: Maybe<Scalars['String']>
  plate: Scalars['String']
  renavam?: Maybe<Scalars['String']>
  trackers: Array<TrackerModel>
}

export type LoginMutationMutationVariables = Exact<{
  credentials: LoginInput
}>

export type LoginMutationMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'LoginResponse'
    token: { __typename?: 'JwtModel'; value: string; type: string }
    user:
      | {
          __typename?: 'MasterUserModel'
          id: number
          email: string
          username: string
          emailVerified: boolean
          accessLevel: {
            __typename?: 'AccessLevelModel'
            id: number
            name: string
            permissions: Array<Permission>
          }
          masterAccessLevel: {
            __typename?: 'MasterAccessLevelModel'
            id: number
            name: string
            permissions: Array<Master_Permission>
          }
        }
      | {
          __typename?: 'UserModel'
          id: number
          email: string
          username: string
          emailVerified: boolean
          googleProfileId?: string | null | undefined
          organization: {
            __typename?: 'SimpleOrganizationModel'
            id: number
            name: string
            blocked: boolean
            billingEmail: string
            billingEmailVerified: boolean
          }
          accessLevel: {
            __typename?: 'AccessLevelModel'
            id: number
            name: string
            permissions: Array<Permission>
          }
        }
  }
}

export type LoginByTokenMutationMutationVariables = Exact<{
  token: Scalars['String']
}>

export type LoginByTokenMutationMutation = {
  __typename?: 'Mutation'
  loginWithToken: {
    __typename?: 'LoginResponse'
    token: { __typename?: 'JwtModel'; value: string; type: string }
    user:
      | { __typename?: 'MasterUserModel' }
      | {
          __typename?: 'UserModel'
          id: number
          email: string
          username: string
          emailVerified: boolean
          googleProfileId?: string | null | undefined
          organization: {
            __typename?: 'SimpleOrganizationModel'
            id: number
            name: string
            blocked: boolean
            billingEmail: string
            billingEmailVerified: boolean
          }
          accessLevel: {
            __typename?: 'AccessLevelModel'
            id: number
            name: string
            permissions: Array<Permission>
          }
        }
  }
}

export type CheckEmailInUseQueryVariables = Exact<{
  email: Scalars['String']
}>

export type CheckEmailInUseQuery = {
  __typename?: 'Query'
  isEmailInUse: boolean
}

export type UnregisteredUserByUuidQueryVariables = Exact<{
  uuid: Scalars['String']
}>

export type UnregisteredUserByUuidQuery = {
  __typename?: 'Query'
  unregisteredUser?:
    | {
        __typename?: 'UnregisteredUserModel'
        uuid: string
        email: string
        username?: string | null | undefined
        emailVerified: boolean
      }
    | null
    | undefined
}

export type ListOrganizationsQueryVariables = Exact<{ [key: string]: never }>

export type ListOrganizationsQuery = {
  __typename?: 'Query'
  organizations: Array<{
    __typename?: 'OrganizationModel'
    id: number
    name: string
    billingEmail: string
    billingEmailVerified: boolean
  }>
}

export type OrganizationByIdQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type OrganizationByIdQuery = {
  __typename?: 'Query'
  organization?:
    | {
        __typename?: 'OrganizationModel'
        id: number
        name: string
        billingEmail: string
        billingEmailVerified: boolean
      }
    | null
    | undefined
}

export type ListSimCardsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>
  limit?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Scalars['String']>
  descending?: InputMaybe<Scalars['Boolean']>
  search?: InputMaybe<Scalars['String']>
  installedOnTracker?: InputMaybe<Scalars['Boolean']>
}>

export type ListSimCardsQuery = {
  __typename?: 'Query'
  simCards: {
    __typename?: 'OffsetPaginatedSimCard'
    nodes?:
      | Array<{
          __typename?: 'SimCardModel'
          id: number
          ssn: string
          apnUser: string
          apnAddress: string
          apnPassword: string
          phoneNumber: string
        }>
      | null
      | undefined
    pageInfo: {
      __typename?: 'OffsetPageInfo'
      total: number
      hasMore: boolean
      hasPrevious: boolean
    }
  }
}

export type ListActiveTrackersQueryVariables = Exact<{ [key: string]: never }>

export type ListActiveTrackersQuery = {
  __typename?: 'Query'
  activeTrackers: Array<{
    __typename?: 'TrackerModel'
    id: number
    identifier: string
    model: string
    lastPosition?:
      | { __typename?: 'LatLng'; lat: number; lng: number }
      | null
      | undefined
    vehicle: {
      __typename?: 'VehicleModel'
      id: number
      plate: string
      model?: string | null | undefined
      brand?: string | null | undefined
    }
  }>
}

export type ListTrackersQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>
  limit?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Scalars['String']>
  descending?: InputMaybe<Scalars['Boolean']>
  search?: InputMaybe<Scalars['String']>
  installedOnVehicle?: InputMaybe<Scalars['Boolean']>
}>

export type ListTrackersQuery = {
  __typename?: 'Query'
  trackers: {
    __typename?: 'OffsetPaginatedTracker'
    nodes?:
      | Array<{
          __typename?: 'TrackerModel'
          id: number
          identifier: string
          model: string
        }>
      | null
      | undefined
    pageInfo: {
      __typename?: 'OffsetPageInfo'
      total: number
      hasMore: boolean
      hasPrevious: boolean
    }
  }
}

export type ListenToTrackerByIdSubscriptionVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int']
}>

export type ListenToTrackerByIdSubscription = {
  __typename?: 'Subscription'
  listenToTracker: {
    __typename?: 'TrackerModel'
    id: number
    lastPosition?:
      | { __typename?: 'LatLng'; lat: number; lng: number }
      | null
      | undefined
  }
}

export type FullUserFragment = {
  __typename?: 'UserModel'
  id: number
  email: string
  username: string
  emailVerified: boolean
  googleProfileId?: string | null | undefined
  organization: {
    __typename?: 'SimpleOrganizationModel'
    id: number
    name: string
    blocked: boolean
    billingEmail: string
    billingEmailVerified: boolean
  }
  accessLevel: {
    __typename?: 'AccessLevelModel'
    id: number
    name: string
    permissions: Array<Permission>
  }
}

export type UserSimpleFieldsFragment = {
  __typename?: 'UserModel'
  id: number
  email: string
  username: string
  emailVerified: boolean
  googleProfileId?: string | null | undefined
}

export type MasterUserSimpleFieldsFragment = {
  __typename?: 'MasterUserModel'
  id: number
  email: string
  username: string
  emailVerified: boolean
}

export type FullMasterUserFragment = {
  __typename?: 'MasterUserModel'
  id: number
  email: string
  username: string
  emailVerified: boolean
  accessLevel: {
    __typename?: 'AccessLevelModel'
    id: number
    name: string
    permissions: Array<Permission>
  }
  masterAccessLevel: {
    __typename?: 'MasterAccessLevelModel'
    id: number
    name: string
    permissions: Array<Master_Permission>
  }
}

export type RegisterUserMutationVariables = Exact<{
  user: RegisterUserDto
}>

export type RegisterUserMutation = {
  __typename?: 'Mutation'
  register: {
    __typename?: 'LoginResponse'
    token: { __typename?: 'JwtModel'; value: string; type: string }
    user:
      | {
          __typename?: 'MasterUserModel'
          id: number
          email: string
          username: string
          emailVerified: boolean
          accessLevel: {
            __typename?: 'AccessLevelModel'
            id: number
            name: string
            permissions: Array<Permission>
          }
          masterAccessLevel: {
            __typename?: 'MasterAccessLevelModel'
            id: number
            name: string
            permissions: Array<Master_Permission>
          }
        }
      | {
          __typename?: 'UserModel'
          id: number
          email: string
          username: string
          emailVerified: boolean
          googleProfileId?: string | null | undefined
          organization: {
            __typename?: 'SimpleOrganizationModel'
            id: number
            name: string
            blocked: boolean
            billingEmail: string
            billingEmailVerified: boolean
          }
          accessLevel: {
            __typename?: 'AccessLevelModel'
            id: number
            name: string
            permissions: Array<Permission>
          }
        }
  }
}

export type UpdateMyProfileMutationVariables = Exact<{
  profileData: UpdateUserDto
}>

export type UpdateMyProfileMutation = {
  __typename?: 'Mutation'
  updateMyProfile: {
    __typename?: 'UserModel'
    id: number
    email: string
    username: string
    emailVerified: boolean
    googleProfileId?: string | null | undefined
  }
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  me:
    | {
        __typename?: 'MasterUserModel'
        id: number
        email: string
        username: string
        emailVerified: boolean
        accessLevel: {
          __typename?: 'AccessLevelModel'
          id: number
          name: string
          permissions: Array<Permission>
        }
        masterAccessLevel: {
          __typename?: 'MasterAccessLevelModel'
          id: number
          name: string
          permissions: Array<Master_Permission>
        }
      }
    | {
        __typename?: 'UserModel'
        id: number
        email: string
        username: string
        emailVerified: boolean
        googleProfileId?: string | null | undefined
        organization: {
          __typename?: 'SimpleOrganizationModel'
          id: number
          name: string
          blocked: boolean
          billingEmail: string
          billingEmailVerified: boolean
        }
        accessLevel: {
          __typename?: 'AccessLevelModel'
          id: number
          name: string
          permissions: Array<Permission>
        }
      }
}

export type CurrentUserSimpleQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserSimpleQuery = {
  __typename?: 'Query'
  me:
    | {
        __typename?: 'MasterUserModel'
        id: number
        email: string
        username: string
        emailVerified: boolean
      }
    | {
        __typename?: 'UserModel'
        id: number
        email: string
        username: string
        emailVerified: boolean
        googleProfileId?: string | null | undefined
      }
}

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type UserByIdQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'UserModel'
        id: number
        email: string
        username: string
        emailVerified: boolean
        googleProfileId?: string | null | undefined
        organization: {
          __typename?: 'SimpleOrganizationModel'
          id: number
          name: string
          blocked: boolean
          billingEmail: string
          billingEmailVerified: boolean
        }
        accessLevel: {
          __typename?: 'AccessLevelModel'
          id: number
          name: string
          permissions: Array<Permission>
        }
      }
    | null
    | undefined
}

export type VehicleFieldsFragment = {
  __typename?: 'VehicleModel'
  id: number
  brand?: string | null | undefined
  color?: string | null | undefined
  model?: string | null | undefined
  photo?: string | null | undefined
  plate: string
  renavam?: string | null | undefined
  modelYear?: number | null | undefined
  chassisNumber?: string | null | undefined
  fabricationYear?: number | null | undefined
}

export type CreateVehicleMutationVariables = Exact<{
  photo?: InputMaybe<Scalars['Upload']>
  data: CreateVehicleDto
}>

export type CreateVehicleMutation = {
  __typename?: 'Mutation'
  createVehicle: {
    __typename?: 'VehicleModel'
    id: number
    brand?: string | null | undefined
    color?: string | null | undefined
    model?: string | null | undefined
    photo?: string | null | undefined
    plate: string
    renavam?: string | null | undefined
    modelYear?: number | null | undefined
    chassisNumber?: string | null | undefined
    fabricationYear?: number | null | undefined
  }
}

export type UpdateVehicleMutationVariables = Exact<{
  id: Scalars['Int']
  photo?: InputMaybe<Scalars['Upload']>
  data: UpdateVehicleDto
}>

export type UpdateVehicleMutation = {
  __typename?: 'Mutation'
  updateVehicle: {
    __typename?: 'VehicleModel'
    id: number
    brand?: string | null | undefined
    color?: string | null | undefined
    model?: string | null | undefined
    photo?: string | null | undefined
    plate: string
    renavam?: string | null | undefined
    modelYear?: number | null | undefined
    chassisNumber?: string | null | undefined
    fabricationYear?: number | null | undefined
  }
}

export type SetVehicleTrackersMutationVariables = Exact<{
  id: Scalars['Int']
  trackerIds: Array<Scalars['Int']> | Scalars['Int']
}>

export type SetVehicleTrackersMutation = {
  __typename?: 'Mutation'
  setVehicleTrackers: {
    __typename?: 'VehicleModel'
    id: number
    brand?: string | null | undefined
    color?: string | null | undefined
    model?: string | null | undefined
    photo?: string | null | undefined
    plate: string
    renavam?: string | null | undefined
    modelYear?: number | null | undefined
    chassisNumber?: string | null | undefined
    fabricationYear?: number | null | undefined
    trackers: Array<{
      __typename?: 'TrackerModel'
      id: number
      identifier: string
      model: string
    }>
  }
}

export type InstallVehicleTrackerMutationVariables = Exact<{
  id: Scalars['Int']
  tracker: CreateTrackerDto
}>

export type InstallVehicleTrackerMutation = {
  __typename?: 'Mutation'
  installNewTrackerOnVehicle: {
    __typename?: 'VehicleModel'
    id: number
    brand?: string | null | undefined
    color?: string | null | undefined
    model?: string | null | undefined
    photo?: string | null | undefined
    plate: string
    renavam?: string | null | undefined
    modelYear?: number | null | undefined
    chassisNumber?: string | null | undefined
    fabricationYear?: number | null | undefined
    trackers: Array<{
      __typename?: 'TrackerModel'
      id: number
      identifier: string
      model: string
    }>
  }
}

export type ListVehiclesQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>
  limit?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Scalars['String']>
  descending?: InputMaybe<Scalars['Boolean']>
  search?: InputMaybe<Scalars['String']>
}>

export type ListVehiclesQuery = {
  __typename?: 'Query'
  vehicles: {
    __typename?: 'OffsetPaginatedVehicle'
    nodes?:
      | Array<{
          __typename?: 'VehicleModel'
          id: number
          plate: string
          photo?: string | null | undefined
          model?: string | null | undefined
          color?: string | null | undefined
          renavam?: string | null | undefined
          modelYear?: number | null | undefined
          chassisNumber?: string | null | undefined
          fabricationYear?: number | null | undefined
          trackers: Array<{
            __typename?: 'TrackerModel'
            id: number
            identifier: string
            model: string
          }>
        }>
      | null
      | undefined
    pageInfo: {
      __typename?: 'OffsetPageInfo'
      total: number
      hasMore: boolean
      hasPrevious: boolean
    }
  }
}

export type FullVehicleQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type FullVehicleQuery = {
  __typename?: 'Query'
  vehicle?:
    | {
        __typename?: 'VehicleModel'
        id: number
        brand?: string | null | undefined
        color?: string | null | undefined
        model?: string | null | undefined
        photo?: string | null | undefined
        plate: string
        renavam?: string | null | undefined
        modelYear?: number | null | undefined
        chassisNumber?: string | null | undefined
        fabricationYear?: number | null | undefined
        trackers: Array<{
          __typename?: 'TrackerModel'
          id: number
          identifier: string
          model: string
          lastPosition?:
            | { __typename?: 'LatLng'; lat: number; lng: number }
            | null
            | undefined
          simCards: Array<{
            __typename?: 'SimCardModel'
            id: number
            ssn: string
            apnUser: string
            apnAddress: string
            apnPassword: string
            phoneNumber: string
          }>
        }>
      }
    | null
    | undefined
}

export const FullUserFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FullUser' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'UserModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
          { kind: 'Field', name: { kind: 'Name', value: 'googleProfileId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'organization' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'blocked' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billingEmail' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billingEmailVerified' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accessLevel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permissions' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FullUserFragment, unknown>
export const UserSimpleFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserSimpleFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'UserModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
          { kind: 'Field', name: { kind: 'Name', value: 'googleProfileId' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserSimpleFieldsFragment, unknown>
export const MasterUserSimpleFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MasterUserSimpleFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MasterUserModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MasterUserSimpleFieldsFragment, unknown>
export const FullMasterUserFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FullMasterUser' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MasterUserModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accessLevel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permissions' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'masterAccessLevel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'permissions' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FullMasterUserFragment, unknown>
export const VehicleFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VehicleFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'VehicleModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'brand' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
          { kind: 'Field', name: { kind: 'Name', value: 'model' } },
          { kind: 'Field', name: { kind: 'Name', value: 'photo' } },
          { kind: 'Field', name: { kind: 'Name', value: 'plate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'renavam' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modelYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'chassisNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fabricationYear' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VehicleFieldsFragment, unknown>
export const LoginMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'loginMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'credentials' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LoginInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'credentials' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'credentials' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'token' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'UserModel' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'FullUser' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'MasterUserModel' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'FullMasterUser' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...FullUserFragmentDoc.definitions,
    ...FullMasterUserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  LoginMutationMutation,
  LoginMutationMutationVariables
>
export const LoginByTokenMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'loginByTokenMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'token' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'loginWithToken' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'token' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'token' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'UserModel' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'FullUser' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...FullUserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  LoginByTokenMutationMutation,
  LoginByTokenMutationMutationVariables
>
export const CheckEmailInUseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'checkEmailInUse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'isEmailInUse' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CheckEmailInUseQuery,
  CheckEmailInUseQueryVariables
>
export const UnregisteredUserByUuidDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'unregisteredUserByUuid' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'uuid' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'unregisteredUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'uuid' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'uuid' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailVerified' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UnregisteredUserByUuidQuery,
  UnregisteredUserByUuidQueryVariables
>
export const ListOrganizationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'listOrganizations' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'organizations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billingEmail' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billingEmailVerified' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ListOrganizationsQuery,
  ListOrganizationsQueryVariables
>
export const OrganizationByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'organizationById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'organization' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billingEmail' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billingEmailVerified' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OrganizationByIdQuery,
  OrganizationByIdQueryVariables
>
export const ListSimCardsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'listSimCards' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'descending' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'installedOnTracker' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'simCards' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'descending' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'descending' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'installedOnTracker' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'installedOnTracker' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'ssn' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'apnUser' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'apnAddress' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'apnPassword' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'phoneNumber' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasMore' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasPrevious' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListSimCardsQuery, ListSimCardsQueryVariables>
export const ListActiveTrackersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'listActiveTrackers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'activeTrackers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'identifier' } },
                { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastPosition' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'vehicle' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'plate' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'brand' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ListActiveTrackersQuery,
  ListActiveTrackersQueryVariables
>
export const ListTrackersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'listTrackers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'descending' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'installedOnVehicle' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'trackers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'descending' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'descending' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'installedOnVehicle' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'installedOnVehicle' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'identifier' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasMore' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasPrevious' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListTrackersQuery, ListTrackersQueryVariables>
export const ListenToTrackerByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'listenToTrackerById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'Int' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listenToTracker' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ids' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'ids' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastPosition' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ListenToTrackerByIdSubscription,
  ListenToTrackerByIdSubscriptionVariables
>
export const RegisterUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'registerUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'user' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RegisterUserDTO' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'user' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'user' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'token' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'UserModel' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'FullUser' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'MasterUserModel' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'FullMasterUser' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...FullUserFragmentDoc.definitions,
    ...FullMasterUserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  RegisterUserMutation,
  RegisterUserMutationVariables
>
export const UpdateMyProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateMyProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'profileData' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateUserDTO' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateMyProfile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'profileData' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'profileData' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserSimpleFields' },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserSimpleFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  UpdateMyProfileMutation,
  UpdateMyProfileMutationVariables
>
export const CurrentUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'currentUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UserModel' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'FullUser' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'MasterUserModel' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'FullMasterUser' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...FullUserFragmentDoc.definitions,
    ...FullMasterUserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>
export const CurrentUserSimpleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'currentUserSimple' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UserModel' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UserSimpleFields' },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'MasterUserModel' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'MasterUserSimpleFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserSimpleFieldsFragmentDoc.definitions,
    ...MasterUserSimpleFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  CurrentUserSimpleQuery,
  CurrentUserSimpleQueryVariables
>
export const UserByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'FullUser' },
                },
              ],
            },
          },
        ],
      },
    },
    ...FullUserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UserByIdQuery, UserByIdQueryVariables>
export const CreateVehicleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createVehicle' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'photo' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateVehicleDTO' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createVehicle' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'photo' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'photo' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VehicleFields' },
                },
              ],
            },
          },
        ],
      },
    },
    ...VehicleFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  CreateVehicleMutation,
  CreateVehicleMutationVariables
>
export const UpdateVehicleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateVehicle' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'photo' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateVehicleDTO' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateVehicle' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'photo' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'photo' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VehicleFields' },
                },
              ],
            },
          },
        ],
      },
    },
    ...VehicleFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  UpdateVehicleMutation,
  UpdateVehicleMutationVariables
>
export const SetVehicleTrackersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'setVehicleTrackers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'trackerIds' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'Int' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'setVehicleTrackers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'trackerIds' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'trackerIds' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VehicleFields' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'trackers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'identifier' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...VehicleFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  SetVehicleTrackersMutation,
  SetVehicleTrackersMutationVariables
>
export const InstallVehicleTrackerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'installVehicleTracker' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tracker' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateTrackerDTO' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'installNewTrackerOnVehicle' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tracker' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'tracker' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VehicleFields' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'trackers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'identifier' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...VehicleFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  InstallVehicleTrackerMutation,
  InstallVehicleTrackerMutationVariables
>
export const ListVehiclesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'listVehicles' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'descending' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vehicles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'descending' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'descending' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'plate' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'photo' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'renavam' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'modelYear' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'chassisNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fabricationYear' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'trackers' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'identifier' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'model' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasMore' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasPrevious' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListVehiclesQuery, ListVehiclesQueryVariables>
export const FullVehicleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'fullVehicle' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vehicle' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VehicleFields' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'trackers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'identifier' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastPosition' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lat' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lng' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'simCards' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ssn' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'apnUser' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'apnAddress' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'apnPassword' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'phoneNumber' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...VehicleFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<FullVehicleQuery, FullVehicleQueryVariables>
