import DiaryItem from './DiaryItem';

const DiaryList = ({ diaryList }) => {
  console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it, idx) => (
          <DiaryItem key={it.id} {...it} />
          // 고유한 id가 있으면 그것을 쓰고, 없다면 배열의 인덱스(idx) 쓰기! 왜냐면 인덱스 순서가 갑자기 바뀌면 리액트에서 문제가 생길 수 있음.
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
