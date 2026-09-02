import React from "react"
// 왜 import에 {}를 사용하는가?
import { NavLink } from "react-router-dom"

const NavMenu: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* import하면 태그이름으로 사용하는것인가? */}
                <NavLink className="navbar-brand" to="/">MovieBar</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {/* 왜 href를 to로 하는가? */}
                            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            {/* 왜 href를 to로 하는가? */}
                            <NavLink className="nav-link active" aria-current="page" to="/jeju">Jeju</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavMenu