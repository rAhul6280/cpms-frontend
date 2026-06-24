import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { registerUser } from "../services/auth.service";
import { toast } from "react-toastify";

function AuthContextProvider({children}) {

    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [user,setUser]=useState({})
    const [authLoading,setAuthLoading]=useState(false);

    const registerUser=async (userData) => {
      try {
        const data=await registerUser(userData);
        if(data?.success){
          toast.success(data?.message)
        }else{
          toast.error(data?.message)
        }

      } catch (error) {
        toast.error(error?.message)
      }
    } 

  return (
    <AuthContext value={{isAuthenticated,setIsAuthenticated}}>
        {children}
    </AuthContext>
  )
}

export const useAuth=()=>useContext(AuthContext)

export default AuthContextProvider