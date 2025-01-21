import { Search, Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useRef } from 'react'
import '../../styles/Headerbar.css'
import { useAuth } from "../../context/AuthContext";

function Headerbar(){
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const inputRef = useRef(null);
    const authContext = useAuth();

    const [message,setMessage] = useState(`${authContext.username}`);


    const handleFocus = () => {
        setIsSearchActive(true);
        inputRef.current.focus();
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (!inputRef.current || !inputRef.current.contains(document.activeElement)) {
                setIsSearchActive(false);
                inputRef.current.blur();
            }
        }, 100);
    };
    function handleLogout(){
        authContext.logout();
    }


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return(
            <div className="headerbar bg-white headerbar-height">
                <div className="row ms-2 me-2 headerbar-container">
                    <nav className="navbar headerbar-nav">
                        <div className="headerbar-left">
                            <a className="navbar-brand text-black headerbar-brand fs-3" href="/">OptiDay</a>
                            <div className="headerbar-items">
                                <div className="nav-link headerbar-link fs-5" >{message}</div>
                                {/* <div className="friend_img"></div>
                                <div className="friend_img"></div> */}
                            </div>
                        </div>
                        <div className="headerbar-right">
                            <div className={`right-menu ${isMenuOpen ? 'show' : ''}`}>
                                <div className="search-container">
                                    <input 
                                        type="text" 
                                        className={`search-input ${isSearchActive ? 'active' : ''}`}
                                        placeholder="검색..."
                                        ref={inputRef}
                                        onFocus={() => setIsSearchActive(true)}
                                        onBlur={handleBlur}
                                        spellCheck={false}
                                    />
                                    <button 
                                        className={`search-button ${isSearchActive ? 'active' : ''}`} 
                                        onClick={handleFocus}
                                    >
                                        <Search size={20}/>
                                    </button>
                                </div>
                                <Link className="nav-link headerbar-link" style={{ fontSize: '18px' }} onClick={handleLogout} to="/login">Logout</Link>
                                <Link className="nav-link headerbar-link" style={{ fontSize: '18px' }} to="/mypage">Profile</Link>
                            </div>
                            <button className="menu-button" onClick={toggleMenu}>
                                <Menu size={24} />
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
    )
}

export default Headerbar