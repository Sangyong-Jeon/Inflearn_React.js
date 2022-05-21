import React from 'react';
import Container from './Container';
import Counter from './Counter';
// import './App.css';

import MyHeader from './MyHeader';

/*
1. 무조건 태그를 닫아주어야 한다. <br></br> 또는 <br />
  - <br /> 이것은 셀프 클로징이라 한다.
2. JSX의 표현식은 반드시 하나의 부모를 두어야한다. 즉, 최상위 태그로 묶어야한다.
  - 최상위 태그로 묶고싶지 않을 때 React.Fragment를 쓴다.
  - <React.Fragment></React.Fragment>를 쓰기 싫다면 그냥 <></> 써도 된다.
3. React를 import했는데 다른 곳에서 React 기능을 쓰지 않는다면 굳이 할 필요 x
4. React에서는 태그의 class를 className으로 지정한다.
5. JSX에서 중괄호({}) 안에는 값과 식을 넣을 수 있지만 숫자와 문자열만 포함할 수 있다.
6. 조건부 렌더링 가능
  - <b> {number}는 : {number % 2 === 0 ? '짝수' : '홀수'} </b>
*/
function App() {
  /*
  인라인 스타일 방식
  <div style={style.App}>
  <h2 style={style.h2}>
  <b style={style.bold_text}>
  이런 식으로 태그에 style 옵션을 줘서 적용 가능함
  */
  const style = {
    App: {
      backgroundColor: 'black',
    },
    h2: {
      color: 'red',
    },
    bold_text: {
      color: 'green',
    },
  };

  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    initialValue: 5,
  };

  return (
    <Container>
      <div>
        <MyHeader />
        {/* 객체를 펼쳐서 전달하는 스프레드 연산자로 값을 자식에게 전달 */}
        <Counter {...counterProps} />
      </div>
    </Container>
  );
}

export default App;
