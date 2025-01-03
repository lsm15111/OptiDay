import { useState } from "react";
import '../styles/Mypage.css';
import { Circle, X } from 'lucide-react';

function Mypage() {
    const defaultProfileImg = '/images/user_default.png'; // default image URL (정적)
    
    const [userData, setUserData] = useState({ // 사용자 정보 데이터
        current: {
            name: "김코드",
            tag: "1234",
            say: "오늘도 화이팅!",
            birthDate: "",
            phone: "010-1234-5678",
            email: "example@email.com",
            followers: 13,
            following: 10,
            profileImg: defaultProfileImg,
        },
        temp: {
            name: "김코드",
            tag: "1234",
            say: "오늘도 화이팅!",
            birthDate: "",
            phone: "010-1234-5678",
            email: "example@email.com",
            followers: 13,
            following: 10,
            profileImg: '',
        }
    });
    
    const categories = ["계획", "공부", "여행"]; // 카테고리 목록


    const [editModes, setEditModes] = useState({ // 각 수정 버튼의 상태 (true: 수정 중, false: 수정 완료)
        name: false,
        say: false,
        birthDate: false,
        phone: false,
        email: false
    });

    const [errors, setErrors] = useState({ // 각 폼의 규칙 검증
        name: false,
        tag: false,
        say: false,
        birthDate: false,
        phone: false,
        email: false
    });

    const updateTempField = (field, value) => {
        setUserData(prev => ({
            ...prev,
            temp: { ...prev.temp, [field]: value }
        }));
    };

    const toggleEditMode = (field) => {
        setEditModes(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleCancelEdit = (field) => {
        setUserData(prev => ({
            ...prev,
            temp: { ...prev.current }
        }));
        toggleEditMode(field);
    };

    const handleFieldSave = (fields) => { // 수정데이터 검증
        let isValid = true;

        if (fields.includes('name')) {
            if (userData.temp.name.length < 2) {
                setErrors(prev => ({ ...prev, name: true }));
                isValid = false;
            } else {
                setErrors(prev => ({ ...prev, name: false }));
            }
        }

        if (fields.includes('tag')) {
            if (userData.temp.tag.length !== 4) {
                setErrors(prev => ({ ...prev, tag: true }));
                isValid = false;
            } else {
                setErrors(prev => ({ ...prev, tag: false }));
            }
        }

        if (fields.includes('birthDate')) {
            const birthDate = userData.temp.birthDate;
            if (!validateBirthDate(birthDate)) {
                setErrors(prev => ({ ...prev, birthDate: true }));
                isValid = false;
            } else {
                setErrors(prev => ({ ...prev, birthDate: false }));
            }
        }

        if (fields.includes('phone')) {
            const numbers = userData.temp.phone.replace(/\D/g, '');
            if (numbers.length < 10) {
                setErrors(prev => ({ ...prev, phone: true }));
                isValid = false;
            } else {
                setErrors(prev => ({ ...prev, phone: false }));
            }
        }

        if (fields.includes('email')) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(userData.temp.email)) {
                setErrors(prev => ({ ...prev, email: true }));
                isValid = false;
            } else {
                setErrors(prev => ({ ...prev, email: false }));
            }
        }

        if (isValid) {
            fields.forEach(field => {
                setUserData(prev => ({
                    ...prev,
                    current: { ...prev.current, [field]: userData.temp[field] }
                }));
                setEditModes(prev => ({
                    ...prev,
                    [field]: false
                }));
            });
        }
    };
    const validateBirthDate = (birthDate) => { // 생년월일 입력 검증
        const [year, month, day] = birthDate.split('-');
        return year && month && day; // 모든 값이 입력되었는지 확인
    };

    const formatPhoneNumber = (value) => { //폰 번호 표준화
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 7) {
            return numbers.slice(0, 3) + '-' + numbers.slice(3);
        } else {
            return numbers.slice(0, 3) + '-' + numbers.slice(3, 7) + '-' + numbers.slice(7, 11);
        }
    };

    const handleProfileImgClick = () => {
        document.getElementById('imageUpload').click();
    };
    const handleImageChange = (e) => { //이미지 파일 변경
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            updateTempField('profileImg', reader.result);
        };
        reader.readAsDataURL(file);
    };
    const setToDefaultImage = () => { // 기본 이미지로 바꾸기
        setUserData(prev => ({
            ...prev,
            temp: { ...prev.temp, profileImg: defaultProfileImg }
        }));
    };

    const generateYears = () => Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
    const generateMonths = () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

    const DateSelector = ({ value, onChange }) => {
        const [year, month, day] = (value || '').split('-');
        
        return (
            <div className="date-selector me-3">
                <select 
                    className="form-select year-select"
                    style={{ width: '120px' }}
                    value={year || ''}
                    onChange={(e) => onChange('year', e.target.value)}
                >
                    <option value="">년도</option>
                    {generateYears().map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <select 
                    className="form-select month-select"
                    style={{ width: '90px' }}
                    value={month || ''}
                    onChange={(e) => onChange('month', e.target.value)}
                >
                    <option value="" >월</option>
                    {generateMonths().map(month => (
                        <option key={month} value={month}>{parseInt(month)}월</option>
                    ))}
                </select>
                <select 
                    className="form-select day-select"
                    style={{ width: '90px' }}
                    value={day || ''}
                    onChange={(e) => onChange('day', e.target.value)}
                >
                    <option value="">일</option>
                    {Array.from(
                        { length: getDaysInMonth(year, month) || 31 },
                        (_, i) => String(i + 1).padStart(2, '0')
                    ).map(day => (
                        <option key={day} value={day}>{parseInt(day)}일</option>
                    ))}
                </select>
            </div>
        );
    };

    return (
        <div className="contents">
            <div className="container-fluid px-4" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="row justify-content-center">
                    <div className="bg-white p-4">
                        
                        {/* 상단레이어 */}
                        <div className="profile-section p-3 m-auto row">
                            <div className=" col-md-3 m-auto"> 
                                <div className="profile-image-container">
                                    {userData.temp.profileImg || userData.current.profileImg ? (
                                        <img 
                                            src={userData.temp.profileImg || userData.current.profileImg} 
                                            alt="Profile" 
                                            onClick={handleProfileImgClick} 
                                            className="profile_img"
                                        />
                                    ) : (
                                        <img 
                                            src={defaultProfileImg} 
                                            alt="Default Profile" 
                                            onClick={handleProfileImgClick} 
                                            className="profile_img"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    <input 
                                        type="file" 
                                        id="imageUpload" 
                                        style={{ display: 'none' }} 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                    />
                                    <button 
                                        onClick={setToDefaultImage} 
                                        className="btn btn-secondary mt-3 profile-default-button"
                                    >기본 이미지로 변경</button>
                                </div>
                            </div>
                            <div className=" col-md-8 m-auto"> 
                                <h3 className="mb-3">
                                    {editModes.name ? (
                                        <div >
                                            <div className="button-group mb-2">
                                                <input 
                                                    type="text" 
                                                    value={userData.temp.name}
                                                    onChange={(e) => updateTempField('name', e.target.value)}
                                                    placeholder="이름"
                                                    className="field-input name"
                                                    minLength={2}
                                                    maxLength={10}
                                                    id="name"
                                                />#
                                                <input 
                                                    type="text" 
                                                    value={userData.temp.tag}
                                                    onChange={(e) => updateTempField('tag', e.target.value)}
                                                    placeholder="태그"
                                                    className="field-input tag"
                                                    minLength={4}
                                                    maxLength={4}
                                                    id="tag"
                                                />
                                                <div className="d-flex align-items-center">
                                                    <div className="icon-container" style={{ marginRight: '10px' }}>
                                                        <Circle color="green" size={24} onClick={() => handleFieldSave(['name','tag'])} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                    <div className="icon-container">
                                                        <X color="red" size={24} onClick={() => handleCancelEdit('name')} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            {errors.name && <span className="text-danger ms-2 fs-6">이름을 두글자 이상으로 작성해주세요.</span>}
                                                {errors.tag && <span className="text-danger ms-2 fs-6">4글자 태그를 입력해주세요.</span>}
                                        </div>
                                    ) : (
                                        <div className="d-flex align-items-center">
                                            <div>{userData.current.name}#{userData.current.tag}</div>
                                            <span className="text-secondary" style={{ fontSize: '16px', cursor: 'pointer', marginLeft: '10px' }} onClick={() => toggleEditMode('name')}>수정</span>
                                        </div>
                                    )}
                                </h3>
                                    {editModes.say ? (
                                        <div className="button-group">
                                            <input 
                                                type="text" 
                                                value={userData.temp.say}
                                                onChange={(e) => updateTempField('say', e.target.value)}
                                                placeholder="상태메시지"
                                                className="field-input say"
                                                id="say-input"
                                                name="say"
                                            />
                                            <div className="d-flex align-items-center">
                                                <div className="icon-container" style={{ marginRight: '10px' }}>
                                                    <Circle color="green" size={24} onClick={() => handleFieldSave(['say'])} style={{ cursor: 'pointer' }} />
                                                </div>
                                                <div className="icon-container">
                                                    <X color="red" size={24} onClick={() => toggleEditMode('say')} style={{ cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {userData.current.say}
                                            <span className="text-secondary" style={{ fontSize: '16px', cursor: 'pointer', marginLeft: '10px' }} onClick={() => toggleEditMode('say')}>수정</span>
                                        </>
                                    )}
                                <p className="mt-2 text-muted">
                                    팔로워 {userData.current.followers} 팔로잉 {userData.current.following}
                                </p>
                                <div className="profile-info">
                                        <div className="info-value">
                                            <button 
                                                onClick={() => {/* 비밀번호 변경 로직 */}} 
                                                className="btn btn-sm btn-danger"
                                            >
                                                비밀번호 변경
                                            </button>
                                        </div>
                                </div>
                            </div>
                        </div>
                        {/* 개인 정보 레이어 */}
                        <section className="mt-4">
                            <h3 className="section-title">개인 정보</h3>
                            <div className="section-content">
                                <div className="settings-item">
                                    <span>생년월일</span>
                                    <div>
                                        {editModes.birthDate ? (
                                            <div className="button-group">
                                                <DateSelector
                                                    value={userData.temp.birthDate}
                                                    onChange={(part, value) => {
                                                        const [year, month, day] = (userData.temp.birthDate || '').split('-');
                                                        const newDate = {
                                                            year: part === 'year' ? value : year || '',
                                                            month: part === 'month' ? value : month || '',
                                                            day: part === 'day' ? value : day || ''
                                                        };
                                                        
                                                        if (newDate.year || newDate.month || newDate.day) {
                                                            updateTempField('birthDate', `${newDate.year}-${newDate.month}-${newDate.day}`);
                                                        }
                                                    }}
                                                />
                                                <div className="d-flex align-items-center">
                                                    <div className="icon-container" style={{ marginRight: '10px' }}>
                                                        <Circle color="green" size={24} onClick={() => handleFieldSave(['birthDate'])} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                    <div className="icon-container">
                                                        <X color="red" size={24} onClick={() => toggleEditMode('birthDate')} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-muted">{userData.current.birthDate}</span>
                                                <span className="text-secondary" style={{ fontSize: '16px', cursor: 'pointer', marginLeft: '10px' }} onClick={() => toggleEditMode('birthDate')}>수정</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="settings-item">
                                    <span>전화번호</span>
                                    <div>
                                        {editModes.phone ? (
                                            <div className="button-group">
                                                <input 
                                                    type="tel" 
                                                    value={userData.temp.phone}
                                                    onChange={(e) => updateTempField('phone', formatPhoneNumber(e.target.value))}
                                                    placeholder="전화번호"
                                                    className="field-input"
                                                    maxLength={13}
                                                    id="phone-input"
                                                />
                                                <div className="d-flex align-items-center">
                                                    <div className="icon-container" style={{ marginRight: '10px' }}>
                                                        <Circle color="green" size={24} onClick={() => handleFieldSave(['phone'])} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                    <div className="icon-container">
                                                        <X color="red" size={24} onClick={() => toggleEditMode('phone')} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-muted">{userData.current.phone}</span>
                                                <span className="text-secondary" style={{ fontSize: '16px', cursor: 'pointer', marginLeft: '10px' }} onClick={() => toggleEditMode('phone')}>수정</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="settings-item">
                                    <span>이메일</span>
                                    <div>
                                        {editModes.email ? (
                                            <div className="button-group">
                                                <input 
                                                    type="email" 
                                                    value={userData.temp.email}
                                                    onChange={(e) => updateTempField('email', e.target.value)}
                                                    placeholder="example@email.com"
                                                    className="field-input email"
                                                    id="email-input"
                                                />
                                                <div className="d-flex align-items-center">
                                                    <div className="icon-container" style={{ marginRight: '10px' }}>
                                                        <Circle color="green" size={24} onClick={() => handleFieldSave(['email'])} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                    <div className="icon-container">
                                                        <X color="red" size={24} onClick={() => toggleEditMode('email')} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-muted">{userData.current.email}</span>
                                                <span className="text-secondary" style={{ fontSize: '16px', cursor: 'pointer', marginLeft: '10px' }} onClick={() => toggleEditMode('email')}>수정</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* 개인 설정 레이어 */}
                        <section className="mt-5">
                            <h3 className="section-title">개인 설정</h3>
                            <div className="section-content">
                                <div className="settings-item">
                                    <span>알림</span>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                        </div>
                                </div>
                            </div>
                        </section>
                        {/* 카테고리 설정 레이어 */}
                        <section className="mt-5">
                            <h3 className="section-title">카테고리 설정</h3>
                            <button className="btn btn-light text-muted btn-sm mt-3">
                                생성
                            </button>
                            <div className="mt-4">
                                {categories.map((category, index) => (
                                    <div className="d-flex justify-content-between align-items-center mt-2" key={index}>
                                        <div className="d-flex align-items-center">
                                            <div
                                                className={`category-dot ${["danger", "warning", "primary"][index]}`}
                                            ></div>
                                            <span>{category}</span>
                                        </div>
                                        <span className="text-muted">{index % 2 === 0 ? "공개" : "비공개"}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <div className="mt-5 text-end">
                            <button className="btn btn-danger">계정 삭제</button>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-success" onClick={() => console.log('User data:', userData.temp)}>저장</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
export default Mypage