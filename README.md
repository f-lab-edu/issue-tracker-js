<div align="center">
    <img src='https://i.imgur.com/WgiQ6XY.png' width='200' alt='로고 이미지' />
    <h3>이슈 트래커</h3>
</div>

## 소개

F-Lab 프론트엔드 과정 중 두 번째 [**자바스크립트로 구현하는 프로젝트**](https://docs.google.com/presentation/d/1bPk_xJgamZvGJuIy9Pg5_4AVKkuBHVMN_xjMdGGLR3g/edit#slide=id.g155725aff19_0_4)입니다.  
[**칸반보드**](https://github.com/users/bytrustu/projects/1/views/1)를 구현해보는 것이 목적이예요.

`드래그앤드롭` `Store` `모달 구현` 기능들을 다루고 있으며, 웹 컴포넌트를 사용하여 개발했습니다.  

https://user-images.githubusercontent.com/39726717/231185580-59b55363-0c53-4d39-924e-5471d069ee8e.mp4

<br />

## 개발환경

- [Javascript](https://developer.mozilla.org/ko/docs/Web/JavaScript)
- [Vite](https://vitejs-kr.github.io/guide)
- [Yarn Berry](https://yarnpkg.com/)
- [Lit](https://lit.dev/)
- [MSW](https://mswjs.io/)
- [Husky](https://typicode.github.io/husky/)

<br />

## 시작하기

```bash
$ git clone https://github.com/f-lab-edu/issue-tracker-js
```
```bash
$ yarn
```
```bash
$ yarn start
```

<br />

## 프로젝트 컨벤션

⚠️ 프로젝트 컨벤션 위키를 참고해주세요.  
[위키 바로가기](https://github.com/f-lab-edu/issue-tracker-js/wiki/01.-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%BB%A8%EB%B2%A4%EC%85%98)

<br />

## 코드리뷰
멘토님과 함께 [**코드리뷰**](https://github.com/f-lab-edu/issue-tracker-js/pulls?q=is%3Apr+is%3Aclosed)를 진행하였고,    
이슈에 프로젝트 요구사항을 순차적으로 등록하며, 진행했습니다.  
그리고 리뷰어 관점에서 코드를 이해할수 있도록 커밋을 세분화하였고 관련 내용을 정리했습니다.  

<img src='https://i.imgur.com/bX2Ux7o.png' width='500' alt='코드리뷰' />

<br />

## 드래그앤드롭

[**드래그앤드롭**](https://github.com/f-lab-edu/issue-tracker-js/blob/main/src/lib/utils/initializeDragAndDrop.js)은 `dragstart` `dragenter` `dragend` 이벤트를 활용하여 구현하였고,      
`dragenter` 이벤트로 드래그한 아이템의 위치로 **프리뷰**를 보여주고, `dragend` 이벤트로 드래그한 아이템을 드랍한 위치에 추가했습니다.  

<img src='https://user-images.githubusercontent.com/39726717/231189277-187dfaea-9d98-487b-8685-760b4397460e.gif' width='500' alt='드래그앤드롭' />

<br />

## 모달

[**모달**](https://github.com/f-lab-edu/issue-tracker-js/blob/main/src/ui/component/dialog/Dialog.js)을 React Portal과 유사한 방식으로 구현했습니다.    

prefix use를 가진 함수를 통해 모달을 생성하고,  
`open`을 통해 모달을 열고, 결과를 `Promise로` 반환하도록 구현했습니다.    
그리고 `closeOnOutsideClick` 옵션을 통해, 모달 바깥을 클릭하면 모달이 닫히도록 했습니다.    
```js
const confirm = useConfirm({ 
  message: '"할일" 컬럼을 삭제하시겠습니까?',
  closeOnOutsideClick: true,
});

const isRemoveBoardColumn = await confirm.open();
if (isRemoveBoardColumn) {
  ...code
}
```

하나의 모달이 생성 되어 있는 경우, UX관점에서 모달을 여러개 띄우는 것은 좋지 않다고 생각하여,  
모달이 열리면, 이전에 열려있던 모달은 잠시 닫히도록 구현했습니다.  

<img src='https://user-images.githubusercontent.com/39726717/231192286-1e832406-c195-430a-bff3-725790e239c7.gif' width='500' alt='모달' />

<br />

## Store

[**Store**](https://github.com/f-lab-edu/issue-tracker-js/blob/main/src/lib/store/config/store.js)는 `Observer` `Flux` 패턴을 활용하여 구현하였고,      
Page 컴포넌트에서 `Store를 구독`하고, Store의 상태가 변경되면, Page 컴포넌트가 다시 렌더링 되도록 했습니다.    

```js
class Observer {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }
}
```

```js
import Observer from './observer';

class Store extends Observer {
  constructor(reducer, initialState = {}) {
    super();
    this.state = initialState;
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.notify();
  }
}
```

<br />

Redux의 [reducer](https://github.com/f-lab-edu/issue-tracker-js/blob/main/src/lib/store/reducer/boardReducer.js)와 유사한 방식으로, `state`와 `action`을 받아 `state`를 반환하는 방식을 따랐고,      
actionType은 [Duck Patterns](https://medium.com/@matthew.holman/what-is-redux-ducks-46bcb1ad04b7)를 참고하여, `BOARD/SET_INITIAL`와 같은 형식으로 구현했습니다.  
```js
export const SET_INITIAL_BOARD_ACTION = 'BOARD/SET_INITIAL';

export const setInitialBoardAction = (payload) => ({
  type: SET_INITIAL_BOARD_ACTION,
  payload,
});

const boardReducer = (state, action) => {
  switch (action.type) {
    case SET_INITIAL_BOARD_ACTION:
      return {
        ...state,
        boards: action.payload,
      };
    default:
      return state;
  }
}
```

<br />

## MSW

[**MSW**](https://github.com/f-lab-edu/issue-tracker-js/blob/main/src/lib/mocks/api.js)를 활용하여, API를 Mocking하고, 테스트를 진행했습니다.  
Mocking 된 데이터는 API 요청을 반영하고, Store에 데이터를 연동했습니다.

<img src='https://i.imgur.com/u85XonA.png' width='500' alt='MSW' />

