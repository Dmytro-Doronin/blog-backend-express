type SortDirection = 'asc' | 'desc'

export type QueryBlogInputModel = {
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
    pageNumber?: number
    pageSize?: number
}