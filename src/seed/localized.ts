import type { Field } from 'payload'

type Data = Record<string, unknown>

/**
 * Walk data against its field config and replace every localized field's value
 * with fn(value). Rows and collapsibles are flattened, groups, arrays and blocks
 * are followed. Returns a deep copy; the input is not touched.
 */
export function mapLocalized(fields: Field[], data: unknown, fn: (value: unknown, field: Field) => unknown): unknown {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return data
  const out: Data = { ...(data as Data) }
  for (const field of fields) {
    if (!('name' in field) || !field.name) {
      if ('fields' in field && field.fields) Object.assign(out, mapLocalized(field.fields, out, fn) as Data)
      if (field.type === 'tabs')
        for (const tab of field.tabs) {
          if ('name' in tab && tab.name) out[tab.name] = mapLocalized(tab.fields, out[tab.name], fn)
          else Object.assign(out, mapLocalized(tab.fields, out, fn) as Data)
        }
      continue
    }
    const value = out[field.name]
    if (value === undefined) continue
    if ('localized' in field && field.localized) {
      out[field.name] = fn(value, field)
      continue
    }
    if (field.type === 'group') out[field.name] = mapLocalized(field.fields, value, fn)
    if (field.type === 'array' && Array.isArray(value)) out[field.name] = value.map((row) => mapLocalized(field.fields, row, fn))
    if (field.type === 'blocks' && Array.isArray(value))
      out[field.name] = value.map((row) => {
        const block = field.blocks.find((b) => b.slug === (row as Data).blockType)
        return block ? mapLocalized(block.fields, row, fn) : row
      })
  }
  return out
}
