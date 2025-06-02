export enum BoardTypeEnum {
  GENERAL = 1,
  NOTICE = 2,
  EMERGENCY = 3,
}

export const BoardTypeEnumList: {
  [key in BoardTypeEnum]: {
    label: string;
    color: 'black' | 'red';
  };
} = {
  [BoardTypeEnum.GENERAL]: { label: '일반', color: 'black' },
  [BoardTypeEnum.NOTICE]: { label: '공지', color: 'black' },
  [BoardTypeEnum.EMERGENCY]: { label: '긴급', color: 'red' },
};
