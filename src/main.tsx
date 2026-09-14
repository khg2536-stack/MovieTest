import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import EditMovie from './pages/EditMovie.tsx'
import Login from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
        <Routes>
          {/* 현재 파일은 실행될 App의 API의 경로들을 모아놓은 것이다
          경로에는 
          Home.tsx의 '/' 메인 홈 경로,
          EditMovie.tsx의 '/editMovie' 영화 추가 경로,
          EditMovie.tsx의 '/editMovie/{id}' 영화 수정 경로,
          Login.tsx의 '/login' 로그인 경로가 존재하는 tsx이다.
           */}
          <Route path="/" element={<App/>}>
            <Route index element={<Home/>}/>
            {/* (<></>) 태그가 열고 닫기가 하나씩 존재하는데 (</>) 하나면 열고닫기가 한번에 되는것인가? */}
            {/* 아래 두가지의 차이점은 무엇인가? */}
            {/* <Route index element={<Jeju/>}/> */}
            {/* <Route path='jeju' element={<Jeju/>} /> */}
            <Route path='editMovie' element={<EditMovie/>} />
            <Route path='editMovie/:id' element={<EditMovie/>} />
            <Route path='login' element={<Login/>} />
          </Route>
        </Routes>
    </BrowserRouter>

)
