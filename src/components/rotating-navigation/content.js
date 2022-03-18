export default function Content(props) {
  const image = props.image
  return (
    <div className="content">
      <h1>Amazing Article</h1>
      <small>Florin Pop</small>
      <p>
        Every property used in CSS has a value type defining the set of values
        that are allowed for that property. Taking a look at any property page
        on MDN will help you understand the values associated with a value type
        that are valid for any particular property. In this lesson we will take
        a look at some of the most frequently used value types, and their most
        common values and units.
      </p>
      <p>
        In CSS specifications and on the property pages here on MDN you will be
        able to spot value types as they will be surrounded by angle brackets,
        such as color or length. When you see the value type color as valid for
        a particular property, that means you can use any valid color as a value
        for that property, as listed on the color reference page.
      </p>

      <img src={image} alt="an img" />
    </div>
  )
}
