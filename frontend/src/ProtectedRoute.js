import { useSelector, useDispatch } from "react-redux"
import { setUser } from "./store/reducers/user";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const [ get, set, remove ] = useLocalStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userId = useSelector(state => state.user.user.id);
  const lsUser = get('user');

  if (!userId) {
    if (!lsUser.id) {
      navigate('/', { replace: true });
    } else {
      dispatch(setUser(lsUser));
    }
  }

  return(<>
    {children}
  </>)
}

export default ProtectedRoute;