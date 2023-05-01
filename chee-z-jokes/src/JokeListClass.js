import React from 'react';
import axios from "axios";
import JokeClass from './JokeClass';

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
                this.sortJokes();
            }
        }
        asyncGetJokes();
    }

    async getJokes() {
        let j = [...this.state.jokes];
        let seenJokes = new Set();
        try {
          for (let i = 0; i < this.props.numJokesToGet; i++) {
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
          this.setState({ jokes: j })
        } catch (e) {
          console.log(e);
        }  
    }

    generateNewJokes() {
        this.setState({ jokes: [] });
        const asyncGetJokes = async () => {
            if (this.state.jokes === 0) {
                await this.getJokes();
                this.sortJokes();
            }
        }
        asyncGetJokes();
    }

    sortJokes() {
        this.setState({jokes: this.state.jokes.sort((a,b) => b.votes - a.votes)})
    }

    vote(id,delta) {
        this.setState({ jokes: this.state.jokes.map(j => (j.id === id ? {...j, votes: j.votes + delta } : j))})
    }

    render() {

            return (
                <div className="JokeList">
                <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                  Get New Jokes
                </button>
          
                {this.state.jokes.map(j => (
                  <JokeClass text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
                ))}
                </div>        
            )
    }
}

export default JokeListClass;