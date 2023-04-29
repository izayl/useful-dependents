'use client'

import { useEffect, useMemo, useState } from 'react'
import orderBy from 'lodash.orderby'
import { Repo } from './repo'
import { Intro } from './intro'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { useDependents } from '@/hooks/useDependents'
import { useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { Icons } from './icons'

export const Result: React.FC = () => {
  const searchParams = useSearchParams()
  const repo = searchParams.get('repo')
  const [loadPage, setLoadPage] = useState(5)
  const { data, setSize, size, isLoading } = useDependents(repo as string)
  const [ignoreZeroStar, setIgnoreZeroStar] = useState(true)
  const sortedData = useMemo(() => {
    const filteredData = ignoreZeroStar ? data.filter(d => d.stars > 0) : data
    return orderBy(filteredData ?? [], 'stars', 'desc')
  }, [data, ignoreZeroStar])
  const isFetching = useMemo(() => {
    const last = 30 * (loadPage - 1)
    return size > 0 && data && typeof data[last] === 'undefined'
  }, [size, data, loadPage])

  useEffect(() => {
    if (repo && !isLoading) {
      setSize(loadPage)
    }
  }, [repo, isLoading, setSize, loadPage])

  if (!repo) {
    return <Intro />
  }

  return (
    <>
      <div>
        <div className="p-4 border rounded-t-md bg-[#f6f8fa] dark:bg-[#161b22] flex justify-between">
          <h2 className="font-semibold">
            {isFetching ? (
              <Icons.loading className="animate-spin h-4 w-4 mr-2 inline-block" />
            ) : null}
            <div className="inline-flex flex-col md:flex-row items-baseline">
              {data.length} Repos
              {!isFetching ? (
                <span
                  className="md:ml-2 hover:underline text-sm cursor-pointer"
                  onClick={() => setLoadPage(p => p + 5)}
                >
                  load more
                </span>
              ) : null}
            </div>
          </h2>
          <div className="flex items-center space-x-2 ml-auto">
            <Switch
              id="ignore-zero-star"
              defaultChecked={ignoreZeroStar}
              checked={ignoreZeroStar}
              onCheckedChange={setIgnoreZeroStar}
            />
            <Label htmlFor="ignore-zero-star">ignore zero star</Label>
          </div>
        </div>
        <div className="border border-y-0">
          {sortedData.map((result, id) => (
            <Repo
              key={result.repo}
              name={result.repo}
              stars={result.stars}
              forks={result.forks}
              avatarUrl={result.avatarUrl}
            />
          ))}
        </div>
        <div className="rounded-b-md border text-center p-2">
          {isFetching ? (
            <Icons.loading className="animate-spin h-4 w-4 my-2 mx-auto " />
          ) : (
            <Button
              className=" font-semibold"
              variant="link"
              onClick={() => setLoadPage(p => p + 5)}
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
