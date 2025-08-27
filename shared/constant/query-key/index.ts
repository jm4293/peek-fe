export const QueryKeys = {
  user: {
    myInfo: () => ['my-info'],
    all: () => ['user'],
  },
  board: {
    detail: (boardId: string) => ['board', 'detail', boardId],
    list: (category?: number) => ['board', 'list', category],
    commentList: (boardId: string) => ['board', 'comment', boardId],
    mineList: () => ['board', 'list-mine'],
    mineCommentList: () => ['board', 'comment', 'mine'],
  },
  stock: {
    token: () => ['stock', 'token'],
    koreanList: (text?: string) => ['stock', 'korean-list', text],
  },
};
