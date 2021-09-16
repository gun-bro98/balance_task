import React, { useRef } from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { postNoticeConfirm, postNoticeReject} from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';

function InfoBlock(props) {
  const dispatch = useDispatch();
  const Container_Ref = useRef(null);
  const {aramsdata:{senduser, time, groupname, content}} = props;
  console.log(props.aramsdata);
  const canceilHandler = () =>{
    const new_obj = {
      ...props.aramsdata,
      isConfirm: false
    }
    dispatch(postNoticeReject(new_obj)).then(res=>{
      if(res.payload.success){
        console.log('취소 성공');
        Container_Ref.current.style.display = "none";
      }
    });
  }

  const confirmHandler = () =>{
    const new_obj = {
      ...props.aramsdata,
      isConfirm: true
    }
    dispatch(postNoticeConfirm(new_obj)).then(res=>{
      if(res.payload.success){
        console.log('확인 성공');
        Container_Ref.current.style.display = "none";
      }
    });
  }
  return (
    <Container ref={Container_Ref}>
      <i className="fas fa-times" onClick={canceilHandler}></i>
      <NameBlock>
        보낸사람: {senduser}
      </NameBlock>
      <Content>
        {content === null && `${senduser}님이 ${groupname}에 들어오고 싶어합니다. 허락하시겠습니까?`}
        {content === 1 && `${senduser}님이 ${groupname}에 가입 되었습니다!`}
        {content === 0 && `${senduser}님이 ${groupname}에 가입이 거절 되었습니다..`}
      </Content>
      <TimeBlock>
        {time}
      </TimeBlock>
      <ButtonContainer>
        <Button variant="contained" color="primary" style={{width: "45%", margin: "2.5%"}} onClick={confirmHandler}>확인</Button>
        <Button variant="contained" color="secondary" style={{width: "45%", margin: "2.5%"}} onClick={canceilHandler}>취소</Button>
      </ButtonContainer>
    </Container>
  )
}

InfoBlock.defaultProps = {
  senduser: '김두유',
  content: '안녕하세요 저 두유개발자에 들어가고 싶은 두유입니다.',
  time: '2021-09-16 8시 8분'
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: rgb(214,214,214);
  border-radius: 5px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  margin:10px 0;
  & > i{
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;
const NameBlock = styled.div`

`;
const Content = styled.div`

`;
const TimeBlock = styled.div`
  font-size: 12px;
  text-align: right;
`;
const ButtonContainer = styled.div`
  width: 100%;
`;
export default InfoBlock;
