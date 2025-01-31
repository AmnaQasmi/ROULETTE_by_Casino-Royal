'use client';

import { useState } from "react";
import FloatingInput from "./LoginInput";
import { IconArrowBigUpLine } from "@tabler/icons-react";
import { Button, useMatches } from "@mantine/core";
import { signupForm } from "./Signupform";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Updated import for routing

const SignUp = () => {
    const router = useRouter(); // Use `useRouter` for navigation

    const form = {
        name: "",
        fullname: "",
        phone: "",
        email: "",
        password: ""
    };

    const [formData, setFormData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>({});

    const handleChange = (id: string, value: string) => {
        setFormData({ ...formData, [id]: value });
        setFormError({ ...formError, [id]: signupForm(id, value) });
    };

    const handleSubmit = async () => {
        let valid = true;
        const newFormError: { [key: string]: string } = {};

        // Validate the form data
        for (let key in formData) {
            const error = signupForm(key, formData[key]);
            if (error.length > 0) {
                newFormError[key] = error;
                valid = true;
            }
        }
        setFormError(newFormError);

        if (valid) {
            try {
                await addDoc(collection(db, "Signup"), formData);
                toast.success('Submitted Successfully!', { duration: 3000 });
                setFormData(form); // Reset form data
            } catch (error) {
                console.error("Error adding document: ", error);
                toast.error('Failed to submit data. Try again later!', { duration: 3000 });
            }
        } else {
            toast.error('Please fix the errors in the form!', { duration: 3000 });
        }
    };

    const btn = useMatches({
        xs: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'md'
    });

    return (
        <div className="px-16 md-mx:px-8 sm-mx:px-4 mx-20 lg-mx:mx-10 md-mx:mx-0 my-10 font-[Kings]" id="SignUp">
            <h1 className="text-4xl font-bold sm-mx:text-3xl xs-mx:text-2xl text-[#6A3502] mb-10 text-center">
                SignUp
            </h1>
            <div
                data-aos="flip-left"
                data-aos-duration="800"
                className="bg-[#6A3502] w-[70%] lg-mx:w-full border-[3px] m-auto border-[#877337] shadow-[#877337] rounded p-8 flex flex-col gap-6 sm-mx:p-4"
            >
                <div className="text-4xl font-semibold text-[#877337] flex sm-mx:text-2xl xs-mx:text-xl">
                    Let&#39;s Connect
                </div>
                <FloatingInput id="name" name="Name" value={formData.name} handleChange={handleChange} error={formError.name} />
                <FloatingInput id="fullname" name="FullName" value={formData.fullname} handleChange={handleChange} error={formError.fullname} />
                <FloatingInput id="phone" name="Phone" value={formData.phone} handleChange={handleChange} error={formError.phone} />
                <FloatingInput id="email" name="Email" value={formData.email} handleChange={handleChange} error={formError.email} />
                <FloatingInput id="password" name="Password" value={formData.password} handleChange={handleChange} error={formError.password} />
                <Button
                    fullWidth
                    onClick={handleSubmit}
                    rightSection={<IconArrowBigUpLine size={20} />}
                    variant="filled"
                    size={btn}
                    radius="sm"
                    color="#877337"
                    className="!text-[#6A3502] !text-xl !font-bold"
                >
                    SignUp
                </Button>
                <p
                    className="text-start text-lg text-[#877337] cursor-pointer hover:underline"
                    onClick={() => router.push('/login')} // Use `router.push` for navigation
                >
                    Login
                </p>
            </div>
        </div>
    );
};

export default SignUp;
