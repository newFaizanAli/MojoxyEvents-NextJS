export const API_ENDPOINTS = {
  AUTH: {
    ME: "/auth/me",
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    SIGNOUT: "/auth/signout",
    LOGOUT: "/auth/logout",
    GENERATE_OTP: "/auth/otp/generate",
    VERIFY_OTP: "/auth/otp/verify",
    RESET_PASSWORD: "/auth/reset-password",
  },
  MAIN: {
    CATEGORY: {
      BASE: "/main/category",
      BY_ID: (id: string) => `/main/category/${id}`,
    },
    USER: {
      BASE: "/main/user",
    },
    ARTIST: {
      BASE: "/main/artist",
      BY_ID: (id: string) => `/main/artist/${id}`,
    },
    PACKAGE: {
      BY_ARTIST: (artist_id: string) => `/main/package/artist/${artist_id}`,
    },
    BOOKING: {
      ADD: "/main/booking",
      DATES: (artist_id: string) => `/main/booking/date/${artist_id}`,
    },
  },
};
