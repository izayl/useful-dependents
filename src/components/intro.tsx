import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { siteConfig } from '@/config'

export const Intro: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Useful Dependents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 mb-6">
          <Image
            className="object-cover object-top rounded-md"
            priority
            src="/images/intro.png"
            alt="intro"
            fill
          />
        </div>
        <div className="space-y-2">
          <p>
            Find useful dependents for a GitHub repository. Just type the GitHub
            url and click the find button.
          </p>
          <p>
            You can also ignore zero star repositories by toggle the{' '}
            <b>ignore zero star</b> option.
          </p>
          <p>
            see example:{' '}
            <Link
              className="text-blue-500 hover:underline"
              href="/?repo=egoist/tsup"
            >
              egoist/tsup
            </Link>{' '}
            or{' '}
            <Link
              className="text-blue-500 hover:underline"
              href="/?repo=https://github.com/facebook/react"
            >
              facebook/react
            </Link>
          </p>
          <p>
            for more information, please checkout the{' '}
            <Link
              className="text-blue-500 hover:underline"
              href={siteConfig.links.github}
            >
              GitHub repository
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
