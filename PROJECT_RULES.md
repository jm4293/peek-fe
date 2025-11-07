# Peek-FE 프로젝트 규칙

이 문서는 `peek-fe` 프로젝트의 코드 스타일, 구조, 주요 라이브러리 사용법에 대한 규칙을 정의합니다.

## 1. 언어 및 프레임워크

- **언어**: TypeScript
- **프레임워크**: Next.js (v15+), React (v19+)

## 2. 스타일링

- **기본**: Tailwind CSS를 사용합니다.
- **테마**: 다크 모드는 `class` 전략을 사용합니다.
- **색상**: `tailwind.config.js`에 정의된 CSS 변수(예: `var(--main-color)`)를 사용합니다.

## 3. 상태 관리

- **클라이언트 상태**: Jotai를 사용합니다.
- **서버 상태 (API 캐싱)**: TanStack React Query를 사용합니다.

## 4. 코드 스타일 및 포맷팅

- **기본 포맷터**: Prettier 설정을 엄격히 따릅니다.
  - 들여쓰기: 2칸
  - 문자열: 싱글 쿼트(`'`) 사용
  - 종결 쉼표: 항상 사용 (`trailingComma: 'all'`)
- **린터**: ESLint 설정을 따릅니다.
  - `console.log`와 같은 디버깅 코드는 커밋에 포함하지 않습니다.
- **임포트 순서**: `.prettierrc`에 정의된 순서대로 모듈을 임포트합니다. (예: `@/app` -> `@/components` -> ...)

## 5. 구조 및 명명 규칙

- **컴포넌트**: `PascalCase`로 작성합니다. (예: `MyComponent.tsx`)
- **훅**: `use` 접두사를 붙인 `camelCase`로 작성합니다. (예: `useMyHook.tsx`)
- **경로 별칭**: `tsconfig.json`에 정의된 `@/*`와 같은 경로 별칭을 적극적으로 사용합니다.
- **모듈 노출**: `components`, `hooks` 등의 폴더에서는 `index.ts` 파일을 사용해 외부에 모듈을 노출(export)합니다.

## 6. API 통신

- **HTTP 클라이언트**: Axios를 기본으로 사용합니다.
- **에러 처리**: `hooks/useApiError.tsx` 훅을 사용하여 API 요청 실패 시 일관된 에러 메시지를 처리합니다.
