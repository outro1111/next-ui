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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers"
import SearchInput from "./components/search"

export default async function MembersPage({ searchParams: {name} }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: members } = await supabase.rpc('get_all_memeber').order('name', { ascending: true });
  // const { data: members } = await supabase.rpc('get_all_memeber');

  const { data: membersName, error } = await supabase.rpc('get_memeber_from_name', {
    v_name: name
  });

  let filteredMembers;
  if (name) { // name이 있을 경우 조건에 맞는 데이터 필터링
      //filteredMembers = members.filter(member => member.name.toLowerCase().includes(name.toLowerCase()));

      //function 호출 방법
      filteredMembers = membersName
  } else { // name이 없을 경우 모든 멤버 반환
      filteredMembers = members;
  }

  return (
    <>
    {/* <pre>{JSON.stringify(members, null, 2)}</pre> */}

    <div className="h-full p-5 sm:pt-1 sm:px-6">
    <Card>
      <CardHeader>
        <CardTitle>임직원 검색</CardTitle>
        <CardDescription>
          이름으로 임직원을 검색 할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <SearchInput />
        </div>
        <div className="space-y-4 my-4 sm:m-4">
          <h4 className="text-sm font-medium py-2">임직원 <strong className="text-blue-500">{ filteredMembers.length }</strong>명</h4>
          {filteredMembers.length ? 
            <div className="grid gap-6">
            {filteredMembers.map((member, index) => (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 items-center  justify-between gap-4" key={ member.memb_id }>
                <div className="flex gap-4 col-span-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/member_avatar/${member.memb_id}.png`} />
                    <AvatarFallback>{ member.memb_id }</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1 content-center">
                    <p className="text-base font-medium leading-none">{ member.name }</p>
                    <p className="text-sm text-muted-foreground">{ member.mail_addr }</p>
                  </div>
                </div>
                <div className="gap-1">
                  <p className="text-sm font-medium leading-none">{ member.phone_number }</p>
                </div>
                <div className="gap-1 hidden md:grid">
                  <p className="text-sm font-medium">{ member.position }</p>
                  <p className="text-sm text-muted-foreground">{ member.job }</p>
                </div>
                <div className="flex justify-end gap-4 mr-6 hidden lg:flex">
                  <Button variant="ghost" size="icon"><Star /></Button>
                  <Button variant="ghost" size="icon"><SquarePen /></Button>
                  <Button variant="ghost" size="icon"><MessageCircleMore /></Button>
                </div>
              </div>
            ))}
            </div>
            :
            <div className="text-center py-28 decoration-orange-500">검색된 임직원이 없습니다.</div>
          }
        </div>
      </CardContent>
    </Card>
    </div>

    </>
  )
}

export const metadata = {
  title: "Cellink | 임직원 검색",
  description: "임직원 검색",
}