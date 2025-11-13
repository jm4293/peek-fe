import { JSX } from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  children: JSX.Element | JSX.Element[];
}

export const PaginationTable = (props: Props) => {
  const { currentPage, totalPages, onPageChange, children } = props;

  return (
    <>
      {children}

      <div>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};
