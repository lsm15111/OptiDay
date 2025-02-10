import { useDispatch, useSelector } from "react-redux";

import "../styles/Categorylist.css";
import { CirclePicker } from "react-color";
import { useEffect, useRef, useState } from "react";
import { updateCategoryColor } from "../redux/slices/categorySlice";
function Categorylist(){
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const pickerRef = useRef(null);

  // 12가지 색상 목록
  const colors = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E2BAFF',
    '#FFC4E1'
  ];

  // 카테고리 선택 핸들러
  const handleCategorySelect = (id) => {
    setSelectedCategoryId(id);
    setShowColorPicker(true);
  };

  // 색상 변경 핸들러 (바로 Redux에 반영)
  const handleColorChange = (color) => {
    if (selectedCategoryId) {
      dispatch(updateCategoryColor({ id: selectedCategoryId, color: color.hex }));
      setShowColorPicker(false); // 색상 선택 후 피커 닫기
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
 // 선택된 카테고리의 색상 가져오기
 const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

    return (
      <div className="main-categorylist">
        <h2>카테고리 색상 선택</h2>
        {categories.map((cat) => (
          <div key={cat.id} style={{ display: 'inline-block' }}>
            <button
              onClick={() => handleCategorySelect(cat.id)}
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
              </div>
            )}
          </div>
        ))}
      </div>
    );
    };
    export default Categorylist