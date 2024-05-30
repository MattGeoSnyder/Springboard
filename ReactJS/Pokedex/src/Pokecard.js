import './Pokecard.css';

const Pokecard = ({ name, img, type, base_experience}) => {
    return <div style={{textAlign: 'center'}} className='card'>
        <h3>{name}</h3>
        <div style={{backgroundImage: `url(${img})`}} className="img-container"></div>
        <p>Type: {type}</p>
        <p>EXP: {base_experience}</p>
    </div>  
}

export default Pokecard;