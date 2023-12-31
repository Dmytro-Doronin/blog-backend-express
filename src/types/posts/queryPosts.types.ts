type SortDirection = 'asc' | 'desc'

export type QueryBlogInputModel = {
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}