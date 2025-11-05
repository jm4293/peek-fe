export interface SignUpEmailReq {
  nickname: string;
  name: string;
  policy: boolean;
  birthdate: string;
  email: string;
  password: string;
}

export interface SignUpEmailRes {
  email: string;
}
