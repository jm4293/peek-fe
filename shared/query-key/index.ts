export class QueryKeys {
  static user = {
    myInfo: () => ['my-info'],
    all: () => ['user'],
  };

  static board = {
    detail: (boardId: string) => ['board', 'detail', boardId],
    list: (category?: number) => ['board', 'list', category],
    commentList: (boardId: string) => ['board', 'comment', boardId],
    mineList: () => ['board', 'list-mine'],
    mineCommentList: () => ['board', 'comment', 'mine'],
  };

  static stock = {
    token: () => ['stock', 'token'],
    koreanList: () => ['stock', 'korean-list'],
  };
}
