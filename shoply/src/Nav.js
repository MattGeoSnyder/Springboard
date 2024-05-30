import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";

const Nav = () => {
    let total = useSelector(state => state.cart.total);
    total = Math.floor(total*100) / 100;
    return (
        <div>
            <NavLink to='/cart'>Cart</NavLink>
            {total}
        </div>
    )
}

export default Nav;