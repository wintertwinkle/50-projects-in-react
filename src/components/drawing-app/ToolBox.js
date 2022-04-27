const ToolBox = ({ tool, width }) => {
  return (
    <div className="toolbox" style={{ width: `${width}px` }}>
      <button id="decrease" onClick={tool.decrease}>
        -
      </button>
      <span id="size">{tool.size}</span>
      <button id="increase" onClick={tool.increase}>
        +
      </button>
      <input type="color" name="color" id="color" onClick={tool.pickColor} />
      <button id="clear">X</button>
    </div>
  )
}

export default ToolBox
