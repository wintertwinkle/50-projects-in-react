import { Component } from "react"
import "./style/index.css"

class AnimatedNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: true,
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({
      isActive: !this.state.isActive,
    })
  }
  render() {
    const isActive = this.state.isActive
    return (
      <nav className={isActive ? "active" : ""}>
        <ul>
          <li>
            <a href="https://www.bilibili.com">Home</a>
          </li>
          <li>
            <a href="https://www.bilibili.com">Works</a>
          </li>
          <li>
            <a href="https://www.bilibili.com">About</a>
          </li>
          <li>
            <a href="https://www.bilibili.com">Contact</a>
          </li>
        </ul>
        <button className="icon" onClick={this.toggle}>
          <div className="line line1"></div>
          <div className="line line2"></div>
        </button>
      </nav>
    )
  }
}

export default AnimatedNavigation

// const nav = document.querySelector("#nav")
// const toggle = document.querySelector("#toggle")

// toggle.addEventListener("click", () => {
//   nav.classList.toggle("active")
// })
