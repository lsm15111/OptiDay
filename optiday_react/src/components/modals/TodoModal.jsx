import React, { useState } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/TodoModal.css';
import { Check, X } from 'lucide-react';
import { createTodoApi } from '../../api/TodoApi';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../redux/slices/todoSlice';

const TodoModal = ({ isOpen, onClose }) => {
    // const [isPublic, setIsPublic] = useState(false);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const [todo, setTodo] = useState({
        title: '',
        startDate: '',
        endDate: '',
        categoryId: '',
        description: ''
    })

    const handleInputChange = (e) => {
        setTodo({...todo, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (event) => {
        // startDate와 endDate 검증
        if (new Date(todo.startDate) > new Date(todo.endDate)) {
            alert("시작일은 종료일보다 이전이어야 합니다.");
            return; // 검증 실패 시 함수 종료
        }
        if(todo.categoryId === 'none') todo.categoryId=null;
        event.preventDefault(); // 폼 제출 시 기본 동작 방지
        try {
            const response = await createTodoApi(todo);

            if(response.status === 200){
                dispatch(addTodo(response.data));
                handleExit();
            }
        } catch (error) {
            alert("서버 응답 실패")
            console.error(error);
        }
    }

    const setToday = () => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
        setTodo({ ...todo, startDate: today, endDate: today });
    };
    const handleExit = () => {
        setTodo({
            title: '',
            startDate: '',
            endDate: '',
            categoryId: '',
            description: ''
        });
        setIsMessage(false);
        onClose(); // 모달 닫기
    }

    const [isMessage,setIsMessage] = useState(false);
    const handleError = () => {
        setIsMessage(true);
    }


    return (
        <Modal 
        isOpen={isOpen} 
        onRequestClose={() => {handleExit()}} 
        ariaHideApp={false}
        className="modal-dialog-centered todo-modal" 
        overlayClassName="modal-overlay">
            <div className="modal-content">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <X size={30} onClick={handleExit} className='btn-x'></X>
                    {isMessage && <div className='text-danger'>제목과 날짜를 입력해주세요</div>}
                    <Check 
                        size={30} 
                        className='btn-edit' 
                        onClick={todo.title.length < 1 || !todo.startDate || !todo.endDate ? handleError : handleFormSubmit} 
                    />
                    {/* <button className="" onClick={handleFormSubmit} disabled={todo.title.length < 2 || !todo.startDate || !todo.endDate}></button> */}
                    {/* <div className="d-flex justify-content-end">
                        <span className="me-2">{isPublic ? '공개' : '비공개'}</span>
                        <div className="form-check form-switch">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="publicSwitch" 
                                checked={isPublic} 
                                onChange={() => setIsPublic(!isPublic)} 
                            />
                        </div>
                    </div> */}
                </div>
                <div className='m-1'>
                <div className="form-group">
                    <label>제목</label>
                    <input type="text" name="title" value={todo.title} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group " style={{ display: 'flex', alignItems: 'center' }}>
                    <label className='mt-1 me-1'>날짜</label>
                    <div className="d-flex align-items-center">
                    <input type="date" name="startDate" value={todo.startDate} onChange={handleInputChange} className="form-control" />
                    <span className='mx-1 mt-1'>~</span>
                    <input type="date" name="endDate" value={todo.endDate} onChange={handleInputChange} className="form-control" />

                    </div>
                    <button className="btn-today px-2 ms-1 me-1 mt-1" onClick={setToday}>오늘</button>
                </div>
                {/* <div className="d-flex align-items-center form-group">
                    <input type="time" name="startTime" className='form-control w-25'></input>
                    <input type="time" name="endTime" className='form-control w-25'></input>
                </div> */}
                <div className="form-group d-flex">
                    <label className='mt-2 me-2'>카테고리</label>
                    <select className="form-control w-25" name="categoryId" value={todo.categoryId} onChange={handleInputChange}>
                        <option value='none'>카테고리 선택</option>
                        {categories&& categories.map(category => (
                            <option key={category.id} value={category.id} style={{ color: category.color, fontWeight: 'bold' }}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>메모</label>
                    <textarea rows="4" className="form-control" name="description" value={todo.description} onChange={handleInputChange}></textarea>
                </div>
                </div>
            </div>
        </Modal>
    );
};

export default TodoModal;
