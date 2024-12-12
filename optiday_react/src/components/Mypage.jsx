import { useState, useEffect } from "react";

// Constants
const INITIAL_STATE = {
    userData: {
        current: {
            name: "김코드",
            tag: "1234",
            say: "오늘도 화이팅!",
            birthDate: "1990-01-01",
            phone: "010-1234-5678",
            email: "example@email.com"
        },
        temp: {
            name: "김코드",
            tag: "1234",
            say: "오늘도 화이팅!",
            birthDate: "1990-01-01",
            phone: "010-1234-5678",
            email: "example@email.com"
        }
    },
    editModes: {
        global: false,
        name: false,
        say: false,
        birthDate: false,
        phone: false,
        email: false
    },
    errors: {
        name: false,
        tag: false
    }
};

// Utility functions
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

// Input Field Component
const EditableField = ({ label, value, onChange, onSave, onCancel, isEditing, error, placeholder, type = "text", style = {}, children }) => (
    <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center" style={{width: '200px'}}>
            <span className="me-2">{label}</span>
            {error && <span className="text-danger">!</span>}
        </div>
        <div>
            {isEditing ? (
                <div className="d-flex align-items-center">
                    {children || (
                        <input 
                            type={type} 
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            className="me-2"
                            style={style}
                        />
                    )}
                    <button onClick={onSave} className="btn btn-sm btn-success me-2">확인</button>
                    <button onClick={onCancel} className="btn btn-sm btn-secondary">취소</button>
                </div>
            ) : (
                <span>{value || placeholder}</span>
            )}
        </div>
    </div>
);

