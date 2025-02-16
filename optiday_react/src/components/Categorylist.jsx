import { useDispatch, useSelector } from "react-redux";

import "../styles/Categorylist.css";
import { CirclePicker } from "react-color";
import { useEffect, useRef, useState } from "react";
import { updateCategoryColor } from "../redux/slices/categorySlice";
import { Plus, PlusCircle, PlusSquare, Trash, Trash2 } from "lucide-react";
function Categorylist(){
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [originalColor, setOriginalColor] = useState(null);
  const pickerRef = useRef(null);

  // 12가지 색상 목록
  const colors = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E2BAFF',
    '#FFC4E1'
  ];

  // 카테고리 선택 핸들러
  const handleCategorySelect = (id,color) => {
    setSelectedCategoryId(id);
    setShowColorPicker(true);
    setOriginalColor(color);
  };

  // 색상 변경 핸들러 (바로 Redux에 반영)
  const handleColorChange = (color) => {
    if (selectedCategoryId) {
      
      dispatch(updateCategoryColor({ id: selectedCategoryId, color: color.hex }));
    }
  };

  // 영역 밖 클릭 시 피커 닫기
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
//  선택된 카테고리의 색상 가져오기
 const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

    return (
      <div className="main-categorylist">
        <h4>나의 카테고리 설정</h4>
        <PlusCircle size={35} className="plus-square"/>
        {categories.map((cat) => (
          <div key={cat.id} style={{ display: 'inline-block' }}>
            <button
              onClick={() => handleCategorySelect(cat.id,cat.color)}
              className="categorylist-select-button"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>

            {showColorPicker && selectedCategory?.id === cat.id && (
              <div
                ref={pickerRef}
                className="categorylist-select-container"
              >
                <CirclePicker
                  color={selectedCategory.color}
                  colors={colors}
                  onChangeComplete={handleColorChange}
                />
                <div className="categorylist-picker-button">
                  <Trash2 size={25} className="categorylist-delete"/>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
    };
    export default Categorylist