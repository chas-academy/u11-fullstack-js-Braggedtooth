import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Text } from '@mantine/core'
import dynamic from 'next/dynamic'
import useStore from '../services/hooks/useStore'
import Layout from '../components/core/Layout'

const User = dynamic(() => import('../components/shared/users'))

const Admin = () => {
  const router = useRouter()
  const { user } = useStore().store
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    if (user.role === 'USER') {
      router.push('/')
    }
    if (user.role === 'ADMIN') {
      setIsAdmin(true)
    }
  }, [router, user])
  const goHome = () => router.push('/')
  return isAdmin ? (
    <div>
      <User />
    </div>
  ) : (
    <>
      <Text> Denna sidan är endast tillgängligt för admin </Text>
      <Button type="button" onClick={goHome}>
        Tillbaka
      </Button>
    </>
  )
}

export default Admin
Admin.getLayout = (page) => (
  <Layout title="Admin Dashboard" auth={false}>
    {page}
  </Layout>
)
