type SortDirection = "asc" | "desc"

export type QueryBlogInputModel = {
    sortBy?: string
    sortDirection?: -1 | 1 | "asc" | "ascending" | "desc" | "descending"
    pageNumber?: number
    pageSize?: number
}