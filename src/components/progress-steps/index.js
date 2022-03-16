import { Component } from "react"
import "./style/index"

export default class ProgressSteps extends Component {
  constructor(props) {
    super(props)
    // method binding
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    // state
    this.state = {
      currentActive: 1,
    }
  }

  // EventHandler
  handleNextClick() {
    let currentActive = this.state.currentActive + 1
    if (currentActive <= this.props.circles) {
      this.setState({
        currentActive: currentActive,
      })
    }
  }
  handlePrevClick() {
    let currentActive = this.state.currentActive - 1
    if (currentActive > 0) {
      this.setState({
        currentActive: currentActive,
      })
    }
  }

  render() {
    // state
    const currentActive = this.state.currentActive
    // prop
    const circleNumbers = this.props.circles
    // circle elemenets generation
    const renderCircles = []
    for (let i = 0; i < circleNumbers; i++) {
      renderCircles.push(
        <div className={`circle ${currentActive > i ? "active" : ""}`} key={i}>
          {i}
        </div>
      )
    }
    // progress style
    const progressStyle = {
      width: `${((currentActive - 1) / (circleNumbers - 1)) * 100}%`,
    }
    // prev disable
    const prevDisabled = currentActive === 1
    // next disable
    const nextDisabled = currentActive === circleNumbers

    return (
      <div className="container">
        <div className="progress-container">
          <div className="progress" style={progressStyle}></div>
          {renderCircles}
        </div>
        <button
          className="btn"
          onClick={this.handlePrevClick}
          disabled={prevDisabled}
        >
          Prev
        </button>
        <button
          className="btn"
          onClick={this.handleNextClick}
          disabled={nextDisabled}
        >
          Next
        </button>
      </div>
    )
  }
}
