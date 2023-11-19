import {getToken, setToken} from "@/app/api/token";
import { User, UserToken } from "@/models/User";
import axios from "axios";
import api from "./GetAuthorizedUserService";

export async function loginUserByEmail(email: string, password: string): Promise<string> {
  const { data } = await api.post('/login', { email, password });

  const { access_token } = data;

  console.log({access_token});
  setToken(access_token);

  return access_token;
}

export async function getUser(): Promise<User> {
  const { data } = await api.get<User>('/user');

  return new User(data);
}

const authFetch = async (
  input: RequestInfo,
  init: RequestInit | undefined = {},
  token?: string
): Promise<Response> => {
  const access_token = token || getToken()?.value || 'no_token';

  if (access_token === 'no_token') {
    // eslint-disable-next-line no-console
    console.warn('Making secure API call without an auth token');
  }

  const options = { ...init };

  options.headers = {
    ...init.headers,
    Authorization: `Bearer ${access_token}`,
  };

  return fetch(input, options);
};

export default authFetch;