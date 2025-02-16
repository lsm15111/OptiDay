import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> {/*배포시 두번처리안됨. 주석하기*/}
    <Provider store={store}>
    <App />
    </Provider>
  // </React.StrictMode>
);