import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()

  const userId = useSelector(state => state.user?.user?.id);

  useEffect(() => {
    if (!userId) {
      navigate('/', { replace: true });
    }  
  }, [userId, navigate])

  return(<>
    {children}
  </>)
}

export default ProtectedRoute;