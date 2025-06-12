export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const token = useCookie('token')
  const router = useRouter()

  const api = $fetch.create({
    baseURL: config.public.apiBase,

    // Set Authorization header sebelum request
    async onRequest({ options }) {
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`,
        }
      }
    },

    // Tangani error response (misal 401, 403, 405)
    async onResponseError({ response }) {
      if ([401, 403, 405].includes(response?.status)) {
        token.value = null
        alert("Session Expired!, re-login please")
        await router.push('/login')
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
