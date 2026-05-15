export const getInitials = (name: string) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  } else {
    return (
      words[0].charAt(0).toUpperCase() +
      words[words.length - 1].charAt(0).toUpperCase()
    );
  }
};

export const validatePassword = (
  password: string,
): {
  valid: boolean;
  message?: string;
} => {
  if (!password) {
    return { valid: false, message: "Password is required." };
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  if (!/(?=.*[0-9])/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one numeric value.",
    };
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one special character.",
    };
  }

  return { valid: true };
};
