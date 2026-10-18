import type { BasePayload, CollectionAfterChangeHook, SendEmailOptions } from 'payload'
import type { Rsvp } from '@/payload-types'
import { rsvpConfirmation } from '@/lib/i18n'
import { formatDate } from '@/lib/utils'

// Without an email adapter Payload's console adapter only logs "to" and
// "subject", so in that case we also log the body to make local dev useful.
const send = async (payload: BasePayload, message: SendEmailOptions) => {
  await payload.sendEmail(message)
  if (payload.email.name === 'console') {
    payload.logger.info({ msg: `Email body (not sent)\nTo: ${String(message.to)}\nSubject: ${message.subject}\n\n${message.text}` })
  }
}

const summary = (doc: Rsvp) =>
  (
    [
      ['Name', doc.name],
      ['Email', doc.email],
      ['Attending', doc.attending === 'yes' ? 'Yes' : 'No'],
      ['Party size', doc.partySize ?? 1],
      ['Guest names', doc.guestNames],
      ['Dietary', doc.dietary],
      ['Song', doc.song],
      ['Message', doc.message],
    ] as const
  )
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')

// Notify the couple and confirm to the guest. Never throws: a mail failure
// must not turn a saved RSVP into an error for the guest.
export const sendRsvpEmails: CollectionAfterChangeHook<Rsvp> = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  const { payload } = req

  try {
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0, req })
    const couple = `${settings.partnerOne} & ${settings.partnerTwo}`
    const notifyTo = (process.env.RSVP_NOTIFY_TO || settings.contactEmail || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const jobs: Promise<void>[] = []
    if (notifyTo.length) {
      jobs.push(
        send(payload, {
          to: notifyTo,
          replyTo: doc.email,
          subject: `RSVP: ${doc.name} ${doc.attending === 'yes' ? 'kommer' : 'kommer inte'}`,
          text: `${summary(doc)}\n\nReceived ${new Date(doc.createdAt).toLocaleString('sv-SE')}`,
        }),
      )
    } else {
      payload.logger.warn({ msg: 'RSVP received but no notification address: set RSVP_NOTIFY_TO or Site settings → contact email' })
    }

    const date = formatDate(settings.weddingDate, settings.locale || 'sv-SE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    const confirmation = rsvpConfirmation(settings.locale, {
      name: doc.name,
      attending: doc.attending === 'yes',
      couple,
      date,
      contact: settings.contactEmail,
    })
    jobs.push(send(payload, { to: doc.email, replyTo: settings.contactEmail || undefined, ...confirmation }))

    for (const result of await Promise.allSettled(jobs)) {
      if (result.status === 'rejected') payload.logger.error({ err: result.reason, msg: 'RSVP email failed' })
    }
  } catch (err) {
    payload.logger.error({ err, msg: 'RSVP email hook failed' })
  }
  return doc
}
