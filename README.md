# boiler_plate

## Library

### dotenv

- 환경 변수 관리하는 라이브러리

### body-parser

- 요청(Request)의 본문을 해석해주는 미들웨어
- Express v4.16.0 기준, express 에서 built-in body-parser 제공

## NPM vs NPX

- `npm` 은 Node.js 의 **의존성**과 **패키지 관리**를 위한 패키지 매니저
- `npx` 는 Node 패키지를 실행시키는 하나의 도구이며 **설치하지 않고도** 무거운 패키지와 같은 것들을 **오직 실행만 시킬 수 있는** 도구!

## CRA to Our Boilerplate

- HOC 개념

## CORS(Cross-Origin Resource Sharing) 이슈, Proxy 설정

- 두 개의 다른 포트를 가지고 있는 서버는 아무 설정없이 Request 를 보낼 수 없다.
- 해결을 위해서는
  - 서버 쪽에서 따로 허용 설정을 하는 방법
  - Proxy 설정 사용

## 로그인

https://www.daleseo.com/react-router-authentication/

https://bezkoder.com/react-hooks-jwt-auth/
https://bezkoder.com/node-js-mongodb-auth-jwt/
https://bezkoder.com/react-redux-jwt-auth/
