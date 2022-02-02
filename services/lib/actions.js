import _ from 'lodash'

function storeUser (state, payload) {
  return {
    ...state,
    user: {
      ...state.user,
      ...payload
    }
  }
}
function removeUser (state, payload) {
  return {
    ...state,
    user: { ...payload }
  }
}
function getChangedProps (user, payload) {
  const diff = Object.keys(user).reduce((result, key) => {
    if (!payload.hasOwnProperty(key)) {
      result.push(key)
    } else if (_.isEqual(user[key], payload[key])) {
      const resultKeyIndex = result.indexOf(key)
      result.splice(resultKeyIndex, 1)
    }
    return result
  }, Object.keys(payload))

  return diff
}
export { storeUser, removeUser, getChangedProps }
