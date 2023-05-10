import { useDispatch, useSelector } from "react-redux";
import { addnew, remove } from './reducers/cart';
import { useState, useEffect } from 'react';
import Quantity from "./Quantity";
import "./Product.css";

const Product = ({id, product}) => {
    const {name, price, description, image_url} = product;
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        if (id in cart.products) {
            setInCart(true);
        } else {
            setInCart(false);
        }
    }, [cart])

    return (
        <div className="product">
            <div className="image" style={{backgroundImage: `url(${image_url})`}}></div>
            <div>{name} {price}</div>
            <div>{description}</div>
            {!inCart && 
                <button 
                    onClick={() => dispatch(
                    addnew({id, name, price, description}))}>
                Add to cart
                </button>}
            {inCart && 
            <>
                <Quantity id={id} />
                <button 
                    onClick={() => dispatch(remove({id, price}))}>
                Remove from cart
                </button>
            </>}
        </div>
    )
}

export default Product;