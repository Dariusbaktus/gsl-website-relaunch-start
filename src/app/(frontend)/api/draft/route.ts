import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url') || '/'
  const secret = searchParams.get('secret')

  let authenticated = false

  if (secret && secret === (process.env.PAYLOAD_SECRET || 'a89f81d4b65287f311c873491a329df04104928b7245a498b301c238f972b93e')) {
    authenticated = true
  } else {
    try {
      const payload = await getPayload({ config: configPromise })
      const { user } = await payload.auth({ headers: req.headers })
      if (user) authenticated = true
    } catch {
      // ignore
    }
  }

  if (!authenticated) {
    return new Response('Unauthorized to access draft mode', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(url)
}
