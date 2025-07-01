import './App.css';
// 버튼을 클릭하면 <div id="msg"></div> 이 영역에 안녕하세요 출력하기
function App() { // 함수형 컴포넌트
  const handleClick = () => {
    document.querySelector("#msg").append("안녕하세요");
  }
  return (
    <div style={{textAlign:'center',marginTop:'50px'}}>
      <button onClick={handleClick}>버튼</button>
      <div id="msg">
      </div>
    </div>
  ); // HOOKS : 상태 설정
}

export default App;