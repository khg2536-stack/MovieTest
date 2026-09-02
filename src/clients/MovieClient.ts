import type { MovieSummary } from "../models/MovieSummary";

class MovieClients{
    private baseUrl = '/api';

    async getMoviesAsync(): Promise<MovieSummary[]>{
        const response = await fetch(`${this.baseUrl}/movies`);
        if(!response.ok){
            throw new Error('조회 불가');
        }
        const date = await response.json();

        return date.map((movie: MovieSummary) => {
            return {...movie}
        });
    }
}

export default MovieClients;