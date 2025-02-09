// const signupForm=(id:string, value:any)=>{
//     switch(id){
//         case 'name':
//             if(value.length===0)return "Name is required";
//             if(value.length<3)return "Name must be atleast 3 characters long";
//             return "";
//         case 'fullname':
//             if(value.length===0)return "FullName is required";
//             if(value.length<3)return "FullName must be atleast 5 characters long";
//             return "";
//         case 'phone':
//             if(value.length===0)return "PhoneNumber is required";
//             if(!/^[0-9\._%+\-]/.test(value))return "Password is invalid";
//             if(value.length!==11)return "PhoneNumber must be atleast 11 characters";
//             return "";
//         case 'email':
//             if(value.length===0)return "Email is required";
//             if(!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(value))return "Email is invalid";
//             return "";
//         case 'password':
//             if(value.length===0)return "password is required";
//             if(!/^[A-Za-z0-9\._%+\-]/.test(value))return "Password is invalid";
//             if(value.length!==12)return "Password must be atleast 12 character long";
//             return "";
//         default:
//             return "";
//     } 
//     // !/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/.test(value)
// }
// export {signupForm};

// Signup Data Store & Validation
import { useEffect } from "react";

const handleSignup = (userData: any) => {
    // Validate All Fields
    let errors = [];
    useEffect(() => {
      if (typeof window !== "undefined") {
        console.log("UserData in LocalStorage:", localStorage.getItem("userData"));
      }
    }, []);
    errors.push(signupForm("name", userData.name));
    errors.push(signupForm("fullname", userData.fullname));
    errors.push(signupForm("phone", userData.phone));
    errors.push(signupForm("email", userData.email));
    errors.push(signupForm("password", userData.password));
  
    // Remove Empty Errors
    errors = errors.filter(err => err !== "");
  
    if (errors.length > 0) {
      alert("Signup Failed: " + errors.join("\n"));
    } else {
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("✅ User data saved successfully:", userData);
      alert("Signup successful! Now login.");
    }
  };
  
  const signupForm = (id: string, value: any) => {
    let error = "";
  
    switch (id) {
      case 'name':
        if (value.length === 0) error = "Name is required";
        else if (value.length < 3) error = "Name must be at least 3 characters long";
        break;
  
      case 'fullname':
        if (value.length === 0) error = "FullName is required";
        else if (value.length < 5) error = "FullName must be at least 5 characters long";
        break;
  
      case 'phone':
        if (value.length === 0) error = "PhoneNumber is required";
        else if (!/^[0-9]{11}$/.test(value)) error = "PhoneNumber must be 11 digits";
        break;
  
      case 'email':
        if (value.length === 0) error = "Email is required";
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) error = "Email is invalid";
        break;
  
      case 'password':
        if (value.length === 0) error = "Password is required";
        else if (value.length < 12) error = "Password must be at least 12 characters long";
        break;
  
      default:
        error = "";
        
    }
    
    return error;
  };
  export {signupForm, handleSignup}