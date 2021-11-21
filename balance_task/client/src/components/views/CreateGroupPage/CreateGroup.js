import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createGroup } from "../../../_actions/group_action";
import { useDispatch } from "react-redux";

import Header from '../Header/Header'
const changegroupName = (e, setGroupName) => {
  const {
    target: { value },
  } = e;
  setGroupName(value);
};

const changeCategory = (e, setcategory) => {
  setcategory(e.target.value);
};

const changeStart = (e, setStart) => {
  const {
    target: { value },
  } = e;
  setStart(value);
};

const changeEnd = (e, setEnd) => {
  const {
    target: { value },
  } = e;
  setEnd(value);
};

const changeHighlight = (e, setHighlight) => {
  const {
    target: { value },
  } = e;
  setHighlight(value);
};

const changeHost = (e, setHost) => {
  const {
    target: { value },
  } = e;
  setHost(value);
};

const changeManager = (e, setManager) => {
  const {
    target: { value },
  } = e;
  setManager(value);
};

const changeContent = (e, setContent) => {
  const {
    target: { value },
  } = e;
  setContent(value);
};

function CreateGroup(props) {
  const [groupName, setGroupName] = useState("");
  const [category, setcategory] = useState("학교 조별 과제");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [highlight, setHighlight] = useState("");
  const [host, setHost] = useState("");
  const [manager, setManager] = useState("");
  const [content, setContent] = useState("");
  const [detailImageFile, setDetailImageFile] = useState(null);
  const [detailImageUrl, setDetailImageUrl] = useState(null);
  const [teamLogoFile, setTeamLogoFile] = useState(null);
  const [teamLogoUrl, setTeamLogoUrl] = useState(null);
  const dispatch = useDispatch();
  console.log(detailImageFile);
  const postHandler = (e) => {
    e.preventDefault();
    if (
      groupName === "" ||
      category === "" ||
      start === "" ||
      end === "" ||
      highlight === "" ||
      host === "" ||
      manager === "" ||
      content === "" ||
      detailImageFile === null
    ) {
      alert('모두 입력해주시기 바랍니다.');
      return;
    }
    const formData = new FormData();
    formData.append('groupName', groupName);
    formData.append('category', category);
    formData.append('start', start);
    formData.append('end', end);
    formData.append('highlight', highlight);
    formData.append('host', host);
    formData.append('manager', manager);
    formData.append('content', content);
    formData.append('image', detailImageFile);
    formData.append('image', teamLogoFile);

    const config = {
      headers: {
        'content-type': "multipart/form-data"
      }
    }

    dispatch(createGroup(formData, config)).then((res) => {
      if(res.payload.success){
        alert('성공적으로 그룹을 만들었습니다!😊');
        // props.history.push('/group_search');
        window.location.replace("/group_search")
      }
    });
  };

  const setThumbnail = (event, setImageUrl, setImageFile) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImageUrl(base64.toString());
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      //이 코드가 onloadend의 트리거가 된다.
      //그 덕에 setThumbnail함수가 이 코드가 2번 실행되는 것같다.
      //그리고 reader.result 안에 base64 인코딩 된 스트링 데이터가 있게 된다.
      setImageFile(event.target.files[0]);
    } else {
      setImageUrl(null);
      setImageFile(null);
    }
  };

  return (
    <Conatainer>
      <Header title="그룹 만들기" isButton={true} buttonName="그룹 생성" icon="fas fa-file-import" onClickHandler={postHandler}></Header>
      <Input style={{marginTop: '80px'}}>
        <label>그룹 이름: </label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => changegroupName(e, setGroupName)}
        />
      </Input>
      <Category>
        <label>카테고리: </label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={(e) => changeCategory(e, setcategory)}
        >
          <MenuItem value="학교 조별 과제">학교 조별 과제</MenuItem>
          <MenuItem value="팀 프로젝트">팀 프로젝트</MenuItem>
          <MenuItem value="스터디">스터디</MenuItem>
        </Select>
      </Category>
      <Deadline>
        <label>시작하는 날짜: </label>
        <TextField
          id="date"
          type="date"
          label="시작하는 날짜"
          value={start}
          onChange={(e) => changeStart(e, setStart)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Deadline>
      <Deadline>
        <label>끝나는 날짜: </label>
        <TextField
          id="date"
          type="date"
          label="끝나는 날짜"
          value={end}
          onChange={(e) => changeEnd(e, setEnd)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Deadline>
      <Input>
        <label>하이라이트: </label>
        <input
          type="text"
          value={highlight}
          onChange={(e) => changeHighlight(e, setHighlight)}
        />
      </Input>
      <Input>
        <label>주최자: </label>
        <input
          type="text"
          value={host}
          onChange={(e) => changeHost(e, setHost)}
        />
      </Input>
      <Input>
        <label>작성자: </label>
        <input
          type="text"
          value={manager}
          onChange={(e) => changeManager(e, setManager)}
        />
      </Input>
      <Content>
        <label>내용:</label>
        <textarea
          value={content}
          onChange={(e) => changeContent(e, setContent)}
        ></textarea>
      </Content>
      <PhotoInput>
        <label>광고 사진: </label>
        <input
          type="file"
          name="imgFile"
          id="imgFile"
          accept="image/*"
          onChange={(e) => setThumbnail(e, setDetailImageUrl, setDetailImageFile)}
        />
      </PhotoInput>
      {detailImageFile && (
        <ImageArea img src={detailImageUrl} alt={detailImageFile.name} />
      )}
      <PhotoInput>
        <label>팀 대표 사진: </label>
        <input
          type="file"
          name="imgFile"
          id="imgFile"
          accept="image/*"
          onChange={(e) =>setThumbnail(e,setTeamLogoUrl, setTeamLogoFile)}
        />
      </PhotoInput>
      {teamLogoFile && (
        <ImageArea img src={teamLogoUrl} alt={teamLogoFile.name} />
      )}
    </Conatainer>
  );
}

const Conatainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 0 10px;
  background: #eee;

  & > div {
    width: 90%;
  }
  & > * > input {
    outline: none;
  }
`;

const Input = styled.div`
  margin: 1vh 0;
  display: flex;
  align-items: center;
  & > label {
    margin-right: 3vw;
    font-size: 20px;
    flex-grow: 1;
  }
  & > input {
    width: 60%;
    border-radius: 10px;
    box-shadow: 0px -1px 1px #aaa;
    border: 1px solid #aaa;
    color: #022;
    font-size: 1rem;
    padding: 4px 10px;
  }
`;

const Category = styled.div`
  margin: 1vh 0;
  display: flex;
  align-items: center;
  & > label {
    margin-right: 3vw;
    font-size: 20px;
    flex-grow: 1;
  }
  & > span {
    padding: 3px;
    border-radius: 10px;
    background: white;
  }
`;
const Deadline = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  & > label {
    margin-right: 3vw;
    font-size: 20px;
    flex-grow: 1;
    width: 30%;
  }
`;
const PhotoInput = styled.div`
  & > label {
    margin-right: 3vw;
    font-size: 24px;
  }
`;
const ImageArea = styled.img`
  display: block;
  width: 70%;
  & > img {
    width: 100%;
  }
`;

const Content = styled.div`
  margin: 1vh 0;
  display: flex;
  gap: 15px;
  & > label {
    font-size: 24px;
    flex-grow: 1;
  }
  & > textarea {
    width: 60%;
    padding: 15px;
    border: 1px solid #aaa;
    height: 200px;
    font-size: 1rem;
    line-height: 200%;
    border-radius: 10px;
    box-shadow: 0px -1px 1px #aaa;
    color: #022;
    background: white;
    outline: none;
  }
`;

export default withRouter(CreateGroup);
