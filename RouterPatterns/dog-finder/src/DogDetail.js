import {useParams} from 'react-router-dom';

const DogDetail = ({dogs}) => {
    const {name} = useParams();
    const dog = dogs.filter(dog => dog.name === name)[0];
    return (
        <div>
            <h1>{dog.name} Age: {dog.age}</h1>
            <img src={dog.src} />
            <ol>
                {dog.facts.map((fact,idx) => (
                    <li key={idx}>{fact}</li>
                ))}

            </ol>
            
        </div>
    )
}

export default DogDetail;