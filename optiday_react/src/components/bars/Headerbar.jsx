import { Search } from "lucide-react"
import { Link } from "react-router-dom"


function Headerbar(){
    
    return(
        <div className="headerbar  bg-white">
            <div className="row ms-2 me-2">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="/">OptiDay</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                <Link className="nav-link" to="/welcome">명언</Link>
                            </li>
                            <li className="nav-item fs-5">
                                <Link className="nav-link" to="/todos">*친구 아이콘*</Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-3"><div><Search></Search></div></li>
                        <li className="nav-item fs-5">
                            <Link className="nav-link" to="/login">Login</Link></li>
                            <li className="nav-item fs-5">
                            <Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Headerbar