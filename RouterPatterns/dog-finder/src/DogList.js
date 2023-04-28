import {Link} from 'react-router-dom';

const DogList = ({dogs, setCurrDog}) => {
    return (
        <>
            {dogs.map(dog => (
                <div key={dog.name} id="dog-list">
                    <img src={dog.src} />
                    <Link to={`/dogs/${dog.name}`}>{dog.name}</Link>
                </div>
            ))}
        </>
    )
}

export default DogList;