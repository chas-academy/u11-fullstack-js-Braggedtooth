const getTime = (val) => {
  const now = new Date(val)
  const day = `0${now.getDate()}`.slice(-2)
  const hour = `0${now.getHours()}`.slice(-2)
  const minute = `0${now.getMinutes()}`.slice(-2)
  const month = `0${now.getMonth() + 1}`.slice(-2)
  const date = `${now.getFullYear()}-${month}-${day}`

  return { day, month, date, hour, minute }
}
export default getTime