import React, { useState } from 'react';
import Modal from 'react-modal';
import { updateTodoApi } from '../../api/TodoApiService';
import '../../styles/TodoDetailModal.css';

function TodoDetail({ todo, onClose, username, handleUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState({
    title: todo.title,
    startDate: todo.startDate,
    endDate: todo.endDate,
    description: todo.description,
    category: todo.category,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTodo({ ...editTodo, [name]: value });
  };

  const handleSave = async (event) => {
    event.preventDefault(); // 폼 제출 시 기본 동작 방지
    try {
      const response = await updateTodoApi(username, todo.id, editTodo);
      console.log(response);
      onClose(); // 저장 후 모달 닫기
      handleUpdate({ ...todo, ...editTodo }); // 수정된 정보를 부모에게 전달
    } catch (error) {
      console.error(error);
    }
  };

  const setEditToday = () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
    setEditTodo({ ...editTodo, startDate: today, endDate: today });
};

  if (!todo) return null;

  return (
    <Modal
      isOpen={!!todo}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal-dialog-centered todo-modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        {isEditing ? (
          <form>
            <div className='d-flex justify-content-between'>
              <button className='btn btn-dark close-button fs-6' onClick={onClose}>취소</button>
              <button className='btn btn-success edit-button fs-6' onClick={handleSave}>수정완료</button>
            </div>
            <label>
              제목
              <input type='text' name="title" value={editTodo.title} onChange={handleInputChange} />
            </label>
            <label>
              날짜
              <div>
              <input type='date' className='me-2' name="startDate" value={editTodo.startDate} onChange={handleInputChange} />
              ~
              <input type='date' className='ms-2' name="endDate" value={editTodo.endDate} onChange={handleInputChange} />
              <button type="button" className="btn-today px-2 ms-2 me-1 mt-1" onClick={setEditToday}>오늘</button>
              </div>
              
            </label>
            <label>
              카테고리
              <select className="form-control mt-2" name="category" value={editTodo.category} onChange={handleInputChange}>
                <option>카테고리 선택</option>
                
              </select>
            </label>
            <label>
              설명
              <textarea name="description" value={editTodo.description} onChange={handleInputChange} />
            </label>
          </form>
        ) : (
          <div>
            <div className='d-flex justify-content-between'>
              <button className="btn btn-dark close-button fs-6" onClick={onClose}>닫기</button>
              <button className="btn btn-success edit-button fs-6" onClick={handleEditClick}>수정</button>
            </div>
            <h2>{todo.title}</h2>
            <p><strong>날짜:</strong> {todo.startDate}~{todo.endDate}</p>
            <p><strong>설명:</strong> {todo.description}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default TodoDetail;
