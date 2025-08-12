export class QueryKeys {
  static user = {
    myInfo: () => ['my-info'],
    all: () => ['user'],
  };

  static board = {
    detail: (boardId: string) => ['board', 'detail', boardId],
    list: (category?: number) => ['board', 'list', category],
    categoryList: () => ['board', 'categories'],
  };
}
