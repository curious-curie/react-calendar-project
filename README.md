# React-Calendar 

## 구현 기능

### 일정 View - Monthly

- React Big Calendar 라이브러리 사용
- 해당 스케줄 선택 시 상세보기 페이지로 이동

### 일정 View - List

- 모든 날짜 보기 / 일정 있는 날짜만 보기 toggle 가능
- 항목별 정보 표시 - 시간, 타이틀, 라벨
- 해당 스케줄 선택 시 상세보기 페이지로 이동
- Intersection Observer 활용한 무한스크롤
- 상단 탭 사용하여 monthly / list 전환
- 빈 날짜의 새 일정 만들기 선택하는 경우, create schedule page로 이동
  - date를 query param으로 넘겨 해당 날짜가 preselect 되어 있도록 구현함
  - [http://localhost:3000/new?date=2020-07-02](http://localhost:3000/new?date=2020-07-02)

### 레이블 별 스케줄 필터링

- store에 label 모듈 선언하여 전역적으로 관리
- Monthly / List 뷰에서 일괄적으로 필터링 및 상태 유지 가능

### 일정 아이템 CRUD

```jsx
// schedule item fields
{
	id: 1
	allDay: false // 종일 여부
	start: Mon Jul 13 2020 16:36:00 GMT+0900 (대한민국 표준시)
	// 시작 시간
	end: Mon Jul 13 2020 20:36:00 GMT+0900 (대한민국 표준시)
	// 종료 시간
	label: {id: 1, title: "기본", visible: true}
	// 레이블
	title: "집들이"
	memo: "우리집 집들이날! 참가비 50만원"
	repeated: false // 반복 여부
	repeatRule: [RRule.DAILY / RRule.WEEKLY ...] // 반복 시 반복 주기
	reservation: "9" // 회의실 예약 object의 id
}
```

### - 일정 생성

- 시작-종료 시간 설정
  - material ui date-time picker 활용
  - 현재 시간으로 prefill 되어있음
  - 체크박스 활용하여 종일/ 시간 설정 여부 toggle
- 레이블 설정
  - 현재 있는 레이블 중 선택 가능
  - 현 화면에서 **레이블 선택, 추가, 삭제** 가능
- 반복 여부 및 반복 주기 설정
  - 매일/매주/매월/매년/매 주중/매 주말 중 선택 가능
- 회의실 연동
  - **당일 일정에 한하여 회의실 예약 기능과 연동할 수 있게 구현**
  - 회의실 예약 Modal 띄워지고, 해당 날짜에 가능한 time slot 선택하여 예약 가능
- 일정 생성 시 validation
  - 필수 입력 필드 (title, start, end) 입력 하지 않은 경우 생성 불가하며, 해당 항목에 빨갛게 표시
  - start date가 end date 보다 늦은 경우에도 생성 불가
  - 일정 생성 시, 시작-끝 사이 날짜들 중 일정이 100개 넘는 날짜가 있는 경우 생성 불가능

<!-- <img src="README%2041700353855341c2b0feb0edea353d9d/Untitled.png" alt="README%2041700353855341c2b0feb0edea353d9d/Untitled.png" style="zoom: 50%;" /> -->

<!-- <img src="README%2041700353855341c2b0feb0edea353d9d/Untitled%201.png" alt="README%2041700353855341c2b0feb0edea353d9d/Untitled%201.png" style="zoom:50%;" /> -->

- 레이블 추가 버튼 누른 경우

### - 일정 Detail Page

- 일정 세부사항 보기

  - 반복 여부, 회의실 예약 정보도 표시

- 수정, 삭제 기능

  - 수정 시엔 기존 데이터가 prefill 되어있음

    <!-- <img src="README%2041700353855341c2b0feb0edea353d9d/Untitled%202.png" alt="README%2041700353855341c2b0feb0edea353d9d/Untitled%202.png" style="zoom:50%;" /><img src="/Users/user/Library/Application Support/typora-user-images/image-20200713191856980.png" alt="image-20200713191856980" style="zoom:50%;" /> -->

### 일정 검색

- 일정의 제목이나 메모에 해당 검색어가 포함되는 경우, 해당 일정 표시

<img src="https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d5767ff3-1a7b-4952-8581-1572c685d777/Untitled.png" width="30%">

### 회의실 예약 기능

- 당일 일정인 경우, 회의실 예약 가능
- time slot 선택 시 붉은 색으로 표시
- 10-19시 사이 30분 단위로 slot 선택
- 이미 해당 딴 회의가 잡혀있는 경우 선택 불가능 (회색)
- 일정의 시작 시간과 끝 시간 사이에서 빈 slot들만 선택 가능
  - 예를 들어, 일정이 11:35분부터 시작인 경우 11:30 - 12:00 slot은 선택 불가 (12:00 slot부터 선택 가능)
  - 전체 선택 버튼 클릭 시 해당 회의실에 가능한 시간 모두 선택됨

```jsx
// reservation object
{
  date: '2020-07-15';
  id: '38';
  room: 3; // 회의실 index
  scheduleId: 122; // linked된 schedule의 id
  time: ['15:00', '15:30', '16:00', '16:30']; // selected time slot
}
```

<!-- <img src="README%2041700353855341c2b0feb0edea353d9d/Untitled%204.png" alt="README%2041700353855341c2b0feb0edea353d9d/Untitled%204.png" style="zoom:50%;" /> -->

### 회의실 예약 현황 페이지

- 회의실 예약이 있는 날짜별로 회의실 예약 현황 조회 가능
- 해당 예약 항목 선택 시 연동된 일정 detail 페이지로 이동
  - 일정 수정 시에 회의실 예약도 함께 수정 가능

<!-- <img src="README%2041700353855341c2b0feb0edea353d9d/Untitled%205.png" alt="README%2041700353855341c2b0feb0edea353d9d/Untitled%205.png" style="zoom:50%;" /> -->

### 아쉬운 점

- 더 다양한 라이브러리 사전 조사를 하지 못한 점
- 리스트 렌더링 시 배열 형태 변경하는 것 말고 다른 방식을 구현해보지 못한 점, 더 효율적인 방식으로 구현하지 못한 점
  - 스크롤로 날짜 범위 늘어날 경우 데이터 통째로 재가공하는게 아니라 추가되는 부분만 append하는 방식으로 개선했으나 지금 방식도 비효율적인 것 같음
  - 아마 라이브러리를 사용하여 하는 방법을 연구해야했지 않을까...
- 리팩토링 미흡
  - 반복되는 코드 정리
  - 복잡한 코드 간결하게 바꾸기
- 최적화 방법에 대해 더 고민
  - useCallback, useMemo 등을 적재적소에 (필요한 곳에) 사용하기 위한 기준에 대해 더 고민해봐야 할 듯
  - 다른 최적화 방법도 더 공부해야겠다
- 추가기능 관련
  - 반복 기능에서의 customize 기능 미흡
    - 종료기간, 반복 주기 설정
  - 회의실 관련 구현하지 못한 부분
    - 현재는 당일 일정만 가능
    - 반복일정이나 여러 일짜리 일정에 연동 X
    - 일정과 연동하지 않고 회의실 예약만 할 수 있게 못했음

## Notes

### Intersection Observer를 사용한 무한 스크롤 구현

- 타겟 엘레멘트와 타겟의 부모 혹은 상위 엘레멘트의 뷰포트가 교차되는 부분을 비동기적으로 관찰하는 API ⇒ 결국 타겟 element가 화면에 노출되었는지 여부 구독하는 방법

- window.addEventListener을 이용한 스크롤 이벤트 구현할 때의 비효율성을 어느 정도 해결해준다.

  1. 호출 수 제한 방법 debounce, throttle을 사용하지 않아도 된다.

  event listener 사용 시 `debounce`와 `throttle` 사용하여 스크롤 이벤트로 인해 발생하는 불필요한 함수 호출 수를 컨트롤할 필요가 있음.

  2. reflow를 하지 않는다.

  스크롤 이벤트에서는 현재의 높이 값을 알기 위해`offsetTop` 을 사용하는데 정확한 값을 가져오기 위해 매번 layout을 새로 그리게 된다.

  ⇒ 렌더 트리를 재생성 하는 것이기 때문에 브라우저 성능 저하

- Intersection Observer 객체 생성 시 target element와 화면에 노출될 경우 실행할 call back function 전달. Callback function에서 전달받은 entries 배열 확인하면서 , isIntersecting으로 노출 여부를 확인하여 실행하고자 하는 동작을 실행하는 식으로 구현함

### 데이터 브라우저 저장 방식: persist-redux을 사용하여 state를 localStorage에 저장

브라우저에 데이터를 저장하는 방식엔 대표적으로 cookie, sessionStorage, localStorage

이 프로젝트에 필요한 조건으로는

1. 브라우저를 닫거나 새로고침을 해도 데이터가 유지되어야 하며

2. store 내의 모든 데이터를 저장할 만큼 충분한 크기여야 함

sessionStorage는 영구적이지 않으므로 탈락

persistent cookie를 사용하면 만료기한을 지정하여 그 기한까지 영구적으로 브라우저에 캐싱할 수 있지만, 용량 면에서 localStorage가 압도적

쿠키는 약 4KB, 로컬 스토리지는 약 5MB의 정보를 저장 가능

훨씬 용량이 큰 indexedDB의 사용도 고려해보았으나, 개인용 달력이며, 일정의 일별 개수 제한도 있기 때문에 로컬스토리지의 용량이 부족하지 않을 것이라고 판단함

( [http://mcgivery.com/localstorage-how-much-is-5mb/](http://mcgivery.com/localstorage-how-much-is-5mb/) 를 참고함 )

처음엔 state를 initiate 할 때에 localStorage.getItem을 이용하고, reducer내에서 state의 변환이 일어날 때 마다 바뀐 값들을 (e.g. 일정이 삭제된 경우 그 일정을 삭제하고 남은 일정 array)를 localStorage.setItem('schedule', JSON.stringify(newSchedule)) 이와 같은 방식으로 저장하는 방식을 생각함

그러나 reducer 내에서 store state와 관련된 작업 이외의 작업을 수행하는 것 자체가 side effect라고 볼 수도 있어 본질을 해치는 것 같았고, state를 변경시키는 모든 작업들마다 localStorage에 저장하기 위해 사이즈가 꽤 클 수 있는 데이터들을 stringify 및 setItem 하는 것이 무겁게 느껴짐.

따라서 redux-persist 라이브러리를 사용하여 localStorage에 state 데이터를 저장함. persist를 통해 localStorage에 상태값을 저장하고, 재접속시에 rehydrate를 통해 저장되어있던 state를 불러오는 형태

### Selector ⇒ Redux 성능 개선

reselect의 selector 적용하여 스토어 state의 computed value 연산함

applied filter에 따라 필터링 된 일정들을 또 다른 state 내의 property로 저장할 필요는 없다고 생각했고, useMemo를 사용해서 컴포넌트 안에서만 필터 적용하는게 아니라 뷰 바뀌는 것에 상관 없이 전역적으로 store에서 바로 가져오는 식으로 구현, 컴포넌트 단에서 연산 최소화하여 사용하고 싶었음

memoized selector ⇒ 함수 호출 시 매개변수의 값이 이전과 같으면 다시 계산하지 않음

즉 파라미터로 주는 배열 내의 값들이 바뀌지 않으면 연산 작업을 다시 수행하지 않는다

createSelector 이용하여 filteredSchedules, mergedSchedules (repeated Schedule을 따로 관리하기 때문에 반복일정과 그냥 일정을 병합시킬 필요 있었음), id에 따라 schedule 가져오는 것 구현함

### 반복 일정 구현

react-big-calendar 조사 결과 반복 일정에 대한 Display 기능은 제공하지 않고, 찾아보니 커스텀하게 데이터 단에서 처리해야 한다는 owner의 피드백이 있어서 반복 일정을 create할 때 반복되는 object들을 모두 생성하는 식으로 구현해야 했음

그러나 많은 일정들을 기한 없이 (혹은 막 2090년...) 한꺼번에 생성하는것이 비효율적이라고 판단하여 state에 마지막으로 생성되는 날짜를 저장한 후 (=> repeatEnd 변수에 날짜 저장, 초깃값은 현재 년도의 마지막날), 유저가 그 날짜 이후의 스케줄을 조회하려고 할 때 (리스트 뷰에서 스크롤을 그 아래로 넘긴다던가 달력을 그 이후로 넘길 때) repeatEnd를 1년 단위로 업데이트 한 후 그 날짜까지의 반복 일정을 생성하여 append 하는 식으로 구현함

반복 일정 생성 시에 id는 `${originalId}-${index}` 의 형태이며, 상세 페이지를 조회할 때는 원래 일정 페이지로 이동함

반복 일정은 state에 저장 시에도 schedules가 아닌 repeatedSchedules에 따로 저장하여, 수정, 삭제 작업을 한꺼번에 편하게 할 수 있도록 했음

key-value 형태로 { [originalId]: [ array of repeated schedules ] } 형태로 저장. 원래 일정을 수정, 삭제 시에 그 일정이 반복 일정이면 repeatedSchedules[scheduleId]에서 반복 일정들을 가져와서 반복 일정들도 한꺼번에 수정, 삭제함
