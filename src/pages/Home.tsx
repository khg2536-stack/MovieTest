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

    //영화 목록 상태를 만든다.
    // movies는 현재 목록, setMovies는 목록을 바꾸는 함수다.
    const [movies, setMovies] = useState<MovieSummary[]>([])
    const [movieToDelete, setMoviesToDelete] = useState<MovieSummary | null>(null)
    const client = new MovieClients();

    //첫 화면이 반영된 뒤 조회 함수를 실행한다.
    useEffect(() => {
        console.log("A. Home에서 조회 시작")
        fetchMovies();
        console.log("B. 조회 요청을 시작했고, 아직 결과는 기다리는 중")
    }, [])

    //메인화면 렌더링
    //영화 목록을 조회하는 함수를 정의한다.
    // async는 이 함수가 비동기 함수라는 뜻이며, 안에서 await를 사용할 수 있다.
    const fetchMovies = async () => {
        try{
            //서버 조회 결과를 기다렸다가 영화 배열을 받는다.
            const response = await client.getMoviesAsync();
            console.log("서버에서 받은 영화 데이터 Home.tsx",response);
            // 위에서 받은 setMovies 함수로 상태를 변경한다.
            setMovies(response);
        }catch(error){
            console.error("영화 조회 오류:", error);
            alert(
            error instanceof Error
                ? error.message
                : "알 수 없는 오류"
        );
        }
    }

    // 삭제 콜백 함수
    const handleDelete = async (movieId: string) => {
        try {
            const result = await client.deleteMovieAsync(movieId)
            if (result.succeeded) {
                const modalElement = document.getElementById(
                    `deleteModal-${movieId}`
                )
                if (modalElement) {
                    // 모달 안에 남아 있는 포커스 해제
                    const focusedElement = document.activeElement
                    if (
                        focusedElement instanceof HTMLElement && modalElement.contains(focusedElement)
                    ) {
                        focusedElement.blur()
                    }
                    window.bootstrap.Modal.getInstance(modalElement)?.hide()
                }
                // 영화 목록 재조회
                await fetchMovies()
            } else {
                alert('삭제실패')
            }
        } catch (error) {
            alert('에러 발생')
        }
    }

    //영화 삭제시에 모달창 
    useEffect(() => {
        if (!movieToDelete) return

        const modalElement = document.getElementById(
            `deleteModal-${movieToDelete.id}`
        )
        if (!modalElement) return

        // 모달을 열기 전 포커스가 있던 요소 기억
        const opener = document.activeElement

        const modal = new window.bootstrap.Modal(modalElement)

        // 닫히기 시작할 때: 모달 내부 포커스 해제
        const handleHide = () => {
            const focusedElement = document.activeElement
            if (
                focusedElement instanceof HTMLElement &&
                modalElement.contains(focusedElement)
            ) {
                focusedElement.blur()
            }
        }

        // 완전히 닫힌 뒤: 상태 정리 및 포커스 복원
        const handleHidden = () => {
            if (opener instanceof HTMLElement && opener.isConnected) {
                opener.focus()
            }
            setMoviesToDelete(null)
        }
        modalElement.addEventListener('hide.bs.modal', handleHide)
        modalElement.addEventListener('hidden.bs.modal', handleHidden)
        modal.show()

        return () => {
            modalElement.removeEventListener('hide.bs.modal', handleHide)
            modalElement.removeEventListener('hidden.bs.modal', handleHidden)
            modal.dispose()
        }
    }, [movieToDelete])

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
                        <th>개봉년도</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        
                        <tr key={movie.id}>
                            <td>
                                <Link to={`/editMovie/${movie.id}`}>{movie.name}</Link>
                            </td>
                            <td>{movie.genre}</td>
                            <td>{movie.price}</td>
                            <td>{movie.releaseYear + "년"}</td>
                            <td>
                                <button className='btn btn-danger' onClick={() => setMoviesToDelete(movie)}>
                                    <i className="bi bi-trash" aria-hidden="true"></i>
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