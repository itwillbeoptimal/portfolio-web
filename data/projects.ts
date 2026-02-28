export interface ProjectDetail {
  title: string;
  problem: string;
  solution: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  url: string;
  images: string[];
  details: ProjectDetail[];
}

export const projects: Project[] = [
  {
    id: 'tic-tac-talk',
    index: '01',
    title: '틱택톡',
    subtitle: '생성형 AI와 RAG를 활용한 논쟁 분석 서비스',
    description:
      '음성 대화, 채팅을 AI가 분석해 객관적인 레포트로 제공하는 서비스입니다. 대화가 종료된 후 제공되는 레포트를 통해 사용자는 자신의 논리와 대화 흐름을 되돌아볼 수 있습니다.',
    tags: [
      'TypeScript',
      'React',
      'Vite',
      'TanStack Query',
      'Jotai',
      'Web Audio API',
      'STOMP',
    ],
    year: '2025',
    url: 'https://github.com/tic-tac-talk/tic-tac-talk-frontend',
    images: [
      '/tic-tac-talk/0.jpg',
      '/tic-tac-talk/1.jpg',
      '/tic-tac-talk/2.jpg',
      '/tic-tac-talk/3.jpg',
      '/tic-tac-talk/4.jpg',
      '/tic-tac-talk/5.jpg',
      '/tic-tac-talk/6.jpg',
      '/tic-tac-talk/7.jpg',
      '/tic-tac-talk/8.jpg',
      '/tic-tac-talk/9.jpg',
      '/tic-tac-talk/10.jpg',
      '/tic-tac-talk/11.jpg',
    ],
    details: [
      {
        title: 'Web Audio API 기반 실시간 음성 시각화',
        problem:
          '음성 녹음 중 마이크가 정상 동작하는지, 목소리 크기가 어느 정도인지 시각적 피드백이 없어 사용자가 불편함을 느낄 수 있었습니다.',
        solution:
          '`MediaStream`을 `AudioContext`에 연결하고 `AnalyserNode`를 생성해 일정 주기마다 `getByteFrequencyData`로 주파수 에너지를 추출했습니다. 분석값을 데시벨 기반 수치로 변환해 볼륨 UI에 실시간 반영함으로써, 녹음 중 불확실성을 해소했습니다.',
      },
      {
        title: 'WebAssembly 기반 클라이언트 사이드 오디오 프로세싱',
        problem:
          '브라우저 기본 녹음 포맷(WebM)은 일부 환경에서 재생 호환성이 떨어졌고, 서버 매번 포맷 변환 시 CPU 리소스와 업로드 대역폭 낭비가 발생했습니다.',
        solution:
          'FFmpeg를 WebAssembly로 포팅한 `@ffmpeg/ffmpeg`를 사용해, 녹음된 오디오 `Blob`을 브라우저 메모리 상에서 즉시 MP3로 변환한 후 업로드하도록 구현했습니다. 서버 인코딩 부하를 줄이고 다양한 환경에서의 재생 호환성 문제를 클라이언트 단에서 해결했습니다.',
      },
      {
        title: 'JWT 인증 동시성 제어',
        problem:
          'Access Token 만료 시 여러 API 요청이 동시에 발생하면 중복 토큰 갱신 요청이 서버로 전송되거나, 갱신 도중 발생한 요청들이 실패 및 유실되는 문제가 있었습니다. 또한 서버에서 전달되는 64비트 정수 ID가 브라우저에서 정밀도 손실로 변형되는 이슈도 있었습니다.',
        solution:
          'Axios Interceptor 기반 요청 큐 구조를 도입해 `401` 에러 감지 시 `isTokenRefreshing` 플래그를 활성화하고, 이후 요청을 큐에 적재했습니다. 갱신 완료 후 대기 요청을 순차 재실행하도록 처리했습니다. ID 정밀도 문제는 `json-bigint`의 `transformResponse`를 활용해 해결했습니다.',
      },
      {
        title: 'WebSocket 서비스 추상화 설계',
        problem:
          '채팅 WebSocket과 레포트 알림 WebSocket은 STOMP 연결 · 재연결 · 메시지 처리는 같았지만, 구독 토픽과 퍼블리시 로직이 달랐습니다. 개별 구현으로 유지하면 공통 로직 중복과 유지보수 비용이 증가할 수 있었습니다.',
        solution:
          '공통 인프라 로직을 `BaseWebSocketService` 추상 클래스로 분리하고, `subscribeToTopics()`를 추상 메서드로 정의해 각 서비스가 구독 토픽을 반드시 명시하도록 강제했습니다. 새로운 WebSocket 엔드포인트 추가 시 공통 인프라는 유지한 채 구독 로직만 구현하면 되는 구조가 됐습니다.',
      },
      {
        title: '웹 성능 최적화 및 폰트 렌더링',
        problem:
          '초기 로딩 시 미사용 리소스까지 한 번에 로드되면서 TTI가 지연됐고, 폰트 로딩 지연으로 텍스트가 깜빡이는 FOIT 현상이 발생했습니다.',
        solution:
          '`React.lazy`와 `Suspense`로 라우트 기반 코드 스플리팅을 적용했습니다. 타이머 전용 폰트(818KB)는 실제 사용 문자(숫자, 콜론)만 `glyphhanger`로 서브셋을 제작하여 9.4KB로 줄이고, Recording 페이지 진입 시에만 preload하도록 전략을 재설계했습니다.',
      },
    ],
  },
  {
    id: 'jamjam',
    index: '02',
    title: '잼잼',
    subtitle: '생성형 AI 기반 아웃소싱 플랫폼',
    description:
      '디지털 기기 사용이 낯선 시니어가 자신의 능력을 서비스로 개설하고 판매할 수 있도록 돕는 아웃소싱 플랫폼입니다. 서비스 등록 및 관리, 검색 및 전문가 선택, 의뢰 요청과 수락 · 거절, 주문 진행 현황 확인, 결제 및 정산까지 외주 과정 전반을 지원합니다.',
    tags: [
      'TypeScript',
      'React',
      'Vite',
      'TanStack Query',
      'Jotai',
      'React Hook Form',
      'Zod',
      'STOMP',
    ],
    year: '2025',
    url: 'https://github.com/yes-country-for-old-men/JamJam-frontend',
    images: [
      '/jamjam/0.jpg',
      '/jamjam/1.jpg',
      '/jamjam/2.jpg',
      '/jamjam/3.jpg',
      '/jamjam/4.jpg',
      '/jamjam/5.jpg',
      '/jamjam/6.jpg',
    ],
    details: [
      {
        title: '미디어 전송 및 파일 처리 파이프라인',
        problem:
          '대용량 이미지나 문서를 WebSocket으로 직접 전송할 경우 메시지 브로커 과부하와 전송 실패율 증가, 업로드 완료 전 화면이 멈춘 것처럼 보이는 UX 문제가 있었습니다.',
        solution:
          '파일 데이터는 HTTP, 메시지 동기화는 WebSocket이 담당하도록 역할을 분리했습니다. 파일 선택 시점에 `FILE_SIZE_LIMIT`와 MIME Type을 검증하고, 업로드 완료 후 반환된 `fileUrl`을 메타데이터로만 소켓 전송했습니다. `URL.createObjectURL`로 낙관적 미리보기를 제공하고, 언마운트 시 `revokeObjectURL`로 메모리 누수를 방지했습니다.',
      },
      {
        title: '채팅 내 주문 · 결제 프로세스 통합',
        problem:
          '채팅과 주문 시스템이 분리되어 있으면 대화 흐름이 끊기고 이탈 가능성이 높다고 판단했습니다.',
        solution:
          '메시지 타입을 `TEXT`, `IMAGE`, `FILE`, `ORDER`로 확장하고, `convertStompMessageToLocal` 유틸리티에서 `orderId`, `orderContent`를 파싱해 일반 채팅과 주문·시스템 메시지를 명확히 구분했습니다. 주문 상태(대기·결제 완료·작업 중·완료)에 따라 메시지 UI와 액션 버튼을 조건부 렌더링해 사용자의 다음 행동을 자연스럽게 유도했습니다.',
      },
      {
        title: '전역 이벤트 버스 설계',
        problem:
          'Axios 인터셉터나 WebSocket 클래스 같은 React 트리 외부 모듈에서 인증 만료 · 재연결 실패 시 전역 UI 피드백을 처리하기 어려웠습니다.',
        solution:
          '이벤트 발행과 구독을 분리한 전역 이벤트 버스를 도입했습니다. UI에 대한 직접 의존 없이 `eventManager.emit(...)` 형태로 이벤트를 발행하고, App에 배치된 `EventHandler` 컴포넌트가 이를 수신해 알림 표시나 로그인 모달 오픈 같은 UI 액션으로 변환하도록 했습니다.',
      },
      {
        title: 'Promise 기반 다이얼로그 설계',
        problem:
          '콜백 기반 다이얼로그는 확인 → 처리 → 결과 알림 흐름이 중첩 구조로 표현되면서 들여쓰기가 깊어지고 상태 처리 로직이 여러 분기로 분산됐습니다.',
        solution:
          '다이얼로그를 사용자 응답을 기다리는 비동기 작업으로 보고, `confirm`, `alert`가 resolve되는 시점을 다이얼로그 종료 시점으로 맞춰 `await` 형태로 사용할 수 있도록 재설계했습니다. 이를 통해 로딩 상태 해제와 예외 처리를 `finally` 블록에 모을 수 있었습니다.',
      },
      {
        title: '역할 기반 접근 제어(RBAC) 및 다단계 폼 관리',
        problem:
          '일반 사용자와 전문가 접근 가능 페이지가 분리되어야 했고, 서비스 등록 같은 다단계 폼은 단계 간 상태 유지와 유효성 검증 관리가 복잡했습니다.',
        solution:
          '`ProtectedRoute`, `ProviderRoute`, `ClientRoute` 가드 컴포넌트를 구현해 역할 및 인증 상태를 검사하고, 권한 없는 접근은 Forbidden 페이지 또는 로그인 모달로 처리했습니다. 다단계 폼은 `useServiceRegisterSteps` 커스텀 훅으로 캡슐화하고 Zod + React Hook Form으로 단계별 유효성 검증을 처리했습니다.',
      },
      {
        title: 'Feature-Sliced Design 기반 아키텍처 리팩토링',
        problem:
          '프로젝트가 확장되면서 features 내부에 페이지, UI, API, 타입, 훅이 함께 위치해 있었고, 도메인 경계가 모호해지는 문제가 있었습니다. 기능 간 의존성이 증가하면서 특정 로직의 위치를 파악하거나 수정 범위를 예측하는 데 어려움이 있었습니다.',
        solution:
          'Feature-Sliced Design 아키텍처를 참고해 레이어를 재구성했습니다. 페이지는 라우트 역할에 집중하도록 정리하고, 도메인 타입, API, 조회 로직은 `entities`로 분리했으며, 여러 기능에서 함께 사용되는 복합 UI는 `widgets`로 이동해 책임을 나누었습니다. 또한 `ui` / `model` / `lib` / `config` 기준으로 디렉토리 규칙을 통일하고, 각 단계마다 TypeScript 및 ESLint 검증을 통해 안정적으로 마이그레이션을 진행했습니다.',
      },
    ],
  },
  {
    id: 'house-it',
    index: '03',
    title: '하우스잇',
    subtitle: '청년들의 자립을 돕는 주거 생활 지식 플랫폼',
    description:
      '전세 계약, 공과금 관리, 집 수리 등 학교에서 알려주지 않는 현실적인 주거 생활 문제를 청년들이 직접 묻고 배우며 해결할 수 있는 플랫폼입니다. Q&A 게시판을 통해 질문하면 AI와 다른 사용자들로부터 답변을 얻을 수 있으며, 매거진과 퀴즈 기능을 통해 생활 지식을 자연스럽게 학습할 수 있습니다.',
    tags: ['TypeScript', 'React', 'Vite PWA', 'TanStack Query', 'Jotai', 'FCM'],
    year: '2025',
    url: 'https://github.com/house-it',
    images: ['/house-it/0.jpg'],
    details: [
      {
        title: 'PWA 및 푸시 알림을 통한 모바일 사용자 경험 강화',
        problem:
          '모바일 웹 환경에서는 재방문율 유지가 어렵고, 주요 이벤트 발생 시 사용자가 즉각 인지할 수 있는 알림 수단이 제한적이었습니다.',
        solution:
          'Firebase Cloud Messaging과 Service Worker를 연동해 브라우저가 닫혀 있거나 백그라운드 상태에서도 실시간 알림을 수신하도록 구성했습니다. `vite-plugin-pwa`로 설치형 앱 환경을 구성하고, `useIsPWA` 훅으로 Standalone 모드와 브라우저 탭 실행을 구분해 하단 탭 등의 UI를 실행 환경에 맞게 동적 조정했습니다.',
      },
      {
        title: '클라이언트 사이드 이미지 최적화 파이프라인',
        problem:
          '고화질 이미지 업로드로 서버 스토리지 비용이 증가했고, iOS 계열 HEIC/HEIF 포맷은 웹 브라우저 호환성 문제로 이미지가 정상 표시되지 않았습니다.',
        solution:
          '`heic-to` 라이브러리로 HEIC/HEIF를 브라우저 메모리에서 즉시 JPEG로 변환해 크로스 브라우징 문제를 해결했습니다. `browser-image-compression`으로 원본 크기에 따라 압축 전략을 차등 적용(1MB 이상: 화질 0.7 / 이하: 0.9)하고, 최대 해상도를 1920px로 제한해 업로드 속도와 스토리지 비용을 동시에 개선했습니다.',
      },
    ],
  },
  {
    id: 'bloom',
    index: '04',
    title: 'bloom',
    subtitle: '행동 활성화 기반 무기력 해소 앱 · 제12회 K-해커톤 입상',
    description:
      '행동 활성화 이론을 바탕으로 일상 속 무기력증 해소를 돕는 다이어리 및 캘린더 앱입니다. 사용자가 일정을 관리하고 기록하는 과정을 통해 스스로 긍정적인 생활 패턴을 형성할 수 있도록 지원합니다.',
    tags: ['TypeScript', 'React Native', 'TanStack Query', 'Recoil', 'WebView'],
    year: '2024',
    url: 'https://github.com/itwillbeoptimal/bloom-frontend',
    images: [
      '/bloom/0.jpeg',
      '/bloom/1.webm',
      '/bloom/2.jpeg',
      '/bloom/3.jpeg',
    ],
    details: [
      {
        title: 'WebView를 활용한 스플래시 애니메이션 구현',
        problem:
          'React Native 기본 애니메이션 라이브러리만으로는 원하는 수준의 스플래시 애니메이션 표현이 어려웠습니다. SVG 기반 정교한 라인 드로잉과 CSS 애니메이션을 그대로 활용할 필요가 있었습니다.',
        solution:
          '`react-native-webview`를 사용해 초기 화면에서 HTML/CSS 기반 애니메이션을 렌더링했습니다. SVG Path Animation 구현 시 `stroke-dasharray`와 `stroke-dashoffset` 속성으로 꽃이 그려지듯 나타나는 라인 드로잉 애니메이션을 구성하고, 애니메이션 종료 시점에 맞춰 Fade Out/Replace 방식으로 메인 화면과 자연스럽게 전환되도록 타이밍을 제어했습니다.',
      },
      {
        title: '가독성을 고려한 한글 타이포그래피 최적화',
        problem:
          'React Native 기본 Text 컴포넌트는 한글 문장 렌더링 시 단어 중간에서 줄바꿈이 발생하는 문제가 있었으며, 웹의 `word-break: keep-all`을 네이티브에서 직접 사용할 수 없었습니다.',
        solution:
          '`WordBreakText` 컴포넌트를 구현해 문장을 공백 기준으로 분리한 뒤, 각 단어를 `flex-wrap: wrap` 컨테이너에 배치함으로써 화면 크기 변화에도 단어가 잘리지 않고 자연스럽게 줄바꿈되도록 처리했습니다.',
      },
      {
        title: '캘린더 내 공휴일 데이터 연동',
        problem:
          '캘린더 기능에서 공휴일 정보를 함께 제공해 사용자가 더 직관적으로 일정을 관리할 수 있도록 할 필요가 있었습니다.',
        solution:
          '공공 데이터 포털 공휴일 API를 연동하고, XML 응답 데이터를 파싱해 앱 내 캘린더 포맷으로 변환했습니다. `useQuery`와 연동해 연도 단위로 공휴일 데이터를 캐싱하고, 연도 변경 시 자동으로 재요청해 UI에 반영하도록 구성했습니다.',
      },
    ],
  },
];
