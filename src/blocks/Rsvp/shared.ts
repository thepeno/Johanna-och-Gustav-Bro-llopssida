/** The form stays open through the whole deadline day (local server time). */
export const rsvpIsOpen = (deadline?: string | null) => {
  if (!deadline) return true
  const end = new Date(deadline)
  end.setHours(23, 59, 59, 999)
  return Date.now() <= end.getTime()
}
