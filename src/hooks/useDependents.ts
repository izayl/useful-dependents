import fetch from 'wretch'
import { ParseResult } from '@/lib/parse-page'
import useSWRInfinite from 'swr/infinite'

const getKey = (prevPageData: ParseResult | null, repo: string) => {
  if (!prevPageData?.nextURL && !repo) return null

  const baseURL = repo.startsWith('https://github.com')
    ? `${repo}/network/dependents`
    : `https://github.com/${repo}/network/dependents`
  const nextURL = prevPageData?.nextURL ?? baseURL

  return nextURL
}

export const useDependents = (repo: string) => {
  const response = useSWRInfinite<ParseResult>(
    (pageIndex, prevPageData) => {
      const nextURL = getKey(prevPageData, repo)
      return nextURL
    },
    (url: string) =>
      fetch(`${location.origin}/api/dependents`).post({ nextUrl: url }).json(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
      shouldRetryOnError: false,
    }
  )

  const data = response.data?.flatMap(d => d?.dependents || []) ?? []

  return {
    ...response,
    data: data.filter(Boolean),
  }
}
