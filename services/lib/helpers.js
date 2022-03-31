export const objToString = obj => JSON.stringify(obj)
export const stringToJson = string => JSON.parse(string)
export const capitalizeString = (string) => {
  const toLowerCase = string.toLowerCase()
  return string.charAt(0).toUpperCase() + toLowerCase.slice(1)
}
