type ValidationResult = string;

const loginForm = (id: string, value: string): ValidationResult => {
  switch (id) {
    case 'name':
      if (value.length === 0) return "Name is required";
      if (value.length < 3) return "Name must be at least 3 characters long";
      return "";
    case 'email':
      if (value.length === 0) return "Email is required";
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) return "Email is invalid";
      return "";
    case 'password':
      if (value.length === 0) return "Password is required";
      if (!/^[A-Za-z0-9._%+-]+$/.test(value)) return "Password contains invalid characters";
      if (value.length !== 12) return "Password must be exactly 12 characters long";
      return "";
    default:
      return "";
  }
};

export { loginForm };
