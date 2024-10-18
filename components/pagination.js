import Link from "next/link"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default async function PaginationUI({ currentPage, totalCount, itemsPerPage }) {
  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  // 현재 페이지가 유효한 범위 내에 있는지 확인
  currentPage = Math.max(1, Math.min(currentPage, totalPages))

  // 이전 및 다음 페이지 계산
  const prevPage = Math.max(currentPage - 1, 1)
  const nextPage = Math.min(currentPage + 1, totalPages)

  // 표시할 페이지 번호의 범위 설정
  const pageCount = 3 // 표시할 페이지 번호의 개수
  let startPage = Math.max(currentPage - Math.floor(pageCount / 2), 1)
  let endPage = startPage + pageCount - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(endPage - pageCount + 1, 1)
  }

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)

  return (
    <Pagination>
      {/* 퍼페이지 {itemsPerPage} / 
      토탈 {totalCount} / 
      쿼런트 {currentPage} / 
      프리뷰 {prevPage} /
      넥스트 {nextPage} /
      스타트 {startPage} /
      엔드 {endPage} /
      페이지넘버 {pageNumbers} */}
      <PaginationContent>
          <PaginationItem>
            <Link href={`?page=${prevPage}`} className={`inline-flex items-center justify-center px-2 mx-2 h-9 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground ${currentPage === 1 ? 'pointer-events-none opacity-60' : ''}`}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            <span>이전</span></Link>
          </PaginationItem>
            {pageNumbers.map(pageNumber => (
              <PaginationItem key={pageNumber}>
                  <Link prefetch={true} href={`?page=${pageNumber}`} className={`inline-flex items-center justify-center gap-2 w-8 h-8 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground ${currentPage === pageNumber ? 'border' : ''}`}>{pageNumber}</Link>
              </PaginationItem>
            ))}
          <PaginationItem>
            <Link href={`?page=${nextPage}`} className={`inline-flex items-center justify-center px-2 mx-2 h-9 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground ${currentPage >= endPage ? 'pointer-events-none opacity-60' : ''}`}>
            <span>다음</span>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></Link>
          </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}