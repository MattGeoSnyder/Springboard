import { useSelector } from "react-redux";
import Product from './Product';
import "./Products.css";

const Products = () => {
    const products = useSelector(state => state.products);
    const productArr = Object.entries(products);

    return (
        <div id='products'>
            {productArr.map(([key, product]) => (
                <Product key={key} id={key} product={product} />
            ))}
        </div>
    )
}

export default Products;