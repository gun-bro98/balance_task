import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const GroupCard = ({title, content, writer, date, image, props, kind}) =>{

  return(
    <Container onClick={()=>{
      props.history.push('/group_search/'+title, {
        title, content, writer, date, image, kind
      });
    }}>
      <Img image={image}></Img>
      <Content>
        <Title>팀: {title}</Title>
        <p>내용: {content}</p>
        <Default>
          <DefaultContent><span>작성자</span>: {writer} &nbsp;</DefaultContent>
          <DefaultContent><span>기간</span>: {date}</DefaultContent>
        </Default>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  height: 180px;
  padding: 10px;
  margin: 5px;
  border: 2px solid #aaa;
  border-radius: 10px;
  background: #eee;
`;

const Img = styled.div`
  width: 70px;
  height: 70px;
  background: gray;
  background-image: url(${({image}) => image});
  background-position: center;
  background-size: cover;
  border-radius: 35px;
  margin-right: 20px;
`;

const Content = styled.div`
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  padding: 10px;
  &>p{
    width: 100%;
    padding: 3px;
    overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  &>div{
    margin:2px 0;
  }
`;

const Title = styled.div`
  width: 100%;
  padding: 3px;
`;

const Default = styled.div`
  font-size: 10px;
  width: 100%;
`;

const DefaultContent = styled.div`
  padding: 3px;
  &>span{
    font-weight: 700;
    font-size: 11px;
    color: #555;
  }
`;

export default withRouter(GroupCard);