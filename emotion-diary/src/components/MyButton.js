// ['MyButton', `MyButton ${type}`].join(' ') 을 사용하면 'MyButton MyButton ${type}' 으로 만들어준다.
const MyButton = ({ text, type, onClick }) => {
  /* 프로젝트 기초 공사 1
  type으로 전달되는 문자가 만약 배열 안에 있는 'positive', 'negative'가 아니라면 'default'를 btnType의 값으로 선언하고, 맞다면 그대로 값을 선언한다.
  className을 배열로 한 이유는 join 메서드를 다시 사용해보고자는 목적과 향후 React App을 제작할 때 조건부로 추가되는 css를 배열로 다루면 편하기에 사용했음.
  따라서 굳이 배열로 안해도 됌.
  */
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <button
      className={['MyButton', `MyButton_${btnType}`].join(' ')}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: 'default',
};

export default MyButton;
