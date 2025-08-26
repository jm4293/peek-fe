'use client';

import { useCodeKoreanList } from '@/services/stock';

export const CodeKoreanList = () => {
  const { data, isSuccess, isPending } = useCodeKoreanList({});

  const handleChange = () => {};

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input list="company-list" placeholder="회사명 검색" onChange={handleChange} />
      <datalist id="company-list">
        {isSuccess && data.codeList.map((code) => <option key={code.id} value={code.code} label={code.companyName} />)}
      </datalist>
    </div>
  );
};
