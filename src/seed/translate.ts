// Write the English locale from src/seed/english.ts into the live content.
// Run: npx tsx --env-file=.env src/seed/translate.ts
import { getPayload } from 'payload'
import config from '../payload.config'
import { applyEnglish } from './english'

const payload = await getPayload({ config })
await applyEnglish(payload)
console.log('Wrote the English translations.')
process.exit(0)
