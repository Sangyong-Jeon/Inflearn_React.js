import React, { useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

/* 페이지 라우팅 1 - React Router 기본
 <BrowserRouter>로 감싸면 브라우저 url과 매핑될 수 있다. ex) /new => <New /> , /edit => <Edit />
 <Route>는 url경로와 컴포넌트를 매핑시켜주는 컴포넌트이다.
 'http://localhost:3000/' 경로로 가서 Components로 살펴보면 <Route.Provider> 밑에 <Home> 컴포넌트가 있는데 이는 전달받은 홈컴포넌트를 url에 매핑시켜서 렌더시킨 것이다.
 결론적으로 리액트 앱이 제공하는 html 웹문서파일인 index.html은 하나밖에없지만 앱 컴포넌트와 그 안에 라우터들을 통해서 url경로별로 렌더링되는 컴포넌트들을 계속해서 변경해줘서 마치 페이지가 이동된것처럼 보여주는 방식이다.
 따라서 리액트는 이런식으로 페이지를 교체해줘서 깜빡임없고 매우 빨라서 쾌적하게 페이지 이동을 할 수 있도록 도와주는 클라이언트 사이드 렌더링(CSR)기법을 사용함.
*/
/* 페이지 라우팅 2 - React Router 응용

1. PathVariable 사용
아래 <Route> 태그 속성에 path를 "/diary/:id"로 하면 브라우저에서 "/diary/1" 을 적었을 때 id값에 1이 들어간다.
따라서 Diary.js 파일에서 저 id값을 useParams()로 꺼내서 사용할 수 있다.

2. QueryString
Edit.js파일에서 useSearchParams를 사용하여 쿼리스트링으로 받는 데이터들을 가져올 수 있다.

3. PageMoving
Edit.js파일에서 useNavigate를 사용하여 페이지를 이동시킨다.
*/
/* 프로젝트 기초 공사 1
process.env.PUBLIC_URL 은 현제 프로젝트 내에서 public 폴더를 가리키는 경로(url)이다.
*/

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CRAETE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        data: {
          id: targetId,
          date: new Date(date).getTime(),
          content,
          emotion,
        },
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
