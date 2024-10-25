"use client";

import { usePathname } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import {
  Home,
  Mail,
  Menu,
  Package,
  Search,
  Settings,
  Users2,
} from "lucide-react"
import {   
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger, 
} from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signOut } from '@/app/auth/login/actions'
import DarkMode from './dark-mode';

export function Nav({withoutTokenUrls}) {
  const pathname = usePathname()
  const withoutTokenPage = withoutTokenUrls.includes(pathname)?true:false; // 로그인하지 않고 접근하는 페이지인지 여부 true/false

	return (
    !withoutTokenPage && 
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <div
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <div className="h-4 w-4">
              <Image
                src="/images/logo-icon-w.svg"
                alt="Cellink"
                width={500}
                height={300}
                className="block dark:hidden"
              />
              <Image
                src="/images/logo-icon-b.svg"
                alt="Cellink"
                width={500}
                height={300}
                className="hidden dark:block"
              />
            </div>
            <span className="sr-only">Cellink</span>
          </div>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  prefetch={true}
                  href="/dashboard"
                  className={`${pathname === '/' || pathname === '/dashboard' ? 'bg-accent' : ''} flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  prefetch={true}
                  href="/mail"
                  className={`${pathname === '/mail' ? 'bg-accent' : ''} flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">메일</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">메일</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  prefetch={true}
                  href="/list"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">공지 게시판</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">공지 게시판</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  prefetch={true}
                  href="/members"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">임직원 검색</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">임직원 검색</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <DarkMode tooltip={true} />
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b pr-4 pl-2 sm:static sm:h-auto sm:border-0 sm:pr-6 sm:pl-20 sm:py-2 bg-background sm:bg-transparent">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="sm:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <SheetTitle className="hidden">Menu</SheetTitle>
            <SheetDescription className="hidden">Menu</SheetDescription>
            <nav className="grid gap-6 text-lg font-medium">
              <div
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <div className="h-5 w-5">
                  <Image
                    src="/images/logo-icon-w.svg"
                    alt="Cellink"
                    width={500}
                    height={300}
                    className="block dark:hidden"
                  />
                  <Image
                    src="/images/logo-icon-b.svg"
                    alt="Cellink"
                    width={500}
                    height={300}
                    className="hidden dark:block"
                  />
                </div>
                <span className="sr-only">Cellink</span>
              </div>
              <SheetClose asChild>
                <Link
                  prefetch={true}
                  href="/dashboard"
                  className={`${pathname === '/' || pathname === '/dashboard' ? '' : 'text-muted-foreground'} flex items-center gap-4 px-2.5 hover:text-foreground`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  prefetch={true}
                  href="/mail"
                  className={`${pathname === '/mail' ? '' : 'text-muted-foreground'} flex items-center gap-4 px-2.5 text-foreground`}
                >
                  <Mail className="h-5 w-5" />
                  메일
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  prefetch={true}
                  href="/list"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  공지 게시판
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  prefetch={true}
                  href="/members"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  임직원 검색
                </Link>
              </SheetClose>
              <DarkMode tooltip={false} />
              <SheetClose asChild>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link prefetch={true} href="/">
                  <div className="w-24 ml-2">
                    <Image
                      src="/images/logo-b.svg"
                      alt="Cellink"
                      width={500}
                      height={300}
                      className="block dark:hidden"
                    />
                    <Image
                      src="/images/logo-w.svg"
                      alt="Cellink"
                      width={500}
                      height={300}
                      className="hidden dark:block"
                    />
                  </div>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {(() => {
                  if (pathname.startsWith('/list')) {
                    return '공지 게시판';
                  }
                  switch (pathname) {
                    case '/':
                      return 'Dashboard';
                    case '/dashboard':
                      return 'Dashboard';
                    case '/mail':
                      return '메일';
                    case '/members':
                      return '임직원 검색';
                    default:
                      return 'Unknown Page';
                  }
                })()}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Image
                src="/images/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form>
                <Button variant="ghost" size="xs" w-full formAction={signOut}>로그아웃</Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
	);
}
