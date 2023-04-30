import {Link} from 'react-router-dom';

const ColorList = ({colors}) => {
    return (
        <>
            <div>
                <h2>Welcome to the Color Factory!</h2>
                <Link to='new'>Add a color</Link>
            </div>
            <div>
                <h3>
                    Please select a color
                </h3>
                <div>
                {colors.map((color,idx) => (
                        <Link key={idx} to={color.name}> {color.name}</Link>
                        ))}
                </div>
            </div>
        </>
    )
}

export default ColorList;