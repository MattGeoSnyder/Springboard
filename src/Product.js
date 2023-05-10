import { useDispatch, useSelector } from "react-redux";
import { addnew, remove } from './reducers/cart';
import { useState, useEffect } from 'react';
import "./Product.css";

const Product = ({id, product}) => {
    const {name, price, description, image_url} = product;
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    console.log(addnew);

    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        if (id in cart) {
            setInCart(true);
        }
    }, [cart])

    return (
        <div className="product">
            <div className="image" style={{backgroundImage: `url(${image_url})`}}></div>
            <div>{name} {price}</div>
            <div>{description}</div>
            {!inCart && <button onClick={() => dispatch(
                addnew({id, name, price, description}
            ))}>Add to cart</button>}
        </div>
    )
}

export default Product;