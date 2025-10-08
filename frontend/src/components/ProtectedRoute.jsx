import { Navigate } from 'react-router-dom';
import { useAuth } from '../assets/context/Authcontext.jsx'


const protectedRoute = ({children})=>{
    const {token} =useAuth();
    if(!token){
        return <Navigate to ='/login' replace />
    }
    return children
}
export default protectedRoute;