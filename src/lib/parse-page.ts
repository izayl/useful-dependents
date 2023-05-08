import { extractNumbers } from './utils'
import cheerio, { CheerioAPI } from 'cheerio'

export type Dependent = {
  avatarUrl: string
  repo: string
  stars: number
  forks: number
}

export type Package = {
  name: string
  url: string
  id: string
}

export type ParseResult = {
  dependents: Dependent[]
  nextURL: string | null
  packages: Package[]
}

function parsePackages($: CheerioAPI): Package[] {
  const packages: Package[] = []
  $('#dependents > .select-menu').find('a.select-menu-item').each((i, e) => {
    const name = $(e).find('span').text().trim()
    const url = $(e).attr('href') ?? ''
    if (!name || !url) return
    const id = url.split('package_id=').pop() ?? ''
    packages.push({ name, url: `https://github.com/${url}`, id })
  })
  return packages
}

export async function parsePage(res?: string): Promise<ParseResult> {
  if (!res) {
    throw Error('No response body')
  }
  const $ = cheerio.load(res)
  const packages = parsePackages($)
  const dependents: Dependent[] = []

  $('#dependents > div.Box > div').each((i, e) => {
    // The first element is the header row
    if (i === 0) return

    const avatarUrl = $(e).find('.avatar').attr('src') ?? ''

    const repo =
      `${$(e).find('span > a:nth-child(1)').text().trim()}/${$(e).find('span > a:nth-child(2)').text().trim()}`

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
    packages,
  }
}
