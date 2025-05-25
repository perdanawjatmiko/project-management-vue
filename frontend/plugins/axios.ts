export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const token = useCookie('token');

  const axios = $fetch.create({
    baseURL: config.public.apiBase,
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
  });

  return {
    provide: {
      api: axios,
    },
  };
});
