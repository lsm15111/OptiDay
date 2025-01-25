import React, { useEffect, useState } from 'react';
import '../styles/Main.css'
import { useAuth } from "../context/AuthContext"
import Calendar from "../components/Calendar"
import { useTodo } from '../context/TodoContext';

function Main(){
    const {username} = useAuth()
    const {fetchTodos, fetchCategories} = useTodo();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const call = async () => {
            await fetchTodos(username);
            await fetchCategories(username);
            setIsLoading(false); // Set loading to false after fetching todos
        };
        call();
    },[]);

    if(isLoading) return(<div>로딩중</div>)
    return(
        <div className="main contents">
            {/* <div className="p-2">
            <Todoslist username={username}/>
            </div> */}
            
                <div className="row justify-content-center">

            <div className="w-100 p-2 ">
            <Calendar username={username}/>
                <div className="feedback p-2 mt-2 rounded">피드백
                </div>
            </div>
            </div>
        </div>
    )
}
export default Main