import { axiosInstance as axios, axiosWithoutInterceptors } from "../axiosInstance";
import { db, REFRESH_TOKEN, ACCESS_TOKEN } from "../dexieConfig"

const saveRefreshToken = async (refreshToken) => {
  await db.tokensTable.put({id: 1, refreshToken: refreshToken})
};

const loadRefreshToken = async () => {
  return await db.tokensTable
    .where('id')
    .equals(1)
    .first()
};

const saveAccessToken = async (AccessToken) => {
  await db.tokensTable.put({id: 2, accessToken: AccessToken})
};

const loadAccessToken = async () => {
  return await db.tokensTable
    .where('id')
    .equals(2)
    .first()
};

const deleteToken = async (id) => {
  await db.tokensTable
    .where('id')
    .equals(id)
    .delete();
};

const loginUser = async (username, password) => {
  const data = {
    "username": username,
    "password": password
  };
  const response = await axios.post('/auth/login', data);
  const accessToken = response.data["access_token"];
  const refreshToken = response.data["refresh_token"];
  await saveAccessToken(accessToken);
  await saveRefreshToken(refreshToken);

};

const logoutUser = async () => {
  await deleteToken(REFRESH_TOKEN);
  await deleteToken(ACCESS_TOKEN);
};

export {
  saveRefreshToken,
  loadRefreshToken,
  saveAccessToken,
  loadAccessToken,
  loginUser,
  logoutUser
}