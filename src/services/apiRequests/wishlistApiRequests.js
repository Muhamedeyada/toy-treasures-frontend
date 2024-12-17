import axios from "axios";
import AuthService from "./authApiRequests";
import { setupInterceptors } from "./interceptor";

class wishlisService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://toyzcity-backend.vercel.app/api/v1/wishlist",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    setupInterceptors(this.api, AuthService);
  }
  async getWishlist() {
    const res = await this.api.get("/");
    return res.data;
  }

  async createWishlist(userId) {
    const res = await this.api.post("/", { _id: userId });
    return res.data;
  }

  async addItemToWishlist(itemId) {
    const res = await this.api.patch(`/items/${itemId}`);
    return res.data;
  }

  async removeItemFromWishlist(itemId) {
    const res = await this.api.delete(`/items/${itemId}`);
    return res.data;
  }

  async clearWishlist() {
    const res = await this.api.delete("/items");
    return res.data;
  }
}

export default new wishlisService();
