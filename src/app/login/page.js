'use client';

import Header from '../../Components/Header';
import { IconLogin2 } from "@tabler/icons-react";
import { loginForm } from "../../Components/Loginform";
import React, { useState } from 'react';
import FloatingInput from "../../Components/LoginInput";
import { Button, useMatches } from "@mantine/core";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Components/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter(); // Router hook for navigation

  const initialForm = {
    name: "",
    email: "",
    password: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [formError, setFormError] = useState({});
  const [countdown, setCountdown] = useState(null); // For showing the countdown

  // Handle input changes and validations
  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
    setFormError({ ...formError, [id]: loginForm(id, value) });
  };

  // Handle form submission
  const handleSubmit = async () => {
    let valid = true;
    let newFormError = {};

    // Validate form fields
    for (let key in formData) {
      const error = loginForm(key, formData[key]);
      if (error.length > 0) {
        newFormError[key] = error;
        valid = false;
      }
    }

    setFormError(newFormError);

    if (valid) {
      try {
        await addDoc(collection(db, "Login"), formData);
        toast.success("Login Successfully!", { duration: 3000 });
        setFormData(initialForm); // Reset form data

        // Start countdown before navigating
        let counter = 3;
        setCountdown(counter); // Show the countdown
        const interval = setInterval(() => {
          counter -= 1;
          if (counter === 0) {
            clearInterval(interval);
            setCountdown(null); // Clear countdown
            router.push('/casinoroyal'); // Navigate to the casinoroyal page
          } else {
            setCountdown(counter); // Update countdown
          }
        }, 1000);
      } catch (error) {
        toast.error("Failed to save data. Please try again!", { duration: 3000 });
        console.error("Firebase Error:", error);
      }
    } else {
      toast.error("Please fix the errors!", { duration: 3000 });
    }
  };

  const btn = useMatches({
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "md"
  });

  return (
    <>
      {/* Header component */}
      <Header />

      <div
        className="px-16 md-mx:px-8 sm-mx:px-4 mx-20 lg-mx:mx-10 md-mx:mx-0 my-10 font-[Kings]"
        id="Login"
      >
        <h1 className="text-4xl font-bold sm-mx:text-3xl xs-mx:text-2xl text-[#6A3502] mb-[20px] text-center">
          Login
        </h1>
        <div
          data-aos="flip-left"
          data-aos-duration="800"
          className="w-[70%] lg-mx:w-full border-[2px] m-auto border-[#877337] shadow-[0_0_10px_0_#87733750] rounded p-8 bg-[#6A3502] flex flex-col gap-6 sm-mx:p-4"
        >
          <FloatingInput
            id="name"
            name="Name"
            value={formData.name}
            handleChange={handleChange}
            error={formError.name}
          />
          <FloatingInput
            id="email"
            name="Email"
            value={formData.email}
            handleChange={handleChange}
            error={formError.email}
          />
          <FloatingInput
            id="password"
            name="Password"
            value={formData.password}
            handleChange={handleChange}
            error={formError.password}
          />
          <Button
            fullWidth
            onClick={handleSubmit} // Submit function
            rightSection={<IconLogin2 size={20} />}
            variant="filled"
            size={btn}
            radius="lg"
            color="#877337"
            className="!text-[#6A3502] !text-xl bg-[#877337] !font-bold"
          >
            Login
          </Button>
          <p
            className="text-start text-lg text-[#877337] cursor-pointer hover:underline"
            onClick={() => router.push('/')} // Navigate to the SignUp page
          >
            SignUp
          </p>
        </div>
      </div>

      {/* Countdown overlay */}
      {countdown !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#6A3502] bg-opacity-70 text-[#877337] text-6xl font-bold font-[Kings] z-50">
          {countdown === 1 ? "Start Game!" : countdown}
        </div>
      )}
    </>
  );
};

export default Login;
