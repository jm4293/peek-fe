export enum NoticeTypeEnum {
  NOTICE = 1,
  EMERGENCY = 2,
}

export const NoticeTypeEnumList: {
  [key in NoticeTypeEnum]: {
    label: string;
    color: 'default' | 'red';
  };
} = {
  [NoticeTypeEnum.NOTICE]: { label: '일반', color: 'default' },
  [NoticeTypeEnum.EMERGENCY]: { label: '긴급', color: 'red' },
};
