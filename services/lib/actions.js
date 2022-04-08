import _ from 'lodash'

const storeUser = (state, payload) => {
  return {
    ...state,
    user: {
      ...state.user,
      ...payload
    }
  }
}

const toggleAuthState = (state, payload) => {
  return {
    ...state,
    isLoggedIn: payload
  }
}

const removeUser = (state, payload) => {
  return {
    ...state,
    isLoggedIn: false,
    user: { ...payload }
  }
}

const getChangedProps = (user, payload) => {
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

export { storeUser, removeUser, getChangedProps, toggleAuthState }
