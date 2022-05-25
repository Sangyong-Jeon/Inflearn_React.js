import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

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

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

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

  const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
