import { useEffect, useRef } from "react"

const Canvas = (props) => {
    const canvasRef = useRef()

    //事件注册函数
    const registerEventHandler = (canvas, type, func) => {
        canvas.addEventListener(type, func)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        props.tool.setCtx(ctx)
        if (props.tool.EventHandlers) {
            props.tool.EventHandlers.forEach((item) =>
                registerEventHandler(canvas, item.type, item.handler)
            )
        }
    }, [])

    return <canvas ref={canvasRef}></canvas>
}

export default Canvas
