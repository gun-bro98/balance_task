import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {auth} from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null){
  /* option*/
  //null => 아무나 출입 가능한 페이지
  //true => 로그인한 유저만 출입 가능한 페이지
  //false => 로그인한 유저는 출입 불가능한 페이지

  /*adminRoute*/
  // true => admin이 쓸 페이지
  // null => admin 페이지로 안쓴다!

  function AuthenticationCheck(props){
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(auth());
      // .then(response => console.log(response));

    },[]);
    return(
      <SpecificComponent/>
    )
  }
  return AuthenticationCheck;
}