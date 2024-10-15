
import Link from "next/link"
// Shadcn UI
import {  Card,  CardContent,  CardDescription,  CardHeader,  CardTitle,} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// server function
import { recoverPassword } from './actions'

export default function ReserPage({ searchParams }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">비밀번호 복구</CardTitle>
        <CardDescription>
        아래에 변경 할 비밀번호를 입력하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="recover-password-form" className="grid">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
              </div>
              <Input id="password" type="password" name="password" require dautoComplete="on" />
            </div>
            <Button className="w-full" formAction={recoverPassword}>
              비밀번호 복구
            </Button>
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