### use client
- use client가 선언되어 있다해도 html 렌더링은 서버에서 이루어지며, 클라이언트에서만 동작하는 코드가 있다면 use client를 선언해야 한다.
- hydration 유무로 use client를 판단할 수 있다.


```text
    Feat: 새로운 기능 추가
    Fix: 버그 수정
    Docs: 문서 수정
    Style: 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등)
    Design: 사용자 UI 디자인 변경 (CSS 등)
    Test: 테스트 코드, 리팩토링 (Test Code)
    Refactor: 리팩토링 (Production Code)
    Build: 빌드 파일 수정
    CI: CI 설정 파일 수정
    CD: CD 설정 파일 수정
    Perf: 성능 개선
    Chore: 자잘한 수정이나 빌드 업데이트
    Rename: 파일 혹은 폴더명을 수정만 한 경우
    Remove: 파일을 삭제만 한 경우
```
