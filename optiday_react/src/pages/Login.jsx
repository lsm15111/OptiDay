import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/slices/categorySlice';
import { fetchMessage } from '../redux/slices/messageSlice';
import { fetchTodos } from '../redux/slices/todoSlice';

function Login(){
    const [username, setUsername] = useState('min');
    const [password, setPassword] = useState('min');
    const [Error, setError] = useState(false)
    const navigate = useNavigate()
    const {login} = useAuth()
    const dispatch = useDispatch();

    async function handleSubmit(event) {
        event.preventDefault(); // 폼 제출 시 기본 동작 방지
        const response = await login(username, password)
        if(response){ //로그인 성공 여부
            dispatch(fetchCategories());
            dispatch(fetchMessage());
            dispatch(fetchTodos());
            navigate(`/main`)
        } else {
            setError(true)
        }
    }


    return(
        <div className="d-flex justify-content-center align-items-center vh-100 background vw-100">
            <div className="login-container text-center text-white ">
                <h1 className="mb-4">OptiDay</h1>
                <form>
                    <div className="mb-3">
                        <input type="text" className="form-control form-control-lg" 
                                name='username' value={username} onChange={(e) => setUsername(e.target.value)}
                        placeholder="Email"/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control form-control-lg" 
                                name='password' value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"/>
                    </div>
                </form>
                <div className='mb-3 '/>
                {/* 로그인 버튼 */}
                <button className='login-button w-100 py-2 mb-3' name='login' onClick={handleSubmit} >로그인</button>
                {/* <div className="d-flex justify-content-center gap-4 mb-4">
                    <a href="/" className="icon-button" >
                        <img src="https://placehold.co/24x24" alt="Google icon"/>
                    </a>
                    <a href="/" className="icon-button">
                        <img src="https://placehold.co/24x24" alt="Naver icon"/>
                    </a>
                    <a href="/" className="icon-button">
                        <img src="https://placehold.co/24x24" alt="KakaoTalk icon"/>
                    </a>
                </div> */}
                {Error && <div className='fw-semibold mb-1'>인증 실패</div>}
                
                {/* 회원 가입 버튼 */}
                <Link to={"/signup"}><button className='signup-button w-100 py-2'>회원가입</button></Link>
            </div>
        </div>
    )
}
export default Login;