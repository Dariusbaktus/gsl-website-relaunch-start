import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: Request) {
  try {
    const { email, routes } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })
    const existing = await payload.find({
      collection: 'newsletter-subscriptions',
      where: { email: { equals: email } },
    })

    if (existing.totalDocs > 0) {
      return NextResponse.json({
        success: true,
        message: 'Diese E-Mail-Adresse ist bereits eingetragen.',
      })
    }

    await payload.create({
      collection: 'newsletter-subscriptions',
      data: {
        email,
        routes: routes || [],
        confirmed: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Vielen Dank! Ihre Adresse wurde für den Fahrplan-Verteiler vorgemerkt.',
    })
  } catch (error: any) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Abonnement konnte nicht gespeichert werden.' },
      { status: 500 },
    )
  }
}
