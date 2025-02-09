// type ValidationResult = string;

// const loginForm = (id: string, value: string): ValidationResult => {
//   switch (id) {
//     case 'name':
//       if (value.length === 0) return "Name is required";
//       if (value.length < 3) return "Name must be at least 3 characters long";
//       return "";
//     case 'email':
//       if (value.length === 0) return "Email is required";
//       if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) return "Email is invalid";
//       return "";
//     case 'password':
//       if (value.length === 0) return "Password is required";
//       if (!/^[A-Za-z0-9._%+-]+$/.test(value)) return "Password contains invalid characters";
//       if (value.length !== 12) return "Password must be exactly 12 characters long";
//       return "";
//     default:
//       return "";
//   }
// };

// export { loginForm };

// type ValidationResult = string;
// const loginForm = (name: string, email: string, password: string) => {
//   const storedData = localStorage.getItem("userData");

//   console.log("📌 Stored Data Before Parsing:", storedData);

//   if (!storedData) return "No user found. Please sign up first!";

//   let userData;
//   try {
//     userData = JSON.parse(storedData);
//   } catch (error) {
//     console.error("❌ JSON Parsing Error:", error);
//     return "Invalid stored user data!";
//   }

//   console.log("✅ Parsed User Data:", userData);

//   // Debugging: Log stored & entered data
//   console.log("Stored Name:", userData.name, "| Entered Name:", name);
//   console.log("Stored Email:", userData.email, "| Entered Email:", email);
//   console.log("Stored Password:", userData.password, "| Entered Password:", password);

//   if (!userData.name || !userData.email || !userData.password) {
//     return "User data is incomplete in storage!";
//   }

//   // Allow case-insensitive partial match for better UX
//   if (!userData.name.toLowerCase().includes(name.trim().toLowerCase())) {
//     console.log("❌ Name Mismatch Detected!");
//     return "Name does not match!";
//   }

//   if (email.trim().toLowerCase() !== userData.email.trim().toLowerCase()) {
//     console.log("❌ Email Mismatch Detected!");
//     return "Email does not match!";
//   }

//   if (password.trim() !== userData.password.trim()) {
//     console.log("❌ Password Mismatch Detected!");
//     return "Incorrect password!";
//   }

//   sessionStorage.setItem("isLoggedIn", "true");
//   sessionStorage.setItem("userName", userData.name);

//   console.log("🎉 Login Successful! Redirecting...");

//   window.location.href = window.location.origin + "/"; // Ensure correct redirection

//   return "Login successful!";
// };

// // Event Listener for Form Submission
// document.getElementById("loginForm")?.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const nameInput = document.getElementById("name") as HTMLInputElement;
//   const emailInput = document.getElementById("email") as HTMLInputElement;
//   const passwordInput = document.getElementById("password") as HTMLInputElement;

//   const name = nameInput ? nameInput.value : "";
//   const email = emailInput ? emailInput.value : "";
//   const password = passwordInput ? passwordInput.value : "";

//   const response = loginForm(name, email, password);
//   console.log(response);
// });

// // Logout Function
// const logout = () => {
//   sessionStorage.clear();
//   window.location.href = window.location.origin + "/";
// };

// export { loginForm, logout };


// happy
 "use client"; // ✅ Ensure this runs only on the client-side

import { useState, useEffect } from "react";
import { auth, signInWithEmailAndPassword, updateProfile } from "./firebase";

// 🟢 Login Form Function
const loginForm = async (name: string, email: string, password: string) => {
  if (!name || !email || !password) return "Name, Email, and Password are required!";

  try {
    const userCredential = await signInWithEmailAndPassword(auth(), email, password);
    const user = userCredential.user;

    // Firebase में name अपडेट करें
    await updateProfile(user, { displayName: name });

    console.log("🎉 Login Successful!", user);

    // Redirect to home after successful login
    window.location.href = "/";
    return "Login successful!";
  } catch (error: any) {
    console.error("❌ Login Error:", error.message);
    return error.message;
  }
};

// 🟢 Next.js React Component
export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // 🟢 Ensure this runs only on the client-side
    const form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", handleSubmit);
    }

    return () => {
      form?.removeEventListener("submit", handleSubmit);
    };
  }, []);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const nameError = validateInput("name", name);
    const emailError = validateInput("email", email);
    const passwordError = validateInput("password", password);

    if (nameError || emailError || passwordError) {
      console.log("❌ Validation Errors:", { nameError, emailError, passwordError });
      return;
    }

    // Login Process
    const response = await loginForm(name, email, password);
    console.log(response);
  };

  return (
    <form id="loginForm">
      <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

// 🟢 Input Validation Function
const validateInput = (id: string, value: string): string => {
  switch (id) {
    case "name":
      if (value.length === 0) return "Name is required";
      if (value.length < 3) return "Name must be at least 3 characters long";
      return "";
    case "email":
      if (value.length === 0) return "Email is required";
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) return "Email is invalid";
      return "";
    case "password":
      if (value.length === 0) return "Password is required";
      if (!/^[A-Za-z0-9._%+-]+$/.test(value)) return "Password contains invalid characters";
      if (value.length !== 12) return "Password must be exactly 12 characters long";
      return "";
    default:
      return "";
  }
};
export {validateInput, loginForm}
