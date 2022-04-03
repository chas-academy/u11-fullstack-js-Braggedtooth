const chunk = (arr, length) => {
  const chunks = []
  let i = 0
  while (i < arr.length) {
    chunks.push(arr.slice(i, i += length))
  }
  return chunks
}
export default chunk