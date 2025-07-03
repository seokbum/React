// useNavigate : 이전의 useHistory를 대체 훅
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BoardForm() {
    const navigate = useNavigate();
    const [gname,setGname] = useState(""); // 글쓴이
    const [pass,setPass] = useState(""); // 비밀번호
    const [subject,setSubject] = useState(""); // 제목
    const [content,setContent] = useState(""); // 내용
    const [file2,setFile2] = useState(""); // 첨부파일
    const {boardid} = useParams(); // 게시판 종류 코드
    
    // 이벤트 핸들러
    const handleSubmit = (e) => {
        e.preventDefault(); //기본 이벤트 (submit 이벤트) 취소
        let fileinput = document.querySelector("#file2");
        try{
            const form = new FormData();
            form.append("name",gname);
            form.append("pass",pass);
            form.append("subject",subject);
            form.append("content",content);
            form.append("file2",fileinput.files[0]);
            fetch("http://localhost:8080/board/boardPro",{
                method : "POST",
                body : form
            })
            navigate("board/boardList/"+boardid); // 리다이렉트 하기
        }catch(e) {
            console.log(e)
        }
    }
    return (
        <div className="container">
            <h4 className="text-center">게시판 입력</h4>
            <form className="container" method="post" encType="multipart/form-data" onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="name">작성자:</label>
                    <input type="text" className="form-control" placeholder="Enter name" id="name" onChange={(e) =>{
                        setGname(e.target.value); // useState 훅을 이용하여 변수값 저장
                    }} value={gname} name="name" />
                </div>

                <div className="form-group">
                    <label htmlFor="pwd">비밀번호:</label>
                    <input type="password" className="form-control" placeholder="Enter password" id="pwd" 
                    onChange={(e) => {
                        setPass(e.target.value);
                    }} value={pass} name="pass" />
                </div>

                <div className="form-group">
                    <label htmlFor="subject">제목:</label>
                    <input type="text" className="form-control" placeholder="Enter title" id="subject"
                    onChange={(e) => {
                        setSubject(e.target.value);
                    }}
                    value={subject} name="subject"/>
                </div>

                <div className="form-group">
                    <label htmlFor="content">내용:</label>
                    <textarea className="form-control" rows="5" id="content" value={content} name="content" 
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="file">파일:</label>
                    <input type="file" className="form-control" id="file2" 
                    onChange={(e) => {
                        setFile2(e.target.value);
                    }}
                    value={file2} name="file2"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

