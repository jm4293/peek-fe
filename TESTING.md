# 테스트 가이드

> peek-fe 프로젝트의 테스트 작성 및 실행 가이드

## 📋 목차

- [테스트 스택](#테스트-스택)
- [빠른 시작](#빠른-시작)
- [테스트 실행 방법](#테스트-실행-방법)
- [테스트 작성 가이드](#테스트-작성-가이드)
- [프로젝트 구조](#프로젝트-구조)
- [베스트 프랙티스](#베스트-프랙티스)
- [트러블슈팅](#트러블슈팅)

---

## 🛠 테스트 스택

### 테스트 프레임워크

- **[Vitest](https://vitest.dev/)** - 빠른 유닛 테스트 프레임워크
- **[React Testing Library](https://testing-library.com/react)** - React 컴포넌트 테스팅

### 주요 라이브러리

- `@testing-library/react` - React 컴포넌트 렌더링 및 쿼리
- `@testing-library/jest-dom` - DOM matcher 확장 (toBeInTheDocument 등)
- `@testing-library/user-event` - 사용자 이벤트 시뮬레이션
- `jsdom` - 브라우저 환경 시뮬레이션
- `@vitejs/plugin-react` - React 컴포넌트 변환

---

## 🚀 빠른 시작

### 1. 의존성 설치 (이미 완료)

```bash
npm install
```

### 2. 첫 테스트 실행

```bash
# 모든 테스트 실행
npm test -- --project=unit --run

# Watch 모드 (파일 변경 시 자동 재실행)
npm test -- --project=unit

# UI 모드 (브라우저에서 시각적으로 확인)
npm run test:ui

# 커버리지 확인
npm run test:coverage
```

---

## 📦 테스트 실행 방법

### 기본 명령어

| 명령어                             | 설명                  | 사용 시기         |
| ---------------------------------- | --------------------- | ----------------- |
| `npm test -- --project=unit --run` | 모든 유닛 테스트 실행 | 커밋 전, CI/CD    |
| `npm test -- --project=unit`       | Watch 모드 실행       | 개발 중           |
| `npm run test:ui`                  | UI 모드 실행          | 디버깅, 상세 확인 |
| `npm run test:coverage`            | 커버리지 리포트 생성  | 품질 확인         |

### 특정 파일/패턴 테스트

```bash
# 특정 파일만 테스트
npm test -- components/text/Text.test.tsx --run

# 특정 폴더의 모든 테스트
npm test -- components/button/ --run

# 파일명 패턴으로 테스트
npm test -- --project=unit *.test.tsx --run
```

### 테스트 필터링

```bash
# 특정 describe/it 이름으로 필터링
npm test -- --project=unit -t "기본 렌더링"

# 실패한 테스트만 재실행
npm test -- --project=unit --run --reporter=verbose --bail
```

---

## 📝 테스트 작성 가이드

### 파일 위치 및 네이밍

```
components/
  button/
    Button.tsx          # 컴포넌트
    Button.test.tsx     # 테스트 파일 (같은 폴더)

utils/
  format.ts
  format.test.ts        # 유틸리티 테스트

hooks/
  useDebounce.tsx
  useDebounce.test.tsx  # 훅 테스트
```

**네이밍 규칙**:

- 테스트 파일: `*.test.tsx` 또는 `*.test.ts`
- 컴포넌트와 같은 폴더에 위치
- `*.spec.*` 형식도 지원하지만 `.test.*` 권장

### 기본 테스트 구조

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  it('기본 렌더링을 확인한다', () => {
    render(<YourComponent />);
    expect(screen.getByText('예상 텍스트')).toBeInTheDocument();
  });

  it('props를 올바르게 처리한다', () => {
    render(<YourComponent title="테스트" />);
    expect(screen.getByRole('heading')).toHaveTextContent('테스트');
  });

  it('사용자 이벤트를 처리한다', async () => {
    const handleClick = vi.fn();
    render(<YourComponent onClick={handleClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 컴포넌트 테스트 체크리스트

✅ **렌더링**

- [ ] 기본 렌더링 확인
- [ ] 조건부 렌더링 확인
- [ ] 빈 상태/로딩 상태 확인

✅ **Props**

- [ ] 필수 props 검증
- [ ] 선택적 props 기본값 확인
- [ ] Props 변경 시 동작 확인

✅ **스타일/클래스**

- [ ] 기본 클래스 적용 확인
- [ ] 조건부 클래스 적용 확인
- [ ] 커스텀 className 병합 확인

✅ **이벤트**

- [ ] 클릭/입력 등 이벤트 핸들러 동작
- [ ] 이벤트 전파 확인
- [ ] 이벤트 데이터 확인

✅ **접근성**

- [ ] 적절한 role 속성
- [ ] aria-label 등 접근성 속성
- [ ] 키보드 네비게이션

---

## 🗂 프로젝트 구조

```
peek-fe/
├── vitest.config.ts          # Vitest 설정
├── vitest.setup.ts            # 테스트 환경 설정 (jest-dom)
├── package.json               # 테스트 스크립트
│
├── components/
│   ├── text/
│   │   ├── Text.tsx
│   │   └── Text.test.tsx      # ✅ 26개 테스트 작성 완료
│   │
│   └── button/
│       ├── Button.tsx
│       └── Button.test.tsx    # TODO: 작성 필요
│
├── hooks/
│   └── useDebounce.tsx
│       └── useDebounce.test.tsx
│
└── utils/
    └── validation.util.ts
        └── validation.test.ts
```

---

## 💡 베스트 프랙티스

### 1. Testing Library 쿼리 우선순위

```typescript
// ✅ 좋은 예: 접근성 기반 쿼리 사용
screen.getByRole('button', { name: '제출' });
screen.getByLabelText('이메일');
screen.getByText('환영합니다');

// ⚠️ 피해야 할 예: 구현 세부사항에 의존
screen.getByTestId('submit-button'); // 최후의 수단
container.querySelector('.button'); // 사용 금지
```

**쿼리 우선순위**:

1. `getByRole` - 접근성 기반 (가장 권장)
2. `getByLabelText` - 폼 요소
3. `getByPlaceholderText` - 입력 필드
4. `getByText` - 텍스트 내용
5. `getByDisplayValue` - 현재 값
6. `getByAltText` - 이미지
7. `getByTitle` - title 속성
8. `getByTestId` - 최후의 수단

### 2. 비동기 처리

```typescript
// ✅ 좋은 예: waitFor 사용
import { waitFor } from '@testing-library/react';

it('비동기 데이터를 렌더링한다', async () => {
  render(<AsyncComponent />);

  await waitFor(() => {
    expect(screen.getByText('로딩 완료')).toBeInTheDocument();
  });
});

// ✅ 좋은 예: findBy 쿼리 (자동 대기)
const element = await screen.findByText('로딩 완료');
expect(element).toBeInTheDocument();
```

### 3. Mock 사용

```typescript
import { vi } from 'vitest';

// 함수 Mock
const mockFn = vi.fn();
mockFn.mockReturnValue('결과');
mockFn.mockResolvedValue('비동기 결과');

// 모듈 Mock
vi.mock('./api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'test' })),
}));

// 타이머 Mock
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();
```

### 4. 테스트 격리

```typescript
import { afterEach, beforeEach } from 'vitest';

describe('MyComponent', () => {
  beforeEach(() => {
    // 각 테스트 전 실행
    localStorage.clear();
  });

  afterEach(() => {
    // 각 테스트 후 실행
    vi.clearAllMocks();
  });

  it('테스트 1', () => {
    // 독립적으로 실행
  });

  it('테스트 2', () => {
    // 다른 테스트에 영향 없음
  });
});
```

### 5. 의미 있는 테스트 이름

```typescript
// ✅ 좋은 예: 명확하고 구체적
it('로그인 버튼 클릭 시 API를 호출한다', () => {});
it('이메일이 유효하지 않으면 에러 메시지를 표시한다', () => {});

// ❌ 나쁜 예: 모호함
it('works', () => {});
it('test button', () => {});
```

---

## 🎯 커버리지 목표

현재 목표: **80% 이상**

### 커버리지 확인 방법

```bash
npm run test:coverage
```

### 결과 예시

```
File              | % Stmts | % Branch | % Funcs | % Lines |
------------------|---------|----------|---------|---------|
components/text/  |         |          |         |         |
  Text.tsx        |  100.00 |   100.00 |  100.00 |  100.00 | ✅
components/button/|         |          |         |         |
  Button.tsx      |   75.00 |   50.00  |   80.00 |   75.00 | ⚠️
------------------|---------|----------|---------|---------|
All files         |   87.50 |   75.00  |   90.00 |   87.50 | ✅
```

### HTML 리포트

```bash
# 커버리지 실행 후
open coverage/index.html  # macOS
```

- 빨간색 라인: 테스트되지 않은 코드
- 노란색 라인: 부분적으로 테스트된 코드
- 초록색 라인: 완전히 테스트된 코드

---

## 🔍 트러블슈팅

### 1. "React is not defined" 에러

**해결**: 테스트 파일과 컴포넌트 파일에 React import 추가

```typescript
// 추가
import { render } from '@testing-library/react';
import React from 'react';
```

### 2. "Cannot find module" 에러

**원인**: 경로 alias 설정 문제

**해결**: `vitest.config.ts`에서 alias 확인

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './'),
  },
}
```

### 3. 테스트가 느린 경우

**해결 방법**:

- 불필요한 `waitFor` 제거
- `findBy` 쿼리 사용 (자동 대기)
- 병렬 실행 활용

```bash
# 병렬 실행 (기본값)
npm test -- --project=unit --run

# 순차 실행 (디버깅 시)
npm test -- --project=unit --run --no-threads
```

### 4. Storybook 테스트 충돌

**현재 설정**:

- `unit` 프로젝트: 일반 유닛 테스트 (`*.test.*`)
- `storybook` 프로젝트: Storybook 테스트 (자동)

**분리 실행**:

```bash
# 유닛 테스트만
npm test -- --project=unit --run

# Storybook 테스트만
npm test -- --project=storybook --run
```

---

## 📚 참고 자료

### 공식 문서

- [Vitest 공식 문서](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)

### 유용한 가이드

- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

## 🤝 기여하기

새로운 컴포넌트/유틸리티를 추가할 때:

1. ✅ 테스트 파일 함께 작성
2. ✅ 최소 80% 커버리지 달성
3. ✅ 모든 테스트 통과 확인
4. ✅ 커밋 전 `npm test -- --project=unit --run` 실행

---

## 📊 현재 테스트 현황

| 파일                           | 테스트 수 | 커버리지 | 상태    |
| ------------------------------ | --------- | -------- | ------- |
| `components/text/Text.tsx`     | 26        | 100%     | ✅ 완료 |
| `components/button/Button.tsx` | -         | -        | 📝 TODO |
| `hooks/useDebounce.tsx`        | -         | -        | 📝 TODO |

**전체 진행률**: 🟩🟩⬜⬜⬜ 40%

---

마지막 업데이트: 2025년 11월 11일
