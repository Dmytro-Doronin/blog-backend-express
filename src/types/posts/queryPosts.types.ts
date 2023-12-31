type SortDirection = string

export type QueryBlogInputModel = {
    sortBy?: string
    sortDirection?: 'desc' | 'asc'
    pageNumber?: number
    pageSize?: number
}