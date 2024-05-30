import React from 'react';
import axios from "axios";
import JokeClass from './JokeClass';
import './JokeList.css';

class JokeListClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { jokes: [] }
        this.getJokes = this.getJokes.bind(this);
        this.generateNewJokes = this.generateNewJokes.bind(this);
        this.vote = this.vote.bind(this);
    }

    componentDidMount() {
        const asyncGetJokes = async () => {
            if (this.state.jokes.length === 0){
                await this.getJokes();
            }
        }
        asyncGetJokes();
    }

    async getJokes() {
        console.log('Getting Jokes');
        let j = [...this.state.jokes];
        let seenJokes = new Set();
        try {
          while (j.length < this.props.numJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com", {
              headers: { Accept: "application/json" }
            });
            let { status, ...jokeObj } = res.data;
    
            if (!seenJokes.has(jokeObj.id)) {
              seenJokes.add(jokeObj.id);
              j.push({ ...jokeObj, votes: 0 });
            } else {
              console.error("duplicate found!");
            }
        }
            console.log(j);
            // console.log({ jokes: j });
            this.setState({ jokes: j });
        } catch (e) {
          console.log(e);
        }  
    }

    componentDidUpdate() {
        const asyncGetJokes = async () => {
            if (this.state.jokes.length === 0) {
                await this.getJokes();
            }
        }
        asyncGetJokes();
    }

    generateNewJokes() {
        this.setState({ jokes: [] });
    }

    vote(id,delta) {
        console.log('voting');
        let j = this.state.jokes.map(joke => joke.id === id ? {...joke, votes: joke.votes + delta} : joke);
        this.setState({jokes: j})
    }

    render() {
        let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes);
        return (
            <div className="JokeList">
            <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                Get New Jokes
            </button>
        
            {jokes.map(j => (
                <JokeClass text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
            ))}
            </div>        
        )
    }
}

export default JokeListClass;