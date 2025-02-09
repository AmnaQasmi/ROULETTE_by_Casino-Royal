"use client";
import './styles.css';
import Header from '../../Components/Header';
import React, { useState, useEffect } from 'react';
import { IconSend } from '@tabler/icons-react';
import FloatingInput from "../../Components/LoginInput";
import { submitForm } from "../../Components/Submitform";
import { Button } from "@mantine/core";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Components/firebase";
import toast from "react-hot-toast";

const Contact = () => {
  const initialForm = {
    name: "",
    email: "",
    message: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [formError, setFormError] = useState({});
  const [btnSize, setBtnSize] = useState("md");

  useEffect(() => {
    // Handle button size dynamically in client-side rendering
    const updateBtnSize = () => {
      if (window.innerWidth < 768) setBtnSize("sm");
      else setBtnSize("md");
    };
    updateBtnSize();
    window.addEventListener("resize", updateBtnSize);
    return () => window.removeEventListener("resize", updateBtnSize);
  }, []);

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
    setFormError({ ...formError, [id]: submitForm(id, value) });
  };

  const handleSubmit = async () => {
    let valid = true;
    let newFormError = {};

    for (let key in formData) {
      const error = submitForm(key, formData[key]);
      if (error.length > 0) {
        newFormError[key] = error;
        valid = false;
      }
    }

    setFormError(newFormError);

    if (valid) {
      try {
        await addDoc(collection(db, "Contact Us"), formData);
        toast.success("Successfully Submitted", { duration: 3000 });
        setFormData(initialForm);
      } catch (error) {
        toast.error("Failed to save data. Please try again!", { duration: 3000 });
        console.error("Firebase Error:", error);
      }
    } else {
      toast.error("Your Message Not Delivered!", { duration: 3000 });
    }
  };

  return (
    <>
      <Header />
      <div
        className="px-16 md-mx:px-8 sm-mx:px-4 mx-20 lg-mx:mx-10 md-mx:mx-0 my-10 font-[Kings]"
        id="/contact"
      >
        <h1 className="text-4xl font-bold sm-mx:text-3xl xs-mx:text-2xl text-[#6A3502] mb-[20px] text-center">
          Contact Us
        </h1>
        <div
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
            id="message"
            name="Message"
            value={formData.message}
            handleChange={handleChange}
            error={formError.message}
          />
          <Button
            fullWidth
            onClick={handleSubmit}
            rightSection={<IconSend size={20} />}
            variant="filled"
            size={btnSize}
            radius="lg"
            color="#877337"
            className="!text-[#6A3502] !text-xl border-[#877337] !font-bold"
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default Contact;
