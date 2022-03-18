export default function MenuToggle(props) {
  function handleClick() {
    props.onClick()
  }
  return (
    <div className="circle-container">
      <div className="circle">
        <button id="close" onClick={handleClick}>
          <i className="fas fa-times"></i>
        </button>
        <button id="open" onClick={handleClick}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </div>
  )
}
