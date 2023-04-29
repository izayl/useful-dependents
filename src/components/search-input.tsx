'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Icons } from './icons'
import { FormEvent, useRef } from 'react'
import { checkRepoExist } from '@/lib/utils'
import { useToast } from './ui/use-toast'

export const SearchInput = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const repo = searchParams.get('repo')
  const input = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const value = input.current?.value
    if (!value) return
    const repoError = await checkRepoExist(value.trim()).catch(err => err)
    if (repoError) {
      toast({
        variant: 'destructive',
        title: 'Repo not found',
        description: 'Please check the repo name and try again.',
      })
      return
    }
    const params = new URLSearchParams(
      searchParams as unknown as URLSearchParams
    )
    params.set('repo', value.trim())
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mb-6 flex flex-col gap-2 w-full">
      <div className="flex items-center">
        {/* <Button
          className="rounded-r-none border-r-0 py-6 px-3"
          variant="outline"
        >
          <Icons.settings className="w-6 h-6" />
        </Button> */}
        <Input
          type="text"
          placeholder={repo ?? 'input repo name or repo url'}
          className="rounded-none p-6"
          defaultValue="facebook/react"
          ref={input}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onSubmit(e)
            }
          }}
        />
        <Button
          type="submit"
          onSubmit={onSubmit}
          className="rounded-l-none border-l-0 p-6"
        >
          Find
        </Button>
      </div>
    </div>
  )
}
