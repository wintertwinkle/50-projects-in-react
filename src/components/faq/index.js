import { Component } from "react"
import "./style/index.css"

class Faq extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      isActive: !this.state.isActive,
    })
  }

  render() {
    const isActive = this.state.isActive
    return (
      <div className="faq-container">
        <div className={`faq ${isActive ? "active" : ""}`}>
          <h3 className="faq-title">Why shouldn't we trust atoms?</h3>
          <p className="faq-text">Tey make up everything</p>
          <button className="faq-toggle" onClick={this.handleClick}>
            <i className="fas fa-chevron-down"></i>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Faq
