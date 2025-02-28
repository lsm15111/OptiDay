import { useDispatch, useSelector } from "react-redux";
import "../styles/Categorylist.css";
import { CirclePicker } from "react-color";
import { useEffect, useRef, useState } from "react";
import { deleteCategory, updateCategoryColor, updateCategoryName, addCategory } from "../redux/slices/categorySlice"; // 카테고리 추가 액션 추가
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { createCategoryApi, deleteCategoryApi, updateCategoryColorApi, updateCategoryNameApi } from "../api/CategoryApi";

function Categorylist() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [originalColor, setOriginalColor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState(''); // 새로운 카테고리 이름 상태
  const pickerRef = useRef(null);
  const inputRef = useRef(null); // 입력 필드 참조 추가

  const colors = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E2BAFF',
    '#FFC4E1'
  ];

  const handleCategorySelect = (id, color, event) => {
    setIsEditing(false);
    setSelectedCategoryId(id);
    const selectedCategory = categories.find((cat) => cat.id === id);
    setShowColorPicker(true);
    setOriginalColor(color);
    setEditedName(selectedCategory.name); // 선택된 카테고리 이름으로 초기화

    // CirclePicker 위치 설정
    const pickerContainer = pickerRef.current;
    if (pickerContainer) {
      const { top, left } = event.currentTarget.getBoundingClientRect();
      pickerContainer.style.top = `${top + window.scrollY + 30}px`; // 카테고리 아래에 위치
      pickerContainer.style.left = `${left}px`; // 카테고리와 같은 위치
    }
  };

  const handleColorChange = (color) => {
    if (selectedCategoryId) {
      try{
        const response = updateCategoryColorApi(selectedCategoryId, color.hex);
        dispatch(updateCategoryColor({ id: selectedCategoryId, color: color.hex }));
      }catch(error){
        alert("서버 에러");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      try {
        const response = updateCategoryNameApi(selectedCategoryId, editedName);
        dispatch(updateCategoryName({ id: selectedCategoryId, name: editedName }));
        setIsEditing(false);
      } catch (error) {
        alert("서버 에러");
      }
    }
  };

  const handleCategoryDelete = async () => {
    try {
      const response = deleteCategoryApi(selectedCategoryId);
      dispatch(deleteCategory(selectedCategoryId));
    } catch (error) {
      alert("서버 에러");
    }
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === '') {
      alert("카테고리 이름을 입력하세요.");
      return;
    }
    const newCategory = {
      name: newCategoryName,
      color: colors[Math.floor(Math.random() * colors.length)], // 랜덤 색상
    };
    try {
      const response = await createCategoryApi(newCategory);
      dispatch(addCategory(response.data));
      setNewCategoryName(''); // 입력 필드 초기화
    } catch (error) {
      alert("서버 에러");
    }
  };

  return (
    <div className="main-categorylist">
      <div className="d-flex">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="카테고리"
          className="categorylist-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddCategory();
            }
          }}
        />
      </div>

      <div className="categorylist-map-box">
        {categories && categories.map((cat) => (
          <div key={cat.id} style={{ display: 'inline-block' }}>
            {isEditing && selectedCategoryId === cat.id ? (
              <input
                ref={inputRef} // 입력 필드에 ref 추가
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="categorylist-input"
                style={{ backgroundColor: cat.color }}
                onBlur={() => {
                  setIsEditing(false);
                }}
                onKeyDown={handleInputKeyDown} // 엔터 키 이벤트 처리
              />
            ) : (
              <button
                onClick={(event) => handleCategorySelect(cat.id, cat.color, event)} // 클릭 이벤트 전달
                className="categorylist-select-button"
                style={{ backgroundColor: cat.color }}
              >
                {cat.name}
              </button>
            )}

            {showColorPicker && selectedCategoryId === cat.id && (
              <div ref={pickerRef} className="categorylist-select-container">
                <CirclePicker
                  color={originalColor}
                  colors={colors}
                  onChangeComplete={handleColorChange}
                />
                <div className="categorylist-picker-button">
                  <div className="d-flex justify-content-between mt-2">
                    <Edit size={30} className="categorylist-edit" onClick={() => {
                      setIsEditing(true);
                      setShowColorPicker(false); // 색상 선택기 닫기
                    }} />
                    <Trash2 size={30} className="categorylist-delete" onClick={() => { handleCategoryDelete() }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorylist