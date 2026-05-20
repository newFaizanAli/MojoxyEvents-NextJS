export const ROUTES_PATHS = {
  PUBLIC: {
    HOME: "/",
    ABOUT: "/about",
    ARTIST: {
      LIST: "/artist/list",
      PROFILE: (id: string) => `/artist/profile/${id}`,
    },
    CATEGORY: "/categories",
  },

  PROTECTED: {
    BOOKING: {
      ADD: (id: string) => `/booking/add/${id}`,
    },

    DASHBOARD: {
      USER: {
        LIST: "/dashboard/user/list",
        MANAGE: (id: string) => `/dashboard/user/${id}`,
        PROFILE: (id: string) => `/dashboard/user/profile/${id}`,
      },
    },
  },

  AUTH: {
    SIGN_IN: "/sign-in",
    SIGN_UP: (role: "user" | "artist") => `/sign-up?role=${role}`,
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: (token: string) => `/reset-password/${token}`,
  },

  DENIED: "/denied",
  NOT_FOUND: "*",
};
