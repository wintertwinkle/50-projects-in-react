import { Component } from "react"
import "./style/index.css"

class DadJokes extends Component {
  constructor(props) {
    super(props)
    this.generateJoke = this.generateJoke.bind(this)
    this.fetchNewJoke = this.fetchNewJoke.bind(this)
    /**
     * The code below is bad, we can't do async operation in constructor.
     */
    // this.state = {
    //   joke: this.generateJoke(),
    // }
    this.state = {
      joke: "Joke goes here...",
    }
  }

  componentDidMount() {
    // fetch inital data here
    this.fetchNewJoke()
  }

  async generateJoke() {
    const url = "https://icanhazdadjoke.com"
    const config = {
      headers: {
        Accept: "application/json",
      },
    }
    const res = await fetch(url, config)
    const data = await res.json()
    return data.joke
  }

  async fetchNewJoke() {
    const joke = await this.generateJoke()
    this.setState({
      joke: joke,
    })
  }

  render() {
    const joke = this.state.joke
    return (
      <div className="container">
        <h3>Don't Laugh Chanllenge</h3>
        <div className="joke">{joke}</div>
        <button className="btn" onClick={this.fetchNewJoke}>
          Get Another Joke
        </button>
      </div>
    )
  }
}

export default DadJokes
