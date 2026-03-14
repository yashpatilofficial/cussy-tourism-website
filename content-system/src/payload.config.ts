import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Packages } from './collections/Packages'
import { Homepage } from './globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Identify the build phase to bypass database requirements
const isBuild = process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL === '1'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // We disable the admin dashboard ONLY during the build phase to 
    // avoid database queries (like checking for the first user)
    // that would crash the build if the database tables don't exist yet.
    disable: isBuild,
  },
  collections: [Users, Media, Packages],
  globals: [Homepage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'TEMP_SECRET_FOR_BUILD',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: isBuild 
    ? sqliteAdapter({
        client: {
          url: 'libsql://internal-special-temp.db',
        },
      })
    : postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || process.env.POSTGRES_URL || '',
        },
      }),
})
