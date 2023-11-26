export enum VideoResolution {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160",
}

type ResolutionsType = [
    VideoResolution.P144?,
    VideoResolution.P240?,
    VideoResolution.P360?,
    VideoResolution.P480?,
    VideoResolution.P720?,
    VideoResolution.P1080?,
    VideoResolution.P1440?,
    VideoResolution.P2160?,
]

export type VideoTypes = {
    id: number
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: ResolutionsType
}

export type postVideoType = {
    "title": string,
    "author": string,
    "availableResolutions": ResolutionsType
}

type errorObj = {
    "message": string,
    "field": string
}

export type ReturnedAddVideosError = {
    "errorsMessages": errorObj[]
}

export type UpdateInputVideoModel = {

    title: string,
    "author": string,
    "availableResolutions": ResolutionsType,
    "canBeDownloaded": true,
    "minAgeRestriction": number,
    "publicationDate": string
}
