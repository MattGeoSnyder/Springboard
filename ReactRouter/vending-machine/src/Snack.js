import { Link } from "react-router-dom";

const Snack = ({snack}) => {
    const { name, image } = snack
    return (
        <>
            <h1>Here's your {name}</h1>
            <img src={image}/>
            <Link to='/'>Go Back</Link>
        </>
    )
}

export default Snack;