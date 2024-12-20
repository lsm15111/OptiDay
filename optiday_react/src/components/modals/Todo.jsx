import React, { useState } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/TodoModal.css';

const Todo = ({ isOpen, onClose }) => {
    const [isPublic, setIsPublic] = useState(false);

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-dialog-centered todo-modal" overlayClassName="modal-overlay">
            <div className="modal-content">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <button className="btn btn-dark" onClick={onClose}>등록</button>
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
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>날짜</label>
                    <div className="d-flex align-items-center">
                    <input type="date" className="form-control" />
                    <span className='mx-2'>to</span>
                    <input type="date" className="form-control " />
                    </div>
                </div>
                <div className="form-group">
                    <label>카테고리</label>
                    <select className="form-control">
                        <option>카테고리 선택</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <textarea rows="4" className="form-control"></textarea>
                </div>
            </div>
        </Modal>
    );
};

export default Todo;
