# 팀프로젝트 밀착관리 앱
## 팀원: 박건형, 김명진, 하동호, 백정훈

## 프론트 엔드: 박건형, 김명진
## 백엔드: 하동호, 백정훈

## 와이어프레임

![그룹만들기페이지](images/그룹만들기페이지.png)
![그룹생성페이지](images/그룹생성페이지.png)
![그룹찾기페이지](images/그룹찾기페이지.png)
![로그인페이지](images/로그인페이지.png)
![마이페이지](images/마이페이지.png)
![비밀번호찾기페이지](images/비밀번호찾기페이지.png)
![설정페이지](images/설정페이지.png)
![아이디찾기페이지](images/아이디찾기페이지.png)
![워커리스트페이지](images/워커리스트페이지.png)
![워커캘린더페이지](images/워커캘린더페이지.png)
![워커채팅페이지](images/워커채팅페이지.png)
![프로젝트종료페이지](images/프로젝트종료페이지.png)
![프로젝트현황페이지](images/프로젝트현황페이지.png)
![프로젝트현황_게시물자세히보기페이지](images/프로젝트현황_게시물자세히보기페이지.png)
![프로젝트현황_글쓰기페이지](images/프로젝트현황_글쓰기페이지.png)
![회원가입페이지](images/회원가입페이지.png)

## 메뉴구성도
![메뉴_구성도](images/메뉴_구성도.png)

## 서비스 구성도
![서비스_구성도](images/서비스구성도.png)

# RestAPI
로그인페이지 - /api/user => method: post, /api/kakao_user => method: post 
회원가입페이지 - /api/user_email => method: post, /api/signup => method: post
아이디 찾기페이지 - /api/user_email => method: post, /api/finding_password => method: post, /api/password_changing => method: post

# 규칙
-> 1.그 페이지를 만들 때 RESTAPI로 뭘 쓸 건지 
-> gitlab 자주사용하고 front 