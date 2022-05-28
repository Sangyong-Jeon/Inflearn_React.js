import React, { useState, useEffect } from 'react';

// CounterA에서는 count = 1로 동일한 값을 넣어서 리렌더링이 진행되지 않았음.
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count: ${count}`);
  });

  return <div>{count}</div>;
});

// CounterB에서는 객체 { count : 1 }에다가 count 값은 1로 동일한데 CounterA랑 다르게 리렌더링이 됨.
// 왜냐하면 객체는 얕은 비교를 하게 됨. 따라서 리렌더링이 진행됨.
// 예시로 들면 let a = { count : 1 } , let b = { count : 1 } 가 있다.
// a === b 의 결과값은 false이다. 주소로 비교하기에 둘은 다른 값으로 나온다. 얕은 비교는 값이 아닌 같은 주소인지 비교하게된다.
// 따라서 let a = { count : 1 } , let b = a 로 선언해야지 둘은 같은 주소값을 참조하기에 동일한 값이 된다.

// React.memo(MyComponent, areEqual) 로 두번째 인자는 비교를 할 수 있는 함수를 설정할 수 있다.
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count;
  //     return true; //이전 props와 현재 props가 같다 -> 리렌더링을 일으키지 않는다.
  //   return false; // 이전과 현재가 다르다 -> 리렌더링을 일으켜야 한다.
};

// 고착 컴포넌트
const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
