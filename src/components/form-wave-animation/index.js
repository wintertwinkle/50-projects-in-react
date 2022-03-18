import { Component } from "react"
import "./style/index.css"

export default class FormWaveAnimation extends Component {
  generation(words) {
    return words.split("").map((letter, index) => {
      return (
        <span style={{ transitionDelay: `${index * 50}ms` }} key={index}>
          {letter}
        </span>
      )
    })
  }
  render() {
    const email = this.generation("Email")
    const password = this.generation("Password")
    return (
      <div className="container">
        <h1>Please Login</h1>
        <form action="">
          <div className="form-control">
            <input type="text" required id="email" />
            <label htmlFor="email">{email}</label>
          </div>
          <div className="form-control">
            <input type="text" required id="password" />
            <label htmlFor="password">{password}</label>
          </div>

          <button className="btn">Login</button>

          <p className="text">
            Don't have an account?
            <a href="https://www.bilibili.com">Register</a>
          </p>
        </form>
      </div>
    )
  }
}
