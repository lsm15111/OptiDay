import { useEffect, useState } from "react";
import '../styles/Mypage.css';
import { retrieveProfileApi, updateProfileApi } from "../api/UserApiService";
import { useAuth } from "../context/AuthContext";

function Mypage() {
    const defaultProfileImg = '/images/user_default.png'; // default image URL (정적)
    const AuthContext = useAuth();
    const username = AuthContext.username;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await retrieveProfileApi(username);
                handleResponseSetData(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    function handleResponseSetData(response) {
        setUserData({
            username: response.username,
            message: response.message,
            birthDate: response.birthday,
            phone: response.phone,
            email: response.email,
            followers: response.followers,
            following: response.following,
            profileImg: defaultProfileImg,
        });
        setOriginalData({
            username: response.username,
            message: response.message,
            birthDate: response.birthday,
            phone: response.phone,
            email: response.email,
            followers: response.followers,
            following: response.following,
            profileImg: defaultProfileImg,
        });
    }


    const [userData, setUserData] = useState({ // 사용자 정보 데이터
        username: '',
        message: '',
        birthDate: '',
        phone: '',
        email: '',
        followers: 0,
        following: 0,
        profileImg: defaultProfileImg,
    });
    const [originalData, setOriginalData] = useState({ // 사용자 정보 데이터
        username: '',
        message: '',
        birthDate: '',
        phone: '',
        email: '',
        followers: 0,
        following: 0,
        profileImg: defaultProfileImg,
    });
    


    const [errors, setErrors] = useState({ // 각 폼의 규칙 검증
        username: false,
        message: false,
        birthDate: false,
        phone: false,
        email: false
    });

    const [isEditing, setIsEditing] = useState(false);

    const updateTempField = (field, value) => {
        setUserData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFieldSave = (fields) => { // 수정데이터 검증
        let isValid = true;

        if (fields.includes('username')) {
            if (userData.username.length < 2) {
                setErrors(prev => ({ ...prev, username: true }));
                isValid = false;
            } else {
                setErrors(prev => ({ ...prev, username: false }));
            }
        }

        if (fields.includes('birthDate')) {
            const birthDate = userData.birthDate;
            if (!validateBirthDate(birthDate)) {
                setErrors(prev => ({ ...prev, birthDate: true }));
                isValid = false;
            } else {
                setErrors(prev => ({ ...prev, birthDate: false }));
            }
        }

        if (fields.includes('phone')) {
            const numbers = userData.phone.replace(/\D/g, '');
            if (numbers.length < 10) {
                setErrors(prev => ({ ...prev, phone: true }));
                isValid = false;
            } else {
                setErrors(prev => ({ ...prev, phone: false }));
            }
        }

        if (fields.includes('email')) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(userData.email)) {
                setErrors(prev => ({ ...prev, email: true }));
                isValid = false;
            } else {
                setErrors(prev => ({ ...prev, email: false }));
            }
        }

        if (isValid) {
            console.log('저장된 데이터:', userData);
        }
        return isValid;
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
            profileImg: defaultProfileImg
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

    const handleSave = async () => {
        const isValid = handleFieldSave(['username', 'birthDate', 'phone', 'email']);
        if (isValid) {
            const response = await updateProfileApi(username, userData);
            if (response.status === 200) {
                alert('저장 성공');
            } else if(response.status === 409){
                return alert(`저장 실패: 닉네임 중복`);
            } else{
                return alert(`저장 실패: 서버 응답 ${response.status}`);
            }
            console.log('프로필 수정 성공');
            setOriginalData(userData);
            setIsEditing(false);
        }
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
                                    {userData.profileImg ? (
                                        <img 
                                            src={userData.profileImg} 
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
                                    {isEditing ? (
                                        <div >
                                            <input 
                                                type="text" 
                                                value={userData.username}
                                                onChange={(e) => updateTempField('username', e.target.value)}
                                                placeholder="이름"
                                                className="field-input name"
                                                minLength={2}
                                                maxLength={10}
                                                id="username"
                                            />
                                            {errors.username && <span className="text-danger ms-2 fs-6">이름을 두글자 이상으로 작성해주세요.</span>}
                                        </div>
                                    ) : (
                                        <div className="d-flex align-items-center">
                                            <div>{userData.username}</div>
                                        </div>
                                    )}
                                </h3>
                                {isEditing ? (
                                    <div className="button-group">
                                        <input 
                                            type="text" 
                                            value={userData.message}
                                            onChange={(e) => updateTempField('message', e.target.value)}
                                            placeholder="상태메시지"
                                            className="field-input message"
                                            id="message-input"
                                            name="message"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {userData.message}
                                    </>
                                )}
                                <p className="mt-2 text-muted">
                                    팔로워 {userData.followers} 팔로잉 {userData.following}
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
                            <h3 className="section-title text-start">개인 정보</h3>
                            <div className="section-content">
                                <div className="settings-item">
                                    <span>생년월일</span>
                                    <div>
                                        {isEditing ? (
                                            <div className="button-group">
                                                {errors.birthDate && <span className="text-danger ms-2 fs-6">생년월일을 입력해주세요</span>}
                                                <DateSelector
                                                    value={userData.birthDate}
                                                    onChange={(part, value) => {
                                                        const [year, month, day] = (userData.birthDate || '').split('-');
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
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-muted">{userData.birthDate}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="settings-item">
                                    <span>전화번호</span>
                                    <div>
                                        {isEditing ? (
                                            <div className="button-group">
                                                {errors.phone && <span className="text-danger ms-2 fs-6">올바른 번호가 아닙니다</span>}
                                                <input 
                                                    type="tel" 
                                                    value={userData.phone}
                                                    onChange={(e) => updateTempField('phone', formatPhoneNumber(e.target.value))}
                                                    placeholder="전화번호"
                                                    className="field-input"
                                                    maxLength={13}
                                                    id="phone-input"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-muted">{userData.phone}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="settings-item">
                                
                                    <span>이메일</span>
                                    <div>
                                        {isEditing ? (
                                            <div className="button-group">
                                                {errors.email && <span className="text-danger ms-2 fs-6">이메일 형식이 아닙니다</span>}
                                                <input 
                                                    type="email" 
                                                    value={userData.email}
                                                    onChange={(e) => updateTempField('email', e.target.value)}
                                                    placeholder="example@email.com"
                                                    className="field-input email"
                                                    id="email-input"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-muted">{userData.email}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* 개인 설정 레이어 */}
                        <section className="mt-5">
                            <h3 className="section-title text-start">개인 설정</h3>
                            <div className="section-content">
                                <div className="settings-item">
                                    <span>알림</span>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                        </div>
                                </div>
                            </div>
                        </section>
                        <div className="mt-5 text-end">
                            <button className="btn btn-danger">계정 삭제</button>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            {!isEditing ? (
                                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>수정</button>
                            ) : (
                                <>
                                    <button className="btn btn-success" onClick={handleSave}>저장</button>
                                    <button className="btn btn-secondary" onClick={() => { setUserData(originalData); setIsEditing(false); }}>취소</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Mypage
