import { Result } from '@/components/result'
import { SearchInput } from '@/components/search-input'

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
