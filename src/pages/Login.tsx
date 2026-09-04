//import './Login.css'
import React, { useEffect, useState } from 'react'

interface LoginFormEvent extends React.SubmitEvent<HTMLFormElement>{}

//가상로그인
const fakeAuth = (username: string, password: string): boolean => {
    return username === "admin" && password === "1234"
}


const Login: React.FC = () => {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        const storedLogin = sessionStorage.getItem("isLoggedIn")
        if(storedLogin === "true"){
            setIsLoggedIn(true)
        }
    },[])

    const handleLogin = (e: LoginFormEvent):void => {
        e.preventDefault()
        if(fakeAuth(username, password)){
            setIsLoggedIn(true)
            sessionStorage.setItem("isLoggedIn", "true")
            sessionStorage.setItem("username", "username")
        }else{
            alert("MISSMATCH ID OR PW")
        }
    }

    //세션 클리어 handleLogout이라는 함수가 작동하면 setIsLoggedIn(false)로그인이 해제되고 sessionStorage.clear()가 초기화되어서 
    const handleLogout = () => {
        setIsLoggedIn(false)
        sessionStorage.clear()
    }

    return( 
        <div>
            {isLoggedIn ? (
                <>
                    <h2>어서오세요, {sessionStorage.getItem("username")}님</h2>
                    <button onClick={handleLogout}>로그아웃</button>
                </>
            ):(
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="username">아이디:</label>
                    <input type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">비빌번호:</label>
                    <input type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            )}
        </div>
    )

}

export default Login