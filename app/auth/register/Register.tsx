'use client';

import { ValidationUtil } from '@/utils';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import { CheckBox, Input } from '@/components/input';
import { PreText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useInput } from '@/hooks/input';
import { useModal, useToast } from '@/hooks/modal';

import { ISignUpDto, useAuthMutation } from '@/services/auth';

dayjs.extend(duration);

const initialFormData: ISignUpDto = {
  nickname: '',
  name: '',
  policy: false,
  birthdate: '',
  email: '',
  password: '',
};

const PRIVACY = `1. 개인정보 수집 항목

필수 수집 항목:
- 이메일 주소 (회원가입 및 로그인)
- 비밀번호 (이메일 회원가입 시)
- 닉네임 (커뮤니티 활동용)
- 이름 (실명 확인용)

소셜 로그인 시 수집 항목:
- 구글: 이메일, 프로필 정보
- 카카오: 이메일, 프로필 정보
- 네이버: 이메일, 프로필 정보

서비스 이용 중 자동 수집 항목:
- IP 주소, 접속 로그, 쿠키, 서비스 이용 기록
- 게시글, 댓글 작성 내용
- 업로드한 이미지 파일

2. 개인정보 수집 및 이용 목적
- 회원 관리: 회원가입, 로그인, 본인 확인, 회원정보 수정
- 서비스 제공: 주식 정보 제공, 커뮤니티 기능 제공
- 커뮤니티 활동: 게시글 작성, 댓글 작성, 사용자 간 소통
- 고객 지원: 문의사항 처리, 서비스 개선
- 보안: 부정 이용 방지, 서비스 안정성 확보

3. 개인정보 보유 및 이용 기간
- 회원 정보: 회원 탈퇴 시까지 (단, 관련 법령에 의해 보존이 필요한 경우 해당 기간까지)
- 게시글/댓글: 회원 탈퇴 후 30일 (다른 사용자와의 소통 기록 보존)
- 로그 기록: 3개월
- 이미지 파일: 회원 탈퇴 시 삭제

4. 개인정보 제3자 제공
PEEK은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다:
- 이용자가 사전에 동의한 경우
- 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우

5. 개인정보 처리 위탁
- 이미지 저장: AWS S3 (이미지 파일 저장 및 관리)
- 소셜 로그인: 구글, 카카오, 네이버 (인증 처리)

6. 개인정보의 안전성 확보 조치
- 개인정보 암호화 저장
- 접근 권한 관리
- 정기적인 보안 점검
- 개인정보 처리시스템 접근 기록 보관

7. 이용자 권리
이용자는 언제든지 다음의 권리를 행사할 수 있습니다:
- 개인정보 처리 현황에 대한 열람 요구
- 오류 등이 있을 경우 정정·삭제 요구
- 처리정지 요구
- 회원 탈퇴

8. 개인정보 보호책임자
- 성명: [담당자명]
- 연락처: [이메일 주소]

9. 개인정보 처리방침 변경
이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.

시행일: 2025년 9월 1일
`;

