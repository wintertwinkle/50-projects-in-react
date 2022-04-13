import { useState } from "react"
import { nanoid } from "nanoid"
import "./style/index.css"

const Circle = ({ coordinate }) => {
  const style = {
    top: coordinate.y,
    left: coordinate.x,
  }
  return <span className="circle" style={style}></span>
}

const ButtonRippleEffect = () => {
  const [coordinate, setCoordinate] = useState({})

  const handleClick = (e) => {
    const x = e.clientX - e.target.offsetLeft
    const y = e.clientY - e.target.offsetTop
    setCoordinate({ x, y })
  }

  // 当`coordinate`更新的时候，<Circle>组件不会更新，只会更新内部的`coordinate` 所以动画只会执行一次。
  // 两种可能的解决思路：
  // (1) 每次都重新创建一个新的 <Circle>组件,通过`nanoid`每次都设置一个不同的`key`。
  //     这样react就会认为这是两个不同的组件。(可行)
  // (2) 从CSS出发，我需要的是每次当`coordinate`更新时重新触发一次动画。
  //     有没有这么一种方法，当sytle的某个属性变化时，重新触发动画？ (暂时没有找到解决方案)
  const circle = <Circle coordinate={coordinate} key={nanoid()} />
  return (
    <button className="ripple" onClick={handleClick}>
      Click me
      {circle}
    </button>
  )
}

export default ButtonRippleEffect
