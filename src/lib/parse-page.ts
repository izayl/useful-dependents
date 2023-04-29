import fetch from 'wretch'
import AbortAddon from 'wretch/addons/abort'
import { extractNumbers, wait } from './utils'
import cheerio from 'cheerio'
import { Dependent } from './getDependents'

const RATE_LIMIT_WAIT = 61000 // ms

export type ParseResult = {
  dependents: Dependent[]
  nextURL: string | null
}

export async function parsePage(res?: string): Promise<ParseResult> {
  if (!res) {
    throw Error('No response body')
  }
  const $ = cheerio.load(res)

  const dependents: Dependent[] = []

  $('#dependents > div.Box > div').each((i, e) => {
    // The first element is the header row
    if (i === 0) return

    const avatarUrl = $(e).find('.avatar').attr('src') ?? ''

    const repo =
      $(e).find('span > a:nth-child(1)').text().trim() +
      '/' +
      $(e).find('span > a:nth-child(2)').text().trim()

    const stars = extractNumbers(
      $(e).find('div > span:nth-child(1)').last().text().trim()
    )
    const forks = extractNumbers(
      $(e).find('div > span:nth-child(2)').last().text().trim()
    )

    dependents.push({
      avatarUrl,
      repo,
      stars,
      forks,
    })
  })

  const nextURL =
    $('#dependents > div.paginate-container > div > a:contains("Next")')?.prop(
      'href'
    ) || null

  return {
    dependents,
    nextURL,
  }
}
