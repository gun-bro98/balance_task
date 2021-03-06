import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import { receiveTimeline ,chooseLoadingGroup} from '../../../_actions/group_action';
import PostBlock from '../common/PostBlock';
import GroupHeader from '../common/GroupHeader';
import { withRouter, Link } from 'react-router-dom';

const getTimeline = (group, dispatch,entireTimeline, setIsCompleted) => {
  
    const body = {
      last_number: entireTimeline.length-1,
      group: group
    };
    dispatch(receiveTimeline(body)).then(res=>{
      setIsCompleted(true);
      console.log('timeline 데이터 받기 성공!');
      dispatch(chooseLoadingGroup({timeline: false}));
    });
  
}

const searchPosts = (search, posts, setPosts, entirePosts) =>{
  if(posts.length !== entirePosts.length){
    const search_list =entirePosts.filter((post)=>post.user_name === search);
    setPosts(search_list);

  }else{
    const search_list =posts.filter((post)=>post.user_name === search);
    setPosts(search_list);
  }
}

//스크롤 내릴 때마다 새로운 정보 받기
const handleScrollEvent = (e, entireTimeline, group , isLoading, dispatch, setTimeline,setIsCompleted,isCompleted)=>{
  //로딩 될 때 스크롤 하면 데이터 받으면 안되니까 로딩시 바로 끝내기
  if(isLoading)return;
  const body = {
    last_number: entireTimeline.length-1,
    group: group
  };
  const {target: {scrollTop, clientHeight, scrollHeight}} = e;
  if(Math.ceil(scrollTop + clientHeight) === scrollHeight){
    console.log('됐다');
    //바로 로딩 true로 설정
    //setIsCompleted(false);
    dispatch(receiveTimeline(body)).then(res=>{
      //console.log(isCompleted);
      //setIsCompleted(true);
      // console.log(entireTimeline,res.payload.array)
      console.log(res.payload.array);
      setTimeline([...entireTimeline,...res.payload.array]);
    });
    //setIsCompleted(true);
    //바로 로딩 false로 바꾸자
  }
}

const ProjectTimeline = (props) =>{
  const entireTimeline = useSelector(state => state.group.timelineList);
  const isLoading = useSelector(state => state.group.isLoading.timeline);
  const userData = useSelector(state => state.user.userData);

  const dispatch = useDispatch();

  const [timeline, setTimeline] = useState(entireTimeline);

  const [search, setSearch] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const group=props.match.params.group;

  useEffect(()=>{
    //어차피 공지사항 보려면 무조건 timeline을 넘어가야하니까 이렇게 함.
    if(isLoading){ 
      getTimeline(group, dispatch,entireTimeline, setIsCompleted);
      
    }else{
      if(isCompleted){
        // console.log(isCompleted);
        setTimeline(entireTimeline);
        console.log('timeline 최신화 성공!');
      }
      if(search ==='' || search === null){
        setTimeline(entireTimeline);
      }else{
        searchPosts(search, timeline, setTimeline, entireTimeline);
      }
    }
  },[search, isLoading, entireTimeline]);
  return(
    <>
      <GroupHeader userData={userData} setSearch={setSearch} group={group}/>
      <Container onScroll={(e)=>handleScrollEvent(e, entireTimeline, group, isLoading, dispatch, setTimeline,setIsCompleted,isCompleted )}>
        {
          isLoading ? 
          <>
            <LoadingBlock></LoadingBlock>
            <LoadingBlock></LoadingBlock>
          </>
          :
          timeline.length !== 0  ? timeline.map((user_post,i)=>(
            <PostBlock key={i} index={i} board_no={user_post.id} userData={userData} user_post = {user_post} group={group} photo_url={user_post.image}/>
            )):
            <div>
                <NoGroup>
                    <div className="NoWorkerIcon">
                     <i className="fas fa-book-open"></i> 
                    </div>
                    <div className="NoWorkerMessage">아무런 글이 없습니다.</div>
                    <div className="RecommendMessage">지금 바로 첫 글을 작성해보세요.</div>
                    <div className="RecommendArrow">
                      <i className="fas fa-sort-down"></i>
                    </div>
                </NoGroup>
            </div>
        }
      </Container>
      <Button direction="left"><Link to={`/my_page`} className="Button-type"><i className="fas fa-user"></i></Link></Button>
      <Button direction="right"><Link to={`/${group}/create_posts`} className="Button-type"><i className="fas fa-plus"></i></Link></Button>
    </>
  )
}

const blink_effect = keyframes`
  90%{
    opacity: 0.5;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 85vh;
  margin-top: 15vh;
  background: #fffefe;
  overflow-y: auto;
`;
const LoadingBlock = styled.div`
  width: 90%;
  height: 40vh;
  background: #eee;
  margin: 1.5vh auto;
  animation: ${blink_effect} 0.8s ease-in-out infinite;
  border-radius: 30px;
  &:first-child{
    margin-top: 17vh;
  }
`;
const Button = styled.div`
  position: fixed;
  bottom: 5vh;
  ${(props)=>props.direction}: 5vw;
  width: 40px;
  height: 40px;
  &>.Button-type{
    display: block;
    text-align: center;
    background: #aaa;
    border-radius: 50%;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    opacity: 0.5;
    color:black;
  }
`;

const ArrowMove = keyframes`
    0% {
      transform:translate(0, 0);
    }
    100% {
      transform:translate(0, 35%);
    }
`;

const NoGroup = styled.div`
    text-align: center;
    margin-top: 12vh;
    & > .NoWorkerIcon {
      font-size: 8vh;
      color: rgb(255,179,128);
    }
    & > .NoWorkerMessage {
      font-size: 3vh;
      font-weight: bold;
    }
    & > .RecommendMessage {
      font-size: 2.5vh;
      margin-top: 1.5vh;
    }
    & > .RecommendArrow{
      position: fixed;
      bottom: 12vh;
      right: 5vw;
      font-size: 5vh;
      width: 40px;
      color: rgba(74,171,242);
      margin-top: 5vh;
      animation: ${ArrowMove} 0.5s 1s 10 ease alternate;
    }
`;

export default withRouter(ProjectTimeline);