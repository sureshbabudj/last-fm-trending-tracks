export interface Streamable {
    '#text': string;
    fulltrack: string;
}

export interface Artist {
    name: string;
    mbid: string;
    url: string;
}

export interface Image {
    '#text': string;
    size: string;
}

export interface Track {
    name: string;
    duration: string;
    playcount: string;
    listeners: string;
    mbid: string;
    url: string;
    streamable: Streamable;
    artist: Artist;
    image: Image[];
}

export interface Attr {
    page: string;
    perPage: string;
    totalPages: string;
    total: string;
}

export interface Tracks {
    track: Track[];
    '@attr': Attr;
}

export interface RootObject {
    tracks: Tracks;
}



