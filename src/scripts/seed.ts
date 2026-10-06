import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const ARTICLES = JSON.parse(
  fs.readFileSync(path.resolve(dirname, '../data/articles.json'), 'utf-8'),
)

const TEAM_MEMBERS = [
  {
    name: 'Lars Elkjaer',
    role: 'Managing Partner',
    portraitPath: '/media/team-lars-elkjaer.jpg',
    phone: '+49 421 3606 340',
    mobile: '+49 162 1935 807',
    email: 'lars.elkjaer@gsl-germany.com',
    order: 1,
  },
  {
    name: 'Cord Jürgens',
    role: 'Director Logistics',
    portraitPath: '/media/team-cord-juergens.jpg',
    phone: '+49 421 3606 344',
    mobile: '+49 172 1844 989',
    email: 'cord.juergens@gsl-germany.com',
    order: 2,
  },
  {
    name: 'Kai Jühdes',
    role: 'Senior Chartering Manager Breakbulk',
    portraitPath: '/media/team-kai-juehdes.jpg',
    phone: '+49 421 3606 341',
    mobile: '+49 172 5179 836',
    email: 'kai.juehdes@gsl-germany.com',
    order: 3,
  },
  {
    name: 'Maureen I. Kobe',
    role: 'Customer Service Breakbulk',
    portraitPath: '/media/team-maureen-kobe.jpg',
    phone: '+49 421 3606 350',
    mobile: '+49 172 4436 025',
    email: 'maureen.kobe@gsl-germany.com',
    order: 4,
  },
  {
    name: 'Sabine Krüger',
    role: 'Customer Service Breakbulk',
    portraitPath: '/media/team-sabine-krueger.jpg',
    phone: '+49 421 3606 347',
    mobile: '+49 172 4193 036',
    email: 'sabine.krueger@gsl-germany.com',
    order: 5,
  },
  {
    name: 'Matthis Osmers',
    role: 'Customer Service',
    portraitPath: '/media/team-matthis-osmers.jpg',
    phone: '+49 421 3606 343',
    mobile: '',
    email: 'matthis.osmers@gsl-germany.com',
    order: 6,
  },
  {
    name: 'Uwe M. Albrecht',
    role: 'Port Services · Brake',
    portraitPath: '/media/team-uwe-albrecht.jpg',
    phone: '+49 421 3606 243',
    mobile: '+49 171 2863 562',
    email: 'uwe.albrecht@gsl-germany.com',
    order: 7,
  },
]

