import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import Logo from "./shutterbug.jpeg"
import { DarkMode } from "../../darkMode.js"

export const StaffNavBar = ({ token, setToken }) => {
    const navigate = useNavigate()
    const navbar = useRef()
    const hamburger = useRef()

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }

    return (
        <nav className="navbar is-info mb-3" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={Logo} height="3rem" alt="Shutterbug Logo" /> <h1 className="title is-4">ShutterBug</h1>
                </a>

            <p className="dark-mode-toggle"><DarkMode /></p>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    {
                        token
                            ?
                            <>
                                <Link to="/posts" className="navbar-item">Posts</Link>
                                <Link to="/users" className="navbar-item">Shutterbug Admin Manager</Link>
                                <Link to="/profile" className="navbar-item">My Profile</Link>

                            </>
                            :
                            ""
                    }
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                                token
                                    ?
                                    <button className="button is-outlined" onClick={() => {
                                        setToken('')
                                        navigate('/login')
                                    }}>Logout</button>
                                    :
                                    <>
                                        <Link to="/register" className="button is-link">Register</Link>
                                        <Link to="/login" className="button is-outlined">Login</Link>

                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
