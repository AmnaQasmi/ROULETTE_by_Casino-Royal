const signupForm=(id:string, value:any)=>{
    switch(id){
        case 'name':
            if(value.length===0)return "Name is required";
            if(value.length<3)return "Name must be atleast 3 characters long";
            return "";
        case 'fullname':
            if(value.length===0)return "FullName is required";
            if(value.length<3)return "FullName must be atleast 5 characters long";
            return "";
        case 'phone':
            if(value.length===0)return "PhoneNumber is required";
            if(!/^[0-9\._%+\-]/.test(value))return "Password is invalid";
            if(value.length!==11)return "PhoneNumber must be atleast 11 characters";
            return "";
        case 'email':
            if(value.length===0)return "Email is required";
            if(!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(value))return "Email is invalid";
            return "";
        case 'password':
            if(value.length===0)return "password is required";
            if(!/^[A-Za-z0-9\._%+\-]/.test(value))return "Password is invalid";
            if(value.length!==13)return "Password must be 12 character long";
            return "";
        default:
            return "";
    } 
    // !/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/.test(value)
}
export {signupForm};