// eslint-disable-next-line consistent-return
const range = (value) => {
  if (value < 1) {
    return 0
  }
  if (value >= 1 && value <= 1.499) {
    return 1
  }
  if (value >= 1.5 && value <= 1.4999) {
    return 1.5
  }
  if (value >= 2 && value <= 1.7499) {
    return 2
  }
  if (value >= 1 && value <= 2.7499) {
    return 2.5
  }
  if (value >= 3 && value <= 3.4999) {
    return 3
  }
  if (value >= 3.5 && value <= 3.7499) {
    return 3.5
  }
  if (value >= 4 && value <= 4.4999) {
    return 4
  }
  if (value >= 4.5 && value <= 4.7499) {
    return 4.5
  }
  if (value >= 4.75 && value >= 5) {
    return 5
  }
}

export default range
