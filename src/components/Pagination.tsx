import classnames from 'classnames';
import { usePagination, DOTS } from '../hooks/usePagination';
import './pagination.scss';

type paginationProps = {
    onPageChange: (currentPage: number) => void,
    totalCount: number
    siblingCount: number
    currentPage: number
    pageSize: number
    pageNumber: any
    className: string
}

export function Pagination({
    onPageChange, 
    currentPage, 
    siblingCount, 
    totalCount, 
    pageSize, 
    className
}: paginationProps) {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if(paginationRange){
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
  }
  
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange?.[paginationRange.length - 1];

  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
       {/* LEFT ARROW */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange?.map((pageNumber, index) => {

        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
		
        // CURRENT PAGE NUMBER
        return (
            <li
            key={index}
            className={classnames('pagination-item', {
                selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(Number(pageNumber))}
            >
            {pageNumber}
            </li>
        );
      })}
      {/*  RIGHT ARROW */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};
