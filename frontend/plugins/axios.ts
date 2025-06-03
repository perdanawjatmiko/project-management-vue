export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const token = useCookie('token');
  const router = useRouter()

  const axios = $fetch.create({
    baseURL: config.public.apiBase,
    onResponseError({response}) {
      if (response.status === 403) {
        token.value = null
        router.push('/login')
      }
    },
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
  });

  return {
    provide: {
      api: axios,
    },
  };
});
