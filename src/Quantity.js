import { useSelector, useDispatch } from "react-redux"
import { addone, removeone } from './reducers/cart';

const Quantity = ({id}) => {
    const quantity = useSelector(state => (
        state.cart.products[id] ? state.cart.products[id].quantity : 0
    ));

    const price = useSelector(state => (
        state.cart.products[id] ? state.cart.products[id].price : 0
        ));

    const dispatch = useDispatch();

    return (
        <div className="quanitity-component">
            <button onClick={() => dispatch(removeone({id, price}))}>-</button>
            {quantity}
            <button onClick={() => dispatch(addone({id, price}))}>+</button>
        </div>
    )
}

export default Quantity;