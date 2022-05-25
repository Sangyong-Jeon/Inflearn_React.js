const DiaryItem = ({
  onDelete,
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
      <button
        onClick={() => {
          console.log(id);
          if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onDelete(id);
          }
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default DiaryItem;

/*
new Date() : 현재시간
new Date(밀리세컨즈) : 밀리세컨즈가 가지고 있는 시간을 기준으로 생성
new Date의 toLocaleString() 을 쓰면 우리가 보기 편하게 문자열로 변환된다.
*/
