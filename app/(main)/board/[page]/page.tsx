async function getBoardList(params: { page: string }) {
  const { page } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_API_PREFIX}/board?pageParam=${page}`,
    { method: 'GET' },
  );

  return await res.json();
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;

  const boardList = await getBoardList({ page });

  return (
    <div>
      <p>board</p>

      {boardList.data.boards.length > 0 ? (
        boardList.data.boards.map((item: any) => {
          return (
            <div key={item.boardSeq}>
              <p>{item.title}</p>
              <p>{item.content}</p>
              <p>{item.createdAt}</p>
            </div>
          );
        })
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
}
