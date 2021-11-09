import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_USER,
  AUTH_USER_EMAIL,
  FIND_PASSWORD,
  CHANGE_PASSWORD,
  RECEIVE_MYPAGE,
  UPDATE_MESSAGE,
  UPDATE_IMAGE,
  LOADING_MYPAGE,
  LOADING_WORKERLIST_DATA,
  RECEIVE_USERLIST,
  POST_NOTICE_CONFIRM,
  POST_NOTICE_REJECT
} from "../_actions/types";
import Default_Profile from "../images/profile_sample.jpg";   //기본 프사
// import hanium_logo from '../images/hanium_logo.jpg';

const initialState = {
  profile:{
    ProfileName: '',
    ProfileImage: '',
    FinishedPJ: 0,
    ContinuingPJ: 0,
    Score: '',
    ProfileMessage: `ㄴㄴ`
  },
  project_list:[
    {
      id: 1,
      group: "두유개발자",
      project_Host: "주식회사한이음",
      project_StartZLine: 20210820,
      project_DeadLine: 20210920,
      favoriteList: false,
      Finished: false,
      logo: ''
    },
  ],
  worker_list:[
    {
      ProfileImage: null,
      ProfileMessage: "Loading",
      ProfileName: "Loading"
    },
  ],
  isLoading: true,
  isDataLoading : true
  
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case SIGNUP_USER:
      return { ...state, signupSuccess: action.payload };
    case AUTH_USER:{
      const data={...state, userData: action.payload, profile: {...state.profile, ProfileName: action.payload.name}};
      return data;
    }
    case AUTH_USER_EMAIL:
      return { ...state, emailAuth: action.payload };
    case FIND_PASSWORD:
      return { ...state, findingPasswordSuccess: action.payload };
    case CHANGE_PASSWORD:
      return { ...state, changingPasswordSuccess: action.payload };
    case RECEIVE_MYPAGE:{
      if(action.payload === undefined || action.payload === null){
        return state;
      }
      if(action.payload.profile.ProfileImage == "DEFAULT"){       //프로필 이미지가 DEFAULT일 경우, 기본프로필로 강제 변경
        action.payload.profile.ProfileImage = Default_Profile;
      }
      // return { ...state, profile: action.payload.profile, 
      //   project_list: action.payload.project_list};
      return { ...state, profile: action.payload.profile, project_list: action.payload.project_list};
    }
    case UPDATE_MESSAGE:{
      return {...state, updateMessageSuccess: action.payload.success}
    }
    case UPDATE_IMAGE: {
      return {...state, Success: action.payload.success}
    }
    case RECEIVE_USERLIST: {
      const new_array = action.payload.array;
      return {...state, Success: action.payload.success, worker_list: new_array}
    }

    case POST_NOTICE_CONFIRM: { 
      const new_array = state.aramsdata.filter(data =>{
        if(data.no === action.payload.no_to_delte){
          return '';
        }
        return data;
      })
      return {...state, notice_confirm_success: action.payload.notice_success, aramsdata: [...new_array]}
    }

    case POST_NOTICE_REJECT: { 
      const new_array = state.aramsdata.filter(data =>{
        if(data.no === action.payload.no_to_delte){
          return '';
        }
        return data;
      })
      return {...state, notice_reject_success: action.payload.notice_success, aramsdata: [...new_array]}
    }

    case LOADING_MYPAGE:{
      return {...state, isLoading: action.isLoading}
    }

    case LOADING_WORKERLIST_DATA:{
      return {...state, isDataLoading: action.isDataLoading}
    }


    default:
      return state;
  }
}
