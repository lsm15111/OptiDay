import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../styles/Feedback.css';
import TodoItem from "../components/TodoItem";
import { fetchFollow, selectFollowings } from "../redux/slices/followSlice";
import { fetchTodos } from "../redux/slices/todoSlice";
import { fetchCategories } from "../redux/slices/categorySlice";
import { retrieveTodosForFollowingApi } from "../api/TodoApi";
import Categorylist from "../components/Categorylist";
import { retrieveCommentApi } from "../api/CommentApi";

function Feedback() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [categoryColor, setCategoryColor] = useState(null);
  const [comments, setComments] = useState([]);
  const [selectedUserTodos, setSelectedUserTodos] = useState([]);

  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const categories = useSelector(state => state.categories.categories);
  const followings = useSelector(selectFollowings);

  const handleToggle = async (todo, eventColor) => {
    const response = await retrieveCommentApi(todo.id);
    console.log(response);

    setCategoryColor(eventColor);
    setSelectedTodo(selectedTodo === todo ? null : todo);
  };
  const getStatus = (todo, today) => {
    const startDate = new Date(todo.startDate).toISOString().split('T')[0];
    const endDate = new Date(todo.endDate).toISOString().split('T')[0];
    if (today < startDate) return '시작 전';
    if (today >= startDate && today <= endDate) return '진행 중';
    return '종료';
  };

  const sortTodos = (todos) => {
    const today = new Date().toISOString().split('T')[0];
    return [...todos].sort((a, b) => {
      const statusA = getStatus(a, today);
      const statusB = getStatus(b, today);
      const order = {
        '진행 중': 0,
        '시작 전': 1,
        '종료': 2,
      };
      return order[statusA] - order[statusB];
    });
  };
  const [sortedTodos, setSortedTodos] = useState(sortTodos(todos)); // 초기 정렬된 todos 상태

  useEffect(()=>{
    dispatch(fetchFollow());
    dispatch(fetchTodos());
    dispatch(fetchCategories());
  },[])

  useEffect(() => {
    // selectedUserTodos가 변경될 때마다 정렬된 todos 업데이트
    if (selectedUserTodos.length > 0) {
      setSortedTodos(sortTodos(selectedUserTodos));
    } else {
      setSortedTodos(sortTodos(todos));
    }
  }, [selectedUserTodos, todos]); // selectedUserTodos 또는 todos가 변경될 때마다 실행

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentInput = e.target.elements.comment.value;
    if (commentInput) {
      setComments([...comments, commentInput]);
      e.target.reset();
    }
  };

  const handleUserClick = async (followingId) => {

    const response = await retrieveTodosForFollowingApi(followingId);
    if(response.status === 200){
      console.log(response)
      if(response.data.length === 0){
        alert("해당 유저의 일정이 없습니다.")
        return;
      } 
      setSelectedUserTodos(response.data);
      setSelectedTodo(null); // 선택된 todo 초기화
    }
  };
  
  const handleMyBoardClick = () => {
    setSelectedUserTodos(todos); // 내 todos 설정
    setSelectedTodo(null); // 선택된 todo 초기화
  };

  return (
    <div className="contents">
      <div className="feedback-board">
        <div className="d-flex align-items-center feedback-board-title-container">
          <p className="feedback-title m-1">피드백</p>
          <button onClick={handleMyBoardClick} className="feedback-myboard-button">나의 보드</button>
          <div className="d-flex m-1 p-1 feedback-following-container">
            팔로잉:
          {followings.map(following => (
                <div key={following.id} className="feedback-board-button" onClick={() => handleUserClick(following.id)} style={{ cursor: 'pointer' }}>
                  {following.username}
                </div>
              ))}
              </div>
        </div>
        <div className="d-flex feedback-board-container">
          <ul className="list-group">
          {sortedTodos.map((todo) => {
              const eventColor = Array.isArray(categories) ? categories.find(category => category.id === todo.categoryId)?.color : '#ddd';
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isSelected={selectedTodo === todo} 
                  onToggle={() => handleToggle(todo, eventColor)} 
                  getStatus={getStatus}
                  eventColor={eventColor}
                />
              );
            })}
          </ul>
          {selectedTodo && (
            <div className={`selected-todo-info m-3`} >
              <div>
              <div className="feedback-line" style={{ backgroundColor: categoryColor }}></div>
              <h5>{selectedTodo.title}</h5>
              </div>
              <p className="feedback-todoitem-date">{selectedTodo.startDate} ~ {selectedTodo.endDate}</p>
              <p className="feedback-todoitem-description">설명: {selectedTodo.description}</p>
              <form onSubmit={handleCommentSubmit}>
                <input type="text" className="feedback-comment-input" name="comment" placeholder="" required />
                <button type="submit" className="feedback-comment-button">댓글 추가</button>
              </form>
              <div className="comments-list mt-2">
                {comments.map((comment, index) => (
                  <p key={index} className="comment">{comment}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <Categorylist/>
      </div>
    </div>
  );
}

export default Feedback;