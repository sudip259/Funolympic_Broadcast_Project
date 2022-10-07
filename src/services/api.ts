import axios from "axios";
import TokenService from "./token.service";

// Base url
//middleware name interceptors to handle jwt(access and refresh token)
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
let retry = false;
instance.interceptors.request.use(
  (config: any) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for DRF back-end
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res: any) => {
    return res;
  },
  async (err: any) => {
    const originalConfig = err.config;
    console.log(originalConfig);

    if (originalConfig.url !== "/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !retry) {
        retry = true;

        try {
          // generate access token when it expires with the help of refresh token
          const rs = await instance.post("/token/refresh", {
            refresh: TokenService.getLocalRefreshToken(),
          });

          const { access } = rs.data;
          TokenService.updateLocalAccessToken(access);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
