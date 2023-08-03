import { useSelector, useDispatch } from "react-redux"
import { setUser } from "./store/reducers/user";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()

  const userId = useSelector(state => state.user.user.id);

  console.log(userId);

  useEffect(() => {
    if (!userId) {
      navigate('/', { replace: true });
    }  
  }, [userId])

  return(<>
    {children}
  </>)
}

export default ProtectedRoute;