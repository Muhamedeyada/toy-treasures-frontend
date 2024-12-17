import axios from "axios";
import AuthService from "./authApiRequests";
import { handleError, setupInterceptors } from "./interceptor";

class ContactUsService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://toyzcity-backend.vercel.app/api/v1/contact-us",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setupInterceptors(this.api, AuthService);
  }

  async sendEmail(emailData) {
    const res = await this.api.post("/", emailData);
    return res.data;
  }
}

export default new ContactUsService();
