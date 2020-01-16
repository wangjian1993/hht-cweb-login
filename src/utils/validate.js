export function isEmail (str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@\w+\.com$/i
  return reg.test(str.trim())
}
