'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Form() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    // params.set('page', '1')
    if (term) {
      params.set('name', term);
    } else {
      params.delete('name');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full relative">
      <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
      <Input 
        className="pl-8"
        placeholder="이름 검색"
        onChange={(event) => handleSearch(event.target.value)}
        defaultValue={searchParams.get("name") || ''}
      />
    </div>
  )
}