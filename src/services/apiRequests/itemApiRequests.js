import axios from "axios";
import AuthService from "./authApiRequests";
import { setupInterceptors } from "./interceptor";

class ItemService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://toyzcity-backend.vercel.app/api/v1/items",
      withCredentials: true,
    });

    setupInterceptors(this.api, AuthService);
  }

  async getAllItems(queryParams = "") {
    const res = await this.api.get("/", {
      params: queryParams,
    });
    return res.data;
  }

  async getItemById(id) {
    const res = await this.api.get(`/${id}`);
    return res.data;
  }

  async getUsersItems(id) {
    const res = await this.api.get(`/user-items/${id}`);
    return res.data;
  }

  async createItem(data) {
    const res = await this.api.post("/", data);
    return res.data;
  }

  async updateItem(id, data) {
    const res = await this.api.patch(`/${id}`, data);
    return res.data;
  }

  async toggleSoldState(id) {
    const res = await this.api.patch(`/${id}/toggle-sold`);
    return res.data;
  }

  async deleteItem(id) {
    const res = await this.api.delete(`/${id}`);
    return res.data;
  }
}

export default new ItemService();
