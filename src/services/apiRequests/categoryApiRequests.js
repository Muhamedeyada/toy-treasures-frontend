import axios from "axios";
import AuthService from "./authApiRequests";
import { setupInterceptors } from "./interceptor";

class CategoryService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://toyzcity-backend.vercel.app/api/v1/categories",
      withCredentials: true,
    });

    setupInterceptors(this.api, AuthService);
  }

  async getCategory(categoryName) {
    const res = await this.api.get(`/name`, {
      params: { categoryName },
    });
    return res.data;
  }

  async getAllCategories() {
    const res = await this.api.get(`/`);
    return res.data;
  }
}

export default new CategoryService();
