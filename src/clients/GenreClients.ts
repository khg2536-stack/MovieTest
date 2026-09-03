import type {Genre} from '../models/Genre'

class GenreClients{

    //baseUrl변수값을 '/api'같은 링크로 설정이 가능한가?
    private baseUrl = '/api';

    async getGenreAsync(): Promise<Genre[]>{
        const response = await fetch(`${this.baseUrl}/genres`);
        if(!response.ok){
            throw new Error('조회 불가');
        }

        const data = await response.json();

        return data as Promise<Genre[]>;
    }

}

export default GenreClients;