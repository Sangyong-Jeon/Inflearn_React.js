import React, { useState } from 'react';
import OddEvenResult from './OddEvenResult';
/*
기존 HTML에서는 <button onclick='onIncrease()'> 이런식으로 썼는데
JSX에서는 <button onClick={onIncrease}> 이렇게 카멜케이스와 중괄호로 쓴다.

count의 값이 바뀌면 Counter가 리렌더링되어 사용자에게 보여준다.
*/
/*
App 컴포넌트(부모 컴포넌트)가 전달하는 값을 props로 받음
*/
// {initialValue} 비구조화 할당을 통해서 특정값을 받을 수 있고,
// props로 전체 값을 받을 수 있음
const Counter = ({ initialValue }) => {
  const [count, setCount] = useState(initialValue);

  const onIncrease = () => {
    setCount(count + 1);
  };

  const onDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <OddEvenResult count={count} />
    </div>
  );
};

// 전달 받지 못한 props 값을 기본값으로 미리 지정하여 오류 방지
Counter.defaultProps = {
  initialValue: 0,
};

export default Counter;
