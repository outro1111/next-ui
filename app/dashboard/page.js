import Image from "next/image"
import Link from "next/link"
import {
  CreditCard,
  Users,
  AlarmClockCheck,
  Command
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AspectRatio } from "@/components/ui/aspect-ratio"
// supabase
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
// 날짜 포맷
import { useFormatDate } from "@/utils/useFormatDate"
import { signOut } from '@/app/auth/login/actions'

export default async function Dashboard() {
  const {formatDate} = useFormatDate() // 리뷰 날짜 포맷팅
  const {formatDateHour} = useFormatDate() // 리뷰 날짜 시간 포맷팅
  // supabase
  const cookieStore = cookies()
  const supabaseList = createClient(cookieStore)
  const { data: bbsLists } = await supabaseList.from('bbs_list').select().limit(3).order('id', { ascending: false });

  const supabaseUser = createClient()
  const { data: getUser, error } = await supabaseUser.auth.getUser()

  const supabaseMail = createClient(cookieStore);
	const { data: mailsData } = await supabaseMail.from('mails').select('*').order('date', { ascending: false }).limit(10);

  function getBadgeVariantFromLabel(label) {
    if (["업무"].includes(label)) {
      return "default";
    }
    if (["개인"].includes(label)) {
      return "outline";
    }
    return "secondary";
  }

  return (
    <>
      {/* <pre>{JSON.stringify(bbsLists, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(getUser, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(mailsData, null, 2)}</pre> */}
      {/* {bbsLists.map((bbsList) => (
        <p key={bbsList.id}>
          <span>{bbsList.title}</span>
        </p>
      ))} */}
      <main className="grid flex-1 items-start gap-4 p-5 sm:pt-1 sm:px-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="xl:col-span-2 2xl:col-span-3" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle><Link prefetch={true} href="/list">공지 게시판</Link></CardTitle>
              </CardHeader>
              <CardContent>
              <Table className="table-fixed">
                  <TableHeader>
                    <TableRow>
                      <TableHead>제목</TableHead>
                      <TableHead className="w-24 hidden xl:table-cell">
                        구분
                      </TableHead>
                      <TableHead className="w-32 hidden 2xl:table-cell">
                      작성일
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bbsLists.map((bbsList, index) => (
                      <TableRow className={index === 0 ? "bg-accent" : ""} key={ bbsList.id }>
                        <TableCell className="p-0">
                          <Link prefetch={true} href={`/list/${bbsList.id}`} className="block font-medium truncate p-3 pl-4">{ bbsList.title }</Link>
                        </TableCell>
                        <TableCell className="p-0 hidden xl:table-cell">
                          <Link prefetch={true} href={`/list/${bbsList.id}`} className="block truncate p-3">
                            <Badge className="text-xs" variant={ bbsList.type === "사내" ? "destructive" : "default" }>
                              { bbsList.type }
                            </Badge>
                          </Link>
                        </TableCell>
                        <TableCell className="p-0 hidden 2xl:table-cell">
                          <Link prefetch={true} href={`/list/${bbsList.id}`} className="block p-3">
                            { formatDate(bbsList.created_at) }
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="xl:col-span-2 2xl:col-span-1" x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-3">
                <CardTitle>{ getUser.user.user_metadata.last_name }{ getUser.user.user_metadata.first_name }</CardTitle>
                <div className="flex items-start py-4">
                  <div className="flex items-start gap-4 text-sm">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/member_avatar/2.png`} />
                      <AvatarFallback>NA</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="line-clamp-1 text-lg">Cellink</div>
                      <div className="line-clamp-1 text-sm">
                        <span className="font-medium">부서 :</span> { getUser.user.user_metadata.department }
                      </div>
                      <div className="line-clamp-1 text-sm">
                        <span className="font-medium">직급 :</span> { getUser.user.user_metadata.position }
                      </div>
                      <div className="line-clamp-1 text-sm">
                        <span className="font-medium">근무시간 :</span> 08:30_17:30
                      </div>
                      <div className="line-clamp-1 text-sm">
                        <span className="font-medium">근무장소 :</span> 본사 4층
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter>
                <form>
                  <Button variant="outline" size="sm" formAction={signOut}>로그아웃</Button>
                </form>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-semibold">임직원 검색</CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-4">
                {/* <div className="text-2xl font-bold">+270</div> */}
                <p className="text-sm text-muted-foreground">
                  조직 내 임직원을 검색합니다
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  <Link prefetch={true} href="/members">검색하기</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-semibold">회의실 예약</CardTitle>
                <AlarmClockCheck className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-4">
                {/* <div className="text-2xl font-bold">+5</div> */}
                <p className="text-sm text-muted-foreground">
                  예약 가능한 회의실이 있습니다.
                </p>
              </CardContent>
              <CardFooter>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">예약하기</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>준비중입니다</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-semibold">eHR</CardTitle>
                <Command className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-4">
                {/* <div className="text-2xl font-bold">+12,234</div> */}
                <p className="text-sm text-muted-foreground">
                eHR 정보를 확인 할 수 있습니다.
                </p>
              </CardContent>
              <CardFooter>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">바로가기</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>준비중입니다</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-semibold">복리후생</CardTitle>
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-4">
                {/* <div className="text-2xl font-bold">+573</div> */}
                <p className="text-sm text-muted-foreground">
                복리후생 정보를 확인 할 수 있습니다.
                </p>
              </CardContent>
              <CardFooter>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">바로가기</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>준비중입니다</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between flex-wrap px-7">
              <CardTitle><Link prefetch={true} href="/mail">받은 메일</Link></CardTitle>
              <Button variant="outline" size="sm">
                <Link prefetch={true} href="/mail">메일쓰기</Link>
              </Button>
              <CardDescription className="basis-full">
                { getUser.user.user_metadata.email } 계정의 새로 받은 메일을 확인 할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24 md:w-32 2xl:w-40">보낸사람</TableHead>
                    <TableHead>제목</TableHead>
                    <TableHead className="w-56 hidden xl:table-cell">타입</TableHead>
                    <TableHead className="w-44 hidden lg:table-cell">날짜</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mailsData.map((mails, index) => (
                    <TableRow className={`${!mails.read ? "bg-accent" : ""}`} key={ mails.id }>
                      <TableCell className="p-0">
                        <Link prefetch={true} href="/mail" className="block font-medium truncate p-3 pl-4">{ mails.name }</Link>
                      </TableCell>
                      <TableCell className="p-0">
                        <Link prefetch={true} href="/mail" className="block font-medium truncate p-3">
                          {!mails.read && <span className="inline-block h-2 w-2 mr-1 rounded-full bg-blue-600" />}  
                          { mails.subject }
                        </Link>
                      </TableCell>
                      <TableCell className="p-0 hidden xl:table-cell">
                        <Link prefetch={true} href="/mail" className="block font-medium p-3">
                          {mails.labels.length ? (
                            <div className="flex items-center gap-1">
                              {mails.labels.map((label) => (
                                <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                                  {label}
                                </Badge>
                              ))}
                            </div>
                          ) : null}
                        </Link>
                      </TableCell>
                      <TableCell className="p-0 hidden lg:table-cell">
                        <Link prefetch={true} href="/mail" className="block p-3">{ formatDateHour(mails.date) }</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start p-5 pb-6 bg-muted/50">
              <div className="grid gap-0.5 w-full">
                <AspectRatio ratio={21 / 5} className="rounded-xl">
                  <Link href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/banner/styleguide.pdf`} target="_blank">
                    <Image
                      // src="/images/banner-1.jpg"
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/banner/banner-1.svg`}
                      alt="Style Guide"
                      width={852}
                      height={200}
                      // fill
                      className="w-full rounded-xl object-cover hidden sm:block lg:hidden xl:block"
                    />
                    <Image
                      // src="/images/banner-1.jpg"
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/banner/banner-1-m.svg`}
                      alt="Style Guide"
                      width={240}
                      height={57}
                      // fill
                      className="w-full rounded-xl object-cover sm:hidden lg:block xl:hidden"
                    />
                  </Link>
                </AspectRatio>
                <AspectRatio ratio={21 / 5} className="mt-2 rounded-xl">
                  <Link href="https://cjics.cj.net/confluence/display/NextjsPJT" target="_blank">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/banner/banner-2.svg`}
                      alt="Web planning"
                      width={852}
                      height={200}
                      // fill
                      className="w-full rounded-xl object-cover hidden sm:block lg:hidden xl:block"
                    />
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/banner/banner-2-m.svg`}
                      alt="Web planning"
                      width={240}
                      height={57}
                      // fill
                      className="w-full rounded-xl object-cover sm:hidden lg:block xl:hidden"
                    />
                  </Link>
                </AspectRatio>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <div className="font-semibold">Front-end Framework</div>
                  <div className="grid gap-0.5 text-muted-foreground">
                    <span className="font-semibold">Next.js</span>
                    <span>(The React Framework)</span>
                  </div>
                </div>
                <div className="grid auto-rows-max gap-2">
                  <div className="font-semibold">UI library</div>
                  <div className="grid gap-0.5 text-muted-foreground">
                    <span className="font-semibold">shadcn/ui</span>
                    <span>(Designed Components)</span>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <div className="font-semibold">Back-End</div>
                  <div className="grid gap-0.5 text-muted-foreground">
                    <span className="font-semibold">Supabase</span>
                    <span>(Open source database hosting)</span>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-2">
                <div className="font-semibold">메일</div>
                <dl className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <dt>Data Fetch</dt>
                    <dd className="text-muted-foreground">메일 리스트 내용 데이터</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Jotai v2</dt>
                    <dd className="text-muted-foreground">React 상태 관리</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Resizable-panels</dt>
                    <dd className="text-muted-foreground">크기 조절 가능한 패널 그룹</dd>
                  </div>
                </dl>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-2">
                <div className="font-semibold">공지 게시판</div>
                <dl className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <dt>Data Fetch</dt>
                    <dd className="text-muted-foreground">공지 게시판 데이터</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Details Page</dt>
                    <dd className="text-muted-foreground">동적 라우팅 상세 및 페이징</dd>
                  </div>
                </dl>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-2">
                <div className="font-semibold">임직원 검색</div>
                <dl className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <dt>Data Fetch</dt>
                    <dd className="text-muted-foreground">임직원 리스트 데이터</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Search Filter</dt>
                    <dd className="text-muted-foreground">실시간 검색 URL 업데이트</dd>
                  </div>
                </dl>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-2">
                <div className="font-semibold">로그인</div>
                <dl className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <dt>Users Authentication</dt>
                    <dd className="text-muted-foreground">로그인 인증 권한부여</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Sign up</dt>
                    <dd className="text-muted-foreground">이메일과 비밀번호로 회원가입</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Reset Password</dt>
                    <dd className="text-muted-foreground">이메일 인증을 통한 비밀번호 리셋</dd>
                  </div>
                </dl>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-2">
                <div className="font-semibold">레이아웃/테마</div>
                <dl className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <dt>Dark mode</dt>
                    <dd className="text-muted-foreground">다크모드 테마 적용</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Responsive Web</dt>
                    <dd className="text-muted-foreground">반응형 레이아웃</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}

export const metadata = {
  title: "Cellink | Dashboard",
  description: "Dashboard",
}