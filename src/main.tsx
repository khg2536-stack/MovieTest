import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Jeju from './pages/Jeju.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import EditMovie from './pages/EditMovie.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}>
            <Route index element={<Home/>}/>
            {/* (<></>) 태그가 열고 닫기가 하나씩 존재하는데 (</>) 하나면 열고닫기가 한번에 되는것인가? */}
            {/* 아래 두가지의 차이점은 무엇인가? */}
            {/* <Route index element={<Jeju/>}/> */}
            <Route path='jeju' element={<Jeju/>} />
            <Route path='editMovie' element={<EditMovie/>} />
            <Route path='editMovie/:id' element={<EditMovie/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
