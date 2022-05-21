// 본인이 가진 state나 부모가 준 props가 바뀔 때, 부모가 리렌더링 될 때 같이 리렌더링됨
const OddEvenResult = ({ count }) => {
  console.log(count);
  return <>{count % 2 === 0 ? '짝수' : '홀수'}</>;
};

export default OddEvenResult;
