import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// 리액트 라이프사이클 연습용 컴포넌트
// import Lifecycle from './Lifecycle';

// const dummyList = [
//   {
//     id: 1,
//     author: '홍길동',
//     content: '하이 1',
//     emotion: 5,
//     created_date: new Date().getTime(), // new Date()는 현재 시간 기준으로 생성됨. getTime()은 시간을 밀리세컨드로 변환하여 number 타입으로 반환
//   },
//   {
//     id: 2,
//     author: '김철수',
//     content: '하이 2',
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: '박짱구',
//     content: '하이 3',
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 4,
//     author: '훈이',
//     content: '하이 4',
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
// ];

// https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);

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

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current, // useRef(0)로 인해 0을 가리킴
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

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
