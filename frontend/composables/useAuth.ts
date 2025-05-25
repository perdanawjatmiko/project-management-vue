export const useAuth = () => {
  const token = useCookie('token');
  const user = useState('user', () => null);
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const login = async (email: string, password: string) => {
    try {
      const res = await $fetch(`${apiBase}/login`, {
        method: 'POST',
        body: { email, password },
      });

      token.value = res.access_token;
      await fetchUser();
      return true;
    } catch (e) {
      console.error('Login error', e);
      return false;
    }
  };

  const register = async (data: { name: string; email: string; password: string }) => {
    try {
      const res = await $fetch(`${apiBase}/register`, {
        method: 'POST',
        body: data,
      });

      token.value = res.access_token;
      await fetchUser();
      return true;
    } catch (e) {
      console.error('Register error', e);
      return false;
    }
  };

  const fetchUser = async () => {
    if (!token.value) return;

    try {
      const res = await $fetch(`${apiBase}/profile`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      user.value = res;
    } catch (e) {
      console.error('Fetch user failed', e);
      token.value = null;
      user.value = null;
    }
  };

  const logout = async () => {
  try {
    await $fetch(`${apiBase}/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    // Hapus token & user setelah logout sukses
    token.value = null;
    user.value = null;

    // Opsional: redirect ke halaman login
    await navigateTo('/login');
  } catch (error) {
    console.error('Logout failed:', error);

    // Jika error karena token expired, tetap hapus token lokal
    token.value = null;
    user.value = null;
    await navigateTo('/login');
  }
};

  return { login, register, fetchUser, logout, user };
};
