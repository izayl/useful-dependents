'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Package } from '@/lib/parse-page'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Label } from './ui/label'

type PackageSelectProps = {
  options: Package[]
  value?: string
}

export const PackageSelect: React.FC<PackageSelectProps> = ({
  options,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const value = searchParams.get('package_id')
  const onSelect = (v: string) => {
    if (v === value) return
    const params = new URLSearchParams(
      searchParams as unknown as URLSearchParams
    )
    params.set('package_id', v)
    router.push(`${pathname}?${params.toString()}`)
  }
  const currentOption = options.find(o => o.id === value) ?? options[0]
  
  return (
    <div className='flex justify-between items-center mt-[-12px] mb-3'>
      <Label>
        Repositories that depend on {currentOption.name}
      </Label>
      <Select value={currentOption.id} onValueChange={onSelect}>
        <SelectTrigger className="w-auto min-w-[120px]">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <div className="px-3 py-2 text-xs border-b ">Package</div>
          {options.map(option => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
