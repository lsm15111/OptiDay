import React from "react";
import { Calendar, ChartColumn, House, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import '../../styles/Sidebar.css';
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
    const location = useLocation();
    const currentPath = location.pathname;
    const {username} = useAuth()
    
    return (
        <div className="sidebar">
            <Link 
                to={`/main/${username}`}
                className={`sideicon ${currentPath === `/main/${username}` ? 'active' : ''}`}
            >
                <House size={30} className="text-white" />
            </Link>
            <Link 
                to={'/month'} 
                className={`sideicon ${currentPath === '/month' ? 'active' : ''}`}
            >
                <Calendar size={30} className="text-white" />
            </Link>
            <Link 
                to={'/feedback'} 
                className={`sideicon ${currentPath === '/feedback' ? 'active' : ''}`}
            >
                <ChartColumn size={30} className="text-white" />
            </Link>
            <Link
                to={'/follow'}
                className={`sideicon ${currentPath === '/follow' ? 'active' : ''}`}
            >
                <UserRound size={30} className="text-white" />
            </Link>
        </div>
    );
}

export default Sidebar;