export default function Register() {
  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const [checkEmail, setCheckEmail] = useState<number>(1);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [code, setCode] = useState('');
  const [count, setCount] = useState(300);

  const [value, onChange] = useInput<ISignUpDto>({ ...initialFormData });

  const { checkEmailMutation, checkEmailCodeMutation, signUpMutation } = useAuthMutation();

  const handleCheckEmail = async () => {
    const isValid = ValidationUtil.create()
      .required(value.email, '이메일을 입력해주세요.')
      .email(value.email, '유효한 이메일 주소가 아닙니다.')
      .validate((errorMessage) => {
        openModal({ content: errorMessage, onConfirm: closeModal });
      });

    if (!isValid) {
      return;
    }

    checkEmailMutation.mutate(
      { email: value.email },
      {
        onSuccess: (res) => {
          const { isExist, message } = res.data;

          if (isExist) {
            openToast({ message, type: 'error' });
            return;
          }

          openToast({ message: '이메일 인증코드를 전송했습니다.', type: 'success' });
          setCheckEmail(2);
        },
      },
    );
  };

  const handleCheckCode = async () => {
    const isValid = ValidationUtil.create()
      .required(code, '인증코드를 입력해주세요.')
      .minLength(code, 4, '인증코드는 4글자입니다.')
      .maxLength(code, 4, '인증코드는 4글자입니다.')
      .validate((errorMessage) => {
        openModal({ content: errorMessage, onConfirm: closeModal });
      });

    if (!isValid) {
      return;
    }

    checkEmailCodeMutation.mutate(
      { email: value.email, code },
      {
        onSuccess: (res) => {
          const { success, message } = res.data;

          if (!success) {
            openToast({ message, type: 'error' });
            return;
          }

          openToast({ message, type: 'success' });
          setCheckEmail(3);
        },
      },
    );
  };

  const handleSubmit = async () => {
    const isValid = ValidationUtil.create()
      .required(value.email, '이메일을 입력해주세요.')
      .email(value.email, '유효한 이메일 주소가 아닙니다.')
      .custom(() => checkEmail === 3, '이메일 인증을 완료해 주세요.')
      .required(value.password, '비밀번호를 입력해주세요.')
      .minLength(value.password, 6, '비밀번호는 최소 6글자 이상이어야 합니다')
      .custom(() => value.password === passwordConfirm, '비밀번호가 일치하지 않습니다.')
      .required(value.nickname, '닉네임을 입력해주세요.')
      .required(value.name, '이름을 입력해주세요.')
      .custom(() => value.policy, '정책에 동의해주세요.')
      .validate((errorMessage) => {
        openModal({ content: errorMessage, onConfirm: closeModal });
      });

    if (!isValid) {
      return;
    }

    signUpMutation.mutate(value);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (checkEmail === 2) {
      interval = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            setCheckEmail(1);
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        setCount(300);
        clearInterval(interval);
      }
    };
  }, [checkEmail]);

  return (
    <Wrapper.SECTION>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            className="w-full col-span-2"
            title="이메일"
            name="email"
            value={value.email}
            onChange={onChange}
            placeholder="이메일 주소"
            disabled={checkEmail !== 1}
            required>
            <div className="cursor-pointer" onClick={handleCheckEmail}>
              <Text.HEADING
                text={checkEmailMutation.isPending ? '전송 중' : '인증'}
                color={`${checkEmailMutation.isPending ? 'gray' : 'blue'}`}
              />
            </div>
          </Input>

          {checkEmail !== 1 && (
            <Input
              type="number"
              className="col-span-2"
              title="인증코드"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증코드"
              minLength={4}
              maxLength={4}
              disabled={checkEmail === 3}
              required>
              <div className="flex items-center gap-2">
                {checkEmail !== 3 && <Text.CAPTION text={dayjs.duration(count, 'seconds').format('m:ss')} />}
                <div className="cursor-pointer" onClick={handleCheckCode}>
                  <Text.HEADING
                    text={checkEmail === 3 ? '완료' : checkEmailCodeMutation.isPending ? '확인 중' : '확인'}
                    color={checkEmail === 3 ? 'gray' : 'blue'}
                  />
                </div>
              </div>
            </Input>
          )}

          <Input
            type="password"
            title="비밀번호"
            name="password"
            value={value.password}
            onChange={onChange}
            placeholder="비밀번호"
            required
          />
          <Input
            type="password"
            title="비밀번호 확인"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호 확인"
            required
          />
        </div>

        <div className="flex flex-col gap-4">
          <Input
            title="닉네임"
            name="nickname"
            value={value.nickname}
            onChange={onChange}
            placeholder="닉네임"
            required
          />
          <Input title="이름" name="name" value={value.name} onChange={onChange} placeholder="이름" required />
          {/* <Input
          title="생년월일 8자리"
          name="birthdate"
          value={value.birthdate}
          onChange={onChange}
          placeholder="생년월일 8자리"
          optional
        /> */}

          <div className="mt-4 flex flex-col gap-2">
            <Text.HEADING text="개인정보 처리방침" />
            <div className="h-40 overflow-auto border border-theme-txt-gray p-2">
              <PreText text={PRIVACY} />
            </div>
          </div>

          <div className="flex justify-end">
            <CheckBox title="(필수) 정책에 동의합니다" name="policy" checked={value.policy} onChange={onChange} />
          </div>

          <div className="w-full flex gap-2">
            <Link href="/auth/login" className="w-full">
              <Button.OUTLINE text="뒤로가기" />
            </Link>
            <Button.CONTAINER text="회원가입" onClick={handleSubmit} disabled={signUpMutation.isPending} />
          </div>
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
