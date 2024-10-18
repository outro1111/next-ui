import Link from "next/link"
// Shadcn UI
import {  Card,  CardContent,  CardDescription,  CardHeader,  CardTitle,} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// server function
import { login } from './actions'

export default function LoginPage({ searchParams }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>
        귀하의 계정에 로그인하려면 아래에 이메일을 입력하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" className="grid">
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
                <Link prefetch={true} href="/auth/submit-email-recover" className="ml-auto inline-block text-sm underline">비밀번호를 잊으셨나요?</Link>
              </div>
              <Input id="password" type="password" name="password" required autoComplete="on" minLength={6}/>
            </div>
            {searchParams.message && (
              <div className="text-sm font-medium text-destructive">
                {searchParams.message}
              </div>
            )}
            <Button className="w-full" formAction={login}>
              로그인
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            계정이 없으신가요?
            <Link prefetch={true} href="/auth/signup" className="pl-1 underline">가입하기</Link>
          </div>
          <div className="flex mt-3 justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-baseline gap-1">
              <div className="text-xs text-muted-foreground">email :</div> 
              <div>azasu0501@cj.net</div>
            </div>
            <div className="flex items-baseline gap-1">
              <div className="text-xs text-muted-foreground">password :</div> 
              <div>test123</div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export const metadata = {
  title: "Cellink | 로그인",
  description: "로그인",
}