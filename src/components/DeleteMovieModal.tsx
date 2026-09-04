import React from 'react'
import type { MovieSummary } from '../models/MovieSummary'

declare interface DeleteMovieModalProps{
    movie: MovieSummary;
    onDelete: (movieId: string) => void;
}



const DeleteMovieModal: React.FC<DeleteMovieModalProps> = ({movie, onDelete}) => {

    //진짜 중요
    const modalId = `deleteModal-${movie.id}`
    const title = `${movie.name}을/를 삭제하시겠습니까?`
    
    const handleDelete = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        //alert("삭제버튼 클릭")
        onDelete(movie.id);
    }

    return(
                                    //ID에 {괄호}를 사용해서 modalId를 왜 넣는가? 중괄호의 뜻은 객체를 넣는다는 것인가?
        <div className="modal fade" id={modalId} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {title}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                        <form onSubmit={handleDelete}>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">삭제</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DeleteMovieModal