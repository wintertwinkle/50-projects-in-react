# Drawing App

这是一个 `canvas API` 的小应用

## 问题 1： How to access canvas context in React

[stackoverflow](https://stackoverflow.com/questions/33924150/how-to-access-canvas-context-in-react)

```jsx
import { useEffect, useRef } from "react"

export default function Canvas() {
  const ref = useRef()

  useEffect(() => {
    const canvas = ref.current.getContext("2d")
    // do something here with the canvas
  }, [])

  return <canvas ref={ref} />
}
```
