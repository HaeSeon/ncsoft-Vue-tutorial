﻿# ncsoft-Vue-tutorial
https://cli.vuejs.org/guide/creating-a-project.html#vue-create

vue3 사용 

<h2>쌀집 계산기</h2>

* Vue, typescript 사용
* 메모리, 사칙연산, 클리어 기능 구현
* 필요 기능 정의
  + 메모리
    - M+ : 특정 값을 양의 값으로 기억한다.
    - M- : 특정 값을 음의 값으로 기억한다. 
    - MR : memory recall. 기억시켰던 값을 불러온다. 
    - ME : M+, M-에 기억되어있는 모든 값을 삭제한다. 
    
    예를들어 10, M+를 누르면 10 이 기억되어있다. 
    10, M-를 누르면 -10 이 기억되어있다. 
    12 X 34 + 56 X 78를 올바르게 계산하려면
    12 X 34 M+, 56 X 78 M+, MR 를 누르면 된다. 
    56 X 78 - 12 X 34를 올바르게 계산하려면
    56 X 78 M+, 12 X 34 M-, MR 를 누르면 된다. 
    
  + 사칙연산
  + 클리어

<h2>로그인, 회원가입, 메모장 CRUP</h2>

* Vue, express, mongoDB 사용
* Vue와 express 구현시 typescript 사용
* Collection 2개 (User, Post)
* 회원가입 
  + ID, password 입력창 2개 만들기
  + 서버에서 pw hashing 알고리즘을 사용하는 argon2를 사용하여 암호화 하여 저장
  + 회원가입은 별도의 승인 없이 가입 신청 버튼을 클릭하면 "User" collection에 저장
* 로그인
  + "User" collection에 저장된 document를 조회하여 로그인
  + 실패시 UI에 로그인 에러 출력
* 메모장 CRUD
  + C : 메모장 생성
  + R : 메모장 조회
  + U : 메모장 업데이트, 자기 자신이 등록한것만 수정 가능
  + D : 메모장 삭제, 자기 자신이 등록한 것만 삭제 가능


<h2>참고자료</h2>
es6
vue
vue-cli
typescript
http status code
mongoDB
html semantic
git-scm
