import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { TeamMembers } from './collections/TeamMembers'
import { Departures } from './collections/Departures'
import { CargoItems } from './collections/CargoItems'
import { FormSubmissions } from './collections/FormSubmissions'
import { NewsletterSubscriptions } from './collections/NewsletterSubscriptions'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002'
        if (collectionConfig?.slug === 'pages') {
          const path = data?.slug === 'home' ? '' : `/${data?.slug || ''}`
          return `${serverURL}${path}`
        }
        if (collectionConfig?.slug === 'posts') {
          return `${serverURL}/news/${data?.slug || ''}`
        }
        return serverURL
      },
      collections: ['pages', 'posts'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Posts,
    TeamMembers,
    Departures,
    CargoItems,
    FormSubmissions,
    NewsletterSubscriptions,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  sharp,
  secret:
    process.env.PAYLOAD_SECRET ||
    'a89f81d4b65287f311c873491a329df04104928b7245a498b301c238f972b93e',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: (() => {
        const url = process.env.DATABASE_URL || 'postgresql://payload:payload@postgres:5432/payload'
        if (fs.existsSync('/.dockerenv')) {
          return url.replace('localhost:5434', 'postgres:5432').replace('127.0.0.1:5434', 'postgres:5432')
        }
        return url
      })(),
    },
  }),
})
