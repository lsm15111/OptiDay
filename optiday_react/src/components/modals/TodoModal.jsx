import React, { useState } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/TodoModal.css';
import { createTodoApi } from '../../api/TodoApiService';
import { useAuth } from '../../context/AuthContext';

const TodoModal = ({ isOpen, onClose }) => {
    const [isPublic, setIsPublic] = useState(false);

    const {username} = useAuth();
    const [todo, setTodo] = useState({
        title: '',
        startDate: '',
        endDate: '',
        category: '',
        description: ''
    })

    const handleInputChange = (e) => {
        setTodo({...todo, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async () => {
        
        const response = await createTodoApi(username, {
            ...todo,
            category: todo.category === '' ? null : todo.category // 빈 문자열일 경우 null로 설정
        });
        
        if(response.status==200){ // 성공
            alert('등록 성공')
            // 데이터 초기화
        setTodo({
            title: '',
            startDate: '',
            endDate: '',
            category: '',
            description: ''
        });

        // 모달 닫기
        onClose();
        }else{ // 실패
            alert(`서버 응답${response.status}`)
        }
    }

    const setToday = () => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
        setTodo({ ...todo, startDate: today, endDate: today });
    };

    return (
        <Modal isOpen={isOpen} 
        onRequestClose={onClose} 
        ariaHideApp={false}
        className="modal-dialog-centered todo-modal" overlayClassName="modal-overlay">
            <div className="modal-content">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <button className="btn btn-dark" onClick={handleFormSubmit} disabled={todo.title.length < 2 || !todo.startDate || !todo.endDate}>등록</button>
                    <div className="d-flex justify-content-end">
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
                    </div>
                </div>
                
                <div className="form-group">
                    <label>제목</label>
                    <input type="text" name="title" value={todo.title} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>날짜</label>
                    <div className="d-flex align-items-center">
                    <input type="date" name="startDate" value={todo.startDate} onChange={handleInputChange} className="form-control" />
                    <span className='mx-2 mt-1'>to</span>
                    <input type="date" name="endDate" value={todo.endDate} onChange={handleInputChange} className="form-control" />

                    </div>
                    <button className="btn-today px-2 ms-1 me-1 mt-1" onClick={setToday}>오늘</button>
                </div>
                <div className="form-group">
                    <label>카테고리</label>
                    <select className="form-control" name="category" value={todo.category} onChange={handleInputChange}>
                        <option value=''>카테고리 선택</option>
                        <option value="1">일반</option>
                        <option value="2">프로젝트</option>
                        <option value="3">고객</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <textarea rows="4" className="form-control" name="description" value={todo.description} onChange={handleInputChange}></textarea>
                </div>
            </div>
        </Modal>
    );
};

export default TodoModal;
