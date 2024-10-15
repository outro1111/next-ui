
import Link from "next/link"
// Shadcn UI
import {  Card,  CardContent,  CardDescription,  CardHeader,  CardTitle,} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// server function
import { sendEmailForRecoverPassword } from './actions'

export default function ReserPage({ searchParams }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">비밀번호 복구</CardTitle>
        <CardDescription>
        비밀번호를 복구하려면 아래에 이메일을 입력하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="reset-password-form" className="grid">
          <div className="grid gap-4">
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
            {searchParams.message && (
              <div className="text-sm font-medium text-destructive">
                {searchParams.message}
              </div>
            )}
            <Button className="w-full" formAction={sendEmailForRecoverPassword}>
              비밀번호 재설정
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

export const metadata = {
  title: "Cellink | 비밀번호 복구",
  description: "비밀번호 복구",
}