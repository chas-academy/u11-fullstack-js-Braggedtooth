import { useRouter } from 'next/router'

const myRoutes = {
  HOME: '/',
  PROFILE: '/mina-sidor',
  REVIEWS: '/rescensioner',
  LOGIN: '/logga-in',
  ABOUT: '/om-oss'
}

const Routes = () => {
  const router = useRouter()
  const home = () => router.push(myRoutes.HOME)
  const profile = () => router.push(myRoutes.PROFILE)
  const reviews = () => router.push(myRoutes.REVIEWS)
  const about = () => router.push(myRoutes.ABOUT)
  const review = (id) => router.push(myRoutes.REVIEWS + '/' + id)
  const login = () => router.push(myRoutes.LOGIN)

  return {
    home,
    profile,
    about,
    reviews,
    review,
    login
  }
}

export default Routes