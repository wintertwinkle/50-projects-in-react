const ToolProvider = (canvasContext) => {
    let ctx = null
    function setCtx(context) {
        if (context) {
            ctx = context
        }
    }
    setCtx(canvasContext)

    let color = "black"
    function setColor(newColor) {
        color = newColor
    }

    let size = 5
    function setSize(newSize) {
        size = newSize
    }

    let mouseIsPressed = false
    function setMouseIsPressed(isPressed) {
        mouseIsPressed = isPressed
    }

    let mousePosition = {
        x: 0,
        y: 0,
    }
    function setMousePostion({ x, y }) {
        mousePosition = { x, y }
    }

    function drawCircle(x, y, r) {
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()
    }

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = color
        ctx.lineWidth = size * 2
        ctx.stroke()
    }

    function decrease() {
        if (size > 1) {
            setSize(size - 1)
        }
    }

    function increase() {
        if (size < 50) {
            setSize(size + 1)
        }
    }

    function pickColor(e) {
        setColor(e.target.value)
    }

    function clear() {
        // ctx.clearRect(0, 0, w, h)
    }

    function onMouseDown(e) {
        // console.log(`mousedown`)
        setMouseIsPressed(true)
        setMousePostion({
            x: e.offsetX,
            y: e.offsetY,
        })
        drawCircle(mousePosition.x, mousePosition.y, size)
    }

    function onMouseUp(e) {
        // console.log(`mouseup`)
        setMouseIsPressed(false)
        setMousePostion({
            x: undefined,
            y: undefined,
        })
    }

    function onMouseMove(e) {
        // console.log(`mousemove`)
        if (mouseIsPressed) {
            const x2 = e.offsetX
            const y2 = e.offsetY
            drawCircle(x2, y2, size)
            drawLine(mousePosition.x, mousePosition.y, x2, y2)
            setMousePostion({
                x: x2,
                y: y2,
            })
        }
    }

    const EventHandlers = [
        {
            type: "mousedown",
            handler: onMouseDown,
        },
        {
            type: "mousemove",
            handler: onMouseMove,
        },
        {
            type: "mouseup",
            handler: onMouseUp,
        },
    ]

    return {
        color,
        pickColor,
        size,
        decrease,
        increase,
        EventHandlers,
        setCtx,
    }
}

export default ToolProvider
