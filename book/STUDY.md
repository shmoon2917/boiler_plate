# STUDY

새롭게 배운 내용들을 작성한 문서입니다.

## Layout 구분

- xs: (0 <= xs < 575px)
- sm: (576px <= sm < 767px)
- md: (768px <= md < 991px)
- lg: (992px <= lg < 1199px)
- xl: (1200px < xl)

## AntD with Styled components

- https://www.newline.co/courses/tinyhouse-react-masterclass/lesson_9.2-styling-with-ant-design

## NPM vs NPX

- `npm` 은 Node.js 의 **의존성**과 **패키지 관리**를 위한 패키지 매니저
- `npx` 는 Node 패키지를 실행시키는 하나의 도구이며 **설치하지 않고도** 무거운 패키지와 같은 것들을 **오직 실행만 시킬 수 있는** 도구!

## CORS(Cross-Origin Resource Sharing) 이슈, Proxy 설정

- 두 개의 다른 포트를 가지고 있는 서버는 아무 설정없이 Request 를 보낼 수 없다.
- 해결을 위해서는
  - 서버 쪽에서 따로 허용 설정을 하는 방법
  - Proxy 설정 사용

## HOC

## 로그인

https://www.daleseo.com/react-router-authentication/

https://bezkoder.com/react-hooks-jwt-auth/
https://bezkoder.com/node-js-mongodb-auth-jwt/
https://bezkoder.com/react-redux-jwt-auth/

https://github.com/cornflourblue/react-hooks-redux-registration-login-example/tree/master/src

## 에러 핸들링

https://itnext.io/centralizing-api-error-handling-in-react-apps-810b2be1d39d

https://www.pluralsight.com/guides/centralized-error-handing-with-react-and-redux

https://pjh3749.tistory.com/273 (9 / 11)
https://code-maze.com/react-net-core-error-handling/ ( 9/11)

## Antd With raw css

- Antd 디자인 스타일을 수정하고 싶다면 `customClass`를 설정해서 사용

```
.ant-menu.ant-menu-dark .ant-menu-item-selected.customclass {
  background-color: green; /*Overriden property*/
}
```

## Listening History (Router 변경 감지)

https://www.it-swarm.dev/ko/reactjs/%EB%B0%98%EC%9D%91-%EB%9D%BC%EC%9A%B0%ED%84%B0%EB%A1%9C-%EA%B2%BD%EB%A1%9C-%EB%B3%80%EA%B2%BD-%EA%B0%90%EC%A7%80/833161534/

## Image Upload

http://blog.daum.net/creazier/15310525

https://jeonghwan-kim.github.io/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-1-multer-%EB%AA%A8%EB%93%88%EB%A1%9C-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C/

## Image processing

https://blog.logrocket.com/image-processing-with-node-and-jimp/
