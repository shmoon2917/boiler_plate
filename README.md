# Shop App

React 및 Node 학습용 쇼핑몰 어플리케이션입니다.

## Description

- feature

  - 로그인 및 회원가입 관련 인증 구현하였습니다.
  - 상품 관련 사진 및 데이터 업로드 구현하였습니다. 이미지는 리사이징 처리됩니다.
  - 랜딩 페이지에서 상품이 대륙별, 가격별, 키워드로 검색되도록 구현하였습니다.
  - 랜딩 페이지 상품이 일정 개수만큼 추가로 보여지도록 구현하였습니다.
  - 상품 카트에 담기 구현하였습니다.

- client: 리액트로 구현하였습니다. 사용한 라이브러리로는

  - redux: 상태 관리용 라이브러리입니다. 파일 구조는 Ducks 패턴으로 작성하였습니다.
  - redux-thunk: 상태 관리 과정에서 HTTP 비동기 작업을 추가하기 위한 미들웨어입니다.
  - axios: 비동기 HTTP 통신 라이브러리입니다.
  - formik: Html Form 의 state 관리와 validation 설정, 관련 helper 메소드들을 제공하는 라이브러리입니다.
  - styled-components: 스타일을 가지는 컴포넌트를 만들 수 있도록 하는 CSS-IN-JS 라이브러리입니다.
  - antd: UI 라이브러리입니다.

- server: Node JS로 구현하였습니다. 사용한 라이브러리로는
  - express: Node 경량 서버 프레임워크입니다.
  - dotenv: 환경 변수 관리 라이브러리입니다.
  - multer: 파일 업로드 관련 라이브러리입니다.
  - jimp: 이미지 처리 라이브러리입니다.
  - jwt: 토큰 기반 인증 시스템을 구현한 라이브러리입니다.
  - mongoose: MongoDB 데이터베이스 관리 시스템(ODM)입니다.
  - cors: CORS(Cross Origin Resource Sharing) 이슈를 해결해주는 라이브러리입니다.
  - bcyptjs: 문자열의 암/복호화를 도와주는 라이브러리입니다.
  - body-parser: POST request에서 body의 파라미터 추출을 도와주는 라이브러리입니다.
  - cookie-parser: request 에서 쿠키의 추출을 도와주는 라이브러리입니다.

## Installation

npm 으로 server depency 및 clinet depency 설치

```bash
npm install

cd client
npm install
```

## Usage

API 서버 실행 후 client 폴더에서 클라이언트 서버 실행

```bash
npm run server

cd client
npm start
```
