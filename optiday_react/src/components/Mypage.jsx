import { useState } from "react";
import '../styles/Mypage.css';

function Mypage() {
    const defaultProfileImg = '/images/user_default.png'; // Replace with actual default image URL
    const [userData, setUserData] = useState({
        current: {
            name: "김코드",
            tag: "1234",
            say: "오늘도 화이팅!",
            birthDate: "1990-01-01",
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
            birthDate: "1990-01-01",
            phone: "010-1234-5678",
            email: "example@email.com",
            followers: 13,
            following: 10,
            profileImg: '',
        }
    });

    const [editModes, setEditModes] = useState({
        global: false,
        name: false,
        say: false,
        birthDate: false,
        phone: false,
        email: false
    });

    const [errors, setErrors] = useState({
        name: false,
        tag: false
    });

    const updateTempField = (field, value) => {
        setUserData(prev => ({
            ...prev,
            temp: { ...prev.temp, [field]: value }
        }));
    };

    const toggleEditMode = (field) => {
        if (!editModes[field]) {
            // 수정 모드 시작 시 현재 값을 임시 값으로 복사
            setUserData(prev => ({
                ...prev,
                temp: { ...prev.current }
            }));
        }
        setEditModes(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleGlobalSave = () => {
        // 변경된 데이터를 current에 반영
        setUserData(prev => ({
            ...prev,
            current: { ...prev.temp }
        }));
        // 모든 수정 모드를 false로 설정
        setEditModes(prev => 
            Object.keys(prev).reduce((acc, key) => ({
                ...acc,
                [key]: false
            }), {})
        );
        // 에러 상태 초기화
        setErrors({
            name: false,
            tag: false
        });
    };

    const handleGlobalCancel = () => {
        // temp를 current로 되돌리기
        setUserData(prev => ({
            ...prev,
            temp: { ...prev.current }
        }));
        // 수정 모드 종료
        setEditModes(prev => ({
            ...prev,
            global: false
        }));
        // 에러 상태 초기화
        setErrors({
            name: false,
            tag: false
        });
    };

    const validateField = (field, value) => {
        switch (field) {
            case 'name':
                if (value.length < 2) {
                    setErrors(prev => ({ ...prev, name: true }));
                    return false;
                }
                break;
            case 'tag':
                if (value.length !== 4) {
                    setErrors(prev => ({ ...prev, tag: true }));
                    return false;
                }
                break;
        }
        return true;
    };

    const handleFieldSave = (field) => {
        const value = userData.temp[field];
        if (validateField(field, value)) {
            setUserData(prev => ({
                ...prev,
                current: { ...prev.current, [field]: value }
            }));
            setEditModes(prev => ({
                ...prev,
                [field]: false
            }));
            setErrors(prev => ({
                ...prev,
                [field]: false
            }));
        }
    };

    const formatPhoneNumber = (value) => {
        const numbers = value.replace(/\D/g, '');
        
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 7) {
            return numbers.slice(0, 3) + '-' + numbers.slice(3);
        } else {
            return numbers.slice(0, 3) + '-' + numbers.slice(3, 7) + '-' + numbers.slice(7, 11);
        }
    };

    const generateYears = () => Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
    const generateMonths = () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

    const handleProfileImgClick = () => {
        if (editModes.global) { // Only allow image change in edit mode
            document.getElementById('imageUpload').click();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            updateTempField('profileImg', reader.result);
        };
        reader.readAsDataURL(file);
    };

    const setToDefaultImage = () => {
        setUserData(prev => ({
            ...prev,
            temp: { ...prev.temp, profileImg: defaultProfileImg }
        }));
    };

    const DateSelector = ({ value, onChange }) => {
        const [year, month, day] = (value || '').split('-');
        
        return (
            <div className="date-selector">
                <select 
                    className="form-select year-select"
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
                    value={month || ''}
                    onChange={(e) => onChange('month', e.target.value)}
                >
                    <option value="">월</option>
                    {generateMonths().map(month => (
                        <option key={month} value={month}>{parseInt(month)}월</option>
                    ))}
                </select>
                <select 
                    className="form-select day-select"
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
            <div className="container-fluid px-4">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="bg-white p-4">
                            <div className="d-flex justify-content-end mb-3">
                                {!editModes.global ? (
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => toggleEditMode('global')}
                                    >
                                        수정
                                    </button>
                                ) : (
                                    <div>
                                        <button 
                                            className="btn btn-success me-2"
                                            onClick={handleGlobalSave}
                                        >
                                            수정완료
                                        </button>
                                        <button 
                                            className="btn btn-secondary"
                                            onClick={handleGlobalCancel}
                                        >
                                            취소
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="profile-section">
                                <div className="row">
                                    <div className="col-4">
                                        <div className="profile-image-container">
                                            <div className="profile-image-wrapper">
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
                                            </div>
                                            <input 
                                                type="file" 
                                                id="imageUpload" 
                                                style={{ display: 'none' }} 
                                                accept="image/*" 
                                                onChange={handleImageChange} 
                                            />
                                            {editModes.global && (
                                                <button 
                                                    onClick={setToDefaultImage} 
                                                    className="btn btn-secondary mt-3 profile-default-button"
                                                >기본 이미지로 변경</button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <h3 className="mb-3">
                                            {editModes.name ? (
                                                <div className="col">
                                                    <div className="button-group mb-2">
                                                        <input 
                                                            type="text" 
                                                            value={userData.temp.name}
                                                            onChange={(e) => updateTempField('name', e.target.value)}
                                                            placeholder="이름"
                                                            className="field-input name"
                                                            minLength={2}
                                                            maxLength={5}
                                                        />#
                                                        <input 
                                                            type="text" 
                                                            value={userData.temp.tag}
                                                            onChange={(e) => updateTempField('tag', e.target.value)}
                                                            placeholder="태그"
                                                            className="field-input tag"
                                                            maxLength={4}
                                                        />
                                                        <button onClick={() => handleFieldSave('name')} className="btn btn-sm btn-success">확인</button>
                                                        <button onClick={() => toggleEditMode('name')} className="btn btn-sm btn-secondary">취소</button>
                                                        {errors.name && <span className="text-danger ms-2 fs-5">이름을 두글자 이상으로 작성해주세요.</span>}
                                                        {errors.tag && <span className="text-danger ms-2 fs-5">4글자 태그를 입력해주세요.</span>}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="d-flex align-items-center">
                                                    <div>{userData.current.name}#{userData.current.tag}</div>
                                                    {editModes.global && (
                                                        <button className="btn btn-sm btn-primary ms-2" onClick={() => toggleEditMode('name')}>수정</button>
                                                    )}
                                                </div>
                                            )}
                                        </h3>

                                        <p className="text-muted">
                                            {editModes.say ? (
                                                <div className="button-group">
                                                    <input 
                                                        type="text" 
                                                        value={userData.temp.say}
                                                        onChange={(e) => updateTempField('say', e.target.value)}
                                                        placeholder="상태메시지"
                                                        className="field-input say"
                                                    />
                                                    <button onClick={() => handleFieldSave('say')} className="btn btn-sm btn-success">확인</button>
                                                    <button onClick={() => toggleEditMode('say')} className="btn btn-sm btn-secondary">취소</button>
                                                </div>
                                            ) : (
                                                <>
                                                    {userData.current.say}
                                                    {editModes.global && (
                                                        <button className="btn btn-sm btn-primary ms-2" onClick={() => toggleEditMode('say')}>수정</button>
                                                    )}
                                                </>
                                            )}
                                        </p>

                                        <p className="mt-2 text-muted">
                                            팔로워 {userData.current.followers} 팔로잉 {userData.current.following}
                                        </p>
                                        <div className="profile-info">
                                            <div className="info-row">
                                                <div className="info-value">
                                                    {editModes.global && (
                                                        <button 
                                                            onClick={() => {/* 비밀번호 변경 로직 */}} 
                                                            className="btn btn-sm btn-outline-danger"
                                                        >
                                                            비밀번호 변경
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                                    <button onClick={() => handleFieldSave('birthDate')} className="btn btn-sm btn-success">확인</button>
                                                    <button onClick={() => toggleEditMode('birthDate')} className="btn btn-sm btn-secondary">취소</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-muted">{userData.current.birthDate}</span>
                                                    {editModes.global && (
                                                        <button className="btn btn-sm btn-primary ms-2" onClick={() => toggleEditMode('birthDate')}>수정</button>
                                                    )}
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
                                                        type="text" 
                                                        value={userData.temp.phone}
                                                        onChange={(e) => updateTempField('phone', formatPhoneNumber(e.target.value))}
                                                        placeholder="전화번호"
                                                        className="field-input"
                                                        maxLength={13}
                                                    />
                                                    <button onClick={() => handleFieldSave('phone')} className="btn btn-sm btn-success">확인</button>
                                                    <button onClick={() => toggleEditMode('phone')} className="btn btn-sm btn-secondary">취소</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-muted">{userData.current.phone}</span>
                                                    {editModes.global && (
                                                        <button className="btn btn-sm btn-primary ms-2" onClick={() => toggleEditMode('phone')}>수정</button>
                                                    )}
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
                                                    />
                                                    <button onClick={() => handleFieldSave('email')} className="btn btn-sm btn-success">확인</button>
                                                    <button onClick={() => toggleEditMode('email')} className="btn btn-sm btn-secondary">취소</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-muted">{userData.current.email}</span>
                                                    {editModes.global && (
                                                        <button className="btn btn-sm btn-primary ms-2" onClick={() => toggleEditMode('email')}>수정</button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mt-5">
                                <h3 className="section-title">개인 설정</h3>
                                <div className="section-content">
                                    <div className="settings-item">
                                        <span>알림</span>
                                        <a href="#" className="text-muted">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                            </div>
                                        </a>
                                    </div>
                                    <div className="settings-item">
                                        <span>화면 모드</span>
                                        <a href="#" className="text-muted">
                                            라이트 <i className="fas fa-chevron-down ms-1"></i>
                                        </a>
                                    </div>
                                </div>
                            </section>

                            <section className="mt-5">
                                <h3 className="section-title">카테고리 설정</h3>
                                <button className="btn btn-light text-muted btn-sm mt-3">
                                    생성
                                </button>
                                <div className="mt-4">
                                    {["계획", "공부", "여행"].map((category, index) => (
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mypage;