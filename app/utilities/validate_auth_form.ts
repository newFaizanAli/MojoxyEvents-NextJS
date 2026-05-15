export const validateForm = ({
  formData,
  setErrors,
}: {
  formData: {
    email: string;
    password: string;
  };
  setErrors: (errors: { email?: string; password?: string }) => void;
}) => {
  const newErrors: { email?: string; password?: string } = {};
  if (!formData?.email) {
    newErrors.email = "Email address is required.";
  }

  if (!formData?.password) {
    newErrors.password = "Password is required.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
