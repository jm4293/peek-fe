import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function PrivacyPolicyPage() {
  return (
    <Wrapper.SECTION>
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 md:p-8 break-words overflow-hidden">
        {/* 헤더 섹션 */}
        <div className="text-center pb-8 border-b border-gray-200 mb-8">
          <Text.TITLE
            text="개인정보 처리방침"
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 break-words"
          />
          <Text.PARAGRAPH
            text="PEEK은 이용자의 개인정보를 보호하기 위해 최선을 다하고 있습니다."
            className="text-base md:text-lg text-gray-600 break-words"
          />
        </div>

        <div className="space-y-10">
          {/* 1. 개인정보 수집 항목 */}
          <section className="bg-gray-50 rounded-lg p-4 md:p-6 break-words">
            <Text.TITLE
              text="1. 개인정보 수집 항목"
              className="text-lg md:text-xl font-semibold text-gray-900 mb-6 break-words"
            />

            <div className="space-y-6">
              <div className="bg-white rounded-md p-4 border-l-4 border-blue-500 break-words">
                <Text.SUBTITLE text="필수 수집 항목:" className="font-medium text-gray-900 mb-3 break-words" />
                <ol className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="이메일 주소 (회원가입 및 로그인)" className="text-gray-700 break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="비밀번호 (이메일 회원가입 시)" className="text-gray-700 break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="닉네임 (커뮤니티 활동용)" className="text-gray-700 break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="이름 (실명 확인용)" className="text-gray-700 break-words" />
                  </li>
                </ol>
              </div>

              <div className="bg-white rounded-md p-4 border-l-4 border-green-500 break-words">
                <Text.SUBTITLE
                  text="소셜 로그인 시 수집 항목:"
                  className="font-medium text-gray-900 mb-3 break-words"
                />
                <ol className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="구글: 이메일, 프로필 정보" className="text-gray-700 break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="카카오: 이메일, 프로필 정보" className="text-gray-700 break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="네이버: 이메일, 프로필 정보" className="text-gray-700 break-words" />
                  </li>
                </ol>
              </div>

              <div className="bg-white rounded-md p-4 border-l-4 border-yellow-500 break-words">
                <Text.SUBTITLE
                  text="서비스 이용 중 자동 수집 항목:"
                  className="font-medium text-gray-900 mb-3 break-words"
                />
                <ol className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH
                      text="IP 주소, 접속 로그, 쿠키, 서비스 이용 기록"
                      className="text-gray-700 break-words"
                    />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="게시글, 댓글 작성 내용" className="text-gray-700 break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH text="업로드한 이미지 파일" className="text-gray-700 break-words" />
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <Text.PARAGRAPH
                      text="기기 정보 (OS, 브라우저 종류 및 버전)"
                      className="text-gray-700 break-words"
                    />
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
                '회원 관리: 회원가입, 로그인, 본인 확인, 회원정보 수정',
                '서비스 제공: 주식 정보 제공, 커뮤니티 기능 제공',
                '커뮤니티 활동: 게시글 작성, 댓글 작성, 사용자 간 소통',
                '고객 지원: 문의사항 처리, 서비스 개선',
                '보안: 부정 이용 방지, 서비스 안정성 확보',
                '통계 분석: 서비스 이용 통계 분석 및 서비스 개선',
              ],
            },
            {
              title: '3. 개인정보 보유 및 이용 기간',
              items: [
                '회원 정보: 회원 탈퇴 시까지 (단, 관련 법령에 의해 보존이 필요한 경우 해당 기간까지)',
                '게시글/댓글: 회원 탈퇴 후 30일 (다른 사용자와의 소통 기록 보존)',
                '로그 기록: 3개월',
                '이미지 파일: 회원 탈퇴 시 삭제',
                '부정 이용 기록: 1년 (서비스 보안 및 부정 이용 방지)',
              ],
            },
          ].map((section, index) => (
            <section key={index} className="bg-gray-50 rounded-lg p-4 md:p-6 break-words">
              <Text.TITLE
                text={section.title}
                className="text-lg md:text-xl font-semibold text-gray-900 mb-4 break-words"
              />
              <div className="bg-white rounded-md p-4 break-words">
                <ol className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3 flex-shrink-0 mt-0.5">
                        {itemIndex + 1}
                      </span>
                      <Text.PARAGRAPH text={item} className="text-gray-700 break-words" />
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          ))}

          {/* 법령에 따른 개인정보 보유 */}
          <section className="bg-purple-50 rounded-lg p-4 md:p-6 border border-purple-200 break-words">
            <Text.TITLE
              text="3-1. 관련 법령에 따른 개인정보 보유"
              className="text-lg md:text-xl font-semibold text-purple-800 mb-4 break-words"
            />
            <div className="bg-white rounded-md p-4 break-words">
              <Text.PARAGRAPH
                text="전자상거래 등에서의 소비자 보호에 관한 법률, 통신비밀보호법 등 관련 법령의 규정에 따라 다음과 같이 개인정보를 보관합니다:"
                className="text-gray-700 mb-4 break-words"
              />
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH
                      text="계약 또는 청약철회 등에 관한 기록: 5년"
                      className="text-gray-700 font-medium break-words"
                    />
                    <Text.CAPTION
                      text="(전자상거래 등에서의 소비자보호에 관한 법률)"
                      className="text-gray-500 ml-0 break-words"
                    />
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH
                      text="대금결제 및 재화 등의 공급에 관한 기록: 5년"
                      className="text-gray-700 font-medium break-words"
                    />
                    <Text.CAPTION
                      text="(전자상거래 등에서의 소비자보호에 관한 법률)"
                      className="text-gray-500 ml-0 break-words"
                    />
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH
                      text="소비자 불만 또는 분쟁처리에 관한 기록: 3년"
                      className="text-gray-700 font-medium break-words"
                    />
                    <Text.CAPTION
                      text="(전자상거래 등에서의 소비자보호에 관한 법률)"
                      className="text-gray-500 ml-0 break-words"
                    />
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH
                      text="웹사이트 방문 기록: 3개월"
                      className="text-gray-700 font-medium break-words"
                    />
                    <Text.CAPTION text="(통신비밀보호법)" className="text-gray-500 ml-0 break-words" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 특별 섹션들 */}
          <section className="bg-red-50 rounded-lg p-4 md:p-6 border border-red-200 break-words">
            <Text.TITLE
              text="4. 개인정보 제3자 제공"
              className="text-lg md:text-xl font-semibold text-red-800 mb-4 break-words"
            />
            <div className="bg-white rounded-md p-4 break-words">
              <Text.PARAGRAPH
                text="PEEK은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다:"
                className="text-gray-700 mb-4 break-words"
              />
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <Text.PARAGRAPH text="이용자가 사전에 동의한 경우" className="text-gray-700 break-words" />
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <Text.PARAGRAPH
                    text="법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우"
                    className="text-gray-700 break-words"
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
              ],
            },
            {
              title: '6. 개인정보의 안전성 확보 조치',
              items: [
                '개인정보 암호화 저장 (비밀번호 해시 처리)',
                '접근 권한 관리 및 최소화',
                '정기적인 보안 점검 및 취약점 관리',
                '개인정보 처리시스템 접근 기록 보관 및 위·변조 방지',
                'HTTPS 암호화 통신 적용',
                '개인정보 처리 직원 최소화 및 교육',
              ],
            },
          ].map((section, index) => (
            <section key={index + 10} className="bg-gray-50 rounded-lg p-4 md:p-6 break-words">
              <Text.TITLE
                text={section.title}
                className="text-lg md:text-xl font-semibold text-gray-900 mb-4 break-words"
              />
              <div className="bg-white rounded-md p-4 break-words">
                <ol className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text={item} className="text-gray-700 break-words" />
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          ))}

          {/* 쿠키 운영 정책 추가 */}
          <section className="bg-amber-50 rounded-lg p-4 md:p-6 border border-amber-200 break-words">
            <Text.TITLE
              text="6-1. 쿠키(Cookie) 운영 정책"
              className="text-lg md:text-xl font-semibold text-amber-800 mb-4 break-words"
            />
            <div className="bg-white rounded-md p-4 break-words">
              <Text.PARAGRAPH
                text="PEEK은 서비스 제공을 위해 쿠키를 사용합니다:"
                className="text-gray-700 mb-4 break-words"
              />
              <div className="space-y-3">
                <div className="break-words">
                  <Text.SUBTITLE text="쿠키란?" className="font-medium text-gray-900 mb-2 break-words" />
                  <Text.PARAGRAPH
                    text="웹사이트가 이용자의 컴퓨터에 저장하는 작은 텍스트 파일로, 웹사이트 방문 시 자동으로 생성됩니다."
                    className="text-gray-700 break-words"
                  />
                </div>
                <div className="break-words">
                  <Text.SUBTITLE text="쿠키 사용 목적:" className="font-medium text-gray-900 mb-2 break-words" />
                  <ol className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text="로그인 상태 유지" className="text-gray-700 break-words" />
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text="서비스 이용 분석 및 개선" className="text-gray-700 break-words" />
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH text="맞춤형 서비스 제공" className="text-gray-700 break-words" />
                    </li>
                  </ol>
                </div>
                <div className="break-words">
                  <Text.SUBTITLE text="쿠키 거부 방법:" className="font-medium text-gray-900 mb-2 break-words" />
                  <Text.PARAGRAPH
                    text="브라우저 설정에서 쿠키 저장을 거부할 수 있습니다. 단, 쿠키 저장을 거부할 경우 일부 서비스 이용에 제한이 있을 수 있습니다."
                    className="text-gray-700 break-words"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 이용자 권리 */}
          <section className="bg-blue-50 rounded-lg p-4 md:p-6 border border-blue-200 break-words">
            <Text.TITLE
              text="7. 이용자 및 법정대리인의 권리와 행사 방법"
              className="text-lg md:text-xl font-semibold text-blue-800 mb-4 break-words"
            />
            <div className="bg-white rounded-md p-4 break-words">
              <Text.PARAGRAPH
                text="이용자는 언제든지 다음의 권리를 행사할 수 있습니다:"
                className="text-gray-700 mb-4 break-words"
              />
              <ol className="grid md:grid-cols-2 gap-3 mb-4">
                {[
                  '개인정보 처리 현황에 대한 열람 요구',
                  '오류 등이 있을 경우 정정·삭제 요구',
                  '처리정지 요구',
                  '회원 탈퇴 (개인정보 삭제)',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <Text.PARAGRAPH text={item} className="text-gray-700 break-words" />
                  </li>
                ))}
              </ol>
              <div className="bg-blue-50 rounded-md p-3 mt-4 break-words">
                <Text.PARAGRAPH
                  text="만 14세 미만 아동의 경우 법정대리인이 아동의 개인정보 열람, 정정·삭제, 처리정지를 요구할 수 있습니다."
                  className="text-gray-700 text-sm break-words"
                />
              </div>
            </div>
          </section>

          {/* 개인정보 파기 절차 추가 */}
          <section className="bg-gray-50 rounded-lg p-4 md:p-6 break-words">
            <Text.TITLE
              text="7-1. 개인정보의 파기 절차 및 방법"
              className="text-lg md:text-xl font-semibold text-gray-900 mb-4 break-words"
            />
            <div className="bg-white rounded-md p-4 break-words">
              <div className="space-y-4">
                <div className="break-words">
                  <Text.SUBTITLE text="파기 절차:" className="font-medium text-gray-900 mb-2 break-words" />
                  <Text.PARAGRAPH
                    text="이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다."
                    className="text-gray-700 break-words"
                  />
                </div>
                <div className="break-words">
                  <Text.SUBTITLE text="파기 방법:" className="font-medium text-gray-900 mb-2 break-words" />
                  <ol className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH
                        text="전자적 파일 형태: 복원이 불가능한 방법으로 영구 삭제"
                        className="text-gray-700 break-words"
                      />
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <Text.PARAGRAPH
                        text="종이 문서: 분쇄기로 분쇄하거나 소각"
                        className="text-gray-700 break-words"
                      />
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* 연락처 정보 */}
          <section className="bg-green-50 rounded-lg p-4 md:p-6 border border-green-200 break-words">
            <Text.TITLE
              text="8. 개인정보 보호책임자 및 담당자"
              className="text-lg md:text-xl font-semibold text-green-800 mb-4 break-words"
            />
            <div className="bg-white rounded-md p-4 break-words">
              <div className="space-y-4">
                <div className="break-words">
                  <Text.SUBTITLE text="개인정보 보호책임자:" className="font-medium text-gray-900 mb-3 break-words" />
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center flex-wrap">
                      <span className="font-medium text-gray-900 mr-2">성명:</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-md text-gray-700 break-words">[담당자명]</span>
                    </div>
                    <div className="flex items-center flex-wrap">
                      <span className="font-medium text-gray-900 mr-2">직책:</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-md text-gray-700 break-words">[직책]</span>
                    </div>
                    <div className="flex items-center flex-wrap">
                      <span className="font-medium text-gray-900 mr-2">이메일:</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-md text-gray-700 break-all">[이메일 주소]</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-md p-3 break-words">
                  <Text.PARAGRAPH
                    text="개인정보 관련 문의사항, 불만처리, 피해구제 등에 관한 사항은 개인정보 보호책임자에게 연락해 주시기 바랍니다. PEEK은 이용자의 문의사항에 대해 신속하고 성실하게 답변해드리겠습니다."
                    className="text-gray-700 text-sm break-words"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 권익침해 구제방법 추가 */}
          <section className="bg-indigo-50 rounded-lg p-4 md:p-6 border border-indigo-200 break-words">
            <Text.TITLE
              text="9. 권익침해 구제방법"
              className="text-lg md:text-xl font-semibold text-indigo-800 mb-4 break-words"
            />
            <div className="bg-white rounded-md p-4 break-words">
              <Text.PARAGRAPH
                text="개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하실 수 있습니다:"
                className="text-gray-700 mb-4 break-words"
              />
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH
                      text="개인정보침해신고센터 (한국인터넷진흥원 운영)"
                      className="text-gray-700 font-medium break-words"
                    />
                    <Text.CAPTION text="- 전화: (국번없이) 118" className="text-gray-600 ml-0 break-words" />
                    <Text.CAPTION text="- 홈페이지: privacy.kisa.or.kr" className="text-gray-600 ml-0 break-all" />
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH text="개인정보 분쟁조정위원회" className="text-gray-700 font-medium break-words" />
                    <Text.CAPTION text="- 전화: (국번없이) 1833-6972" className="text-gray-600 ml-0 break-words" />
                    <Text.CAPTION text="- 홈페이지: www.kopico.go.kr" className="text-gray-600 ml-0 break-all" />
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH
                      text="대검찰청 사이버범죄수사단"
                      className="text-gray-700 font-medium break-words"
                    />
                    <Text.CAPTION text="- 전화: (국번없이) 1301" className="text-gray-600 ml-0 break-words" />
                    <Text.CAPTION text="- 홈페이지: www.spo.go.kr" className="text-gray-600 ml-0 break-all" />
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="break-words">
                    <Text.PARAGRAPH text="경찰청 사이버안전국" className="text-gray-700 font-medium break-words" />
                    <Text.CAPTION text="- 전화: (국번없이) 182" className="text-gray-600 ml-0 break-words" />
                    <Text.CAPTION
                      text="- 홈페이지: cyberbureau.police.go.kr"
                      className="text-gray-600 ml-0 break-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 처리방침 변경 */}
          <section className="bg-gray-50 rounded-lg p-4 md:p-6 break-words">
            <Text.TITLE
              text="10. 개인정보 처리방침 변경"
              className="text-lg md:text-xl font-semibold text-gray-900 mb-4 break-words"
            />
            <div className="bg-white rounded-md p-4 border-l-4 border-indigo-500 break-words">
              <Text.PARAGRAPH
                text="이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다. 다만, 개인정보의 수집 및 활용, 제3자 제공 등과 같이 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 고지합니다."
                className="text-gray-700 break-words"
              />
            </div>
          </section>
        </div>

        {/* 푸터 */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-lg">
            <svg
              className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0"
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
            <Text.CAPTION text="시행일: 2025년 9월 1일" className="text-gray-600 font-medium break-words" />
          </div>
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
