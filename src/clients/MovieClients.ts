import type { CommandResult } from "../models/CommandResult";
import type { MovieDetail } from "../models/MovieDetail";
import type { MovieSummary } from "../models/MovieSummary";

//영화 클라이언트
class MovieClients{
    private baseUrl = '/api';
    
    //---------------------------------------------------------------------
    //영화 목록
    async getMoviesAsync(): Promise<MovieSummary[]>{

        console.log("MovieClients.ts 영화목록 ")
        const response = await fetch(`${this.baseUrl}/movies`);
        if(!response.ok){
            throw new Error('조회 불가');
        }
        const date = await response.json();

        return date.map((movie: MovieSummary) => {
            const year = movie.releaseYear;
            return {...movie, releaseHae:`${year}년`}
        });
    }

    //---------------------------------------------------------------------
    //영화 수정화면
    async getMovieAsync(id:string): Promise<MovieDetail>{

        console.log("MovieClients.ts 영화수정 화면 진입")
        const response = await fetch(`${this.baseUrl}/movies/${id}`);
        if(!response.ok){
            throw new Error('Error');
        }
        const data = await response.json();

        return data as MovieDetail;
    }

    //---------------------------------------------------------------------
    //영화 목록 추가하기
    async addMovieAsync(movie: MovieDetail): Promise<CommandResult>{
        
        console.log("MovieClients.ts 영화추가 저장버튼 클릭")
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

    //---------------------------------------------------------------------
    //영화 수정하기
    async updateMovieAsync(movie: MovieDetail): Promise<CommandResult>{

        console.log("MovieClients.ts 영화수정 저장버튼 클릭")
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
    
    //---------------------------------------------------------------------
    //영화 삭제하기
    async deleteMovieAsync(id : string) : Promise<CommandResult>{

        const response = await fetch(`${this.baseUrl}/movies/${id}`, {
            method : 'DELETE',
        });

        if(!response.ok){
            return {succeeded : false }
        }
        
        return {succeeded : true}
    }

}

export default MovieClients;