import { Component } from "react"
import "./style/index.css"

class DrinkWater extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullCups: 0,
    }
    this.drink = this.drink.bind(this)
  }

  drink(index) {
    if (index + 1 === this.state.fullCups) {
      this.setState({
        fullCups: index,
      })
    } else {
      this.setState({
        fullCups: index + 1,
      })
    }
  }

  render() {
    const goalLiters = +this.props.goal
    const fraction = +this.props.fraction || 250
    const totalCups = Math.ceil((goalLiters * 1000) / fraction)
    const fullCups = this.state.fullCups
    const remainedLiters = goalLiters - (fullCups * fraction) / 1000

    const percentageStyle = {
      visibility: fullCups === 0 ? "hidden" : "visible",
      height: fullCups === 0 ? 0 : `${(fullCups / totalCups) * 330}px`,
    }

    const remainedStyle = {
      visibility: fullCups === totalCups ? "hidden" : "visible",
      height: fullCups === totalCups ? 0 : "auto",
    }

    const cups = []
    for (let i = 0; i < totalCups; i++) {
      let isFull = i < fullCups
      const cup = (
        <div
          className={`cup cup-small ${isFull ? "full" : ""}`}
          onClick={(e) => {
            this.drink(i, e)
          }}
          key={i}
        >
          {fraction}ml
        </div>
      )
      cups.push(cup)
    }

    return (
      <div className="container">
        <h1>Drink Water</h1>
        <h2>Goal: {goalLiters} Liters</h2>
        <div className="cup">
          <div id="remained" className="remained" style={remainedStyle}>
            <span id="liters">{remainedLiters}L</span>
            <small>Remained</small>
          </div>
          <div id="percentage" className="percentage" style={percentageStyle}>
            {goalLiters - remainedLiters}L
          </div>
        </div>
        <p className="text">
          Select how many glasses of water that you have drank
        </p>

        <div className="cups">{cups}</div>
      </div>
    )
  }
}

export default DrinkWater
