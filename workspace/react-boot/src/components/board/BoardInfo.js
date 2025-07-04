import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import dayjs from 'dayjs'; 

export default function BoardInfo() {
  const [board, setBoard] = useState({});
  const [boardName,setBoardName] = useState({});
  const location = useLocation();
  let queryString = location.search; 
  const { bnum } = useParams();

  const getBoardInfo = () => {
    if (queryString.length === 0) {
      queryString = "?num=" + bnum;
    }
    fetch("http://localhost:8080/board/boardInfo" + queryString)
      .then((resp) => resp.json())
      .then((json) => {
        setBoardName(json.setBoardName);
        setBoard(json.board);
      });
  };

  useEffect(() => {
    getBoardInfo();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="input-form-background row">
          <div className="input-form col-md-12 mx-auto">
            <h4 className="mb-3">게시판</h4>
            <table className="table">
              <tr>
                <td>파일</td>
                <td>
                  {board && board.file1 && (
                    <>
                      {board.file1}
                      <img
                        src={"http://localhost:8080/img/board/" + board.file1}
                        width="200px"
                        height="120px"
                        alt="file"
                      />
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>{board.subject}</td>
              </tr>
              <tr>
                <td>내용</td>
                <td>{board.content}</td>
              </tr>
              <tr>
                <td>날짜</td>
                <td>{dayjs(board.regdate).format("YYYY-MM-DD HH:mm")}</td>
              </tr>
              <tr>
                <td>조회수</td>
                <td>{board.readcnt}</td>
              </tr>
              <tr>
                <td colSpan="2" className="text-right">
                  <a
                    className="btn btn-primary"
                    href={`/board/boardUpdateForm/${board.num}`}
                  >
                    변경
                  </a>
                  <a
                    className="btn btn-primary"
                    href={`/board/boardDeleteForm/${board.num}`}
                  >
                    삭제
                  </a>
                  <a
                    className="btn btn-primary"
                    href={`/board/boardList/${board.boardid}`}
                  >
                    목록
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}