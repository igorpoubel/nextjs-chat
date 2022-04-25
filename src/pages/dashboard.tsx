import { useContext, useEffect } from 'react'
import { AuthContext } from 'context/AuthContext'

import * as S from './styles/Dashboard'
import { api, apiServerSide } from 'services/api'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

const Dashboard = () => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    // api.get('/user')
  }, [])

  return (
    <S.Container>
      <S.UserName>{user?.name}</S.UserName>
      <S.UserAvatar src={user?.avaterUrl} />
    </S.Container>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'nextjschat.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  await apiServerSide(ctx).get('/user')

  return {
    props: {}
  }
}
