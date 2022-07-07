import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RouteTest from './components/RouteTest';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

// <BrowserRouter>로 감싸면 브라우저 url과 매핑될 수 있다. ex) /new => <New /> , /edit => <Edit />
// <Route>는 url경로와 컴포넌트를 매핑시켜주는 컴포넌트이다.
// 'http://localhost:3000/' 경로로 가서 Components로 살펴보면 <Route.Provider> 밑에 <Home> 컴포넌트가 있는데 이는 전달받은 홈컴포넌트를 url에 매핑시켜서 렌더시킨 것이다.
// 결론적으로 리액트 앱이 제공하는 html 웹문서파일인 index.html은 하나밖에없지만 앱 컴포넌트와 그 안에 라우터들을 통해서 url경로별로 렌더링되는 컴포넌트들을 계속해서 변경해줘서 마치 페이지가 이동된것처럼 보여주는 방식이다.
// 따라서 리액트는 이런식으로 페이지를 교체해줘서 깜빡임없고 매우 빨라서 쾌적하게 페이지 이동을 할 수 있도록 도와주는 클라이언트 사이드 렌더링(CSR)기법을 사용함.
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
