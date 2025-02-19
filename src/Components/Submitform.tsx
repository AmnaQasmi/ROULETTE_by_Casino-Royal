'use client'
const submitForm=(id:string, value:any)=>{
    switch(id){
        case 'name':
            if(value.length===0)return "Name is required";
            if(value.length<3)return "Name must be atleast 4 characters long";
            return "";
        case 'email':
            if(value.length===0)return "Email is required";
            if(!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(value))return "Email is invalid";
            return "";
        case 'message':
            if(value.length===0)return "Message is required";
            return "";
        default:
            return "";
    }
}
export {submitForm};