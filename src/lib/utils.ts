import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import fetch from 'wretch'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractNumbers(str: string | undefined): number {
  if (!str) return 0

  const numbers = str.match(/\d+/g)
  return numbers ? parseInt(numbers.join('')) : 0
}

export const wait = async (ms: number) => new Promise(r => setTimeout(r, ms))

export const toUnit = (num: number) => {
  if (num < 1000) {
    return num
  }

  return `${(num / 1000).toFixed(1)}k`
}

export const checkRepoExist = async (repo: string): Promise<void> => {
  let link
  try {
    link = new URL(repo)
  } catch (error) {
    console.log('try from url failed', repo, error?.toString())
    try {
      link = new URL(repo, 'https://github.com/')
    } catch (error) {
      console.log(
        'try from name failed',
        `https://github.com/${repo}`,
        error?.toString()
      )
      throw new Error('invalid repo name')
    }
  }

  if (link) {
    try {
      await fetch('/api/exist').post({ url: link.href }).res()
      return
    } catch (error) {
      console.log('fetch failed', error?.toString())
      throw new Error('fetch repo failed')
    }
  }

  throw new Error('invalid repo name')
}
