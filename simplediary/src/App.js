import { useCallback, useEffect, useMemo, useRef, useReducer } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// 리액트 라이프사이클 연습용 컴포넌트
// import Lifecycle from './Lifecycle';

const reducer = (state, action) => {
  // 첫번째 파라미터는 상태변화가 일어나기 직전의 상태(state), 두번째는 어떤 상태변화를 일으켜야하는지 정보가 있는 액션 객체
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data, // 스프레드 연산자로 펼쳐줌
        created_date,
      };
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, []); // 항상 상태변화 함수는 dispatch로 적기
  const dataId = useRef(0);

  // javascript api 내장 객체인 fetch 사용
  const getData = async () => {
    // 비동기 함수로 만듬 async
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());

    // 배열에 slice(0,20)을 사용하면 0~19까지만 잘라서 가져온다.
    // map을 쓰면 배열을 forEach문처럼 돌려서 return값을 반환한다.
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        // js의 내장 객체인 수학 연산을 담당하는 Math 객체 사용함.
        // random() * 5는 0~4까지 랜덤 난수(정수가 아닌 실수)를 발생시킴.
        // floor()는 실수를 정수로 변환시켜주므로 0~4가 나옴.
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: 'INIT', data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  // useCallback으로 두번째 인자인 []은 마운트 될 때 1번이라는 의미로, 즉 첫번째 인자인 함수를 1번만 만들어서 재사용한다는 의미
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        author,
        content,
        emotion,
        id: dataId.current, // useRef(0)로 인해 0을 가리킴
      },
    });
    dataId.current += 1;
  }, []); // 마운트 할 때 1번 사용하고 그 후 재사용하므로 DiaryEditor는 재렌더링 안됨.

  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });
  }, []);

  // 연산 최적화 useMemo, 이 때 함수가 아니라 값으로 반환하는것에 유의하기
  const getDiaryAnalysis = useMemo(() => {
    // filter는 조건에 해당하는 것들을 반환해준다. 따라서 아래는 data의 값들 중 emotion이 3이상인 것들을 모아서 반환해준다.
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); //data.length가 변화할때만 getDiaryAnalysis()가 다시 연산하여 결과를 리턴한다.
  // 만약 변하지 않는다면 연산하지않고 기억해놓은 결과값만 반환한다.
  // 동작방식은 useEffect와 동일하지만 useEffect처럼 사용하면 안된다.

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // 함수가 아닌 값으로 사용

  return (
    <div className="App">
      {/* <OptimizeTest /> */}
      {/* <Lifecycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
