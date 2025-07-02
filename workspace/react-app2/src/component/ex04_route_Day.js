import data from "../db/data.json"
// map 함수 : 반복문 
import { useParams } from "react-router-dom"; // useParams :  라우터에서 제공되는 파라미터 조회 훅
export default function Day(){
    const {day} = useParams(); // 파라미터 값은 문자열로 저장됨
    // const ps = useParams;
    // console.log(ps);
    // word.day = 숫자 형식
    // day = 문자열 
    const wordlist = data.words.filter(word=>(word.day===Number(day)))
    return(
        <>
            <h2>Day{day}</h2>
            <table>
                <tbody>
                    {/*data : data.json 파일
                    data.words : 배열객체
                    map : 배열 객체의 요소를 순회함
                    word : data.words 요소 한개
                    */}
                {wordlist.map(words => (
                    <tr>
                        <td>{words.eng}</td>
                        <td>{words.kor}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}