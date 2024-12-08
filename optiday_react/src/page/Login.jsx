
import '../styles/Login.css';
function Login(){


    return(
        <div className="d-flex justify-content-center align-items-center vh-100 background">
          <div className="login-container text-center text-white">
              <h1 className="mb-4">OptiDay</h1>
              <form>
                  <div className="mb-3">
                      <input type="text" className="form-control form-control-lg" placeholder="ID"/>
                  </div>
                  <div className="mb-3">
                      <input type="password" className="form-control form-control-lg" placeholder="비밀번호"/>
                  </div>
              </form>
              <div className='mb-4'>
              <a href="/" className="text-muted">아이디 찾기</a>
              <a href="/" className="text-muted">비밀번호 찾기</a>
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
              <button className="btn login-button w-100 py-2 mb-3">Log in</button>
              <a href="/" className="text-muted">회원 가입</a>
          </div>
      </div>
    )
  }
export default Login;