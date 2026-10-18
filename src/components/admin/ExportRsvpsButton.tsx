// Shown above the RSVP list in the admin. A plain link is enough: the browser
// sends the admin's session cookie and saves the .xlsx the endpoint returns.
export function ExportRsvpsButton() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--base)' }}>
      <a className="btn btn--style-secondary btn--size-small" href="/api/rsvps/export" download>
        Exportera till Excel
      </a>
    </div>
  )
}
