import { QTableProps } from 'quasar'

type PaginationParams = Parameters<
  NonNullable<QTableProps['onRequest']>
>[0]['pagination']

/**
 * Get the correct offset pagination arguments to query for a
 * new page using graphql offset pagination based on a QDataTable
 * pagination request
 *
 * This basicaly translates pagination args from QDataTable to graphql
 * offset pagination args
 */
export const getOffsetPaginationArgs = ({
  page,
  rowsPerPage,
}: PaginationParams) => ({
  offset: page * rowsPerPage - rowsPerPage,
  limit: rowsPerPage,
})
