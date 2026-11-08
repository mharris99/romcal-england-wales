import { readFileSync } from 'node:fs';
const data = JSON.parse(readFileSync(new URL('../data/leeds.entries.json', import.meta.url), 'utf8'));
export function validate(input) {
  const errors = [];
  if (input.diocese !== 'leeds' || input.country !== 'england') errors.push('Unexpected calendar jurisdiction');
  if (!Array.isArray(input.entries)) return [...errors, 'entries must be an array'];
  const seen = new Set();
  for (const [index, entry] of input.entries.entries()) {
    const at = `entries[${index}]`;
    if (!/^[a-z0-9-]+$/.test(entry.id ?? '')) errors.push(`${at}: invalid id`);
    if (seen.has(entry.id)) errors.push(`${at}: duplicate id`);
    seen.add(entry.id);
    if (!entry.title || !entry.dateRule) errors.push(`${at}: missing title/dateRule`);
    if (!['solemnity','feast','memorial','optional_memorial'].includes(entry.rank)) errors.push(`${at}: invalid rank`);
    if (!['draft','verified'].includes(entry.status)) errors.push(`${at}: invalid status`);
    if (entry.status === 'verified' && (!entry.source?.title || !Number.isInteger(entry.source?.year) || !entry.source?.reference)) errors.push(`${at}: verified entry requires official source title, year and reference`);
  }
  return errors;
}
if (process.argv[1] && import.meta.url === new URL('file://' + process.argv[1]).href) {
  const errors = validate(data);
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log(`Validated ${data.entries.length} Leeds records (no claim of Ordo verification).`);
}
