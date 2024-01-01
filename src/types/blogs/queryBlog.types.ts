type SortDirection = 'asc' | 'desc'

export type QueryBlogInputModel = {
    searchNameTerm? : string
    sortBy?: string
    sortDirection?: -1 | 1 | "asc" | "ascending" | "desc" | "descending"
    pageNumber?: number
    pageSize?: number
}

export type QueryBlogToPostsInputModel = {
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}

