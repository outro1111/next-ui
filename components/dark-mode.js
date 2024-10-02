"use client"

import {
  Moon,
  Sun
} from "lucide-react"
import {   
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger, 
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function DarkMode({ tooltip }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    setMounted(true)
  })

  if (!mounted) {
    return null
  }

  return (
    <>
    { tooltip === true ?
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="flex h-9 w-9 text-muted-foreground hover:bg-accent/0">
              {theme === 'dark'
                ? <><Moon className="h-5 w-5" /><span className="sr-only">다크 모드</span></>
                : <><Sun className="h-5 w-5" /><span className="sr-only">라이트 모드</span></>
              }
            </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {theme === 'dark'
                ? <span>다크 모드</span>
                : <span>라이트 모드</span>
              }
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      :
        <SheetClose asChild>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            onClick={toggleDarkMode} 
          >
            {theme === 'dark'
              ? <><Moon className="h-5 w-5" /> 다크 모드</>
              : <><Sun className="h-5 w-5" /> 라이트 모드</>
            }
          </Link>
        </SheetClose>
    }
    </>
  )
}