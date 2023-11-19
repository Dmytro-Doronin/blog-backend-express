enum resolutions {
    "144p" = "144p",
    "240p" = "240p",
    "360p" = "360p",
    "480p" = "480p",
    "720p" = "720p",
    "1080p" = "1080p",
    "1440p" = "1440p",
    "2160p" = "2160p",

}

type resolution = [
    resolutions["144p"],
    resolutions["240p"],
    resolutions["360p"],
    resolutions["480p"],
    resolutions["720p"],
    resolutions["1080p"],
    resolutions["1440p"],
    resolutions["2160p"]
]

export type videoTypes = {
    id: number
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: Date,
    publicationDate: Date,
    availableResolutions: resolution
}

export type postVideoType = {
    "title": string,
    "author": string,
    "availableResolutions": resolution
}