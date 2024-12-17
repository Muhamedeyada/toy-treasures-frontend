import axios from "axios";
import { setupInterceptors } from "./interceptor";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://toyzcity-backend.vercel.app/api/v1/auth",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.isRefreshing = false;
    this.refreshSubscribers = [];

    setupInterceptors(this.api, this);
  }

  isTokenExpiredError(error) {
    const isExpired =
      error.response &&
      error.response.status === 401 &&
      (error.response.data.error === "Unauthorized, Access token has expired" ||
        error.response.data.error === "Unauthorized, Invalid token");
    return isExpired;
  }

  isRefreshTokenExpiredError(error) {
    return (
      error.response &&
      error.response.status === 401 &&
      error.response.data.error === "Unauthorized, Invalid refresh token" //must be exact like the backend response
    );
  }

  addRefreshSubscriber(callback, errorCallback) {
    this.refreshSubscribers.push({ callback, errorCallback });
  }

  onRefreshed(token) {
    this.refreshSubscribers.forEach(({ callback }) => callback(token));
    this.refreshSubscribers = [];
  }

  onRefreshFailure(error) {
    this.refreshSubscribers.forEach(({ errorCallback }) =>
      errorCallback(error)
    );
    this.refreshSubscribers = [];
  }

  async register(user) {
    const res = await this.api.post("/register", user);
    return res.data;
  }

  async login(user) {
    const res = await this.api.post("/login", user);
    return res.data;
  }

  async logout() {
    await this.api.post("/logout");
  }

  async refreshAccessToken() {
    const res = await this.api.post("/refresh-token");
    return {
      accessToken: res.data.accessToken,
      user: res.data.user,
    };
  }
}

export default new AuthService();
