import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function PrivacyPolicyPage() {
  return (
    <Wrapper.SECTION>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-center items-center">
          <Text.HEADING text="개인정보 처리방침" />
          <Text.PARAGRAPH text="PEEK은 이용자의 개인정보를 보호하기 위해 최선을 다하고 있습니다." color="gray" />
        </div>

        <section className="flex flex-col gap-4">
          <Text.TITLE text="1. 개인정보 수집 항목" />

          <div>
            <Text.SUBTITLE text="필수 수집 항목:" />
            <ol className="flex flex-col gap-1 pl-4">
              <li>
                <Text.PARAGRAPH text="이메일 주소 (회원가입 및 로그인)" />
              </li>
              <li>
                <Text.PARAGRAPH text="비밀번호 (이메일 회원가입 시)" />
              </li>
              <li>
                <Text.PARAGRAPH text="닉네임 (커뮤니티 활동용)" />
              </li>
              <li>
                <Text.PARAGRAPH text="이름 (실명 확인용)" />
              </li>
            </ol>
          </div>

          <div>
            <Text.SUBTITLE text="소셜 로그인 시 수집 항목:" />
            <ol className="flex flex-col gap-1 pl-4">
              <li>
                <Text.PARAGRAPH text="구글: 이메일, 프로필 정보" />
              </li>
              <li>
                <Text.PARAGRAPH text="카카오: 이메일, 프로필 정보" />
              </li>
              <li>
                <Text.PARAGRAPH text="네이버: 이메일, 프로필 정보" />
              </li>
            </ol>
          </div>

          <div>
            <Text.SUBTITLE text="서비스 이용 중 자동 수집 항목:" />
            <ol className="flex flex-col gap-1 pl-4">
              <li>
                <Text.PARAGRAPH text="IP 주소, 접속 로그, 쿠키, 서비스 이용 기록" />
              </li>
              <li>
                <Text.PARAGRAPH text="게시글, 댓글 작성 내용" />
              </li>
              <li>
                <Text.PARAGRAPH text="업로드한 이미지 파일" />
              </li>
            </ol>
          </div>
        </section>

        <section>
          <Text.TITLE text="2. 개인정보 수집 및 이용 목적" />
          <ol className="flex flex-col gap-1 pl-4">
            <li>
              <Text.PARAGRAPH text="회원 관리: 회원가입, 로그인, 본인 확인, 회원정보 수정" />
            </li>
            <li>
              <Text.PARAGRAPH text="서비스 제공: 주식 정보 제공, 커뮤니티 기능 제공" />
            </li>
            <li>
              <Text.PARAGRAPH text="커뮤니티 활동: 게시글 작성, 댓글 작성, 사용자 간 소통" />
            </li>
            <li>
              <Text.PARAGRAPH text="고객 지원: 문의사항 처리, 서비스 개선" />
            </li>
            <li>
              <Text.PARAGRAPH text="보안: 부정 이용 방지, 서비스 안정성 확보" />
            </li>
          </ol>
        </section>

        <section>
          <Text.TITLE text="3. 개인정보 보유 및 이용 기간" />
          <ol className="flex flex-col gap-1 pl-4">
            <li>
              <Text.PARAGRAPH text="회원 정보: 회원 탈퇴 시까지 (단, 관련 법령에 의해 보존이 필요한 경우 해당 기간까지)" />
            </li>
            <li>
              <Text.PARAGRAPH text="게시글/댓글: 회원 탈퇴 후 30일 (다른 사용자와의 소통 기록 보존)" />
            </li>
            <li>
              <Text.PARAGRAPH text="로그 기록: 3개월" />
            </li>
            <li>
              <Text.PARAGRAPH text="이미지 파일: 회원 탈퇴 시 삭제" />
            </li>
          </ol>
        </section>

        <section>
          <Text.TITLE text="4. 개인정보 제3자 제공" />
          <Text.PARAGRAPH text="PEEK은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다:" />
          <ol className="flex flex-col gap-1 pl-4">
            <li>
              <Text.PARAGRAPH text="이용자가 사전에 동의한 경우" />
            </li>
            <li>
              <Text.PARAGRAPH text="법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우" />
            </li>
          </ol>
        </section>

        <section>
          <Text.TITLE text="5. 개인정보 처리 위탁" />
          <ol className="flex flex-col gap-1 pl-4">
            <li>
              <Text.PARAGRAPH text="이미지 저장: AWS S3 (이미지 파일 저장 및 관리)" />
            </li>
            <li>
              <Text.PARAGRAPH text="소셜 로그인: 구글, 카카오, 네이버 (인증 처리)" />
            </li>
          </ol>
        </section>

        <section>
          <Text.TITLE text="6. 개인정보의 안전성 확보 조치" />
          <ol className="flex flex-col gap-1 pl-4">
            <li>
              <Text.PARAGRAPH text="개인정보 암호화 저장" />
            </li>
            <li>
              <Text.PARAGRAPH text="접근 권한 관리" />
            </li>
            <li>
              <Text.PARAGRAPH text="정기적인 보안 점검" />
            </li>
            <li>
              <Text.PARAGRAPH text="개인정보 처리시스템 접근 기록 보관" />
            </li>
          </ol>
        </section>

        <section>
          <Text.TITLE text="7. 이용자 권리" />
          <Text.PARAGRAPH text="이용자는 언제든지 다음의 권리를 행사할 수 있습니다:" />
          <ol className="flex flex-col gap-1 pl-4">
            <li>
              <Text.PARAGRAPH text="개인정보 처리 현황에 대한 열람 요구" />
            </li>
            <li>
              <Text.PARAGRAPH text="오류 등이 있을 경우 정정·삭제 요구" />
            </li>
            <li>
              <Text.PARAGRAPH text="처리정지 요구" />
            </li>
            <li>
              <Text.PARAGRAPH text="회원 탈퇴" />
            </li>
          </ol>
        </section>

        <section>
          <Text.TITLE text="8. 개인정보 보호책임자" />
          <ol className="flex flex-col gap-1 pl-4">
            <li>
              <Text.PARAGRAPH text="성명: [담당자명]" />
            </li>
            <li>
              <Text.PARAGRAPH text="연락처: [이메일 주소]" />
            </li>
          </ol>
        </section>

        <section>
          <Text.TITLE text="9. 개인정보 처리방침 변경" />
          <Text.PARAGRAPH text="이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다." />
        </section>

        <div className="text-center pt-8 border-t">
          <Text.CAPTION text="시행일: 2025년 9월 1일" color="gray" />
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
