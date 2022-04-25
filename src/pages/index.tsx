import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { AuthContext } from 'context/AuthContext'

import * as S from './styles/Home'

export default function Home() {
  const { register, handleSubmit } = useForm()
  const { signIn } = useContext(AuthContext)

  const handleSignIn = async (dados) => {
    console.log(dados)
    await signIn(dados)
  }

  return (
    <S.Container>
      <S.Title>My page</S.Title>
      <S.Form onSubmit={handleSubmit(handleSignIn)}>
        <S.Label>
          <span>Usuário</span>
          <S.Input
            {...register('username')}
            id="username"
            name="username"
            type="text"
          />
        </S.Label>
        <S.Label>
          <span>Senha</span>
          <S.Input
            {...register('password')}
            id="password"
            name="password"
            type="password"
          />
        </S.Label>

        <S.Button type="submit">Entrar</S.Button>
      </S.Form>
    </S.Container>
  )
}
