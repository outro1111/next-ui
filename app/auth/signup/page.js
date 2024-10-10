import Link from "next/link"
// Shadcn UI
import {  Card,  CardContent,  CardDescription,  CardHeader,  CardTitle,} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// server function
import { signup } from './actions'

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

export default function SignupForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">가입하기</CardTitle>
        <CardDescription>
        계정을 생성하려면 정보를 입력하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" className="grid">
          <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first_name">이름</Label>
                  <Input id="first_name" name="first_name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last_name">성</Label>
                  <Input id="last_name" name="last_name" placeholder="Robinson" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department">부서</Label>
                  <Input id="department" name="department" placeholder="Web/App dev"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">직급</Label>
                  <Input id="position" name="position" placeholder="P4"/>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" type="password" name="password" autoComplete="on" />
              </div>
              <Button type="submit" className="w-full" formAction={signup}>
                계정 생성
              </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            이미 계정이 있으신가요?
            <Link prefetch={true} href="/auth/login" className="pl-1 underline">로그인</Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
