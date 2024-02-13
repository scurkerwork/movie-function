export interface Movie {
    id: number,
    title: string,
    actors: string
}
export interface Actor {
    _key?: number,
    id: number,
    name: string,
}
export interface MovieRating {
    id?: number,
    movieId: number,
    rating: number
}
export interface MovieWithActors {
    _key?: number,
    movie: Movie,
    rating: MovieRating
}
export interface ActorItem {
    label: string,
    value: number
}