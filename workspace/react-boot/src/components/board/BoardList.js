import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import dayjs from 'dayjs'; // npm install dayjs

const BoardList = () => {
    // 상태 변수 정의
    const [bList, setBList] = useState([]); // 게시물 목록
    const [boardCount, setBoardCount] = useState(0); // 게시물 총 건수
    const [start, setStart] = useState(0); // 페이지 시작 번호
    const [end, setEnd] = useState(0); // 페이지 종료 번호
    const [pageInt, setPageInt] = useState(1); // 현재 페이지
    const [bottomLine, setBottomLine] = useState(0); // 화면에 보여질 페이지 번호 개수
    const [maxPage, setMaxPage] = useState(0); // 최대 페이지 수
    const [boardName, setBoardName] = useState(""); // 게시판 이름

  // URL에서 boardid 파라미터 추출
    const { boardid } = useParams();
    const location = useLocation(); // URL 정보 추출용 객체

  // URL의 쿼리 문자열 가져오기
    let queryString = location.search;

  // 컴포넌트가 처음 렌더링될 때 실행
    useEffect(() => {
    getBoardList(); // 게시물 목록과 페이징 정보 조회
    }, []);

  // 서버에서 게시물 목록과 페이징 정보 가져오기
    const getBoardList = () => {
    if (queryString.length === 0) {
      queryString = "?boardid=" + boardid; // 쿼리 문자열이 없으면 boardid 추가
    }
    // 백엔드 서버에 요청
    fetch("http://localhost:8080/board/boardList" + queryString)
        .then((resp) => resp.json())
        .then((json) => {
        setBList(json.blist); // 게시물 목록 설정
        setBoardCount(json.listcount); // 게시물 총 건수
        setStart(json.start); // 시작 페이지 번호
        setEnd(json.end); // 종료 페이지 번호
        setPageInt(json.pageInt); // 현재 페이지
        setBottomLine(json.bottomLine); // 페이지 번호 개수
        setMaxPage(json.maxPage); // 최대 페이지
        setBoardName(json.boardName); // 게시판 이름
        });
    };

  // 페이지 번호 배열 생성 (start부터 end까지)
    function getPage(start, end) {
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
    }

    return (
    <div>
        <div className="container">
        {/* 게시판 이름과 게시물 수 표시 */}
        <h2 className="text-center">
            {boardName}[{boardCount}]
        </h2>
        {/* 게시물 입력 링크 */}
        <p className="text-right">
            <a className="btn btn-primary" href={`/board/boardForm/${boardid}`}>
            게시판입력
            </a>
        </p>
        {/* 게시물 목록 테이블 */}
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>번호</th>
                <th>작성자</th>
                <th>제목</th>
                <th>날짜</th>
                <th>조회수</th>
                <th>파일</th>
            </tr>
            </thead>
            <tbody>
            {/* 게시물 목록 렌더링 */}
            {Array.isArray(bList) && bList.length > 0 ? (
                bList.map((b, index) => (
                <tr key={index}>
                  {/* 게시물 번호 계산 */}
                  <td>{boardCount - (pageInt - 1) * bottomLine - index}</td>
                    <td>{b.name}</td>
                  {/* 게시물 제목 링크 */}
                    <td>
                    <a href={`/board/boardInfo/${b.num}`}>{b.subject}</a>
                    </td>
                  {/* 날짜 포맷팅 */}
                    <td>{dayjs(b.regdate).format("YYYY-MM-DD")}</td>
                    <td>{b.readcnt}</td>
                  {/* 파일 이미지와 이름 표시 */}
                    <td>
                    <img
                        src={`http://localhost:8080/img/board/${b.file1}`}
                        width="30px"
                        alt="file"
                    />
                    {b.file1}
                    </td>
                </tr>
            ))
            ) : (
                <tr>
                    <td colSpan="6" className="text-center">
                    게시물이 없습니다.
                    </td>
                </tr>
            )}
            </tbody>
        </table>
        {/* 페이지네이션 */}
        <ul className="pagination center" style={{ justifyContent: "center" }}>
          {/* 이전 페이지 링크 */}
            <li className={start <= bottomLine ? "page-item disabled" : "page-item"}>
            <a
                className="page-link"
                href={`/board/boardList?page=${start - bottomLine}`}
            >
                Previous
            </a>
            </li>
          {/* 페이지 번호 링크 */}
            {getPage(start, end).map((p) => (
            <li
                key={p}
                className={pageInt === p ? "page-item active" : "page-item"}
            >
                <a className="page-link" href={`/board/boardList?page=${p}`}>
                {p}
                </a>
            </li>
            ))}
          {/* 다음 페이지 링크 (오타 수정: pageNum -> page) */}
            <li className={end >= maxPage ? "page-item disabled" : "page-item"}>
            <a
                className="page-link"
                href={`/board/boardList?page=${start + bottomLine}`}
            >
                Next
            </a>
            </li>
        </ul>
        </div>
    </div>
    );
};

export default BoardList;