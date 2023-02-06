## ✨ 쓰곰 그리곰

![drawbear](https://user-images.githubusercontent.com/108935568/216934905-f65496b6-c4e3-484a-b378-c0c8bdb2269d.png)

## 👉🏻 서비스 소개 <br>

- 글로만 기록하는 일기는 NO! 이제는 <strong>그려서</strong> 기록해보시죠! 🖍
- 좋았던 일, 나빴던 일, 맛있게 먹은 음식 등등... 소중했던 나의 하루를 자유롭게 그려내봐요! 🥳
- 그리는 일기라니... 너무 신기하잖아 ❤️

✨ 너와 내가 그리는 우리의 그림일기. 쓰곰 그리곰 입니다 🥰

👉🏻[쓰곰 그리곰 이용해보기!](https://www.drawbear.site/) <br>
👉🏻[쓰곰 그리곰 팀 노션!](https://www.notion.so/jinsoldev/560f3f7c6acf451d9d21c5f309e73921)

<br>

## 🐻 기능 구현

![124124 PNG](https://user-images.githubusercontent.com/108935568/216934945-1b13f55a-2bb2-485f-803a-747e9cba5975.png)

<details>
<summary>
다이어리 색상, 제목 자유롭게 설정 가능
</summary>
<div>

![화면 캡처 2023-02-06 182627](https://user-images.githubusercontent.com/108935568/216936861-e8d86e65-1812-42c4-8146-a5ecf905fe75.png)</div>

</details>

<details>
<summary>
글과 함께 마음대로 그려서 기록하는 일기장
</summary>
<div>

![화면 캡처 2023-02-06 182202](https://user-images.githubusercontent.com/108935568/216936863-828a0d0d-6b5d-4c74-95f4-28d68643ec68.png)

</details>

<details>
<summary>
사용자 초대로 일기장 공유
</summary>
<div>

![Untitled (3)](https://user-images.githubusercontent.com/108935568/216936867-20cd1472-2973-4870-a9b2-2158a1f7fa11.png)

</details>

<details>
<summary>
보고 싶은 다이어리나 일기장만 모을 수 있는 북마크 표시
</summary>
<div>

![Untitled (2)](https://user-images.githubusercontent.com/108935568/216936871-60de17a6-8048-4fb3-b8ad-574d69934bb9.png)
![화면 캡처 2023-02-06 182515](https://user-images.githubusercontent.com/108935568/216937252-39f8abd2-91f9-435c-81d0-bb59458ade7b.png)

</details>

<details>
<summary>
작성한 해시태그 기준으로 일기 검색
</summary>
<div>

![Untitled (1)](https://user-images.githubusercontent.com/108935568/216936874-02ad7a22-5f3e-4eb9-b670-fe9243041fb3.png)

</details>

<br><br><br>

## 🛠 프로젝트 아키텍쳐

![아키텍처](https://user-images.githubusercontent.com/108935568/216935177-53ce4295-7f06-46c7-a91a-3d4a0be9dd8a.png)

<br><br><br>

## ⚙ 기술 스택

### ✔ Frond-end

<div>

<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/react_query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<br>
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"/>
<img src="https://img.shields.io/badge/styledcomponent-DB7093?style=for-the-badge&logo=styledcomponent&logoColor=white">
<img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white">

</div>

<br>

### ✔ Dev tools

<div>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/KakaoTalk-FFCD00?style=for-the-badge&logo=KakaoTalk&logoColor=black"/>
<img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=PWA&logoColor=white">
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">

</div>

<br><br>

## 📝 기술적 의사결정

| 기술   | 사용한 이유                        |
| ----------- | ----------------------------- |
| Redux-tooklit | 서버사이드의 데이터를 React-Query로 관리한다면, 클라이언트의 전역 상태관리로는 Redux-toolkit을 사용했습니다. 저희가 부트캠프를 진행하면서 가장 오랜 기간 사용했던 도구로써 익숙하게 다룰 수 있고, 가장 많은 개발자들이 사용하는 전역 상태관리 라이브러리로써 레퍼런스가 많아 오류나 적용할 수 있는 로직을 보다 쉽게 찾고 수정할 수 있다고 판단하여 적용하였습니다.  |
| React-Query | 서버사이드의 상태를 보다 용이하게 관리하기 위해서 사용했습니다.<br>기존의 Redux-toolkit-thunk 로 서버사이드의 데이터를 관리할 경우, 에러처리나 로딩 뷰 등에 대한 예외처리를 위해 작성해야 하는 보일러 플레이트가 길어져 코드의 양이 길어질 뿐 아니라, 반복되는 코드가 많다는 단점이 있었습니다.<br>React-Query 는 이러한 보일러 플레이트를 크게 줄여주며, 자동 데이터 캐싱을 통해 서버의 부담도 줄일 수 있다는 장점이 있습니다. 또한 데이터에 변동사항이 생겼을 때 캐싱된 데이터를 무효화하고 새로운 데이터를 받아오는 동기화 작업을 보다 쉽고 간단하게 구현할 수 있었습니다. |
| Axios | 서버의 비동기 통신을 위해서 사용했습니다.<br>fetch API로 비동기 통신을 할 수도 있지만 추가적으로 JSON 을 변환해야 하는 로직이 필요하고 네트워크 에러 발생 시 response timeout 이 없어 기다려야 하는 문제점이 있습니다. 그에 비해 Axios 는 자동으로 JSON 데이터를 변환해주며 Request를 취소하거나 Request Timeout 을 설정하여 fetch API 처럼 응답이 없을 경우 한없이 기다리는 등의 오류를 방지할 수 있습니다. <br> 추가적으로는 손쉽게 http requests에 intercept 기능을 추가할 수 있어 response 및 request 마다 token을 실어보내는 등의 유효성 검사 로직을 보다 간단하게 구현할 수 있었습니다. |
| Fabric JS | 저희의 메인 MVP는 그림일기 이므로 canvas 기능이 필수적으로 구현이 되어야 했습니다. 자바스크립트의 canvas API 로도 캔버스 기능을 충분히 구현할 수 있었고 실제로 개발 초기에 구현도 해봤지만 리사이즈 기능이나 드래그 앤 드롭 같은 복잡한 추가기능을 구현하는데 많은 기술적 어려움이 있었고 이러한 로직을 직접 개발할 시 시간적인 여유가 부족할 수 있으며 퀄리티 또한 낮을 수 있다고 판단했습니다.<br> 그에 비해 Fabric JS는 리사이즈, 드래그 앤 드롭 같은 기능을 자체적으로 제공하며 그려진 요소들을 객체로 관리하기 때문에 간단하게 추가 및 삭제 이벤트 핸들링이 가능합니다. 또한 라이브러리가 속도를 모티브로 하는 만큼 그래픽의 리소스를 줄여 속도를 높이는 방식을 채용했다고 하여 프로젝트의 특성상 좋은 선택이라고 생각했습니다. 해당 라이브러리가 대형 프로젝트에는 부적합하다는 평가가 있고 요소 선택의 기능을 React Strict Mode 에서 오류로 판단하여 작동하지 않는 등의 문제가 있지만 저희의 프로젝트 규모가 크지 않고 그림을 직접 그리지 않는 다른 기능의 개발을 진행중에는 Strict Mode 를 키고 개발을 진행하였기 때문에 큰 문제가 되지 않을 것이라고 판단하였습니다. |


<br>

## 🔆 트러블슈팅

  <br>

## 👻 쓰곰 그리곰의 팀원들

| Role  | Name   | Github                        |
| ----- | ------ | ----------------------------- |
| ❤️ BE | 이민용 | https://github.com/ludin-lee  |
| BE    | 김진솔 | https://github.com/Jinsol-Dev |
| 🧡 FE | 최지현 | https://github.com/jhchoi1182 |
| FE    | 우주호 | https://github.com/Cupcakes33 |
| FE    | 박혜민 | https://github.com/hyemin0303 |
| DE    | 조윤영 |                               |

<br>
