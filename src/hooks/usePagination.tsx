import { useMemo } from 'react'

export const DOTS = "...";
function range(start: number, end: number){
    let length = end - start + 1;
   
// Creeaza o matrice de o anumita lungime si seteaza elementele din ea de la valoarea de start la cea de final
    return Array.from({ length }, (_, idx) => idx + start);
};

type usePaginationProps = {
    totalCount: number
    pageSize: number
    siblingCount: number
    currentPage: number
    // paginationRange: number[]
}

export function usePagination({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}: usePaginationProps) {
  
  const paginationRange = useMemo(() => {
   
    const totalPageCount = Math.ceil(totalCount / pageSize);
  
// Numarul paginilor este determinat de operatia siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

// Cazul 1:
// Daca numarul de pagini este mai mic decat nr de pagini pe care dorim sa il aratam 
// in componentul paginationComponent, aratam rangeul [1..totalPageCount]
    if (totalPageNumbers >= totalPageCount) {
        return range(1, totalPageCount);
    }
	
    
// Calculeaza indexul paginii din stanga si dreapta si asigura ca este in raza 1 si totalPageCount
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

/*
    Nu arătăm puncte doar atunci când există doar un număr de pagină care trebuie inserat între extremele fratelui și
limitele de pagină, adică 1 și totalPageCount. Prin urmare, folosim leftSiblingIndex > 2 și rightSiblingIndex < totalPageCount - 2
*/
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

   

// Cazul 2: Nu sunt puncte in stanga, doar in dreapta 
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    
// Cazul 3: Nu sunt puncte in dreapta, doar in stanga 
    if (shouldShowLeftDots && !shouldShowRightDots) {
      
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
     
 
    
// Cazul 4: Sunt puncte atat in dreapta cat si in stanga
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};