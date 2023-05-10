import { useSelector } from "react-redux"
import Product from "./Product";

const Cart = () => {
    const products = useSelector(state => state.cart.products);
    const productsArr = Object.entries(products);
    return (
        <div>
            {productsArr.map(([ key, product ]) => (
                <Product key={key} product={product} />
            ))}
        </div>
    )
}

export default Cart;