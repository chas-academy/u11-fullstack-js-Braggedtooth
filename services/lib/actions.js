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
  return Object.keys(user).reduce((result, key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!payload.hasOwnProperty(key)) {
      result.push(key)
    } else if (_.isEqual(user[key], payload[key])) {
      const resultKeyIndex = result.indexOf(key)
      result.splice(resultKeyIndex, 1)
    }
    return result
  }, Object.keys(payload))
}
export { storeUser, removeUser, getChangedProps }
