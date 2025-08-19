## PEEK 프론트엔드

- domain: https://stock.peek.run

### 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm/yarn

### 프로젝트 구조

```
peek-fe/
├── app/                   # App Router 디렉토리
│   ├── (main)             # 라우트 그룹 - 메인 페이지들
│   ├── [...rest]          # 동적 라우트 - 모든 경로 캐치
│   ├── auth               # 인증 관련 페이지 (로그인, 회원가입)
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈 페이지
├── components/            # 재사용 가능한 컴포넌트
├── hooks/                 # 커스텀 React 훅
├── lib/                   # 유틸리티 함수
├── services/              # API 호출 관련 함수
├── shared/                # 공통으로 사용되는 상수, 설정, 타입
├── store/                 # 전역 상태 관리 (Jotai)
├── types/                 # TypeScript 타입 정의
├── utils/                 # 헬퍼 함수 및 유틸리티
└── public/                # 정적 파일 (이미지, 아이콘 등)
```

### 개발 환경 설정

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

### server components vs client components

![이미지](https://cdn.hashnode.com/res/hashnode/image/upload/v1714958815126/caa8efda-5fbd-4318-8eab-8e19cde5e25b.png?auto=compress,format&format=webp)

### use client

- use client가 선언되어 있다해도 html 렌더링은 서버에서 이루어지며, 클라이언트에서만 동작하는 코드가 있다면 use client를 선언해야 한다.
- hydration 유무로 use client를 판단할 수 있다.

### url

- const searchParams = useSearchParams()
  - useSearchParams 훅은 현재 URL의 쿼리 파라미터를 가져오는 데 사용됩니다. 반환된 객체를 통해 쿼리 파라미터를 읽을 수 있습니다.
- const params = useParams()
  - useParams 훅은 동적 라우트 매개변수를 가져오는 데 사용됩니다. 예를 들어, URL이 /post/[id]와 같은 동적 라우트를 포함할 때, id 값을 가져올 수 있습니다.
- const pathname = usePathname()
  - usePathname 훅은 현재 URL의 경로명을 가져오는 데 사용됩니다. 예를 들어, URL이 http://example.com/about`일 때, pathname은 /about`이 됩니다.
- const router = useRouter()
  - useRouter 훅은 Next.js의 라우터 객체를 가져오는 데 사용됩니다. 이를 통해 프로그래밍 방식으로 페이지를 이동하거나, 현재 경로 정보를 가져올 수 있습니다.
- const { device } = userAgent(request)
  - userAgent 함수는 요청 객체를 기반으로 사용자 에이전트 정보를 가져오는 데 사용됩니다. 반환된 객체에서 device 속성을 통해 사용자의 장치 정보를 확인할 수 있습니다.

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
