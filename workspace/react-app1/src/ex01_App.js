/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import logo from './logo.svg';
import './App.css';

function App() { // 함수형이랑 클래스 컴포넌트가 있다
  {/*주석: JSX
      - <태그>...</태그> : 시작태그 종료태그 필수
      - className : HTML class 속성임. 자바스크립트에서 class가 예약어임
    */}
    const name = "Tom"
    const naver = {
      name : "네이버",
      url : "https://www.naver.com"
    }
  return (
    <div className="App">
      <h1 style={{color : "white",
        backgroundColor:"black"}}>
      Hello,{name}</h1> 
      <a href={naver.url} target="_blank" rel="noreferrer">
        {naver.name}
      </a>
    </div>
  );
}

export default App;