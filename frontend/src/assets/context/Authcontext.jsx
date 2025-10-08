import React, {  useContext,createContext,useEffect,  useState } from 'react'

export const Authcontext = createContext()

export const Authprovider = ({children}) =>{
    const [user,setUser]=useState(null)
    const [token,setToken] = useState(localStorage.getItem("token")||"");

    useEffect(()=>{
        if(token){
            setUser({token})
        }
    },[token])

    const login = (newtoken)=>{
        localStorage.setItem("token",newtoken);
        setToken(newtoken)
        setUser({token:newtoken})
    }


const logout = ()=>{
    localStorage.removeItem("token");
    setToken("")
    setUser(null)
    
}


return(
    <Authcontext.Provider value={{user,token,login,logout}}>{children}</Authcontext.Provider>
)
}
export const useAuth = () => {
  return useContext(Authcontext);
};
 