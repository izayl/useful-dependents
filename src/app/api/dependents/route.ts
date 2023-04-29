import { parsePage } from '@/lib/parse-page'
import { NextResponse } from 'next/server'
import fetch from 'wretch'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nextUrl } = body
    const page = await fetch(nextUrl)
      .get()
      .badRequest(async e => {
        throw Error(e.message)
      })
      .internalError(e => {
        throw Error(e.message)
      })
      .forbidden(err => {
        throw Error(err.message)
      })
      .text()
    const json = await parsePage(page)
    return NextResponse.json(json)
  } catch (error) {
    console.trace(error)
    const e = error?.toString() ?? 'Error fetching next page'
    return new Response(e, { status: 500 })
  }
}
