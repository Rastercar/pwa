import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** JSON Web Token */
export type JwtModel = {
  __typename?: 'JwtModel';
  type: Scalars['String'];
  value: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: JwtModel;
  user: UserModel;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  me: UserModel;
  user: UserModel;
};

export type QueryUserArgs = {
  id: Scalars['Int'];
};

/** user */
export type UserModel = {
  __typename?: 'UserModel';
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  googleProfileId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  username: Scalars['String'];
};
