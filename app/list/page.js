import {
  Star,
  SquarePen,
  MessageCircleMore
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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

// supabase
import { createClientList } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
// 날짜 포맷
import { useFormatDate } from "@/utils/useFormatDate"

export default async function ListPage() {
  const {formatDate} = useFormatDate() // 리뷰 날짜 포맷팅
  // supabase
  const cookieStore = cookies()
  const supabase = createClientList(cookieStore)
  const { data: bbsLists } = await supabase.from('bbs').select()

  return (
    <>
    {/* <pre>{JSON.stringify(bbsLists, null, 2)}</pre> */}

    <div className="h-full p-5 sm:px-6">
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
                  <TableCell className="py-3">
                    <div className="font-medium truncate"><Link href="#">{ bbsList.title }</Link></div>
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <Badge className="text-xs" variant={ bbsList.type === "사내" ? "destructive" : "default" }>
                      { bbsList.type }
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-center hidden md:table-cell">
                    홍길동님
                  </TableCell>
                  <TableCell className="py-3 text-center hidden md:table-cell">
                    { formatDate(bbsList.created_at) }
                  </TableCell>
                  <TableCell className="py-3 text-center hidden lg:table-cell">
                    123
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>

    </>
  )
}