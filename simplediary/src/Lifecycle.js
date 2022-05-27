import React, { useEffect, useState } from 'react';

const UnmountTest = () => {
  useEffect(() => {
    console.log('Mount!!!!');
    return () => {
      //Unmount 시점에 실행되게 됨.
      console.log('Unmount!!!!');
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // count를 올려서 리렌더링 되더라도 작동안함. 마운트 될 때 작동하기 때문임. 마운트시점에 뭔가 하고싶으면 2번째 인자인 deps에 빈배열 넣으면 됨.
  useEffect(() => {
    console.log('Mount!');
  }, []);

  // 컴포넌트가 업데이트 되는 시점에 작동하려면 다음과 같이 2번째 인자를 안넣으면 됨. 그러면 리렌더링 될 때마다 작동함.
  useEffect(() => {
    console.log('Update!');
  });

  // 디펜던시에 있는 함수가 변경될 때마다 작동함.
  useEffect(() => {
    console.log(`count is update : ${count}`);
    if (count > 5) {
      alert('count가 5를 넘었습니다. 따라서 1로 초기화합니다.');
      setCount(1);
    }
  }, [count]);

  // 디펜던시에 있는 함수가 변경될 때마다 작동함.
  useEffect(() => {
    console.log(`text is update : ${text}`);
  }, [text]);

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible);
  };

  // isVisible이 true이면 UmnountText가 보여지고(렌더링), false이면 안보여짐.
  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default Lifecycle;
