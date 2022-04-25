import { v4 as uuid } from 'uuid'

interface SignInRequestData {
  username: string
  password: string
}

const delay = (time = 750) =>
  new Promise((resolve) => setTimeout(resolve, time))

export const sighInRequest = async (data: SignInRequestData) => {
  await delay()

  return {
    token: uuid(),
    user: {
      username: 'igorpoubel',
      name: 'Igor Poubel',
      avaterUrl: 'https://github.com/igorpoubel.png'
    }
  }
}

export const recoveryUserInfo = async (token: string) => {
  await delay()

  return {
    user: {
      username: 'igorpoubel',
      name: 'Igor Poubel',
      avaterUrl: 'https://github.com/igorpoubel.png'
    }
  }
}
