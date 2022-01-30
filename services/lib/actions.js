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

export { storeUser, removeUser }
