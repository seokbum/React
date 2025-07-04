import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [gname, setGname] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [gender, setGender] = useState("");
  useEffect(() => {setGender(1)},[gender])
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      console.log(id,gname,tel,gender)
      form.append('id',id)
      form.append('pass',pass)
      form.append('name',gname)
      form.append('gender',gender)
      form.append('tel',tel)
      form.append('email',email)
      form.append('picture',picture)
      fetch('http://localhost:8080/member/joinPro',{
        method : "POST",
        body : form,
        headers : {
          Accept : 'application/json ,text/plain, */*' 
        }
      })
      navigate("/member/login");
    } catch (e) {
      alert("서버 전송 오류");
    }
  }

  return(
    <div className="container">
      <div className="input-form-background row">
        <h4 className="mb-3">회원가입</h4>
        <form className="validation-form" noValidate onSubmit={handleSubmit} method="post" name="f">
          <input type="hidden" name="picture" />
          <div className="row">
            <div className="col-md-3 mb-4">
              <label for="id">사진</label>
              <img src="" width="100px" height="120px" onChange={(e) => {
                setPicture(e.target.value);
              }}
              value={picture} id="pic" />
              <a className="btn btn-primary btn-block mt-2" href="javascript:win_upload()">사진 업로드</a>
            </div>
            <div className="col-md-9 mb-4">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="id">아이디</label>
                  <input type="text" className="form-control" id="id" onChange={(e) => setId(e.target.value)} value={id} name="id" required />
                  <div className="invalid-feedback">아이디를 입력해주세요.</div>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="name">이름</label>
                  <input type="text" className="form-control" id="name" placeholder="" onChange={(e) => setGname(e.target.value)} value={gname} name="name" required />
                  <div className="invalid-feedback">이름을 입력해주세요.</div>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="pass">비밀번호</label>
                  <input type="password" className="form-control" id="pass" placeholder="아이디" required onChange={(e) => setPass(e.target.value)} value={pass} name="pass" />
                  <div className="invalid-feedback">비밀번호을 입력해주세요.</div>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="pass2">비밀번호 확인</label>
                  <input type="password" className="form-control" id="pass2" placeholder="" onChange={(e) => setPass2(e.target.value)} value={pass2} name="pass2" required />
                  <div className="invalid-feedback">비밀번호확인을 입력해주세요</div>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="gender">성별</label>
                  <div>
                    <input type="radio" id="male" onChange={(e) => setGender(1)} checked={gender === 1} required name="gender" />
                    <label htmlFor="male" className="ml-2">남자</label>
                  </div>
                  <div>
                    <input type="radio" id="female" onChange={(e) => setGender(2)} checked={gender === 2} required name="gender" />
                    <label htmlFor="female" className="ml-2">여자</label>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="email">이메일</label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} value={email} name="email" required />
                  <div className="invalid-feedback">이메일을 입력해주세요</div>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="tel">전화번호</label>
                  <input type="text" className="form-control" id="tel" placeholder="전화번호" onChange={(e) => setTel(e.target.value)} value={tel} name="tel" required />
                  <div className="invalid-feedback">전화번호를 입력해주세요</div>
                </div>
                <div className="col-md-12">
                  <button className="btn btn-primary btn-lg btn-block" type="submit">가입완료</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Join;