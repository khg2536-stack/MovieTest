//리액트 수업
//npm i react-router-dom 설치`
import { Outlet } from 'react-router-dom'
import NavMenu from './components/NavMenu'

//App안에 NavMenu가 존재하고 NavMenu안에 있다? 파일의 경로나 흐름이 어떻게 되지?
function App() {

  return (
    <div>
      {/* 외부에서 만든 tsx파일을 <tsx /> 백틱으로 하나로 열고닫기 가능? */}
      <NavMenu />
      <div className='Container'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
