const phoneSpliter = (phone: string): [string, string] => {
  if (!phone.startsWith('+')) {
    return ['+33', phone.slice(1)]
  } else if (phone.length % 12 == 0) {
    // [+33, 712345678]
    return [phone.slice(0, 3), phone.slice(3)]
  } else if (phone.length % 13 == 0) {
    // [+262, 712345678]
    return [phone.slice(0, 4), phone.slice(4)]
  } else {
    return ['+0', 'error']
  }
}

/**
 * @summary Clears and formats a phone number.
 *
 * This function takes a string representing a phone number and performs several transformations to ensure it is in a standardized format:
 * - Trims any leading or trailing whitespace.
 * - Removes all spaces, dots, dashes, 'o', parentheses, and '+' characters.
 * - Adds a '0' at the beginning if the number starts with '6' or '7'.
 * - Adjusts numbers starting with '33' to remove the first two digits if they are 11 digits long.
 * - Converts numbers starting with '06' to '+336' followed by the remaining digits.
 * - Ensures numbers starting with '0' are prefixed with '+33'.
 *
 * @param phoneNumber - The phone number string to be cleared and formatted.
 * @returns A standardized french phone number string or an empty string if the input is not a valid string.
 * @version 1.0 20/04/2026
 */
function clearPhone(phoneNumber: string): string {
  if (typeof phoneNumber != 'string') return ''
  phoneNumber = phoneNumber.trim()

  phoneNumber = phoneNumber.replaceAll(' ', '')
  phoneNumber = phoneNumber.replaceAll('.', '')
  phoneNumber = phoneNumber.replaceAll('-', '')
  phoneNumber = phoneNumber.replaceAll('o', '0')
  phoneNumber = phoneNumber.replaceAll('(', '')
  phoneNumber = phoneNumber.replaceAll(')', '')
  phoneNumber = phoneNumber.replaceAll('+33', '33')

  if (phoneNumber.startsWith('6') || phoneNumber.startsWith('7')) {
    phoneNumber = '0' + phoneNumber
  }
  if (phoneNumber.startsWith('33') && phoneNumber.length == 11) {
    phoneNumber = '0' + phoneNumber.slice(2)
  }
  if (phoneNumber.length == 12 && phoneNumber.startsWith('06')) {
    phoneNumber = '+336' + phoneNumber.slice(2)
  }
  if (phoneNumber.startsWith('0')) {
    phoneNumber = phoneNumber.replace('0', '+33')
  }
  return phoneNumber
}

export { phoneSpliter, clearPhone }
