import { LOGIN_TOKEN } from '~/constant'

export default function ({ next }) {
  const { API_PATH } = process.env

  if (process.server) {
    return
  }

  const token = window.localStorage.getItem(LOGIN_TOKEN)

  fetch(`${API_PATH}/dashToken/${token}`)
    .then(response => response.json())
    .then(({ auth }) => {
      console.log({ auth })

      if (auth) {
        return next()
      } else {
        return next({ name: 'company' })
      }
    })
}
