import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageLivePreview } from '@/components/live-preview/PageLivePreview'
import { EditableSection } from '@/components/admin/EditableSection'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Team · Global Shipping & Logistics GmbH',
  description:
    'Sieben Menschen in Bremen. Sie erreichen jede und jeden direkt — ohne Zentrale, ohne Weiterleitung.',
}

interface TeamMemberData {
  id?: string | number
  name: string
  role: string
  portraitPath?: string
  portrait?: any
  phone: string
  mobile?: string | null
  email: string
}

const FALLBACK_MEMBERS: TeamMemberData[] = [
  {
    name: 'Lars Elkjaer',
    role: 'Managing Partner',
    portraitPath: '/media/team-lars-elkjaer.jpg',
    phone: '+49 421 3606 340',
    mobile: '+49 162 1935 807',
    email: 'lars.elkjaer@gsl-germany.com',
  },
  {
    name: 'Cord Jürgens',
    role: 'Director Logistics',
    portraitPath: '/media/team-cord-juergens.jpg',
    phone: '+49 421 3606 344',
    mobile: '+49 172 1844 989',
    email: 'cord.juergens@gsl-germany.com',
  },
  {
    name: 'Kai Jühdes',
    role: 'Senior Chartering Manager Breakbulk',
    portraitPath: '/media/team-kai-juehdes.jpg',
    phone: '+49 421 3606 341',
    mobile: '+49 172 5179 836',
    email: 'kai.juehdes@gsl-germany.com',
  },
  {
    name: 'Maureen I. Kobe',
    role: 'Customer Service Breakbulk',
    portraitPath: '/media/team-maureen-kobe.jpg',
    phone: '+49 421 3606 350',
    mobile: '+49 172 4436 025',
    email: 'maureen.kobe@gsl-germany.com',
  },
  {
    name: 'Sabine Krüger',
    role: 'Customer Service Breakbulk',
    portraitPath: '/media/team-sabine-krueger.jpg',
    phone: '+49 421 3606 347',
    mobile: '+49 172 4193 036',
    email: 'sabine.krueger@gsl-germany.com',
  },
  {
    name: 'Matthis Osmers',
    role: 'Customer Service',
    portraitPath: '/media/team-matthis-osmers.jpg',
    phone: '+49 421 3606 343',
    mobile: null,
    email: 'matthis.osmers@gsl-germany.com',
  },
  {
    name: 'Uwe M. Albrecht',
    role: 'Port Services · Brake',
    portraitPath: '/media/team-uwe-albrecht.jpg',
    phone: '+49 421 3606 243',
    mobile: '+49 171 2863 562',
    email: 'uwe.albrecht@gsl-germany.com',
  },
]

export default async function TeamPage() {
  const { isEnabled: isDraftMode } = await draftMode()
  let members: TeamMemberData[] = FALLBACK_MEMBERS
  let pageDoc: any = null

  try {
    const payload = await getPayload({ config })

    const pageRes = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'team' } },
      draft: isDraftMode,
    })
    if (pageRes.docs?.[0]) {
      pageDoc = pageRes.docs[0]
    }

    const res = await payload.find({
      collection: 'team-members',
      sort: 'order',
    })
    if (res.docs && res.docs.length > 0) {
      members = res.docs as any
    }
  } catch (e) {
    console.error('Failed to fetch team members from Payload:', e)
  }

  if (!pageDoc) {
    pageDoc = {
      title: 'Team',
      slug: 'team',
      heroTag: 'Team',
      heroTitle: 'Sieben Menschen in Bremen.',
      heroSubtitle:
        'Sie erreichen jede und jeden direkt — ohne Zentrale, ohne Weiterleitung.',
    }
  }

  return (
    <PageLivePreview
      initialPage={pageDoc}
      fallbackTitle="Team"
      fallbackSubtitle="Sieben Menschen in Bremen. Sie erreichen jede und jeden direkt — ohne Zentrale, ohne Weiterleitung."
      pageId="p-team"
    >
      <section className="sec">
        <div className="wrap">
          <div className="grid3" style={{ gap: 18 }}>
            {members.map((member) => {
              const imgSrc =
                typeof member.portrait === 'object' &&
                (member.portrait?.sizes?.thumbnail?.url || member.portrait?.url)
                  ? member.portrait.sizes?.thumbnail?.url || member.portrait.url
                  : member.portraitPath || '/media/team-lars-elkjaer.jpg'

              const imgAlt =
                (typeof member.portrait === 'object' && member.portrait?.alt) ||
                `${member.name}, ${member.role}`

              return (
                <EditableSection
                  key={member.name}
                  collection="team-members"
                  id={member.id}
                  title={`${member.name} bearbeiten`}
                >
                  <div className="person">
                    <div className="ava hb">
                      <img
                        src={imgSrc}
                        alt={imgAlt}
                        width={600}
                        height={600}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h4>{member.name}</h4>
                    <div className="role">{member.role}</div>
                    <div className="c">
                      {member.phone}
                      <br />
                      {member.mobile ? member.mobile : <span>&nbsp;</span>}
                      <br />
                      <a href={`mailto:${member.email}`}>{member.email}</a>
                    </div>
                  </div>
                </EditableSection>
              )
            })}
          </div>
        </div>
      </section>
    </PageLivePreview>
  )
}
