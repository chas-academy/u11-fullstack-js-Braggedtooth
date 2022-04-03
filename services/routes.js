import { useRouter } from 'next/router'

const myRoutes = {
  HOME: '/',
  PROFILE: '/mina-sidor',
  REVIEWS: '/rescensioner',
  LOGIN: '/login'
}

const Routes = () => {
  const router = useRouter()
  const home = () => router.push(myRoutes.HOME)
  const profile = () => router.push(myRoutes.PROFILE)
  const reviews = () => router.push(myRoutes.REVIEWS)
  const login = () => router.push(myRoutes.LOGIN)

  return {
    home,
    profile,
    reviews,
    login
  }
}

export default Routes