import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "./Product";

const ProductDetail = () => {
    const { id } = useParams();
    const product = useSelector(state => state.products[id])
    console.log(product);

    return (
        <Product id={id} product={product} detail={true} />
    )

}

export default ProductDetail;