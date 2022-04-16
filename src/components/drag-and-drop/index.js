import { useState } from "react"
import "./style/index.css"

const Card = ({ children, handleDrop, index }) => {
  const [hovered, setHoverd] = useState(false)

  const dragEnter = () => {
    setHoverd(true)
  }
  const dragLeave = () => {
    setHoverd(false)
  }
  const dragOver = (e) => {
    e.preventDefault()
  }
  const dragDrop = (e) => {
    setHoverd(false)
    handleDrop(index)
  }

  return (
    <div
      className={`empty ${hovered ? "hovered" : ""}`}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDragOver={dragOver}
      onDrop={dragDrop}
    >
      {children}
    </div>
  )
}

const DragContent = () => {
  const [isHold, setIsHold] = useState(false)

  const dragStart = (e) => {
    setIsHold(true)
    setTimeout(() => (e.target.className = `invisible`), 0)
  }
  const dragEnd = () => {
    setIsHold(false)
  }

  return (
    <div
      className={`fill ${isHold ? "hold" : ""}`}
      draggable="true"
      onDragStart={dragStart}
      onDragEnd={dragEnd}
    ></div>
  )
}

const DragAndDrop = ({ count }) => {
  const [containerIndex, setContainerIndex] = useState(0)

  const onDrop = function (index) {
    setContainerIndex(index)
  }

  const cards = []
  const dragContent = <DragContent />

  for (let i = 0; i < count; i++) {
    let card = null
    if (i === containerIndex) {
      card = (
        <Card children={dragContent} handleDrop={onDrop} index={i} key={i} />
      )
    } else {
      card = <Card handleDrop={onDrop} index={i} key={i} />
    }
    cards.push(card)
  }

  return <div className="container">{cards}</div>
}

export default DragAndDrop
