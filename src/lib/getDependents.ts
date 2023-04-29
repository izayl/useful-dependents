import { useCallback, useEffect, useState } from 'react'
import { ParseResult, parsePage } from './parse-page'

export type Dependent = {
  avatarUrl: string
  repo: string
  stars: number
  forks: number
}

export async function getDependents(
  repo: string,
  abort: AbortController,
  pageLimit = 300
) {
  const baseURL = `https://github.com/${repo}/network/dependents`

  const dependents: Dependent[] = []
  let nextURL: string | null = baseURL
  let currentPage = 0
  try {
    do {
      const res: ParseResult = await parsePage(nextURL, abort)
      dependents.push(...res.dependents)
      nextURL = res.nextURL
      if (res.dependents.length > 0) currentPage++
    } while (currentPage < pageLimit && nextURL)
  } catch (error) {
    console.error(error)
  }

  return dependents
}

const abortController = new AbortController()

export const useGetDependents = (input: string) => {
  const [dependents, setDependents] = useState<Dependent[]>([])
  useEffect(() => {
    return () => {
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    abortController.abort()
    setDependents([])
    getDependents(input, abortController, 3).then(setDependents)
  }, [input])

  return dependents
}
