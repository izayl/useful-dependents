import Image from 'next/image'
import { Icons } from './icons'
import Link from 'next/link'
import { toUnit } from '@/lib/utils'

export const Repo: React.FC<{
  avatarUrl: string
  name: string
  stars: number
  forks: number
}> = ({ avatarUrl, name, stars, forks }) => {
  const [user, repo] = name.split('/')
  return (
    <div className="flex justify-between border-b p-4 w-full last:border-b-0">
      <div className="flex">
        <Image
          src={avatarUrl}
          alt={name}
          width={24}
          height={24}
          unoptimized
          className="h-6 w-6 rounded-full mr-2 border"
        />
        <span>
          <Link
            href={`https://github.com/${user}`}
            className="text-blue-500 hover:underline"
          >
            {user}
          </Link>
          <span> / </span>
          <Link
            href={`https://github.com/${name}`}
            className="text-blue-500 font-semibold hover:underline"
          >
            {repo}
          </Link>
        </span>
      </div>
      <div className="flex font-semibold gap-3">
        <span className="flex items-center text-gray-500">
          <Icons.star className="mr-1 h-4 w-4" />
          <span>{toUnit(stars)}</span>
        </span>
        <span className="flex items-center text-gray-500">
          <Icons.fork className="mr-1 h-4 w-4" />
          <span>{toUnit(forks)}</span>
        </span>
      </div>
    </div>
  )
}
