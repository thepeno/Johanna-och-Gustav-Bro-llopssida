import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

// Re-render the one-pager whenever content changes. The seed script runs
// outside Next, so the call is skipped when `context.disableRevalidate` is set
// (and guarded anyway, because revalidatePath throws outside a request).
const revalidateHome = (context: Record<string, unknown>) => {
  if (context?.disableRevalidate) return
  try {
    revalidatePath('/')
  } catch {
    // not inside a Next.js request scope
  }
}

export const revalidateHomeAfterCollectionChange: CollectionAfterChangeHook = ({ doc, context }) => {
  revalidateHome(context)
  return doc
}

export const revalidateHomeAfterGlobalChange: GlobalAfterChangeHook = ({ doc, context }) => {
  revalidateHome(context)
  return doc
}
