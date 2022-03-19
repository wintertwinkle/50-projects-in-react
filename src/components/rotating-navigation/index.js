import { Component } from "react"
import "./style/index.css"
import Page from "./page"
import Nav from "./nav"

import image from "./images/oie_2195929gQPjiDAI.jpg"

// Question: When there are multiple levels of component hierachcies
// one deep nested component need a prop from a top level component
// but the props need to pass over every single component in the path from the origin component to the target component
// Is there some possible ways to solve this problem?

// Answer: `React Context` realted API: `React.reacteContext`

/**
 * Update: Context is primarily used when some data needs to be accessible by many components
 * at different nesting levels.
 * Use `React Context` will cause components reuse more difficult
 *
 * If you only want to avoid passing some props through many levels
 * `Component composition` [https://reactjs.org/docs/composition-vs-inheritance.html]
 * is ofen a simpler solution than context
 */

export default class RotatingNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRotate: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      isRotate: !this.state.isRotate,
    })
  }

  render() {
    const isRotate = this.state.isRotate
    return (
      <div>
        <Page image={image} rotaion={isRotate} onClick={this.handleClick} />
        <Nav />
      </div>
    )
  }
}
