import { Component } from "react"
import "./style/index.css"

class IncrementCounter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
    }
    this.updateCounter = this.updateCounter.bind(this)
  }

  componentDidMount() {
    this.updateCounter()
  }

  updateCounter() {
    // use the speed provided by user or default speed value
    const increment = this.props.counter / (this.props.speed || 50)
    if (this.state.counter < this.props.counter) {
      this.setState({
        counter: Math.ceil(this.state.counter + increment),
      })
      setTimeout(this.updateCounter, 1)
    }
  }

  render() {
    const title = this.props.title
    const counter = this.state.counter
    return (
      <div className="counter-container">
        <i className="fab fa-twitter fa-3x"></i>
        <div className="counter" data-target="12000">
          {counter}
        </div>
        <span>{title}</span>
      </div>
    )
  }
}

export default IncrementCounter
