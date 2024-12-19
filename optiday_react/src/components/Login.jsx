import '../styles/Login.css';
import { Link } from 'react-router-dom';
function Login(){

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 background vw-100">
            <div className="login-container text-center text-white ">
                <h1 className="mb-4">OptiDay</h1>
                <form>
                    <div className="mb-3">
                        <input type="text" className="form-control form-control-lg" placeholder="ID"/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control form-control-lg" placeholder="비밀번호"/>
                    </div>
                </form>
                <div className='mb-3 '>
                </div>
                <div className="d-flex justify-content-center gap-3 mb-4">
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
                <Link to={'/'} className="btn login-button w-100 py-2 mb-3 bg-secondary" >Log in</Link>
                <Link to={"/"} className="btn ">회원 가입</Link>
            </div>
        </div>
    )
}
export default Login;