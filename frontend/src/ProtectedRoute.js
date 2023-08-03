import { useSelector, useDispatch } from "react-redux"
import { setUser } from "./store/reducers/user";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {
  const [ get, set, remove ] = useLocalStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userId = useSelector(state => state.user.user.id);
  const lsUser = get('user');

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