import useSlide from "./useSlide"
import "./style/index.css"
import { useEffect } from "react"

function BackgroudSlider() {
  const { slides, index, prev, next } = useSlide()
  // console.log(`start to render backgroundSilder`)
  // console.log(`the data "index" value is : ${index}`)

  useEffect(() => {
    const body = document.querySelector("body")
    body.style.backgroundImage = slides[index].backgroundImage
  }, [index, slides])

  return (
    <div className="slider-container">
      {slides.map((style, idx) => {
        const isActive = idx === index
        return (
          <div
            className={`slide ${isActive ? "active" : ""}`}
            style={style}
            key={idx}
          ></div>
        )
      })}

      <button className="arrow left-arrow" onClick={prev}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <button className="arrow right-arrow" onClick={next}>
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  )
}

export default BackgroudSlider
