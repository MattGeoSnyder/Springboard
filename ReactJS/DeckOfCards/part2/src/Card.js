import './Card.css';

const Card = ({backgroundImage}) => {
    return (
        <div className="card" style={{backgroundImage: `url(${backgroundImage})`, width: '250px', height: '350px'}}>
            
        </div>
    )
}

export default Card;