
import { AuthProvider } from "@/app/context/AuthContext/AuthProvider";

export function ContextProvider ({children}){
  return(  <AuthProvider>
        {children}
    </AuthProvider>
  )
}