import { useNavigate, useSearchParams } from 'react-router-dom';
/*
 쿼리스트링(QueryString)을 처리하는 useSearchParams는 useState처럼 사용하면 된다.
 주소값에 쿼리스트링을 날리면 이 searchParams에 객체로 들어오게 된다. 그래서 searchParams에서 get(key)을 사용하여 value을 가져오면 된다.
 아래 버튼을 누르면 setSearchParams를 사용하여 사용자가 접속해있는 url을 이동시킬 수 있다. 즉, 저 버튼을 누르면 'http://localhost:3000/edit?who=winterload 로 이동하게 된다.

 useNavigate라는 훅은 페이지를 이동시킬 수 있는 함수를 반환해준다. 그 함수의 이름을 navigate로 받아준다음 인자로 경로를 작성해주면 navigate 함수를 호출해서 경로를 옮겨줄 수 있다.
 navigate는 링크를 안눌려도 의도적으로 페이지를 바꿀 수 있다. 이 때 '-1'을 인자로 주면 뒤로가기가 된다.
*/
const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id');
  console.log('id : ', id);

  const mode = searchParams.get('mode');
  console.log('mode : ', mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정페이지 입니다.</p>
      <button onClick={() => setSearchParams({ who: 'winterload' })}>
        QS 바꾸기
      </button>
      <button
        onClick={() => {
          navigate('/home');
        }}
      >
        HOME으로 가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