const DEPARTURES = [
  {
    vessel: 'RELIABLE',
    voy: 'Voy. 463WM',
    port: 'Brake',
    laycan: '25 - 29 Aug',
    gateDate: 'YES',
    status: 'soon',
    order: 1,
    destinations: [
      { port: 'Wilmington, NC', eta: '12 Sep', hasNote: false },
      { port: 'Lake Charles, LA', eta: '17 Sep', hasNote: false },
    ],
  },
  {
    vessel: 'SOLIDARNOSC',
    voy: 'Voy. 464WM',
    port: 'Brake',
    laycan: '29 Aug - 03 Sep',
    gateDate: '27.08.2026',
    status: 'open',
    order: 2,
    destinations: [
      { port: 'Port Canaveral, FL — ASI', eta: '17 Sep', hasNote: false },
      { port: 'Port Canaveral, FL — GT', eta: '18 Sep', hasNote: false },
    ],
  },
  {
    vessel: 'YASA MAGNOLIA',
    voy: 'Voy. 465WM',
    port: 'Wismar',
    laycan: '28 Aug - 04 Sep',
    gateDate: '24.08.2026',
    status: 'stop',
    order: 3,
    destinations: [
      { port: 'Baltimore, MD — TPA', eta: '19 Sep', hasNote: false },
      { port: 'Port Canaveral, FL — ASI', eta: '22 Sep', hasNote: false },
    ],
  },
  {
    vessel: 'ULTRA SUN',
    voy: 'Voy. 466WM · or sub',
    port: 'Brake',
    laycan: '04 - 08 Sep',
    gateDate: '01.09.2026',
    status: 'stop',
    order: 4,
    destinations: [
      { port: 'Baltimore, MD — Rukert', eta: '22 Sep', hasNote: false },
      { port: 'Baltimore, MD — TPA', eta: '23 Sep', hasNote: false },
    ],
  },
  {
    vessel: 'ULTRA NAVIGATOR',
    voy: 'Voy. 467WM · or sub',
    port: 'Brake',
    laycan: '10- 15 Sep',
    gateDate: '03.09.2026',
    status: 'open',
    order: 5,
    destinations: [
      { port: 'New Haven, CT', eta: '29 Sep', hasNote: false },
      { port: 'Wilmington, NC', eta: '04 Oct', hasNote: false },
    ],
  },
  {
    vessel: 'ULTRA PIONEER',
    voy: 'Voy. 468WM · or sub',
    port: 'Brake',
    laycan: '16 - 21 Sep',
    gateDate: '10.09.2026',
    status: 'open',
    order: 6,
    destinations: [
      { port: 'Port Canaveral, FL — ASI', eta: '05 Oct', hasNote: false },
      { port: 'Port Canaveral, FL — GT', eta: '06 Oct', hasNote: false },
      { port: 'Port Arthur, TX', eta: '10 Oct', hasNote: true },
      { port: 'Memphis, TN', eta: 'via Port Arthur', hasNote: true },
    ],
  },
  {
    vessel: 'ULTRA MARS',
    voy: 'Voy. 469WM · or sub',
    port: 'Brake',
    laycan: '05 - 10 Oct',
    gateDate: '01.10.2026',
    status: 'open',
    order: 7,
    destinations: [
      { port: 'New Haven, CT', eta: '24 Oct', hasNote: true },
      { port: 'Wilmington, NC', eta: '29 Oct', hasNote: true },
    ],
  },
]

const CARGO_ITEMS = [
  {
    title: 'Stückgut · Kistenladung',
    location: 'Brake',
    imagePath: '/media/cargo-1.jpg',
    alt: 'Verladung von Kistenladung im Hafen Brake',
    order: 1,
  },
  {
    title: 'Handysize · Break Bulk',
    location: 'Brake',
    imagePath: '/media/cargo-2.jpg',
    alt: 'Frachtschiff am Kai in Brake bei der Beladung',
    order: 2,
  },
  {
    title: 'Projektladung · Großkomponenten',
    location: 'Brake',
    imagePath: '/media/cargo-3.jpg',
    alt: 'Verladung schwerer Industrieanlagen mit bordeigenem Geschirr',
    order: 3,
  },
  {
    title: 'Stahlträger und Profile',
    location: 'Brake',
    imagePath: '/media/cargo-4.jpg',
    alt: 'Stahlprofile werden im Laderaum eines Frachters gestaut',
    order: 4,
  },
  {
    title: 'Schüttgut · Verladung Kai',
    location: 'Brake',
    imagePath: '/media/cargo-5.jpg',
    alt: 'Schüttgutumschlag an der Weser',
    order: 5,
  },
  {
    title: 'Kranarbeit · Bordskräne im Einsatz',
    location: 'Brake',
    imagePath: '/media/cargo-6.jpg',
    alt: 'Schiffskräne beim Heben schwerer Kolli',
    order: 6,
  },
  {
    title: 'Hafen Wismar · Ostseeanbindung',
    location: 'Wismar',
    imagePath: '/media/cargo-7.jpg',
    alt: 'Zweiter Ladehafen von GSL an der Ostsee',
    order: 7,
  },
  {
    title: 'Laderaum · Vorbereitung Stauung',
    location: 'Brake',
    imagePath: '/media/cargo-8.jpg',
    alt: 'Blick in den geöffneten Laderaum vor der Beladung',
    order: 8,
  },
  {
    title: 'Abends am Pier · Weser',
    location: 'Brake',
    imagePath: '/media/cargo-9.jpg',
    alt: 'Frachter am Pier in Brake im Abendlicht',
    order: 9,
  },
]

