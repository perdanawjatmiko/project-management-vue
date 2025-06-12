export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')
  const publicRoutes = ['/login', '/register']

  if (!token.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login') // atau halaman lainnya
  }
})