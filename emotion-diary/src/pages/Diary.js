import { useParams } from 'react-router-dom';
// use라는 키워드는 React Hooks에서 많이 쓰는데, 리액트가 제공하는 React Hooks는 아니지만 별도의 라이브러리가 자신의 라이브러리의 기능을 더 편하게 만들어주는 사용자 정의 훅을 Custom Hooks라고 부른다.
// useParams를 사용하면 전달받은 PathVariable을 모아서 객체로 갖다주는데, 우리는 PathVariable을 "id"라고 부르기로 App.js 파일에 정의해놨기에 {id}로 꺼내온다.
// 따라서 useParams는 React Router의 Custom Hooks이다.
const Diary = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 일기 상세 페이지 입니다.</p>
    </div>
  );
};

export default Diary;
