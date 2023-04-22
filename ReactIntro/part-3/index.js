const Person = ({name, age, hobbies}) => {
    let dispName = name.slice(0,6);
    let voteMsg;
    if (age < 18) {
        voteMsg = "You're too young to vote";
    } else {
        voteMsg = "Please, go vote!"
    }
    return <div>
        <p>Learn some information about this person:</p>
        <h3>{dispName}</h3>
        <h3>{voteMsg}</h3>
        <ul>{hobbies.map(h => <li>{h}</li>)}</ul>
    </div>
}

const App = () => {
    return <div>
        <Person name="Matt" age="26" hobbies={['coding', 'skiing', 'gyming']} />
        <Person name="Emanuel Anthony Daniel" age="23" hobbies={['moutain-biking', 'skiing', 'pizza']} />
        <Person name="Rachel" age="12" hobbies={['candles', 'feminism', 'environmentalism']} />
    </div>
}

ReactDOM.render(<App />, document.querySelector('#root'));