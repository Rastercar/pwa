/**
 * Make a list of keys optional for type T
 *
 * ``` ts
 * interface Potato {
 *   age: number
 *   price: number
 * }
 *
 * type PotatoWithOptionalPrice = Optional<Potato, 'price'>
 *
 * // valid
 * const pot: PotatoWithOptionalPrice = { age: 1 }
 * ```
 */
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
