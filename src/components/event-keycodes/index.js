import { Component } from "react"
import "./style/index.css"

class EventKeyCodes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Key: "a",
      keyCode: 65,
      code: "keyA",
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", (event) => {
      console.log(event.key)
      this.setState({
        Key: event.key === " " ? "Space" : event.key,
        keyCode: event.keyCode,
        code: event.code,
      })
    })
  }

  render() {
    const key = this.state.Key
    const keyCode = this.state.keyCode
    const code = this.state.code
    return (
      <div>
        <div id="insert">
          <div className="key">
            {key}
            <small>event.key</small>
          </div>
          <div className="key">
            {keyCode}
            <small>event.keyCode</small>
          </div>
          <div className="key">
            {code}
            <small>event.code</small>
          </div>
        </div>
        <div className="key">Press any key to get the keycode</div>
      </div>
    )
  }
}

export default EventKeyCodes

// const insert = document.querySelector("#insert")
// window.addEventListener("keydown", (e) => {
//   // event.keyCode has been deprecated, using event.code instead.
//   insert.innerHTML = `<div class="key">
//         ${e.key === " " ? "Space" : e.key}
//         <small>event.key</small>
//       </div>
//       <div class="key">
//         ${e.keyCode}
//         <small>event.keyCode</small>
//       </div>
//       <div class="key">
//         ${e.code}
//         <small>event.code</small>
//       </div>`
// })