const PAGES_DATA = [
  {
    title: 'Startseite',
    slug: 'home',
    heroTag: 'Linienagentur · Bremen',
    heroTitle: 'Break Bulk, Projektladung und Massengut nach Nordamerika und in die Karibik.',
    heroSubtitle:
      'GSL ist die inhabergeführte Linienagentur in Bremen. Seit 2003 verbinden wir europäische Häfen — vor allem Brake und Wismar — mit der US-Ostküste, dem Golf von Mexiko und der Karibik.',
    meta: {
      title: 'Global Shipping & Logistics GmbH · Linienagentur Bremen',
      description:
        'Linienagentur für Break Bulk, Projektladung und Massengut ab Brake und Wismar nach Nordamerika und in die Karibik.',
    },
  },
  {
    title: 'Leistungen',
    slug: 'leistungen',
    heroTag: 'Leistungen',
    heroTitle: 'Was wir transportieren und wie wir arbeiten.',
    heroSubtitle:
      'Vier Kernbereiche, ein Ansprechpartner von der Buchung bis zur Auslieferung im Bestimmungshafen.',
    meta: {
      title: 'Leistungen · Global Shipping & Logistics GmbH',
      description:
        'Break Bulk, Projektladung, Massengut und multimodale Logistik ab Brake und Wismar.',
    },
  },
  {
    title: 'Fahrpläne',
    slug: 'fahrplaene',
    heroTag: 'Fahrpläne',
    heroTitle: 'Abfahrten ab Brake und Wismar.',
    heroSubtitle:
      'Regelmäßige Abfahrten alle 14 Tage nach Nordamerika, in die Karibik und an die Südamerika-Nordküste.',
    meta: {
      title: 'Fahrpläne & Abfahrten · Global Shipping & Logistics GmbH',
      description: 'Aktuelle Abfahrten und Ladeschlusszeiten ab Brake und Wismar.',
    },
  },
  {
    title: 'Ladungen & Flotte',
    slug: 'ladungen',
    heroTag: 'Ladungen & Flotte',
    heroTitle: 'Eindrücke aus Brake und Wismar.',
    heroSubtitle:
      'Neun Aufnahmen aus dem laufenden Umschlag. Alle Fotos zeigen reale Verladungen an unseren Ladeplätzen.',
    meta: {
      title: 'Ladungen & Flotte · Global Shipping & Logistics GmbH',
      description:
        'Bilder und Referenzen aus dem Umschlag in Brake und Wismar: Break Bulk, Schwergut, Schüttgut.',
    },
  },
  {
    title: 'Aktuelles & Einblicke',
    slug: 'news',
    heroTag: 'Aktuelles & Einblicke',
    heroTitle: 'Aus dem Hafen, von den Schiffen, aus Bremen.',
    heroSubtitle:
      'Keine Marketing-Meldungen, sondern Notizen aus dem operativen Alltag: Verladungen, Hafenberichte, Hintergründe.',
    meta: {
      title: 'Aktuelles & Einblicke · Global Shipping & Logistics GmbH',
      description: 'Hintergründe, Hafenberichte und Praxisnotizen der GSL aus Bremen.',
    },
  },
  {
    title: 'Team',
    slug: 'team',
    heroTag: 'Team',
    heroTitle: 'Sieben Menschen in Bremen.',
    heroSubtitle: 'Sie erreichen jede und jeden direkt — ohne Zentrale, ohne Weiterleitung.',
    meta: {
      title: 'Team · Global Shipping & Logistics GmbH',
      description: 'Direkte Ansprechpartner bei GSL in Bremen für Chartering, Booking und Port Services.',
    },
  },
  {
    title: 'Kontakt',
    slug: 'kontakt',
    heroTag: 'Kontakt',
    heroTitle: 'Schüsselkorb 3, 28195 Bremen.',
    heroSubtitle: 'Telefon +49 421 36060.',
    meta: {
      title: 'Kontakt · Global Shipping & Logistics GmbH',
      description: 'Kontaktieren Sie GSL in Bremen oder vor Ort im Hafen Brake.',
    },
  },
  {
    title: 'Was der Neuaufbau löst',
    slug: 'ueberblick',
    heroTag: 'Überblick',
    heroTitle: 'Was der Neuaufbau löst.',
    heroSubtitle:
      'Fünf Punkte, die an der heutigen Seite technisch nicht stimmen — und was der Entwurf dahinter jeweils anders macht.',
    meta: {
      title: 'Was der Neuaufbau löst · Global Shipping & Logistics GmbH',
      description: 'Analyse und technische Optimierungen des GSL Website-Relaunchs.',
    },
  },
]

