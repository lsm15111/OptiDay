// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { retrieveAllTodosForUsernameApi, updateTodoApi, deleteTodoApi, createTodoApi } from '../api/TodoApiService';
// import { useAuth } from './AuthContext';
// import { retrieveAllCategoriesForUsernameApi } from '../api/CategoryApiService';

// export const TodoContext = createContext();

// export const useTodo = () => useContext(TodoContext);
// function TodoProvider({ children }){
//     const [todos, setTodos] = useState([]);
//     const [categories, setCategories] = useState([])

//     const {username} = useAuth();
//     async function fetchTodos(username){
//         const response = await retrieveAllTodosForUsernameApi(username);
//         setTodos(response.data);
//     };

//     const updateTodo = async (username,todoId,updateTodo) => {
//         try{
//             const response = await updateTodoApi(username, todoId, updateTodo);
//             if(response.status === 200){
//                 const updatedTodo = response.data //응답 Todo
//                 setTodos((prevTodos) =>
//                     prevTodos.map((todo) =>
//                     todo.id === todoId ? { ...todo, ...updatedTodo } : todo
//                     )
//                 );
//                 // console.log('Todo 업데이트 성공');
//                 return updatedTodo;
//             }else{
//                 // console.log('Todo 업데이트 실패');
//                 return false;
//             }
//         }
//         catch(error){
//             // console.error('API 요청중 오류 발생:', error);
//             return false;
//         }
//     };
//     const deleteTodo = async (username,todoId) => {
//         try{
//             const response = await deleteTodoApi(username, todoId);
//             if(response.status === 200){
//                 setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
//                 // console.log('Todo 삭제 성공');
//                 return true;
//             }else{
//                 // console.log('Todo 삭제 실패');
//                 return false;
//             }
//         }
//         catch(error){
//             // console.error('API 요청중 오류 발생:', error);
//             return false;
//         }
//     };
//     const createTodo = async (username, todo) => {
//         try{
//             const response = await createTodoApi(username, todo);
//             if(response.status === 200){
//                 console.log(response.data)
//                 setTodos((prevTodos) => [...prevTodos, response.data]);
//                 // console.log('Todo 생성 성공');
//                 return response.data;
//             }else{
//                 // console.log('Todo 생성 실패');
//                 return false;
//             }
//         }
//         catch(error){
//             // console.error('API 요청중 오류 발생:', error);
//             return false;
//         }
//     };

//     const fetchCategories = async (username) => {
//         try {
//             const response = await retrieveAllCategoriesForUsernameApi(username);
//             setCategories(response.data);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     };

    



//     // 마운트될 때 한번
//     useEffect(() => {
//         fetchTodos(username)
//         fetchCategories(username)
//     },[])

//     return (
//         <TodoContext.Provider value={{ todos, updateTodo, deleteTodo, fetchTodos, createTodo,categories, fetchCategories }}>
//             {children}
//         </TodoContext.Provider>
//     );
// };
// export default TodoProvider;