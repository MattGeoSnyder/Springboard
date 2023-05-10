import { useDispatch, useSelector } from "react-redux";
import { addnew, remove } from './reducers/cart';
import { useState, useEffect, useRef} from 'react';
import Quantity from "./Quantity";
import "./Product.css";
import { Link } from 'react-router-dom';

const Product = ({id, product, detail}) => {
    const {name, price, description, image_url} = product;
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const link = useRef();
    console.log(link.current);

    const [inCart, setInCart] = useState(false);

    if (detail) {
        // link.current.disabled = true;
    }

    useEffect(() => {
        if (id in cart.products) {
            setInCart(true);
        } else {
            setInCart(false);
        }
    }, [cart])

    return (
        <div className={detail ? 'product-detail' : "product"}>
                <Link to={`/products/${id}`} ref={link}>
                    <div className="image" style={{backgroundImage: `url(${image_url})`}}></div>
                    <div>{name} {price}</div>
                </Link>
                { detail && <div>{description}</div > }
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