async function seed() {
  console.log('--- Starting Payload CMS Seeding ---')
  const payload = await getPayload({ config })

  // 1. Ensure Admin User exists
  console.log('Checking Admin User...')
  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@gsl-germany.com' } },
  })

  if (existingUsers.totalDocs === 0) {
    console.log('Creating Admin User admin@gsl-germany.com...')
    await (payload.create as any)({
      collection: 'users',
      data: {
        email: 'admin@gsl-germany.com',
        password: 'Password123!',
      },
    })
    console.log('Admin user created successfully.')
  } else {
    console.log('Admin user already exists.')
  }

  // 2. Seed Pages
  console.log('Seeding Pages...')
  for (const page of PAGES_DATA) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'pages',
        data: page,
      })
      console.log(`Created page: ${page.slug}`)
    } else {
      console.log(`Page exists: ${page.slug}`)
    }
  }

  // 3. Seed Posts
  console.log('Seeding Posts...')
  for (const article of ARTICLES) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: article.slug } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'posts',
        data: {
          title: article.titel,
          slug: article.slug,
          category: article.kat,
          month: article.monat,
          teaser: article.teaser,
          statusTag: article.roh ? 'roh' : 'entwurf',
          thumbnailAlt: article.alt,
          body: article.body,
          _status: 'published',
        },
      })
      console.log(`Created post: ${article.slug}`)
    } else {
      console.log(`Post exists: ${article.slug}`)
    }
  }

  // 4. Seed Team Members
  console.log('Seeding Team Members...')
  for (const member of TEAM_MEMBERS) {
    const existing = await payload.find({
      collection: 'team-members',
      where: { email: { equals: member.email } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'team-members',
        data: member,
      })
      console.log(`Created team member: ${member.name}`)
    } else {
      console.log(`Team member exists: ${member.name}`)
    }
  }

  // 5. Seed Departures
  console.log('Seeding Departures...')
  for (const dep of DEPARTURES) {
    const existing = await payload.find({
      collection: 'departures',
      where: {
        and: [{ vessel: { equals: dep.vessel } }, { voy: { equals: dep.voy } }],
      },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'departures',
        data: dep as any,
      })
      console.log(`Created departure: ${dep.vessel} (${dep.voy})`)
    } else {
      console.log(`Departure exists: ${dep.vessel}`)
    }
  }

  // 6. Seed Cargo Items
  console.log('Seeding Cargo Items...')
  for (const item of CARGO_ITEMS) {
    const existing = await payload.find({
      collection: 'cargo-items',
      where: { title: { equals: item.title } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'cargo-items',
        data: item,
      })
      console.log(`Created cargo item: ${item.title}`)
    } else {
      console.log(`Cargo item exists: ${item.title}`)
    }
  }

  console.log('--- Payload CMS Seeding Complete! ---')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding error:', err)
  process.exit(1)
})
