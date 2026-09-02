import React, { useEffect, useState } from 'react'
import MovieClients from '../clients/MovieClient'
import type { MovieSummary } from '../models/MovieSummary'

const Home: React.FC = () => {

    const [movies, setMovies] = useState<MovieSummary[]>([])
    const client = new MovieClients();

    const fetchMovies = async () => {
        try{
            const response = await client.getMoviesAsync();
            setMovies(response);
        }catch(error){
            alert("Error")
        }
    }


    useEffect(() => {
        fetchMovies();
    }, []) // 회면이 로드될때 최초 1회 실행


    return(
        <div>
            <h1>영화 목록</h1>
            <table className='table table-striped table-bordered table-hover st-3'>
                <thead className='table-dark'>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>가격</th>
                        <th>출시년도</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) =>(
                        <tr key={movie.id}>
                            <td>{movie.name}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.price}</td>
                            <td>{movie.releaseYear}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export  default Home