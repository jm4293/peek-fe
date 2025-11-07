# Peek-FE

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

> 실시간 금융 정보 시각화 웹 애플리케이션

Peek-FE는 주식, 환율 등 다양한 금융 데이터를 사용자에게 **실시간으로 제공하고 시각화**하는 프론트엔드 프로젝트입니다. Next.js(App Router)를 기반으로 구축되었으며, 최신 웹 기술 스택을 활용하여 빠르고 인터랙티브한 사용자 경험을 제공합니다.

## 📑 목차

- [주요 기능](#-주요-기능)
- [기술 스택](#️-기술-스택)
- [시작하기](#-시작하기)
- [환경 변수 설정](#-환경-변수-설정)
- [프로젝트 구조](#-프로젝트-구조)
- [코딩 컨벤션](#-코딩-컨벤션)
- [AI 개발 도구 설정](#-ai-개발-도구-설정)
- [배포](#-배포)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)
- [작성자](#️-작성자)

## ✨ 주요 기능

### 📊 실시간 금융 데이터

- **실시간 업데이트**: Socket.IO를 활용한 실시간 주가 및 금융 데이터 스트리밍
- **한국 주식 지수**: 코스피, 코스닥 등 주요 지수 실시간 모니터링
- **환율 정보**: 주요 통화 환율 정보 제공
- **Top 10 종목**: 실시간 인기 종목 순위

### 📈 데이터 시각화

- **인터랙티브 차트**: Lightweight Charts를 활용한 전문가급 차트 제공
- **다양한 차트 타입**: 캔들스틱, 라인, 바 차트 등 다양한 형태의 시각화
- **반응형 차트**: 모든 디바이스에서 최적화된 차트 경험

### 👥 커뮤니티 기능

- **게시판**: 사용자 간 정보 공유 및 토론
- **실시간 알림**: Firebase Cloud Messaging을 통한 푸시 알림
- **문의하기**: 사용자 지원 시스템

### 🎨 사용자 경험

- **다크 모드**: 눈의 피로를 줄이는 다크/라이트 테마 전환
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 디바이스 지원
- **PWA 지원**: 앱처럼 설치 가능하며 오프라인에서도 동작
- **가상 스크롤**: 대용량 데이터의 효율적인 렌더링
- **무한 스크롤**: 끊김 없는 콘텐츠 로딩

### ⚡ 성능 최적화

- **서버 상태 관리**: TanStack React Query를 통한 스마트한 캐싱 및 재검증
- **클라이언트 상태 관리**: Jotai를 사용한 원자적 상태 관리
- **코드 스플리팅**: Next.js의 자동 코드 분할로 빠른 초기 로딩
- **이미지 최적화**: Next.js Image 컴포넌트를 활용한 자동 이미지 최적화

## 🛠️ 기술 스택

### Core

- **프레임워크**: [Next.js](https://nextjs.org/) 15.3+ (App Router)
- **언어**: [TypeScript](https://www.typescriptlang.org/) 5+
- **UI 라이브러리**: [React](https://reactjs.org/) 19+

### 스타일링

- **CSS 프레임워크**: [Tailwind CSS](https://tailwindcss.com/) 3.4
- **테마**: [next-themes](https://github.com/pacocoursey/next-themes) (다크 모드 지원)
- **아이콘**: [Lucide React](https://lucide.dev/)
- **애니메이션**: [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)

### 상태 관리

- **서버 상태**: [TanStack React Query](https://tanstack.com/query) 5.69+
- **클라이언트 상태**: [Jotai](https://jotai.org/) 2.12+

### 데이터 통신

- **HTTP 클라이언트**: [Axios](https://axios-http.com/) 1.8+
- **실시간 통신**: [Socket.IO Client](https://socket.io/) 4.8+

### 시각화 & UI

- **차트**: [Lightweight Charts](https://tradingview.github.io/lightweight-charts/) 5.0+
- **가상 스크롤**: [TanStack Virtual](https://tanstack.com/virtual) 3.13+
- **마퀴**: [React Fast Marquee](https://www.react-fast-marquee.com/) 1.6+

### 백엔드 서비스

- **인증/알림**: [Firebase](https://firebase.google.com/) 11.5+ (Authentication, Cloud Messaging)
- **분석**: Google Analytics (via @next/third-parties)

### 개발 도구

- **코드 품질**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/okonet/lint-staged)
- **PWA**: [next-pwa](https://github.com/shadowwalker/next-pwa) 5.6+

### 유틸리티

- **날짜/시간**: [Day.js](https://day.js.org/) 1.11+
- **암호화**: [crypto-js](https://github.com/brix/crypto-js) 4.2+
- **에러 처리**: [react-error-boundary](https://github.com/bvaughn/react-error-boundary) 6.0+

## 🚀 시작하기

### 전제 조건

- **Node.js**: v20 이상 (`.nvmrc` 파일 참조)
- **npm**: 최신 버전 권장

### 설치

1. **저장소 클론**

   ```bash
   git clone https://github.com/jm4293/peek-fe.git
   cd peek-fe
   ```

2. **Node.js 버전 설정** (nvm 사용 시)

   ```bash
   nvm use
   ```

3. **의존성 설치**
   ```bash
   npm install
   ```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

### 주요 스크립트

| 명령어                    | 설명                                      |
| ------------------------- | ----------------------------------------- |
| `npm run dev`             | 개발 모드로 애플리케이션을 실행합니다.    |
| `npm run build`           | 프로덕션용으로 애플리케이션을 빌드합니다. |
| `npm run start`           | 빌드된 프로덕션 서버를 실행합니다.        |
| `npm run lint`            | ESLint로 코드 스타일을 검사합니다.        |
| `npm run build-rm`        | `.next` 빌드 폴더를 삭제합니다.           |
| `npm run node_modules-rm` | `node_modules` 폴더를 삭제합니다.         |

## 🔐 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# API 서버
NEXT_PUBLIC_API_URL=your_api_server_url

# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
NEXT_PUBLIC_FIREBASE_WEB_PUSH_TOKEN=your_firebase_web_push_token

# Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS=your_google_analytics_id
```

### Firebase 설정

이 프로젝트는 Firebase를 사용하여 다음 기능을 제공합니다:

- **Cloud Messaging**: 실시간 푸시 알림
- **Analytics**: 사용자 행동 분석

Firebase 설정 방법:

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. 웹 앱 추가 및 설정 정보 복사
3. Cloud Messaging 활성화 및 Web Push 인증서 생성
4. 위 환경 변수에 설정 정보 입력

## 📁 프로젝트 구조

```
peek-fe/
├── app/                      # Next.js App Router
│   ├── (main)/              # 메인 레이아웃 그룹
│   │   ├── board/           # 게시판 페이지
│   │   ├── home/            # 홈 페이지
│   │   ├── stock/           # 주식 정보 페이지
│   │   ├── notice/          # 공지사항 페이지
│   │   ├── inquiry/         # 문의하기 페이지
│   │   └── user/            # 사용자 페이지
│   ├── auth/                # 인증 관련 페이지
│   │   ├── login/           # 로그인
│   │   ├── register/        # 회원가입
│   │   └── find/            # 계정 찾기
│   ├── privacy/             # 개인정보 처리방침
│   ├── layout.tsx           # 루트 레이아웃
│   ├── globals.css          # 전역 스타일
│   ├── Header.tsx           # 헤더 컴포넌트
│   ├── Footer.tsx           # 푸터 컴포넌트
│   └── providers.tsx        # 프로바이더 설정
│
├── components/              # 재사용 가능한 UI 컴포넌트
│   ├── button/             # 버튼 컴포넌트
│   ├── input/              # 입력 컴포넌트
│   ├── modal/              # 모달 컴포넌트
│   ├── table/              # 테이블 컴포넌트 (일반/가상화)
│   ├── chart/              # 차트 컴포넌트
│   ├── stock/              # 주식 관련 컴포넌트
│   ├── infinity-list/      # 무한 스크롤 리스트
│   ├── virtual-scroll/     # 가상 스크롤
│   └── skeleton/           # 스켈레톤 로딩
│
├── services/                # API 서비스 레이어
│   ├── auth/               # 인증 API
│   ├── board/              # 게시판 API
│   ├── stock/              # 주식 API
│   ├── currency/           # 환율 API
│   ├── user/               # 사용자 API
│   └── notice/             # 공지사항 API
│
├── hooks/                   # 커스텀 React Hooks
│   ├── useApiError.tsx     # API 에러 처리
│   ├── useDebounce.tsx     # 디바운스
│   ├── useDeviceLayout.tsx # 디바이스 레이아웃 감지
│   ├── useGlobalError.tsx  # 전역 에러 처리
│   ├── socket/             # Socket.IO 훅
│   ├── modal/              # 모달 훅
│   └── queryParams/        # URL 쿼리 파라미터 훅
│
├── lib/                     # 외부 라이브러리 설정
│   ├── axios/              # Axios 인스턴스 설정
│   ├── firebase/           # Firebase 설정
│   ├── query-provider/     # React Query 설정
│   ├── network-error/      # 네트워크 에러 처리
│   └── web-worker/         # Web Worker 설정
│
├── stores/                  # Jotai Atoms (전역 상태)
│   ├── modal.atom.ts       # 모달 상태
│   ├── toast.atom.ts       # 토스트 상태
│   └── notification-token.atom.ts  # FCM 토큰 상태
│
├── shared/                  # 공유 리소스
│   ├── types/              # TypeScript 타입 정의
│   ├── enum/               # Enum 정의
│   └── constant/           # 상수 정의
│       ├── api-url/        # API URL
│       ├── cookie/         # 쿠키 키
│       ├── query-key/      # React Query 키
│       └── error-code/     # 에러 코드
│
├── utils/                   # 유틸리티 함수
│   ├── cookie.util.ts      # 쿠키 관련
│   ├── dayjs.util.ts       # 날짜 포맷팅
│   ├── local-storage.util.ts    # 로컬 스토리지
│   ├── session-storage.util.ts  # 세션 스토리지
│   └── validation.util.ts  # 유효성 검사
│
├── public/                  # 정적 파일
│   ├── firebase-messaging-sw.js  # Firebase Service Worker
│   └── sw.js               # PWA Service Worker
│
├── middleware.ts            # Next.js 미들웨어
├── next.config.ts          # Next.js 설정
├── tailwind.config.js      # Tailwind CSS 설정
├── tsconfig.json           # TypeScript 설정
├── eslint.config.mjs       # ESLint 설정
├── amplify.yml             # AWS Amplify 배포 설정
├── .clinerules             # AI 코딩 어시스턴트 규칙 (Cline/Claude)
├── PROJECT_RULES.md        # 프로젝트 코딩 규칙
└── README.md               # 프로젝트 문서
```

### 주요 디렉토리 설명

- **`app/`**: Next.js 13+ App Router를 사용한 페이지 및 레이아웃. 파일 시스템 기반 라우팅을 따릅니다.
- **`components/`**: 재사용 가능한 UI 컴포넌트들. 각 폴더는 `index.ts`를 통해 외부에 노출됩니다.
- **`services/`**: API 호출을 담당하는 서비스 레이어. React Query와 함께 사용됩니다.
- **`hooks/`**: 커스텀 훅을 통한 로직 재사용 및 관심사 분리.
- **`lib/`**: 외부 라이브러리 초기화 및 설정.
- **`stores/`**: Jotai atoms를 사용한 전역 상태 관리.
- **`shared/`**: 타입, 상수, enum 등 프로젝트 전반에서 공유되는 리소스.
- **`utils/`**: 순수 함수 형태의 유틸리티 모음.

## 📝 코딩 컨벤션

본 프로젝트는 일관된 코드 품질과 가독성을 위해 엄격한 코딩 규칙을 따릅니다.
자세한 내용은 **[PROJECT_RULES.md](./PROJECT_RULES.md)** 문서를 참고하세요.

### 주요 규칙

#### 스타일링

- **CSS 프레임워크**: Tailwind CSS와 CSS 변수 사용
- **테마**: `class` 전략을 사용한 다크 모드
- **색상**: `tailwind.config.js`에 정의된 CSS 변수 활용 (예: `var(--main-color)`)

#### 상태 관리

- **서버 상태**: TanStack React Query 사용 (API 데이터 캐싱 및 동기화)
- **클라이언트 상태**: Jotai 사용 (UI 상태 관리)

#### 코드 스타일

- **포맷터**: Prettier 설정 준수
  - 들여쓰기: 2칸
  - 문자열: 싱글 쿼트(`'`) 사용
  - 종결 쉼표: 항상 사용 (`trailingComma: 'all'`)
- **린터**: ESLint 규칙 준수
- **임포트 순서**: `@trivago/prettier-plugin-sort-imports`에 따라 자동 정렬

#### 명명 규칙

- **컴포넌트**: `PascalCase` (예: `MyComponent.tsx`)
- **훅**: `camelCase` with `use` prefix (예: `useMyHook.tsx`)
- **상수**: `UPPER_SNAKE_CASE` (예: `API_BASE_URL`)
- **타입/인터페이스**: `PascalCase` (예: `UserProfile`)

#### 경로 별칭

`tsconfig.json`에 정의된 경로 별칭을 적극 활용:

```typescript
import { useApiError } from '@/hooks';

import { Button } from '@/components/button';

import { API_URL } from '@/shared/constant/api-url';
```

#### 모듈 내보내기

각 폴더의 `index.ts` 파일을 통해 모듈을 외부에 노출:

```typescript
// components/button/index.ts
export { Button } from './Button';
export { ShareButton } from './ShareButton';
```

#### Git Commit

- Husky와 lint-staged를 통한 커밋 전 자동 린팅
- 디버깅 코드(`console.log` 등)는 커밋하지 않음

## 🤖 AI 개발 도구 설정

이 프로젝트는 AI 코딩 어시스턴트를 위한 규칙 파일을 포함하고 있어, 일관된 코드 생성과 프로젝트 규칙 준수를 자동화합니다.

### Cline (Claude Dev) - VS Code 확장

프로젝트 루트의 **`.clinerules`** 파일이 자동으로 적용됩니다.

**지원 기능:**

- ✅ 프로젝트 구조 및 아키텍처 자동 인식
- ✅ 코딩 컨벤션 및 스타일 가이드 자동 적용
- ✅ 경로 별칭, 명명 규칙 등 프로젝트 규칙 준수
- ✅ TypeScript, React, Next.js 베스트 프랙티스 적용
- ✅ 컴포넌트, 훅, API 서비스 패턴 자동 생성

**사용 방법:**

1. VS Code에서 [Cline 확장](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) 설치
2. 프로젝트 열기 (`.clinerules` 파일이 자동으로 로드됨)
3. Cline 채팅에서 코드 작성/수정 요청
4. AI가 프로젝트 규칙에 맞는 코드를 자동 생성

**예시:**

```
"새로운 주식 상세 페이지 컴포넌트를 만들어줘"
→ Next.js App Router 구조, TypeScript 타입, Tailwind CSS, React Query 패턴 등이 자동 적용됨
```

### 다른 AI 도구 지원

필요에 따라 다음 파일들을 추가하여 다른 AI 도구에서도 사용할 수 있습니다:

| AI 도구            | 설정 파일                         | 설명                                  |
| ------------------ | --------------------------------- | ------------------------------------- |
| **GitHub Copilot** | `.github/copilot-instructions.md` | GitHub Copilot 코드 제안 커스터마이징 |
| **Cursor**         | `.cursorrules`                    | Cursor IDE AI 동작 제어               |
| **Windsurf**       | `.windsurfrules`                  | Windsurf IDE AI 규칙                  |

**참고:** 현재 프로젝트는 `.clinerules`만 포함하고 있으며, 필요시 추가 설정 파일을 생성할 수 있습니다.

## 🚀 배포

이 프로젝트는 **AWS Amplify**를 통해 배포됩니다.

### 배포 설정

배포 설정은 `amplify.yml` 파일에 정의되어 있습니다:

- **Node.js 버전**: 20 (nvm 사용)
- **빌드 명령**: `npm run build`
- **빌드 결과물**: `.next` 폴더

### 배포 프로세스

1. **자동 배포**: `main` 브랜치에 푸시 시 자동으로 배포됩니다.
2. **프리뷰 배포**: Pull Request 생성 시 미리보기 환경이 자동으로 생성됩니다.

### 환경 변수

AWS Amplify 콘솔에서 환경 변수를 설정해야 합니다:

- 모든 `NEXT_PUBLIC_*` 환경 변수를 Amplify 환경 변수로 추가
- 각 배포 환경(production, staging 등)별로 별도 설정 가능

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면 다음 단계를 따라주세요:

1. **Fork** 저장소를 포크합니다.
2. **Branch** 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. **Commit** 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. **Push** 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`)
5. **Pull Request** Pull Request를 생성합니다

### 기여 가이드라인

- 코드 작성 전 `PROJECT_RULES.md`를 숙지해주세요
- 커밋 전에 `npm run lint`로 코드 스타일을 확인하세요
- 새로운 기능 추가 시 관련 문서를 업데이트해주세요
- Pull Request 작성 시 변경사항을 명확히 설명해주세요

## 📄 라이선스

이 프로젝트는 비공개 프로젝트입니다.

## ✍️ 작성자

**jm4293**

- GitHub: [@jm4293](https://github.com/jm4293)

---

<div align="center">
  Made with ❤️ by jm4293
</div>
