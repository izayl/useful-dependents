import { Result } from '@/components/result'
import { SearchInput } from '@/components/search-input'
import { siteConfig } from '@/config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: '/favicon.svg',
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.authorUrl,
    },
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    images: '/images/intro.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    siteId: '3049993370',
    creator: '@izayl_',
    creatorId: '3049993370',
    images: ['/images/intro.png'],
  },
}
export default function Home() {
  return (
    <main className="container max-w-2xl p-0">
      <div className="mx-auto p-6 flex flex-col justify-center">
        <SearchInput />
        <Result />
      </div>
    </main>
  )
}
