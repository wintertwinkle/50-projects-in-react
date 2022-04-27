import "./style/index.css"
import ToolProvider from "./toolProvider"
import Canvas from "./Canvas"
import ToolBox from "./ToolBox"

const DrawingApp = () => {
    const tool = ToolProvider()
    return (
        <div className="drawingContainer">
            <Canvas tool={tool} />
            <ToolBox tool={tool} width={400} />
        </div>
    )
}

export default DrawingApp
