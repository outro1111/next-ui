import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  Eye
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// supabase
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
// 날짜 포맷
import { useFormatDate } from "@/utils/useFormatDate"

export default async function ListPage({ params: {id} }) {
  const {formatDate} = useFormatDate() // 리뷰 날짜 포맷팅
  // supabase
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: bbsDetails } = await supabase.from('bbs_list').select().eq('id', id)
  const bbsDetail = bbsDetails[0]

  return (
    <>
    {/* <pre>{JSON.stringify(bbsDetails, null, 2)}</pre> */}

    <div className="h-full p-5 sm:pt-1 sm:px-6">
      <Card>
        <CardHeader className="my-4">
          <CardTitle className="flex items-baseline md:items-center gap-3 flex-col md:flex-row">
            <Badge className="text-xs min-w-11" variant={ bbsDetail.type === "사내" ? "destructive" : "default" }>
              { bbsDetail.type }
            </Badge>
            <span className="leading-8">{ bbsDetail.title }</span>
          </CardTitle>
          <CardDescription className="flex items-center gap-4 py-2 justify-end">
            <span>{ formatDate(bbsDetail.created_at) }</span>
            <span>{ bbsDetail.writer }</span>
            <span className="flex items-center gap-1"><Eye className="h-4 w-4 text-muted-foreground" /> { bbsDetail.view_count }</span>
          </CardDescription>
          <Separator className="my-6" />
        </CardHeader>
        <CardContent className="px-7 sm:px-10 pb-14">
          <p className="whitespace-pre-wrap leading-7">{ bbsDetail.contents }</p>
        </CardContent>
      </Card>
      <div className="flex items-center py-4">
        <Button size="sm" className="ml-auto" asChild>
          <Link prefetch={true} href="/list">목록으로</Link>
        </Button>
      </div>
    </div>
    </>
  )
}

export const metadata = {
  title: "Cellink | 공지 게시판",
  description: "공지 게시판",
}