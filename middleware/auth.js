import { LOGIN_TOKEN } from '~/constant'

export default async function ({ redirect }) {
  let token

  if (process.client) {
    token = window.localStorage.getItem(LOGIN_TOKEN)
  }

  const response = await fetch(`${process.env.API_PATH}/dashToken/${token}`)

  console.log(response)
  // .then(response => response.json())
  // .then(({ auth }) => {
  //   console.log({ auth })

  //   if (auth) {
  //     return redirect('/products')
  //   } else {
  //     return redirect('/')
  //   }
  // })
}
