const Box = ({id, color, width, height, setBoxes}) => {
    const remove = (e) => {
        let boxId = e.target.previousSibling.id;
        setBoxes((boxes) => boxes.filter((box) => boxId !== box.id));
    }
    return (
        <div>
            <div id={id} style={{backgroundColor: color, width: `${width}px`, height: `${height}px`}}></div>
            <button onClick={remove}>X</button>
        </div>
    )
}

export default Box;