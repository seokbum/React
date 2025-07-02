// data의 days 키값만 가져오기 <li>태그로 출력하기
import { Link } from "react-router-dom";
import data from "../db/data.json"
export default function DayList(){
    /*
        <li key={day.id}>
        리액트에서 리스트 항목을 출력할때 고유한 값이 필요
        리액트는 Virtual DOM을 사용하므로 변경된 부분만 갱신함
        변경(수정,추가,삭제) 된 부분의 빠른 판단을 위해서 key 속성을 사용함
    */
    return(
        <ul className="list_day">
            {data.days.map(day =>(
                <li key={day.id}>
                    <Link to={`/day/${day.day}`}>Day { day.day}</Link>
                </li>
            ))}
            
        </ul>
    );
}