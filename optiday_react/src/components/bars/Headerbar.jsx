import { Search, Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useRef } from 'react'
import '../../styles/Headerbar.css'

function Headerbar(){
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const inputRef = useRef(null);

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
                                <a className="nav-link headerbar-link" style={{ fontSize: '18px' }}>명언</a>
                                <div className="friend_img"></div>
                                <div className="friend_img"></div>
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
                                <Link className="nav-link headerbar-link" style={{ fontSize: '18px' }} to="/login">Login</Link>
                                <Link className="nav-link headerbar-link" style={{ fontSize: '18px' }} to="/logout">Logout</Link>
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