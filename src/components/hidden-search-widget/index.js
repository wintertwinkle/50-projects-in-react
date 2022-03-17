import React, { Component } from "react"
import "./style/index"

export default class HiddenSearchWidget extends Component {
  constructor(props) {
    super(props)
    // method binding
    this.handleClick = this.handleClick.bind(this)
    this.utilizeFocus = this.utilizeFocus.bind(this)
    // state
    this.state = {
      serachBarIsExpand: false,
    }
    // inputFocus
    this.inputFocus = this.utilizeFocus()
  }

  // EventHandler
  handleClick() {
    console.log(`btn clicked`)
    this.inputFocus.setFocus()
    this.setState({
      serachBarIsExpand: !this.state.serachBarIsExpand,
    })
  }
  utilizeFocus() {
    const ref = React.createRef()
    const setFocus = () => {
      ref.current && ref.current.focus()
    }

    return { setFocus, ref }
  }

  render() {
    const expand = this.state.serachBarIsExpand
    return (
      <div className={`search ${expand ? "active" : ""}`}>
        <input
          type="text"
          className="input"
          placeholder="Search..."
          ref={this.inputFocus.ref}
        />
        <button className="btn" onClick={this.handleClick}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    )
  }
}
