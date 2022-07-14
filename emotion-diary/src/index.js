import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// index.js 파일에서 <App> 컴포넌트가 렌더링되는 html, jsx 요소들을 id가 'root'를 갖는 요소의 자식으로 출발하게 되면서 화면에 나타난다.
// 즉, <div id='root'> 태그의 자식으로 <App> 컴포넌트가 렌더링된다.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
