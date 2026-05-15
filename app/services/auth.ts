import { AxiosError } from "axios";
import axios from "../lib/axios_config";
import { API_ENDPOINTS } from "../utilities/api-endpoints";
import { toastError } from "../utilities/toast_utils";

interface SignUpUser {
  // id: string;
  name: string;
  email: string;
}

export const authService = {
  async signin(email: string, password: string) {
    try {
      const response = await axios.post(`${API_ENDPOINTS?.AUTH?.SIGNIN}`, {
        email,
        password,
      });
      const data = response?.data;

      const user: SignUpUser = {
        // id: data._id,
        name: data.name,
        email: data.email,
      };

      return { user, success: data.success, message: data.message };
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const msg = err.response?.data?.message || "Anything went wrong.";
      toastError(msg);
    }
  },

  async signup(
    name: string,
    email: string,
    password: string,
    role: string,
    phone: string,
  ) {
    const response = await axios.post(`${API_ENDPOINTS?.AUTH?.SIGNUP}`, {
      name,
      email,
      password,
      role,
      phone,
    });
    const data = response?.data;

    return { success: data.success, user: data.data };
  },

  async generateOTP(email: string, action: "signup" | "reset") {
    try {
      const res = await axios.post(
        `${API_ENDPOINTS?.AUTH?.GENERATE_OTP}/${action}`,
        {
          email,
        },
      );

      return res?.data;
    } catch (e) {
      console.log(e);
    }
  },

  async verifyOTP(email: string, otp: string, action: "signup" | "reset") {
    const res = await axios.post(
      `${API_ENDPOINTS?.AUTH?.VERIFY_OTP}/${action}`,
      {
        email,
        otp,
      },
    );

    return res?.data;
  },

  async singout(): Promise<{ success: boolean; message: string }> {
    try {
      const resp = await axios.get(`${API_ENDPOINTS?.AUTH?.SIGNOUT}`);
      return resp.data;
    } catch (error) {
      console.error("Logout failed:", error);
      return { success: false, message: "Logout failed" };
    }
  },

  getCurrentUser(): SignUpUser | null {
    const user = localStorage.getItem("mjx_user");

    return user ? JSON.parse(user) : null;
  },

  async resetPassword(token: string, password: string) {
    const res = await axios.post(`${API_ENDPOINTS?.AUTH?.RESET_PASSWORD}`, {
      password,
      token,
    });

    return res.data;
  },
};
