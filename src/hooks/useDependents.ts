import fetch from 'wretch'
import { ParseResult } from '@/lib/parse-page'
import useSWRInfinite from 'swr/infinite'

const getKey = (prevPageData: ParseResult | null, params: {
  repo: string
  packageId?: string
}) => {
  const { repo, packageId } = params
  if (!prevPageData?.nextURL && !repo) return null

  // support both repo/name and github full link
  const baseURL = repo.startsWith('https://github.com')
    ? `${repo}/network/dependents`
    : `https://github.com/${repo}/network/dependents`
  let nextURL = prevPageData?.nextURL ?? baseURL
  
  if (packageId) {
    nextURL = `${nextURL}?package_id=${packageId}`
  }

  return nextURL
}

export const useDependents = (repo: string, packageId?: string) => {
  const response = useSWRInfinite<ParseResult>(
    (pageIndex, prevPageData) => {
      const nextURL = getKey(prevPageData, {repo, packageId})
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
    isFinished: response.data?.some(d => !d?.nextURL),
    data: data.filter(Boolean),
    packages: response.data ? response.data[0]?.packages : [],
  }
}
