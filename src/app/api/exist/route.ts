export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url } = body
    if (!url) {
      throw Error('No URL provided')
    }

    const res = await fetch(url, { method: 'HEAD' })
    if (res.status !== 200) {
      throw Error(res.statusText)
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.log(error?.toString())
    return new Response(error?.toString() ?? 'repo not found', { status: 500 })
  }
}
