import React, { useEffect, useState } from "react";
import GenreClients from "../clients/GenreClients";
import type { Genre } from "../models/Genre";
import { useNavigate, useParams } from "react-router-dom";
import type { MovieDetail } from '../models/MovieDetail'
import MovieClients from "../clients/MovieClients";
//import { useNavigate, useParams } from "react-router-dom"

//컴포넌트 정의
const EditMovie : React.FC = () => {

    //각종 변수선언
    const navigate = useNavigate()
    //movie 
    //[args, args] 형태로 선언한는건 무엇이고 어떻게 어디서 작동하는가?
    const [genre, setGenres] = useState<Genre[]>([])
    const [movie, setMovie] = useState<MovieDetail | null>(null)
    const genreClients = new GenreClients()
    const movieClients = new MovieClients()
    const {id} = useParams<{ id: string }>()
    //const id = params.id
    const [title, setTitle] = useState<String>('')

    //최초 1회 처리
    useEffect(() => {
        const fetchData = async () => {

            //아이디가 있으면 데이터를 가져와서 movie에 셋팅하고 
            //아이디가 없으면 초기화
            if(id){
                setTitle('영화 수정')
                const movieData = await movieClients.getMovieAsync(id);
                setMovie(movieData);
            }else{
                setTitle('영화 추가')
            }

            try{
                const genreData = await genreClients.getGenreAsync()
                setGenres(genreData)
            } catch(error){
                alert('Genre Error!')
            }
        }
        fetchData()
    }, [id])

    //저장버튼 클릭시에 처리되는 부분
    const handleSubmit = async(event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(movie)
        if(!movie) return

        const movieClients = new MovieClients();
        let result;

        if(!id){
            result = await movieClients.addMovieAsync(movie);
        }else{
            result = await movieClients.updateMovieAsync(movie);
        }
        
        if (result.succeeded) {
            alert("저장")
            navigate("/")
        } else {
            alert("저장실패")
        }
    }

    //각종 인풋 셀릭트 변경시 처리
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement
        | HTMLSelectElement>) => {
            const {name, value} = event.target;
            setMovie((prevMovie) => ({
                ...prevMovie!,
                [name]: (name === 'genreId' || name === 'price' || name === 'releaseYear') ? parseInt(value) : value
            }))
    }


    return (
        <div>
            <h3>{title}</h3>
            <div className="row mb-2">
                <div className="col md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">이름</label>
                            <input type="text" id="name" name="name" 
                                    value={movie?.name}
                                    onChange={handleInputChange}
                                    className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genreId" className="form-label">장르</label>
                            <select name="genreId" id="genre"
                                    value={movie?.genreId}
                                    onChange={handleInputChange}
                                    className="form-select" required>
                                    <option value="">장르선택</option>
                                    {genre.map((genre) => (
                                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-control">가격</label>
                            <input type="text" id="price" name="price" 
                                    value={movie?.price}
                                    onChange={handleInputChange}
                                    className="form-control" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="releaseYear" className="form-label">출시년도</label>
                            <input type="text" id="releaseYear"
                                    name="releaseYear" 
                                    value={movie?.releaseYear}
                                    onChange={handleInputChange}
                                    className="form-control" required/>
                        </div>
                        <button type="submit" className="btn btn-primary me-1">저장</button>
                        <button type="submit" className="btn btn-secondary" onClick={() => navigate("/")}>취소</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default EditMovie;