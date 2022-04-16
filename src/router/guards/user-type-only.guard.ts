import { getCurrentUser } from '../routes.utils'
import { NavigationGuard } from 'vue-router'

interface UserTypeGuardOptions {
  allowedType: 'MasterUserModel' | 'UserModel'
  onFailureRedirectTo: string
}

/**
 * Creates a type guard that check if the current user is of a certain type
 *
 * @example
 * ```ts
 * // my-routes.ts
 * {
 *   path: '/foo/bar',
 *   beforeEnter: createUserTypeGuard({ allowedType: 'MasterUserModel' }),
 *   component: () => import('src/pages/MyPage.vue'),
 * },
 * ```
 */
export const createUserTypeGuard = (opts?: Partial<UserTypeGuardOptions>) => {
  const defaultOptions = { onFailureRedirectTo: '/', allowedType: 'UserModel' }

  const options = { ...defaultOptions, ...(opts || {}) }

  const guard: NavigationGuard = async (to, from, next) => {
    const user = await getCurrentUser()
    if (!user) return next(options.onFailureRedirectTo)

    const { __typename: userType } = user

    return userType !== options.allowedType
      ? next(options.onFailureRedirectTo)
      : next()
  }

  return guard
}
