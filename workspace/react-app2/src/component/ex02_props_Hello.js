// useState 훅(Hook)을 조회하기.
// useState : 컴포넌트 내부에서 state 처를 위한 기능
import { useState } from "react";
// 1.props 변수에 age 값을 가져옴.
// 2.props의 값의 변경 불가
// 3. 값을 변경하고 싶은 경우 useState을 사용해야함
// 4. {age} : props 객체의 age 값만 저장
export default function Hello ({age}){
    
    // 초기값으로 Mike 로 설정
    // name : 변수. 상태값
    // setName : 변수값 변경을 위한 함수
    // 이름 변경을 위한설정
    const [name,setName] = useState("Mike");
    // 나이 변경을 위한설정
    const [newage,setAge] = useState(age);
    // 18세보다 크면 성인입니다,미성년 입니다. 출력하기
    const msg = newage >=18?"성인입니다.":"미성년입니다."
    return (
        <div>
            <h2>{name}:{newage}살({msg})</h2> {/*상태값 name을 출력*/}
            <button onClick={() => {
                setName(name === "Mike" ? "Tom" : "Mike");
                setAge(newage+1);
                
            }}>이름 / 나이변경 변경</button>
        </div>
    );
}
