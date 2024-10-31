import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RegisterPotected = ({ children }) => {
    const {user} = useAuthContext();
    if (user) {
        return <Navigate to="/"/>
    }
    
    return children;
}

export default RegisterPotected;