// DateSelector Component
const DateSelector = ({ value, onChange }) => {
    const [year, month, day] = (value || '').split('-');
    
    return (
        <div className="d-flex me-2" style={{width: '250px'}}>
            <select 
                className="form-select me-1"
                value={year || ''}
                onChange={(e) => onChange('year', e.target.value)}
                style={{width: '100px'}}
            >
                <option value="">년도</option>
                {generateYears().map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <select 
                className="form-select me-1"
                value={month || ''}
                onChange={(e) => onChange('month', e.target.value)}
                style={{width: '70px'}}
            >
                <option value="">월</option>
                {generateMonths().map(month => (
                    <option key={month} value={month}>{parseInt(month)}월</option>
                ))}
            </select>
            <select 
                className="form-select"
                value={day || ''}
                onChange={(e) => onChange('day', e.target.value)}
                style={{width: '70px'}}
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

function Mypage() {
    const [state, setState] = useState(INITIAL_STATE);

    useEffect(() => {
        // Reset temp data when edit mode changes
        if (!state.editModes.global) {
            setState(prev => ({
                ...prev,
                userData: {
                    ...prev.userData,
                    temp: { ...prev.userData.current }
                }
            }));
        }
    }, [state.editModes.global]);

    const updateTempField = (field, value) => {
        setState(prev => ({
            ...prev,
            userData: {
                ...prev.userData,
                temp: { ...prev.userData.temp, [field]: value }
            }
        }));
    };

    const toggleEditMode = (field) => {
        setState(prev => ({
            ...prev,
            editModes: {
                ...prev.editModes,
                [field]: !prev.editModes[field]
            },
            userData: {
                ...prev.userData,
                temp: { ...prev.userData.current }
            }
        }));
    };

    const setError = (field, value) => {
        setState(prev => ({
            ...prev,
            errors: { ...prev.errors, [field]: value }
        }));
    };

    const validateField = (field, value) => {
        switch (field) {
            case 'name':
                return value.length >= 2;
            case 'tag':
                return value.length === 4;
            default:
                return true;
        }
    };

    const handleSave = (field) => {
        const value = state.userData.temp[field];
        if (validateField(field, value)) {
            setState(prev => ({
                ...prev,
                userData: {
                    ...prev.userData,
                    current: { ...prev.userData.current, [field]: value }
                },
                editModes: { ...prev.editModes, [field]: false },
                errors: { ...prev.errors, [field]: false }
            }));
        } else {
            setError(field, true);
        }
    };

    const handleDatePartChange = (part, value) => {
        const [year, month, day] = (state.userData.temp.birthDate || '').split('-');
        const newDate = {
            year: part === 'year' ? value : year || '',
            month: part === 'month' ? value : month || '',
            day: part === 'day' ? value : day || ''
        };
        
        if (newDate.year || newDate.month || newDate.day) {
            updateTempField('birthDate', `${newDate.year}-${newDate.month}-${newDate.day}`);
        }
    };

    return (
        <div className="bg-light font-sans contents">
            <div className="container-fluid px-4">
                {/* Main Content */}
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="bg-white p-4">
                            {/* Global Edit Buttons */}
                            <div className="d-flex justify-content-end mb-3">
                                {!state.editModes.global ? (
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => toggleEditMode('global')}
                                    >
                                        수정
                                    </button>
                                ) : (
                                        <button 
                                            className="btn btn-success me-2"
                                            onClick={() => setState(prev => ({
                                                ...prev,
                                                editModes: { ...prev.editModes, global: false }
                                            }))}
                                        >
                                            수정완료
                                        </button>
                                )}
                            </div>

                            <div className="row mb-4">
                                <div className="col-4">
                                    <div className="profile_img">
                                    </div>
                                </div>
                                <div className="col">
                                    <h3 className="mb-3">
                                        {state.editModes.name ? (
                                            <div className="col">
                                                <div className="mb-2">
                                                    <input 
                                                        type="text" 
                                                        value={state.userData.temp.name}
                                                        onChange={(e) => updateTempField('name', e.target.value)}
                                                        placeholder="이름"
                                                        style={{width: '100px'}}
                                                        minLength={2}
                                                        maxLength={5}
                                                    />#
                                                    <input 
                                                        type="text" 
                                                        value={state.userData.temp.tag}
                                                        onChange={(e) => updateTempField('tag', e.target.value)}
                                                        placeholder="태그"
                                                        style={{width: '80px'}}
                                                        maxLength={4}
                                                    />
                                                    <button onClick={() => {
                                                        setState(prev => ({
                                                            ...prev,
                                                            userData: {
                                                                ...prev.userData,
                                                                current: {
                                                                    ...prev.userData.current,
                                                                    name: prev.userData.temp.name,
                                                                    tag: prev.userData.temp.tag
                                                                }
                                                            },
                                                            editModes: {
                                                                ...prev.editModes,
                                                                name: false
                                                            },
                                                            errors: {
                                                                name: false,
                                                                tag: false
                                                            }
                                                        }));
                                                    }} className="btn btn-sm btn-success me-2">확인</button>
                                                    <button onClick={() => {
                                                        toggleEditMode('name');
                                                        setState(prev => ({
                                                            ...prev,
                                                            errors: {
                                                                name: false,
                                                                tag: false
                                                            }
                                                        }));
                                                    }} className="btn btn-sm btn-secondary">취소</button>
                                                    {state.errors.name && <span className="text-danger ms-2 fs-5">이름을 두글자 이상으로 작성해주세요.</span>}
                                                    {state.errors.tag && <span className="text-danger ms-2 fs-5">4글자 태그를 입력해주세요.</span>}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="d-flex align-items-center">
                                                <div>{state.userData.current.name}#{state.userData.current.tag}</div>
                                                {state.editModes.global && (
                                                    <button className="btn btn-sm btn-primary ms-2" onClick={() => toggleEditMode('name')}>수정</button>
                                                )}
                                            </div>
                                        )}
                                    </h3>

                                    <p className="text-muted">
                                        {state.editModes.say ? (
                                            <div className="d-flex align-items-center">
                                                <input 
                                                    type="text" 
                                                    value={state.userData.temp.say}
                                                    onChange={(e) => updateTempField('say', e.target.value)}
                                                    placeholder="상태메시지"
                                                    style={{width: '300px'}}
                                                    className="me-2"
                                                />
                                                <button onClick={() => {
                                                    setState(prev => ({
                                                        ...prev,
                                                        userData: {
                                                            ...prev.userData,
                                                            current: {
                                                                ...prev.userData.current,
                                                                say: prev.userData.temp.say
                                                            }
                                                        },
                                                        editModes: {
                                                            ...prev.editModes,
                                                            say: false
                                                        }
                                                    }));
                                                }} className="btn btn-sm btn-success me-2">확인</button>
                                                <button onClick={() => toggleEditMode('say')} className="btn btn-sm btn-secondary">취소</button>
                                            </div>
                                        ) : (
                                            <>
                                                {state.userData.current.say}
                                                {state.editModes.global && (
                                                    <button className="btn btn-sm btn-primary ms-2" onClick={() => toggleEditMode('say')}>수정</button>
                                                )}
                                            </>
                                        )}
                                    </p>

                                    <p className="mt-2 text-muted">
                                        팔로워 13 팔로잉 10
                                    </p>
                                    <button className="btn btn-danger btn-sm mt-3">
                                        비밀번호 변경
                                    </button>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <section className="mt-4">
                                <h3 className="border-bottom pb-2">개인 정보</h3>
                                <div className="mt-4 px-3">
                                    <div className="d-flex justify-content-between py-2 border-bottom">
                                        <span>생년월일</span>
                                        <div>
                                            {state.editModes.birthDate ? (
                                                <div className="d-flex align-items-center">
                                                    <DateSelector
                                                        value={state.userData.temp.birthDate}
                                                        onChange={handleDatePartChange}
                                                    />
                                                    <button onClick={() => {
                                                        setState(prev => ({
                                                            ...prev,
                                                            userData: {
                                                                ...prev.userData,
                                                                current: {
                                                                    ...prev.userData.current,
                                                                    birthDate: prev.userData.temp.birthDate
                                                                }
                                                            },
                                                            editModes: {
                                                                ...prev.editModes,
                                                                birthDate: false
                                                            }
                                                        }));
                                                    }} className="btn btn-sm btn-success me-2">확인</button>
                                                    <button onClick={() => toggleEditMode('birthDate')} className="btn btn-sm btn-secondary">취소</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-muted">{state.userData.current.birthDate}</span>
                                                    {state.editModes.global && (
                                                        <button className="btn btn-sm btn-primary ms-2" onClick={() => toggleEditMode('birthDate')}>수정</button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between py-2 border-bottom">
                                        <span>전화번호</span>
                                        <div>
                                            {state.editModes.phone ? (
                                                <div className="d-flex align-items-center">
                                                    <input 
                                                        type="text" 
                                                        value={state.userData.temp.phone}
                                                        onChange={(e) => updateTempField('phone', formatPhoneNumber(e.target.value))}
                                                        placeholder="전화번호"
                                                        className="me-2"
                                                        maxLength={13}
                                                        style={{width: '150px'}}
                                                    />
                                                    <button onClick={() => {
                                                        setState(prev => ({
                                                            ...prev,
                                                            userData: {
                                                                ...prev.userData,
                                                                current: {
                                                                    ...prev.userData.current,
                                                                    phone: prev.userData.temp.phone
                                                                }
                                                            },
                                                            editModes: {
                                                                ...prev.editModes,
                                                                phone: false
                                                            }
                                                        }));
                                                    }} className="btn btn-sm btn-success me-2">확인</button>
                                                    <button onClick={() => toggleEditMode('phone')} className="btn btn-sm btn-secondary">취소</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-muted">{state.userData.current.phone}</span>
                                                    {state.editModes.global && (
                                                        <button className="btn btn-sm btn-primary ms-2" onClick={() => toggleEditMode('phone')}>수정</button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between py-2">
                                        <span>이메일</span>
                                        <div>
                                            {state.editModes.email ? (
                                                <div className="d-flex align-items-center">
                                                    <input 
                                                        type="email" 
                                                        value={state.userData.temp.email}
                                                        onChange={(e) => updateTempField('email', e.target.value)}
                                                        placeholder="example@email.com"
                                                        className="me-2"
                                                        style={{width: '200px'}}
                                                    />
                                                    <button onClick={() => {
                                                        setState(prev => ({
                                                            ...prev,
                                                            userData: {
                                                                ...prev.userData,
                                                                current: {
                                                                    ...prev.userData.current,
                                                                    email: prev.userData.temp.email
                                                                }
                                                            },
                                                            editModes: {
                                                                ...prev.editModes,
                                                                email: false
                                                            }
                                                        }));
                                                    }} className="btn btn-sm btn-success me-2">확인</button>
                                                    <button onClick={() => toggleEditMode('email')} className="btn btn-sm btn-secondary">취소</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-muted">{state.userData.current.email}</span>
                                                    {state.editModes.global && (
                                                        <button className="btn btn-sm btn-primary ms-2" onClick={() => toggleEditMode('email')}>수정</button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* Personal Settings */}
                            <section className="mt-5">
                                <h3 className="border-bottom pb-2">개인 설정</h3>
                                <div className="mt-4">
                                    <div className="d-flex justify-content-between py-2 border-bottom">
                                        <span>알림</span>
                                        <a href="#" className="text-muted">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                            </div>
                                        </a>
                                    </div>
                                    <div className="d-flex justify-content-between py-2">
                                        <span>화면 모드</span>
                                        <a href="#" className="text-muted">
                                            라이트 <i className="fas fa-chevron-down ms-1"></i>
                                        </a>
                                    </div>
                                </div>
                            </section>

                            {/* Category Settings */}
                            <section className="mt-5">
                                <h3 className="border-bottom pb-2">카테고리 설정</h3>
                                <button className="btn btn-light text-muted btn-sm mt-3">
                                    생성
                                </button>
                                <div className="mt-4">
                                    {["계획", "공부", "여행"].map((category, index) => (
                                        <div className="d-flex justify-content-between align-items-center mt-2" key={index}>
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className={`rounded-circle me-2 bg-${["danger", "warning", "primary"][index]}`}
                                                    style={{ width: "1rem", height: "1rem" }}
                                                ></div>
                                                <span>{category}</span>
                                            </div>
                                            <span className="text-muted">{index % 2 === 0 ? "공개" : "비공개"}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Delete Button */}
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