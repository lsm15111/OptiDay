import React, { useEffect, useState } from 'react';
import '../styles/Main.css'
import Calendar from "../components/Calendar"
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/slices/categorySlice';
import { fetchTodos } from '../redux/slices/todoSlice';


function Main(){
    // const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchTodos());
    },[dispatch])


    // if(isLoading) return(<div className="main contents">로딩중</div>)
    return(
        <div className="main contents">
            {/* <div className="p-2">
            <Todoslist username={username}/>
            </div> */}
            <div className="row justify-content-center">
                <div className="w-100 p-2 ">
                    <Calendar/>
                    <div className="feedback p-2 mt-2 rounded">피드백</div>
                </div>
            </div>
        </div>
    )
}
export default Main