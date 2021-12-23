export type validationFunction = (
  v: string,
  ...options: unknown[]
) => boolean | string;
