import React, { useEffect, useState } from 'react'
import MovieClients from '../clients/MovieClients'
import type { MovieSummary } from '../models/MovieSummary'
import { Link } from 'react-router-dom'
import DeleteMovieModal from '../components/DeleteMovieModal'

declare global {
    interface Window{
        bootstrap: any;
    }
}

const Home: React.FC = () => {

    const [movies, setMovies] = useState<MovieSummary[]>([])
    const client = new MovieClients();
    const [movieToDelete, setMoviesToDelete] = useState<MovieSummary | null>(null)


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

    useEffect(() => {
        if(movieToDelete){
            const modalElement = document.getElementById(`deleteModal-${movieToDelete.id}`)
            const modal = new window.bootstrap.Modal(modalElement)

            const handelModalHide = () => {
                setMoviesToDelete(null)
            }

            modalElement?.addEventListener('hidden.bs.modal', handelModalHide)

            modal.show()

            //클린업 코드 => 메모리 flooding을 방지
            return () => {
                modalElement?.removeEventListener('hidden.bs.modal', handelModalHide)
            }

        }
    }, [movieToDelete])

    // 삭제 콜백 함수
    const handleDelete = async (movieId: string) => {
        try{
            const result =  await client.deleteMovieAsync(movieId)

            if(result.succeeded){
                //팝업창 닫기
                setMoviesToDelete(null)
                //재조회
                fetchMovies()
            }else{
                alert('삭제실패')
            }
        }catch(error){
            alert()
        }
    }

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
                            <td>
                                <button className='btn btn-danger'>
                                    <i className="bi bi-trash"
                                        onClick={() => setMoviesToDelete(movie)}></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 팝업창 */}
            {movieToDelete  && (
                <DeleteMovieModal movie={movieToDelete} onDelete={handleDelete} />
            )}
        </div>
    )
}

export  default Home