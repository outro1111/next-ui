import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import PaginationUI from "@/components/pagination"

// supabase
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
// 날짜 포맷
import { useFormatDate } from "@/utils/useFormatDate"

export default async function ListPage({ searchParams: {page = 1} }) {
  const {formatDate} = useFormatDate() // 리뷰 날짜 포맷팅
  const itemsPerPage = 10 // 한페이지 불러올 게시글 수
  // supabase
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data: bbsLists, count } = await supabase.from('bbs_list').select('*', { count: 'exact' }).order('id', { ascending: false }).range((page - 1) * itemsPerPage, page * itemsPerPage - 1)

  return (
    <>
    {/* <pre>{JSON.stringify(bbsLists, null, 2)}</pre> */}

    <div className="h-full p-5 sm:pt-1 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle>공지 게시판</CardTitle>
          <CardDescription>
            그룹, 사내 공지 게시판을 확인 할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Table className="table-fixed md:table-auto">
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead className="w-24 md:w-auto text-center">
                  구분
                </TableHead>
                <TableHead className="text-center hidden md:table-cell">
                  작성자
                </TableHead>
                <TableHead className="text-center hidden md:table-cell">
                  작성일
                </TableHead>
                <TableHead className="text-center hidden lg:table-cell">
                  조회
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bbsLists.map((bbsList, index) => (
                <TableRow className={index === 0 ? "bg-accent" : ""} key={ bbsList.id }>
                  <TableCell className="p-0">
                    <Link prefetch={true} href={`/list/${bbsList.id}`} className="block font-medium truncate p-3 pl-4">{ bbsList.title }</Link>
                  </TableCell>
                  <TableCell className="p-0 text-center">
                    <Link href={`/list/${bbsList.id}`} className="block truncate p-3">
                      <Badge className="text-xs" variant={ bbsList.type === "사내" ? "destructive" : "default" }>
                        { bbsList.type }
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-center hidden md:table-cell">
                    <Link href={`/list/${bbsList.id}`} className="block p-3">
                      { bbsList.writer }
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-center hidden md:table-cell">
                    <Link href={`/list/${bbsList.id}`} className="block p-3">
                      { formatDate(bbsList.created_at) }
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-center hidden lg:table-cell">
                    <Link href={`/list/${bbsList.id}`} className="block p-3"> 
                      { bbsList.view_count }
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="mb-6" />
          {/* <PaginationUI /> */}
          <PaginationUI currentPage={page} totalCount={count} itemsPerPage={itemsPerPage} />
        </CardContent>
      </Card>
    </div>

    </>
  )
}

export const metadata = {
  title: "Cellink | 공지 게시판",
  description: "공지 게시판",
}