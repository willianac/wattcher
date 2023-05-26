export function useHandleToken() {
  function setToken(token: string) {
    window.localStorage.setItem("x-access-token", token)
  }

  function getToken() {
    return window.localStorage.getItem("x-access-token")
  }

  function deleteToken() {
    window.localStorage.removeItem("x-access-token")
  }

  function hasToken() {
    return !!getToken()
  }

  return {
    setToken,
    getToken,
    hasToken,
    deleteToken
  }
}