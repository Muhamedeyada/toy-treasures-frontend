import axios from "axios";
import AuthService from "./authApiRequests";
import { setupInterceptors } from "./interceptor";

class Userervice {
  constructor() {
    this.api = axios.create({
      baseURL: "https://toyzcity-backend.vercel.app/api/v1/users",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setupInterceptors(this.api, AuthService);
  }

  async getAllUsers() {
    const res = await this.api.get("/");
    return res.data;
  }

  async getUserById(id) {
    const res = await this.api.get(`/${id}`);
    return res.data;
  }

  async updateUser(id, data) {
    const res = await this.api.patch(`/${id}`, data);
    return res.data;
  }
}

export default new Userervice();
