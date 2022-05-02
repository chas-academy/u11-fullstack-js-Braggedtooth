import { filter } from 'lodash'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => -descendingComparator(a, b, orderBy)
    : (a, b) => descendingComparator(a, b, orderBy)
}

const applyFilter = (array, orderparam, orderBy, query) => {
  const comparator = getComparator(orderparam, orderBy)
  const stabilizedArray = array?.map((el, index) => [el, index])
  stabilizedArray?.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.firstname.toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }
  return stabilizedArray?.map((el) => el[0])
}
export default applyFilter
