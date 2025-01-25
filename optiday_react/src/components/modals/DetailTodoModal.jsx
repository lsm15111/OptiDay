import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../../context/AuthContext';
import { useTodo } from '../../context/TodoContext';
import { Check, Edit, Trash2, X } from 'lucide-react';
import '../../styles/DailyTodoModal.css';

function DailyTodoModal({ todo, isOpen, onClose, username, onDelete, onUpdate }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    categoryId: '',
  });

  const [isMessage,setIsMessage] = useState(false);

  const { updateTodo,deleteTodo,categories } = useTodo();

  useEffect(() => {
    if (todo) {
      setEditTodo({
        title: todo.title,
        startDate: todo.startDate,
        endDate: todo.endDate,
        description: todo.description,
        categoryId: todo.categoryId,
      });
    }
  }, [todo]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTodo({ ...editTodo, [name]: value });
  };


  const handleTodoUpdate = async () => {
    if(editTodo.categoryId === '카테고리 선택'){editTodo.categoryId = null}
    console.log(editTodo)
    // Todo 업데이트 API 호출
    try{
    const res = await updateTodo(username, todo.id, editTodo);

    if (res) {
        onUpdate(res); // 업데이트 후 핸들러 호출
        handleExit();
    }
  }catch(error){
    console.error(error);
  }
  };

  const handleTodoDelete = async () => {
    try {
      const res = await deleteTodo(username, todo.id);
      if(res){
        onDelete(todo.id); 
        handleExit();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleExit = () => {
    setIsMessage(false);
    setIsEditing(false);
    onClose(); // 모달 닫기
  };

  const setEditToday = () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
    setEditTodo({ ...editTodo, startDate: today, endDate: today });
  };
  const handleError = () => {
      setIsMessage(true);
  }

  
  if (!todo) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => { handleExit()}}
      ariaHideApp={false}
      className="modal-dialog-centered todo-modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        {isEditing ? (
          <form>
            <div className='mb-3 d-flex justify-content-between'>
              <X size={30} onClick={handleExit} className='btn-x'></X>
              {isMessage && <div className='text-danger'>날짜를 입력해주세요</div>}
              <Check size={30} onClick={() => {!editTodo.startDate || !editTodo.endDate ? handleError() : handleTodoUpdate()}} className='btn-edit'></Check>
            </div>
            <div className='m-1'>
            <label>
              제목
              <input type='text' className='text-area' name="title" value={editTodo.title} onChange={handleInputChange} />
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label className='me-2 mt-2'>날짜</label>
                <input type='date' className='me-2 data-area' name="startDate" value={editTodo.startDate} onChange={handleInputChange} />
                ~
                <input type='date' className='ms-2 data-area' name="endDate" value={editTodo.endDate} onChange={handleInputChange} />
                <button type="button" className="btn-today px-2 ms-2 me-1 mt-1" onClick={setEditToday}>오늘</button>
              </div>
              <div style={{ marginTop: '10px',marginBottom: '10px', display: 'flex', alignItems: 'center', marginRight: '100px' }}>
                <label className='me-2 mt-2'>카테고리</label>
                <select className="form-control w-25" name="categoryId" value={editTodo.categoryId} onChange={handleInputChange}>
                  <option >카테고리 선택</option>
                  {Array.isArray(categories) && categories.map(category => (
                    <option key={category.id} value={category.id} style={{ color: category.color, fontWeight: 'bold' }}>
                      {category.name}
                    </option>
                  )) }
                </select>
              </div>
              <div>
            <label>
              메모
            </label>
            <textarea name="description" className='text-area' value={editTodo.description} onChange={handleInputChange} />
            </div>
            </div>
          </form>
        ) : (
          <div>
            <div className='d-flex justify-content-between'>
              <X size={30} onClick={onClose} className='btn-x'></X>
              <div>
                <Trash2 size={30} onClick={handleTodoDelete} className='btn-delete me-3'></Trash2>
              <Edit size={30} onClick={handleEditClick} className='btn-edit'></Edit>
              </div>
            </div>
            <div className='m-1'>
            <h2>{todo.title}</h2>
            <p><strong>날짜:</strong> {todo.startDate} ~ {todo.endDate}</p>
            <p><strong>설명:</strong> {todo.description}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default DailyTodoModal;
