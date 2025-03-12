import { useEffect, useState } from "react";
import '../styles/Mypage.css';
import { retrieveProfileApi, updateProfileApi } from "../api/MemberApi";
import DateSelector from "../components/DateSelector";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/slices/messageSlice";
import DeleteAccountModal from "../components/modals/DeleteAccountModal";

function Mypage() {
    const defaultProfileImg = '/images/user_default.png'; // default image URL (정적)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await retrieveProfileApi();
                setUserData({
                    username: response.data.username,
                    message: response.data.message,
                    birthDate: response.data.birthday,
                    phone: response.data.phone,
                    email: response.data.email,
                    followers: response.data.followers,
                    following: response.data.following,
                    profileImg: defaultProfileImg,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

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
    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState(null);
    const [errors, setErrors] = useState({ // 각 폼의 규칙 검증
        username: false,
        message: false,
        birthDate: false,
        phone: false,
    });

    function handleEdit() {
        setTempData({ ...userData });
        setIsEditing(true);
    }

    function handleCancel() {
        setUserData({ ...tempData });
        setErrors({ username: false, message: false, birthDate: false, phone: false });
        setIsEditing(false);
    }

    async function handleSave() {
        const isValid = handleFieldSave(['username', 'birthDate', 'phone']);
        if (isValid) {
            try{
                const response = await updateProfileApi(userData);
                console.log(response);
                if (response.status === 200) {
                    // console.log('저장된 데이터:', userData);
                    dispatch(setMessage(userData.message));
                    alert('프로필 수정 완료');
                } else if(response.status === 400){
                    return alert(`수정 실패: 닉네임 중복`);
                } else{
                    return alert(`저장 실패: 서버 응답 ${response.status}`);
                }
                setIsEditing(false);
                setTempData(null);
            }catch(error){
                alert(error.response.data)
            }
        }
    }

    function handleChange(field, value) {
        setUserData((prev) => ({ ...prev, [field]: value }));
    }

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
            if (!(birthDate===undefined||birthDate.length===0||birthDate.length===10)) {
                setErrors(prev => ({ ...prev, birthDate: true }));
                isValid = false;
            } else {
                setErrors(prev => ({ ...prev, birthDate: false }));
            }
        }

        if (fields.includes('phone')) {
            const numbers = userData.phone.replace(/\D/g, '');
            if (numbers.length < 11&&numbers.length > 0) {
                setErrors(prev => ({ ...prev, phone: true }));
                isValid = false;
            } else {
                setErrors(prev => ({ ...prev, phone: false }));
            }
        }

        return isValid;
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

    const handleAccountDelete = () => {
        setIsModalOpen(false);
    }
    return (
        <div className="contents">
            <div className="container-fluid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="row justify-content-center">
                    <div className="bg-white p-4">
                        
                        {/* 상단레이어 */}
                        <div className="profile-section p-3 m-auto row">
                            <div className=" col-md-3 m-auto"> 
                                <div>
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
                                    {isEditing && (<button 
                                        onClick={setToDefaultImage} 
                                        className="btn btn-secondary mt-1 profile-default-button"
                                    >기본 이미지로 변경</button>
                                    )}
                                </div>
                            </div>
                            <div className=" col-md-8 m-auto"> 
                                <h3 className="mb-3">
                                    {isEditing ? (
                                        <div >
                                            <input 
                                                type="text" 
                                                value={userData.username}
                                                onChange={(e) => handleChange('username', e.target.value)}
                                                placeholder="이름"
                                                className="field-input name"
                                                minLength={2}
                                                maxLength={10}
                                                id="username"
                                            />
                                            {errors.username && <span className="text-danger ms-2 fs-6">이름을 두글자 이상으로 작성해주세요.</span>}
                                        </div>
                                    ) : (
                                        <div className="default-item">
                                            <div>{userData.username}</div>
                                        </div>
                                    )}
                                </h3>
                                {isEditing ? (
                                    <div className="button-group">
                                        <input 
                                            type="text" 
                                            value={userData.message}
                                            onChange={(e) => handleChange('message', e.target.value)}
                                            placeholder="상태메시지"
                                            className="field-input message"
                                            id="message-input"
                                            name="message"
                                        />
                                    </div>
                                ) : (
                                    <div className="default-item">
                                        {userData.message}
                                    </div>
                                )}
                                
                                <p className=" text-muted default-item">
                                    팔로워 {userData.followers} 팔로잉 {userData.following}
                                </p>
                                
                            </div>
                        </div>
                        {/* 개인 정보 레이어 */}
                        <section className="mt-4 p-5">
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
                                                            handleChange('birthDate', `${newDate.year}-${newDate.month}-${newDate.day}`);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="default-item">
                                                <span className="text-muted">{userData.birthDate}</span>
                                            </div>
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
                                                    onChange={(e) => handleChange('phone', formatPhoneNumber(e.target.value))}
                                                    placeholder="000-0000-0000"
                                                    className="field-input phone"
                                                    maxLength={13}
                                                    id="phone-input"
                                                />
                                            </div>
                                        ) : (
                                            <div className="default-item">
                                                <span className="text-muted">{userData.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="settings-item">
                                    <span>이메일</span>
                                    <div className="default-item">
                                        <span className="text-muted">{userData.email}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* 개인 설정 레이어 */}
                        <section className="mt-4 p-5">
                            <h3 className="section-title text-start">개인 설정</h3>
                            <div className="section-content">
                                <div className="settings-item">
                                    <span>알림</span>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                        </div>
                                </div>
                                <div className="settings-item">
                                    <span>공개</span>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                        </div>
                                </div>
                            </div>
                        </section>
                        
                            <div className="mt-5 text-end">
                                {/* <button onClick={() => 비밀번호 변경로직} className="btn btn-secondary me-2">
                                    비밀번호 변경
                                </button> */}
                                <button onClick={() => setIsModalOpen(true)} className="btn btn-danger">계정 삭제</button>
                            </div>

                            <DeleteAccountModal
                                isOpen={isModalOpen}
                                onClose={handleAccountDelete}
                            />
                        <div className="d-flex justify-content-center mt-4">
                            {!isEditing ? (
                                <button className="btn btn-primary" onClick={handleEdit}>수정</button>
                            ) : (
                                <div>
                                
                                    <button className="btn btn-success me-2" onClick={handleSave}>저장</button>
                                    <button className="btn btn-secondary ms-2" onClick={handleCancel}>취소</button>
                                </div>
                            )}
                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Mypage
