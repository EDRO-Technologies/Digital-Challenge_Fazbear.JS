type StoredToken = {
  value: string;
  timeStamp: number;
};

const TOKEN_KEY = 'auth_token';
/*
 * Время жизни токена ставим в 23 часа 59 минут
 */

const TOKEN_TTL_MS = 86340000;

const isExpired = (timeStamp?: number): boolean => {
  if (!timeStamp) return false;

  const now = new Date().getTime();
  const diff = now - timeStamp;

  return diff > TOKEN_TTL_MS;
};

const setToken = (access_token: string): void => {
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({
      value: access_token,
      timeStamp: new Date().getTime(),
    })
  );
};

const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

const getToken = (): StoredToken | null => {
  let result = null;

  const storedToken = localStorage.getItem(TOKEN_KEY);
  storedToken && (result = JSON.parse(storedToken));

  return result;
};

export { getToken, setToken, removeToken, isExpired };