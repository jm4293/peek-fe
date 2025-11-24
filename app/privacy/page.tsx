import { ExternalLink, Globe, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function PrivacyPolicyPage() {
  return (
    <Wrapper.SECTION>
      <div className="bg-theme-bg-card shadow-sm border border-theme-border-light rounded-lg p-4 md:p-8 break-words overflow-hidden">
        {/* 헤더 섹션 */}
        <div className="text-center pb-8 border-b border-theme-border-light mb-8">
          <Text.TITLE text="개인정보 처리방침" className="text-2xl md:text-3xl font-bold mb-4 break-words" />
          <Text.PARAGRAPH
            text="PEEK은 이용자의 개인정보를 보호하기 위해 최선을 다하고 있습니다."
            color="gray"
            className="text-base md:text-lg break-words"
          />
        </div>

        <div className="space-y-10">
          {/* 1. 개인정보 수집 항목 */}
          <section className="bg-theme-bg-main rounded-lg p-4 md:p-6 break-words">
            <Text.TITLE text="1. 개인정보 수집 항목" className="text-lg md:text-xl font-semibold mb-6 break-words" />

            <div className="space-y-6">
              <div className="bg-theme-bg-section rounded-md p-4 border-l-4 border-blue-500 break-words">
                <Text.SUBTITLE text="필수 수집 항목:" className="font-medium mb-3 break-words" />
                <ol className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="이메일 주소 (회원가입 및 로그인)" className="break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="비밀번호 (이메일 회원가입 시)" className="break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="닉네임 (커뮤니티 활동용)" className="break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="이름 (실명 확인용)" className="break-words" />
                  </li>
                </ol>
              </div>

              <div className="bg-theme-bg-section rounded-md p-4 border-l-4 border-green-500 break-words">
                <Text.SUBTITLE text="소셜 로그인 시 수집 항목:" className="font-medium mb-3 break-words" />
                <ol className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div className="break-words">
                      <Text.PARAGRAPH text="구글: 이메일, 프로필 정보 (이름, 프로필 사진)" className="break-words" />
                      <Text.CAPTION
                        text="- Google OAuth 2.0을 통한 인증 처리"
                        color="gray"
                        className="ml-0 break-words"
                      />
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div className="break-words">
                      <Text.PARAGRAPH
                        text="카카오: 이메일, 프로필 정보 (닉네임, 프로필 사진)"
                        className="break-words"
                      />
                      <Text.CAPTION text="- Kakao OAuth를 통한 인증 처리" color="gray" className="ml-0 break-words" />
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div className="break-words">
                      <Text.PARAGRAPH text="네이버: 이메일, 프로필 정보 (이름, 프로필 사진)" className="break-words" />
                      <Text.CAPTION text="- Naver OAuth를 통한 인증 처리" color="gray" className="ml-0 break-words" />
                    </div>
                  </li>
                </ol>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-3 mt-3 break-words">
                  <Text.CAPTION
                    text="※ 소셜 로그인 제공업체의 개인정보 처리방침도 함께 확인하시기 바랍니다:"
                    className="font-medium break-words"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Link
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline text-sm">
                      <Text.CAPTION text="구글 개인정보 처리방침" className="break-words" />
                      <ExternalLink size={12} />
                    </Link>
                    <span className="text-green-700 dark:text-green-400">|</span>
                    <Link
                      href="https://www.kakaocorp.com/page/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline text-sm">
                      <Text.CAPTION text="카카오 개인정보 처리방침" className="break-words" />
                      <ExternalLink size={12} />
                    </Link>
                    <span className="text-green-700 dark:text-green-400">|</span>
                    <Link
                      href="https://policy.naver.com/policy/privacy.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline text-sm">
                      <Text.CAPTION text="네이버 개인정보 처리방침" className="break-words" />
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-theme-bg-section rounded-md p-4 border-l-4 border-yellow-500 break-words">
                <Text.SUBTITLE text="서비스 이용 중 자동 수집 항목:" className="font-medium mb-3 break-words" />
                <ol className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="IP 주소, 접속 로그, 쿠키, 서비스 이용 기록" className="break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="게시글, 댓글 작성 내용" className="break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="업로드한 이미지 파일" className="break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="기기 정보 (OS, 브라우저 종류 및 버전)" className="break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="푸시 알림 토큰 (Firebase Cloud Messaging)" className="break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="서비스 이용 통계 (Google Analytics)" className="break-words" />
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* 나머지 섹션들 */}
          {[
            {
              title: '2. 개인정보 수집 및 이용 목적',
              items: [
                '회원 관리: 회원가입, 로그인, 본인 확인, 회원정보 수정, 자동 로그인 상태 유지',
                '서비스 제공: 주식 정보 제공, 커뮤니티 기능 제공, 최근 조회 주식 정보 저장',
                '커뮤니티 활동: 게시글 작성, 댓글 작성, 사용자 간 소통',
                '알림 서비스: 푸시 알림 발송을 위한 기기 토큰 관리',
                '고객 지원: 문의사항 처리, 서비스 개선',
                '보안: 부정 이용 방지, 서비스 안정성 확보, 토큰 기반 인증 관리',
                '통계 분석: 서비스 이용 통계 분석 및 서비스 개선 (Google Analytics)',
              ],
            },
            {
              title: '3. 개인정보 보유 및 이용 기간',
              items: [
                '회원 정보: 회원 탈퇴 시까지 (단, 관련 법령에 의해 보존이 필요한 경우 해당 기간까지)',
                '인증 토큰: 로그인 세션 유지 기간 동안 (자동 갱신)',
                '게시글/댓글: 회원 탈퇴 후 30일 (다른 사용자와의 소통 기록 보존)',
                '로그 기록: 3개월',
                '이미지 파일: 회원 탈퇴 시 삭제',
                '로컬 스토리지 데이터: 브라우저 캐시 삭제 시까지 또는 회원 탈퇴 시',
                '푸시 알림 토큰: 회원 탈퇴 시 또는 알림 거부 시',
                '부정 이용 기록: 1년 (서비스 보안 및 부정 이용 방지)',
              ],
            },
          ].map((section, index) => (
            <section key={index} className="bg-theme-bg-main rounded-lg p-4 md:p-6 break-words">
              <Text.TITLE text={section.title} className="text-lg md:text-xl font-semibold mb-4 break-words" />
              <div className="bg-theme-bg-section rounded-md p-4 break-words">
                <ol className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mr-3 flex-shrink-0 mt-0.5">
                        {itemIndex + 1}
                      </span>
                      <Text.PARAGRAPH text={item} className="break-words" />
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          ))}

          {/* 법령에 따른 개인정보 보유 */}
          <section className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 md:p-6 border border-purple-200 dark:border-purple-800 break-words">
            <Text.TITLE
              text="3-1. 관련 법령에 따른 개인정보 보유"
              className="text-lg md:text-xl font-semibold mb-4 break-words"
            />
            <div className="bg-theme-bg-section rounded-md p-4 break-words">
              <Text.PARAGRAPH
                text="전자상거래 등에서의 소비자 보호에 관한 법률, 통신비밀보호법 등 관련 법령의 규정에 따라 다음과 같이 개인정보를 보관합니다:"
                className="mb-4 break-words"
              />
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH text="계약 또는 청약철회 등에 관한 기록: 5년" className="font-medium break-words" />
                    <Text.CAPTION
                      text="(전자상거래 등에서의 소비자보호에 관한 법률)"
                      color="gray"
                      className="ml-0 break-words"
                    />
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH
                      text="대금결제 및 재화 등의 공급에 관한 기록: 5년"
                      className="font-medium break-words"
                    />
                    <Text.CAPTION
                      text="(전자상거래 등에서의 소비자보호에 관한 법률)"
                      color="gray"
                      className="ml-0 break-words"
                    />
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH
                      text="소비자 불만 또는 분쟁처리에 관한 기록: 3년"
                      className="font-medium break-words"
                    />
                    <Text.CAPTION
                      text="(전자상거래 등에서의 소비자보호에 관한 법률)"
                      color="gray"
                      className="ml-0 break-words"
                    />
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH text="웹사이트 방문 기록: 3개월" className="font-medium break-words" />
                    <Text.CAPTION text="(통신비밀보호법)" color="gray" className="ml-0 break-words" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 특별 섹션들 */}
          <section className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 md:p-6 border border-red-200 dark:border-red-800 break-words">
            <Text.TITLE text="4. 개인정보 제3자 제공" className="text-lg md:text-xl font-semibold mb-4 break-words" />
            <div className="bg-theme-bg-section rounded-md p-4 break-words">
              <Text.PARAGRAPH
                text="PEEK은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다:"
                className="mb-4 break-words"
              />
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <Text.PARAGRAPH text="이용자가 사전에 동의한 경우" className="break-words" />
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <Text.PARAGRAPH
                    text="법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우"
                    className="break-words"
                  />
                </li>
              </ol>
            </div>
          </section>

          {/* 나머지 섹션들 계속 */}
          {[
            {
              title: '5. 개인정보 처리 위탁',
              items: [
                '이미지 저장: AWS S3 (이미지 파일 저장 및 관리)',
                '소셜 로그인: 구글, 카카오, 네이버 (인증 처리)',
                '푸시 알림: Firebase Cloud Messaging (FCM) (알림 발송)',
                '웹 분석: Google Analytics (서비스 이용 통계 분석)',
              ],
              links: [
                { text: 'AWS 개인정보 처리방침', url: 'https://aws.amazon.com/ko/privacy/' },
                { text: 'Firebase 개인정보 처리방침', url: 'https://firebase.google.com/support/privacy' },
              ],
            },
            {
              title: '6. 개인정보의 안전성 확보 조치',
              items: [
                '개인정보 암호화 저장 (비밀번호 해시 처리)',
                '인증 토큰 HttpOnly 쿠키 저장 (XSS 공격 방지)',
                '토큰 자동 갱신 메커니즘 (Refresh Token 방식)',
                '접근 권한 관리 및 최소화',
                '정기적인 보안 점검 및 취약점 관리',
                '개인정보 처리시스템 접근 기록 보관 및 위·변조 방지',
                'HTTPS 암호화 통신 적용',
                '개인정보 처리 직원 최소화 및 교육',
                'CORS 정책 적용 및 withCredentials 보안 설정',
              ],
            },
          ].map((section, index) => (
            <section key={index + 10} className="bg-theme-bg-main rounded-lg p-4 md:p-6 break-words">
              <Text.TITLE text={section.title} className="text-lg md:text-xl font-semibold mb-4 break-words" />
              <div className="bg-theme-bg-section rounded-md p-4 break-words">
                <ol className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text={item} className="break-words" />
                    </li>
                  ))}
                </ol>
                {section.links && (
                  <div className="mt-4 pt-4 border-t border-theme-border-light">
                    <Text.SUBTITLE text="관련 정책:" className="font-medium mb-2 break-words" />
                    <div className="flex flex-wrap gap-2">
                      {section.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-theme-txt-blue hover:text-blue-700 dark:hover:text-blue-400 underline text-sm">
                          <Text.CAPTION text={link.text} color="blue" className="break-words" />
                          <ExternalLink size={12} />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}

          {/* 쿠키 및 로컬 스토리지 운영 정책 */}
          <section className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 md:p-6 border border-amber-200 dark:border-amber-800 break-words">
            <Text.TITLE
              text="6-1. 쿠키(Cookie) 및 로컬 스토리지 운영 정책"
              className="text-lg md:text-xl font-semibold mb-4 break-words"
            />
            <div className="bg-theme-bg-section rounded-md p-4 break-words">
              <Text.PARAGRAPH
                text="PEEK은 서비스 제공을 위해 쿠키와 로컬 스토리지를 사용합니다:"
                className="mb-4 break-words"
              />
              <div className="space-y-4">
                <div className="break-words">
                  <Text.SUBTITLE text="쿠키란?" className="font-medium mb-2 break-words" />
                  <Text.PARAGRAPH
                    text="웹사이트가 이용자의 컴퓨터에 저장하는 작은 텍스트 파일로, 웹사이트 방문 시 자동으로 생성됩니다."
                    className="break-words"
                  />
                </div>
                <div className="break-words">
                  <Text.SUBTITLE text="쿠키 사용 목적 및 종류:" className="font-medium mb-2 break-words" />
                  <ol className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div className="break-words">
                        <Text.PARAGRAPH text="인증 토큰 저장 (TKN, RTKN)" className="break-words" />
                        <Text.CAPTION
                          text="- 로그인 상태 유지 및 자동 토큰 갱신을 위해 사용됩니다."
                          color="gray"
                          className="ml-0 break-words"
                        />
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text="서비스 이용 분석 및 개선" className="break-words" />
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text="맞춤형 서비스 제공" className="break-words" />
                    </li>
                  </ol>
                </div>
                <div className="break-words">
                  <Text.SUBTITLE text="로컬 스토리지 사용:" className="font-medium mb-2 break-words" />
                  <ol className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text="최근 조회한 주식 정보 저장 (recent-stock)" className="break-words" />
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text="마지막 로그인 방법 저장 (lastLoginMethod)" className="break-words" />
                    </li>
                  </ol>
                </div>
                <div className="break-words">
                  <Text.SUBTITLE text="쿠키 및 로컬 스토리지 거부 방법:" className="font-medium mb-2 break-words" />
                  <Text.PARAGRAPH
                    text="브라우저 설정에서 쿠키 및 로컬 스토리지 저장을 거부할 수 있습니다. 단, 저장을 거부할 경우 로그인 상태 유지 및 일부 서비스 이용에 제한이 있을 수 있습니다."
                    className="break-words"
                  />
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-md p-3 break-words">
                  <Text.CAPTION
                    text="※ 인증 토큰은 보안을 위해 HttpOnly 쿠키로 저장되며, 자동으로 갱신됩니다."
                    className="font-medium break-words"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 푸시 알림 및 분석 도구 */}
          <section className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 md:p-6 border border-teal-200 dark:border-teal-800 break-words">
            <Text.TITLE
              text="6-2. 푸시 알림 및 분석 도구 사용"
              className="text-lg md:text-xl font-semibold mb-4 break-words"
            />
            <div className="bg-theme-bg-section rounded-md p-4 break-words">
              <div className="space-y-4">
                <div className="break-words">
                  <Text.SUBTITLE
                    text="푸시 알림 (Firebase Cloud Messaging):"
                    className="font-medium mb-2 break-words"
                  />
                  <Text.PARAGRAPH
                    text="PEEK은 서비스 알림을 제공하기 위해 Firebase Cloud Messaging(FCM)을 사용합니다. 푸시 알림 수신을 위해서는 브라우저 알림 권한이 필요하며, 이용자가 직접 권한을 허용해야 합니다."
                    className="mb-2 break-words"
                  />
                  <ol className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text="수집 정보: 기기별 고유 알림 토큰" className="break-words" />
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH
                        text="이용 목적: 서비스 관련 알림 발송 (댓글, 좋아요, 공지사항 등)"
                        className="break-words"
                      />
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text="보유 기간: 회원 탈퇴 시 또는 알림 거부 시 삭제" className="break-words" />
                    </li>
                  </ol>
                </div>
                <div className="break-words">
                  <Text.SUBTITLE text="웹 분석 (Google Analytics):" className="font-medium mb-2 break-words" />
                  <Text.PARAGRAPH
                    text="PEEK은 서비스 개선을 위해 Google Analytics를 사용하여 이용자의 서비스 이용 패턴을 분석합니다."
                    className="mb-2 break-words"
                  />
                  <ol className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH
                        text="수집 정보: 페이지 조회수, 체류 시간, 클릭 패턴 등 (익명화된 통계 데이터)"
                        className="break-words"
                      />
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH
                        text="이용 목적: 서비스 이용 통계 분석 및 사용자 경험 개선"
                        className="break-words"
                      />
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div className="flex items-center gap-2 break-words">
                        <Text.PARAGRAPH text="Google Analytics 개인정보 보호 정책:" className="break-words" />
                        <Link
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-theme-txt-blue hover:text-blue-700 dark:hover:text-blue-400 underline">
                          <Text.PARAGRAPH text="자세히 보기" color="blue" className="break-words" />
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </li>
                  </ol>
                </div>
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-md p-3 break-words">
                  <Text.CAPTION
                    text="※ 푸시 알림 및 분석 도구 사용은 서비스 이용에 필수적이지 않으며, 이용자가 원하지 않을 경우 브라우저 설정에서 거부할 수 있습니다."
                    className="font-medium break-words"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 이용자 권리 */}
          <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 md:p-6 border border-blue-200 dark:border-blue-800 break-words">
            <Text.TITLE
              text="7. 이용자 및 법정대리인의 권리와 행사 방법"
              className="text-lg md:text-xl font-semibold mb-4 break-words"
            />
            <div className="bg-theme-bg-section rounded-md p-4 break-words">
              <Text.PARAGRAPH text="이용자는 언제든지 다음의 권리를 행사할 수 있습니다:" className="mb-4 break-words" />
              <ol className="grid md:grid-cols-2 gap-3 mb-4">
                {[
                  '개인정보 처리 현황에 대한 열람 요구',
                  '오류 등이 있을 경우 정정·삭제 요구',
                  '처리정지 요구',
                  '회원 탈퇴 (개인정보 삭제)',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <Text.PARAGRAPH text={item} className="break-words" />
                  </li>
                ))}
              </ol>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 mt-4 break-words">
                <Text.PARAGRAPH
                  text="만 14세 미만 아동의 경우 법정대리인이 아동의 개인정보 열람, 정정·삭제, 처리정지를 요구할 수 있습니다."
                  className="text-sm break-words"
                />
              </div>
            </div>
          </section>

          {/* 개인정보 파기 절차 추가 */}
          <section className="bg-theme-bg-main rounded-lg p-4 md:p-6 break-words">
            <Text.TITLE
              text="7-1. 개인정보의 파기 절차 및 방법"
              className="text-lg md:text-xl font-semibold mb-4 break-words"
            />
            <div className="bg-theme-bg-section rounded-md p-4 break-words">
              <div className="space-y-4">
                <div className="break-words">
                  <Text.SUBTITLE text="파기 절차:" className="font-medium mb-2 break-words" />
                  <Text.PARAGRAPH
                    text="이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다."
                    className="break-words"
                  />
                </div>
                <div className="break-words">
                  <Text.SUBTITLE text="파기 방법:" className="font-medium mb-2 break-words" />
                  <ol className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH
                        text="전자적 파일 형태: 복원이 불가능한 방법으로 영구 삭제"
                        className="break-words"
                      />
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text="종이 문서: 분쇄기로 분쇄하거나 소각" className="break-words" />
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* 연락처 정보 */}
          <section className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 md:p-6 border border-green-200 dark:border-green-800 break-words">
            <Text.TITLE
              text="8. 개인정보 보호책임자 및 담당자"
              className="text-lg md:text-xl font-semibold mb-4 break-words"
            />
            <div className="bg-theme-bg-section rounded-md p-4 break-words">
              <div className="space-y-4">
                <div className="break-words">
                  <Text.SUBTITLE text="개인정보 보호책임자:" className="font-medium mb-3 break-words" />
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center flex-wrap">
                      <span className="font-medium mr-2 text-theme-txt-default">성명:</span>
                      <span className="px-3 py-1 bg-theme-bg-main rounded-md break-words text-theme-txt-default">
                        [담당자명]
                      </span>
                    </div>
                    <div className="flex items-center flex-wrap">
                      <span className="font-medium mr-2 text-theme-txt-default">직책:</span>
                      <span className="px-3 py-1 bg-theme-bg-main rounded-md break-words text-theme-txt-default">
                        [직책]
                      </span>
                    </div>
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="font-medium text-theme-txt-default">이메일:</span>
                      <Link
                        href="mailto:[이메일 주소]"
                        className="flex items-center gap-1 px-3 py-1 bg-theme-bg-main rounded-md text-theme-txt-blue hover:text-blue-700 dark:hover:text-blue-400 hover:bg-theme-bg-card-hover transition-colors">
                        <Mail size={14} />
                        <span className="break-all">[이메일 주소]</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-3 break-words">
                  <Text.PARAGRAPH
                    text="개인정보 관련 문의사항, 불만처리, 피해구제 등에 관한 사항은 개인정보 보호책임자에게 연락해 주시기 바랍니다. PEEK은 이용자의 문의사항에 대해 신속하고 성실하게 답변해드리겠습니다."
                    className="text-sm break-words"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 권익침해 구제방법 추가 */}
          <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 md:p-6 border border-indigo-200 dark:border-indigo-800 break-words">
            <Text.TITLE text="9. 권익침해 구제방법" className="text-lg md:text-xl font-semibold mb-4 break-words" />
            <div className="bg-theme-bg-section rounded-md p-4 break-words">
              <Text.PARAGRAPH
                text="개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하실 수 있습니다:"
                className="mb-4 break-words"
              />
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH
                      text="개인정보침해신고센터 (한국인터넷진흥원 운영)"
                      className="text-gray-700 font-medium break-words"
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <Phone size={14} className="text-theme-txt-gray flex-shrink-0" />
                      <Text.CAPTION text="전화: (국번없이) 118" color="gray" className="ml-0 break-words" />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe size={14} className="text-theme-txt-gray flex-shrink-0" />
                      <Link
                        href="https://privacy.kisa.or.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-theme-txt-blue hover:text-blue-700 dark:hover:text-blue-400 underline">
                        <Text.CAPTION text="privacy.kisa.or.kr" color="blue" className="ml-0 break-all" />
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH text="개인정보 분쟁조정위원회" className="font-medium break-words" />
                    <div className="flex items-center gap-2 mt-1">
                      <Phone size={14} className="text-theme-txt-gray flex-shrink-0" />
                      <Text.CAPTION text="전화: (국번없이) 1833-6972" color="gray" className="ml-0 break-words" />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe size={14} className="text-theme-txt-gray flex-shrink-0" />
                      <Link
                        href="https://www.kopico.go.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-theme-txt-blue hover:text-blue-700 dark:hover:text-blue-400 underline">
                        <Text.CAPTION text="www.kopico.go.kr" color="blue" className="ml-0 break-all" />
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH text="대검찰청 사이버범죄수사단" className="font-medium break-words" />
                    <div className="flex items-center gap-2 mt-1">
                      <Phone size={14} className="text-theme-txt-gray flex-shrink-0" />
                      <Text.CAPTION text="전화: (국번없이) 1301" color="gray" className="ml-0 break-words" />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe size={14} className="text-theme-txt-gray flex-shrink-0" />
                      <Link
                        href="https://www.spo.go.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-theme-txt-blue hover:text-blue-700 dark:hover:text-blue-400 underline">
                        <Text.CAPTION text="www.spo.go.kr" color="blue" className="ml-0 break-all" />
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH text="경찰청 사이버안전국" className="font-medium break-words" />
                    <div className="flex items-center gap-2 mt-1">
                      <Phone size={14} className="text-theme-txt-gray flex-shrink-0" />
                      <Text.CAPTION text="전화: (국번없이) 182" color="gray" className="ml-0 break-words" />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe size={14} className="text-theme-txt-gray flex-shrink-0" />
                      <Link
                        href="https://cyberbureau.police.go.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-theme-txt-blue hover:text-blue-700 dark:hover:text-blue-400 underline">
                        <Text.CAPTION text="cyberbureau.police.go.kr" color="blue" className="ml-0 break-all" />
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 처리방침 변경 */}
          <section className="bg-theme-bg-main rounded-lg p-4 md:p-6 break-words">
            <Text.TITLE
              text="10. 개인정보 처리방침 변경"
              className="text-lg md:text-xl font-semibold mb-4 break-words"
            />
            <div className="bg-theme-bg-section rounded-md p-4 border-l-4 border-indigo-500 break-words">
              <Text.PARAGRAPH
                text="이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다. 다만, 개인정보의 수집 및 활용, 제3자 제공 등과 같이 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 고지합니다."
                className="break-words"
              />
            </div>
          </section>
        </div>

        {/* 푸터 */}
        <div className="mt-12 pt-6 border-t border-theme-border-light text-center">
          <div className="inline-flex items-center px-4 py-2 bg-theme-bg-main rounded-lg">
            <svg
              className="w-5 h-5 text-theme-txt-gray mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <Text.CAPTION text="시행일: 2025년 9월 1일" color="gray" className="font-medium break-words" />
          </div>
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
