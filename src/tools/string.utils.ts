const extremTrim = (val: string) =>
  val
    .toLocaleLowerCase()
    .replaceAll('?', '')
    .replaceAll('-', '-')
    .replaceAll(' ', '')
    // compelxe part: normalise nfd split acent and char è -> `,e after remove only acent from unicode table
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

/**
 * Determines the most probable value between two strings based on specific rules.
 *
 * Rules:
 * 1. If one value is '?' and the other is not, return the non-'?' value.
 * 2. If one value is a space and the other is not, return the non-space value.
 * 3. If one value is '-' and the other is not, return the non-'-' value.
 * 4. If the number of consecutive dashes ('-') differs, normalize more of two dashes to double dashes ('--')
 *    and return the value with more dashes.
 * 5. If the lengths of the values after Unicode normalization differ, return the value with more accents.
 * 6. If the number of uppercase letters differs, return the value with the most uppercase letters.
 *
 * @param {string} val1 - The first string value to compare.
 * @param {string} val2 - The second string value to compare.
 * @returns {string | undefined} - The most probable value based on the rules, or val1 if no rule applies.
 */
const mostProbableValue = (val1: string, val2: string) => {
  //max two '-'
  const normalizeDashes = (s: string) => s.replace(/-{3,}/g, '--')

  const combiningMarksCount = (s: string) => {
    const n = s.normalize('NFD')
    return (n.match(/[\u0300-\u036f]/g) || []).length
  }

  // Rule 1: simple placeholders: '?', ' ' and '-'
  const t1 = val1.trim()
  const t2 = val2.trim()
  if ((t1 === '?' || t2 === '?') && t1 !== t2) return t1 === '?' ? val2 : val1
  if ((val1 === ' ' || val2 === ' ') && val1 !== val2) return val1 === ' ' ? val2 : val1
  if ((t1 === '-' || t2 === '-') && t1 !== t2) return t1 === '-' ? val2 : val1

  // Normalize repeated dashes to a canonical form for comparison/return
  const nd1 = normalizeDashes(val1)
  const nd2 = normalizeDashes(val2)

  // If strings are identical after normalization, still prefer the one with more accents/majuscules
  if (nd1 === nd2) {
    const acc1 = combiningMarksCount(val1)
    const acc2 = combiningMarksCount(val2)
    if (acc1 !== acc2) return acc1 > acc2 ? nd1 : nd2

    const up1 = (val1.match(/[A-Z]/g) || []).length
    const up2 = (val2.match(/[A-Z]/g) || []).length
    if (up1 !== up2) return up1 > up2 ? nd1 : nd2

    return nd1
  }

  // If normalized values differ, decide by a small quality score (accents, then uppercase, then length)
  const acc1 = combiningMarksCount(val1)
  const acc2 = combiningMarksCount(val2)
  if (acc1 !== acc2) return acc1 > acc2 ? nd1 : nd2

  const up1 = (val1.match(/[A-Z]/g) || []).length
  const up2 = (val2.match(/[A-Z]/g) || []).length
  if (up1 !== up2) return up1 > up2 ? nd1 : nd2

  // Fallback: prefer the longer normalized string (more characters preserved)
  return nd2.length > nd1.length ? nd2 : nd1
}

export { extremTrim, mostProbableValue }
