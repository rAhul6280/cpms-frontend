import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { loginUser, logoutUser, registerUser } from "../services/auth.service";
import { toast } from "react-toastify";

function AuthContextProvider({children}) {

    const [user,setUser]=useState(null)
    const [authLoading,setAuthLoading]=useState(false);

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
        toast.error(error?.message)
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
        toast.error(error?.message)
      }finally{
        setAuthLoading(false)
      }
    }

    const authLogout=async(userData)=>{
       try {
        setAuthLoading(true)
        const resp=await logoutUser(userData);
        if(resp?.success){
          toast.success(resp?.message)
          setUser(null)
        }else{
          toast.error(resp?.message)
        }
      } catch (error) {
        toast.error(error?.message)
      }finally{
        setAuthLoading(false)
      }
    }

  return (
    <AuthContext value={{authRegister,authLogin,authLoading,authLogout ,user}}>
        {children}
    </AuthContext>
  )
}

export const useAuth=()=>useContext(AuthContext)

export default AuthContextProvider