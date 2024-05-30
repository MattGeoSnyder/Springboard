import React, {useState} from 'react';
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

const BoxList = () => {
    const [boxes, setBoxes] = useState([]);
    return (
        <div>
            <NewBoxForm key={0} setBoxes={setBoxes} />
            {boxes.map(({id, color, width, height}) => (
                <Box key={id} id={id} color={color} width={width} height={height} setBoxes={setBoxes}/>
            ))}
        </div>
    )
}

export default BoxList;