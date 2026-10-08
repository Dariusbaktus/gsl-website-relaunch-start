import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, phone, inquiryType, loadPort, destinationPort, message, gdprConsent } = body

    if (!name || !email || !gdprConsent) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle Pflichtfelder aus und stimmen Sie dem Datenschutzhinweis zu.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })
    const submission = await payload.create({
      collection: 'form-submissions',
      data: {
        name,
        company: company || '',
        email,
        phone: phone || '',
        inquiryType: inquiryType || 'Allgemeine Anfrage',
        loadPort: loadPort || '',
        destinationPort: destinationPort || '',
        message: message || '',
        gdprConsent: Boolean(gdprConsent),
      },
    })

    return NextResponse.json({ success: true, id: submission.id })
  } catch (error: any) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Die Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es später noch einmal.' },
      { status: 500 },
    )
  }
}
