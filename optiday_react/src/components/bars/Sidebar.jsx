import React, { useState } from "react";
import { Calendar, ChartColumn, CirclePlus, House, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Todo from '../modals/Todo';
import '../../styles/Sidebar.css';

function Sidebar() {
    const [isTodoOpen, setIsTodoOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const closeModal = () => {
        setIsTodoOpen(false);
    };
    return (
        <div className="sidebar">
            <Link 
                className={`sideicon`} 
                onClick={(e) => {
                    e.preventDefault();
                    setIsTodoOpen(true);
                }}
            >
                <CirclePlus size={30} className="text-white" />
            </Link>
            <div className="line m-0 w-100" />
            <Link 
                to={'/'} 
                className={`sideicon ${currentPath === '/' ? 'active' : ''}`}
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

            
            <Todo isOpen={isTodoOpen} onClose={closeModal} />
        </div>
    );
}

export default Sidebar;