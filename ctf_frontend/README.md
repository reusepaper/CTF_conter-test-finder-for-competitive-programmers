# COUNTER-TEST FINDER FOR COMPETITIVE PROGRAMMERS (Front-end)

## Front-end 작업 가이드

0. 본 프로젝트는 크롬 브라우저 기반으로 **Vue dev tools** 를 사용하여 Vue.js 페이지를 개발하였으며 IDE는 **VS code**를 이용하였습니다.

   *권장사항*

   `vue dev tools` : 크롬 확장프로그램으로 설치

   `vs code `: os에 맞는 버전으로 설치

   - vue 개발에 유용한 vs code 추천 플러그인입니다. vs code 확장 플러그인으로 설치하시면 보다 편리하게 수정 및 개발이 용이합니다.

     **`vetur`** : vs code에서 지원하는 vue 플러그인

     `Material Icon Theme` : 편집이 아이콘 아미지 변경

     **`Live Server`** : 에디터에서 저장하는 즉시 브라우저에 반영, local server로 바로 확인가능

     `ESLint` : 자바스크립트 문법검사

     `Prettier` : 코드 자동정리

     `Auto Close Tag` : html / XML 태그 자동닫기

     `Atom Keymap` : 아톰 에디터 단축키 적용

1. node.js 설치

   https://nodejs.org/ko/ : LTS버전으로 설치, 본 프로젝트는 12.13.0 LTS 버전으로 제작하였습니다.

2. 프로젝트에 사용된 패키지 통합 설치

   ```bash
   npm ci
   ```

3. 컴파일 및 실행하기

   ```bash
   npm run serve
   ```

   