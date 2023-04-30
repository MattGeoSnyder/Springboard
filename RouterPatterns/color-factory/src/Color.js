import { useLoaderData } from "react-router-dom";

const Color = () => {
    const color = useLoaderData();

    return (
        <div style={{backgroundColor: color.color, height: '100vh'}}>
            <h1 style={{color: color.color === '#000000' ? 'white' : 'black', marginTop: '0px'}}>Behold, {color.name}</h1>
        </div>
    )
}

export default Color;