import MenuToggle from "./menu-toggle"
import Content from "./content"

export default function Page(props) {
  const isRotate = props.rotaion

  return (
    <div className={`container ${isRotate ? "show-nav" : ""}`}>
      <MenuToggle onClick={props.onClick} />
      <Content image={props.image} />
    </div>
  )
}
