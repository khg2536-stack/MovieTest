import type { CommandResult } from "../models/CommandResult";
import type { MovieDetail } from "../models/MovieDetail";
import type { MovieSummary } from "../models/MovieSummary";

//영화 클라이언트
class MovieClients{
    private baseUrl = '/api';

    //영화 목록 가져오기
    async getMoviesAsync(): Promise<MovieSummary[]>{
        const response = await fetch(`${this.baseUrl}/movies`);
        if(!response.ok){
            throw new Error('조회 불가');
        }
        const date = await response.json();

        return date.map((movie: MovieSummary) => {
            const year = movie.releaseYear;
            return {...movie, Comment: 'ㅁㅎㄷㄴㅁㅁㄹ', releaseHae:`${year}년`}
        });
        //return date as Promise(MovieSummary[]);
    }

    //영화 한편 가져오기
    async getMovieAsync(id:string): Promise<MovieDetail>{
        const response = await fetch(`${this.baseUrl}/movies/${id}`);
        
        if(!response.ok){
            throw new Error('Error');
        }

        const data = await response.json();

        return data as MovieDetail;
    }



    //영화 목록 추가하기
    async addMovieAsync(movie: MovieDetail): Promise<CommandResult>{
        const movieData = {
            name: movie.name,
            genreId : movie.genreId,
            price : movie.price,
            releaseYear : movie.releaseYear
        };
        const response = await fetch(`${this.baseUrl}/movies`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(movieData)
        });

        if(!response.ok){
            return {succeeded : false }
        }
        
        return {succeeded : true}
    }

    //영화 수정하기
    async updateMovieAsync(movie: MovieDetail): Promise<CommandResult>{
        const movieData = {
            name: movie.name,
            genreId : movie.genreId,
            price : movie.price,
            releaseYear : movie.releaseYear
        };
        const response = await fetch(`${this.baseUrl}/movies/${movie.id}`, {
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(movieData)
        });

        if(!response.ok){
            return {succeeded : false }
        }
        
        return {succeeded : true}
    }

    //영화 삭제하기
    async deleteMovieAsync(id : string) : Promise<CommandResult>{
        // const movieData = {
        //     name: movie.name,
        //     genreId : movie.genreId,
        //     price : movie.price,
        //     releaseYear : movie.releaseYear
        // };
        const response = await fetch(`${this.baseUrl}/movies/${id}`, {
            method : 'DELETE',
            // headers: {
            //     'Content-Type' : 'application/json'
            // },
            // body: JSON.stringify(movieData)
        });

        if(!response.ok){
            return {succeeded : false }
        }
        
        return {succeeded : true}
    }

}

export default MovieClients;