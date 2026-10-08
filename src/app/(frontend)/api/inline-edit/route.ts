import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { user } = await payload.auth({ headers: req.headers })

    if (!user) {
      return Response.json(
        { error: 'Nicht autorisiert. Bitte melden Sie sich im Admin-Bereich an.' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { collection = 'pages', id, data, draft = false } = body

    if (!id || !data) {
      return Response.json(
        { error: 'Ungültige Anfrage: ID und Daten werden benötigt.' },
        { status: 400 }
      )
    }

    const updatedDoc = await payload.update({
      collection,
      id,
      data,
      draft,
    })

    // Revalidate paths so Next.js cache refreshes
    try {
      revalidatePath('/', 'layout')
    } catch {
      // Revalidation may fail if during build or edge, safe to ignore
    }

    return Response.json({
      success: true,
      doc: updatedDoc,
      message: draft ? 'Entwurf erfolgreich gespeichert' : 'Erfolgreich veröffentlicht',
    })
  } catch (err: any) {
    console.error('Error updating document via inline-edit API:', err)
    return Response.json(
      { error: err?.message || 'Fehler beim Speichern der Änderungen.' },
      { status: 500 }
    )
  }
}
