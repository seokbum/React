import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";

const BoardList = () => {
    const [bList, setBList] = useState([]);
    const [boardCount, setBoardCount] = useState([]);
    const [start, setStart] = useState([]);
    const [end, setEnd] = useState([]);
    const [pageInt, setPageInt] = useState([]);
    const [bottomLine, setBottomLine] = useState([]);
    const [maxPage, setMaxPage] = useState([]);
    const [boardName, setBoardName] = useState([]);

    const { boardid } = useParams();
    const location = useLocation();
    const [queryString, setQueryString] = useState(location.search);

    useEffect(() => {
        getBoardList(); // 화면 처음에 랜더링시 한번 실행
    }, []);

    const getBoardList = () => {
        let currentQueryString = queryString;

        if (currentQueryString.length === 0) {
            currentQueryString = "?boardid=" + boardid;
        }

        fetch("http://localhost:8080/board/boardList" + currentQueryString)
            .then((resp) => resp.json())
            .then((json) => {
                setBList(json.blist);
                setBoardCount(json.listcount);
                setStart(json.start);
                setEnd(json.end);
                setPageInt(json.pageInt);
                setBottomLine(json.bottomLine);
                setMaxPage(json.maxPage);
                setBoardName(json.boardName);
            })
    };

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
                <h2 className="text-center">
                    {boardName}[{boardCount}]
                </h2>
                <p className="text-right">
                    <a className="btn btn-primary" href={`/board/boardForm/${boardid}`}>
                        게시판 입력
                    </a>
                </p>
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
                    {Array.isArray(bList) && bList.length > 0 ? (
                        // b : board 객체 , index : 순서 
                        <tbody>
                            {bList.map((b, index) => (
                                <tr key={b.num || index}>
                                    <td>{boardCount - (pageInt - 1) * bottomLine - index}</td>
                                    <td>{b.name}</td>
                                    <td>
                                        <a href={`/board/boardInfo/${b.num}`}>{b.subject}</a>
                                    </td>
                                    <td>{dayjs(b.regdate).format("YYYY-MM-DD")}</td>
                                    <td>{b.readcnt}</td>
                                    <td>
                                        {b.file1 && (
                                            <>
                                                <img
                                                    src={`http://localhost:8080/img/board/${b.file1}`}
                                                    width="30px"
                                                    alt="file"
                                                />
                                                {b.file1}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="6" className="text-center">
                                    게시물이 없습니다.
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
                <ul className="pagination justify-content-center">
                    <li className={start <= 1 ? "page-item disabled" : "page-item"}>
                        <a className="page-link" href={`/board/boardList/${boardid}?pageNum=${pageInt - 1}`}>이전</a>
                    </li>
                    {/* getPage(start,end) : start, end 까지의 배열*/}
                    {getPage(start, end).map((p) => (
                        <li key={p} className={pageInt === p ? "page-item active" : "page-item"}>
                            <a className="page-link" href={`/board/boardList/${boardid}?pageNum=${p}`}>
                                {p}
                            </a>
                        </li>
                    ))}
                    <li className={end >= maxPage ? "page-item disabled" : "page-item"}>
                        <a className="page-link" href={`/board/boardList/${boardid}?pageNum=${pageInt + 1}`}>
                            다음
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BoardList;

/*
    useEffect : 특정값이 변경될때만 실행하도록 설정 가능함
            빈 배열인 경우 처음 화면 시작될 날때 한번 실행함
*/