import { useState } from "react"

const slides = [
  {
    backgroundImage:
      'url("https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80")',
  },
  {
    backgroundImage:
      'url("https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80")',
  },
  {
    backgroundImage:
      'url("https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80")',
  },
  {
    backgroundImage:
      'url("https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80")',
  },
  {
    backgroundImage:
      'url("https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80")',
  },
]

const useSlide = () => {
  const [index, setIndex] = useState(0)
  let _index = index

  const current = () => {
    setIndex(_index % slides.length)
  }
  const prev = () => {
    _index = _index + slides.length - 1
    return current()
  }
  const next = () => {
    _index++
    return current()
  }
  const reset = () => {
    _index = 0
    return current()
  }

  return { slides, index, prev, next, reset }
}

export default useSlide
