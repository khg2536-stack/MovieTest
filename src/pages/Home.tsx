import React, { useEffect, useState } from 'react'
import MovieClients from '../clients/MovieClients'
import type { MovieSummary } from '../models/MovieSummary'
import { Link } from 'react-router-dom'

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
            <div className='row mt-2'>
                <div className='col'>
                    <Link className='btn btn-primary' role='button' to="/editmovie">영화 추가</Link>
                </div>
            </div>
            <table className='table table-striped table-bordered table-hover st-3'>
                <thead className='table-dark'>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>가격</th>
                        <th>출시년도</th>
                        <th>줄거리</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) =>(
                        <tr key={movie.id}>
                            <td>
                                <Link to={`/editMovie/${movie.id}`}>{movie.name}</Link></td>
                            <td>{movie.genre}</td>
                            <td>{movie.price}</td>
                            <td>{movie.releaseYear}</td>
                            <td>{movie.releaseYear}</td>
                            <td>
                                <button className='btn btn-danger'>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export  default Home