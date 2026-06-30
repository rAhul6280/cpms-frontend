import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../services/auth.service";
import { toast } from "react-toastify";

function AuthContextProvider({children}) {

    const [user,setUser]=useState(null)
    const [authLoading,setAuthLoading]=useState(true);

    const authRegister=async (userData) => {
      try {
        setAuthLoading(true)
        const resp=await registerUser(userData);
        if(resp?.success){
          toast.success(resp?.message)
          setUser(resp?.data)
        }else{
          toast.error(resp?.message)
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }finally{
        setAuthLoading(false)
      }
    }
    
    const authLogin=async (userData) => {
      try {
        setAuthLoading(true)
        const resp=await loginUser(userData);
        
        if(resp?.success){
          toast.success(resp?.message)
          setUser(resp?.data)
        }else{
          toast.error(resp?.message)
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }finally{
        setAuthLoading(false)
      }
    }

    const authLogout=async()=>{
       try {
        setAuthLoading(true)
        const resp=await logoutUser();
        if(resp?.success){
          toast.success(resp?.message)
          setUser(null)
        }else{
          toast.error(resp?.message)
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }finally{
        setAuthLoading(false)
      }
    }

    const fetchUserData=async () => {
      try {
        setAuthLoading(true)
        const resp=await getUserProfile();
        if(resp?.success){
          console.log(resp?.data);
          setUser(resp?.data);
          // toast.success(resp?.message);
        }else{
          // setUser(null)
          // toast.error(resp?.message);
        }
      } catch (error) {
        // toast.error(error?.message)
      }finally{
        setAuthLoading(false)
      }
    }

     useEffect(()=>{
            if(!user){
                fetchUserData()
            }
        },[])

  return (
    <AuthContext value={{authRegister,authLogin,authLoading,authLogout ,user,fetchUserData}}>
        {children}
    </AuthContext>
  )
}

export const useAuth=()=>useContext(AuthContext)

export default AuthContextProvider