export default function simpleHash(obj: object) {
  const entries = Object.entries(obj).sort(([a], [b]) => a.localeCompare(b))
  return JSON.stringify(entries)
}
