type SortDirection = string

export type QueryBlogInputModel = {
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
    pageNumber?: number
    pageSize?: number
}