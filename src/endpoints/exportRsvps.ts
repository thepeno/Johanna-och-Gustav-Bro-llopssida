import ExcelJS from 'exceljs'
import type { PayloadHandler } from 'payload'

// GET /api/rsvps/export → every RSVP as an .xlsx, newest first. Admins only.
export const exportRsvps: PayloadHandler = async (req) => {
  if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { docs } = await req.payload.find({
    collection: 'rsvps',
    pagination: false,
    sort: '-createdAt',
    depth: 0,
    req,
  })

  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('OSA')
  sheet.columns = [
    { header: 'Namn', key: 'name', width: 24 },
    { header: 'E-post', key: 'email', width: 30 },
    { header: 'Kommer', key: 'attending', width: 12 },
    { header: 'Antal', key: 'partySize', width: 8 },
    { header: 'Gäster', key: 'guestNames', width: 36 },
    { header: 'Kost / allergier', key: 'dietary', width: 30 },
    { header: 'Låtönskan', key: 'song', width: 26 },
    { header: 'Meddelande', key: 'message', width: 40 },
    { header: 'Inskickad', key: 'createdAt', width: 18 },
  ]

  for (const r of docs) {
    sheet.addRow({
      ...r,
      attending: r.attending === 'yes' ? 'Ja' : 'Nej',
      partySize: r.attending === 'yes' ? (r.partySize ?? 1) : 0,
      createdAt: new Date(r.createdAt),
    })
  }

  const header = sheet.getRow(1)
  header.font = { bold: true }
  sheet.views = [{ state: 'frozen', ySplit: 1 }]
  sheet.autoFilter = { from: 'A1', to: 'I1' }
  sheet.getColumn('createdAt').numFmt = 'yyyy-mm-dd hh:mm'
  sheet.eachRow((row) => (row.alignment = { vertical: 'top', wrapText: true }))

  const total = docs.filter((r) => r.attending === 'yes').reduce((n, r) => n + (r.partySize ?? 1), 0)
  sheet.addRow({})
  const sum = sheet.addRow({ name: 'Totalt antal gäster', partySize: total })
  sum.font = { bold: true }

  const buffer = await workbook.xlsx.writeBuffer()
  const date = new Date().toISOString().slice(0, 10)
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="osa-${date}.xlsx"`,
    },
  })
}
