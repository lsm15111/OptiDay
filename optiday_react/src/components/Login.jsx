import { useState } from 'react';
import { useAuth } from '../security/AuthContext';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
function Login(){
    const [username, setUsername] = useState('min');
    const [password, setPassword] = useState('min');

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()
    const authContext = useAuth()

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    // function IdAndPasswordCheck{
        
    // }

    async function handleSubmit() {
        const response = await authContext.login(username, password)
        if(response){ //로그인 성공 여부
            navigate(`/main/${username}`)
        } else {
            setShowErrorMessage(true)
        }
    }


    return(
        <div className="d-flex justify-content-center align-items-center vh-100 background vw-100">
            <div className="login-container text-center text-white ">
                <h1 className="mb-4">OptiDay</h1>
                <form>
                    <div className="mb-3">
                        <input type="text" className="form-control form-control-lg" 
                                name='username' value={username} onChange={handleUsernameChange}
                        placeholder="ID"/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control form-control-lg" 
                                name='password' value={password} onChange={handlePasswordChange}
                        placeholder="비밀번호"/>
                    </div>
                </form>
                <div className='mb-3 '/>
                {/* 로그인 버튼 */}
                <button className='btn login-button w-100 py-2 mb-3' name='login' onClick={handleSubmit} >로그인</button>
                <div className="line m-1 w-100 mb-4 bg-secondary"></div>
                <div className="d-flex justify-content-center gap-4 mb-4">
                    <a href="/" className="icon-button" >
                        <img src="https://placehold.co/24x24" alt="Google icon"/>
                    </a>
                    <a href="/" className="icon-button">
                        <img src="https://placehold.co/24x24" alt="Naver icon"/>
                    </a>
                    <a href="/" className="icon-button">
                        <img src="https://placehold.co/24x24" alt="KakaoTalk icon"/>
                    </a>
                </div>
                {showErrorMessage && <div className='fw-semibold'>인증 실패</div>}
                
                {/* 회원 가입 버튼 */}
                <Link to={"/signup"} className="btn signup-button w-100 ">회원가입</Link>
            </div>
        </div>
    )
}
export default Login;