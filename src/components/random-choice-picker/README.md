# RandomChoicePicker

## How to focus an input element in React?

The [answer](https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering) below is from stackoverflow.

### Focus on mount

If you just want to focus an element when it mounts (initially renders) a simple use of the `autoFocus` attribute will do.

```html
<input type="text" autofocus />
```

### Dynamic focus

to control focus dynamically use a general function to hide implementation details from your components.

#### React 16.8 + Functional component - useFocus hook

```javascript
const FocusDemo = () => {
  const [inputRef, setInputFocus] = useFocus()

  return (
    <>
      <button onClick={setInputFocus}>Focus</button>
      <input ref={inputRef} />
    </>
  )
}

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus()
  }

  return [htmlElRef, setFocus]
}
```

#### React 16.3 + Class Components - utilizeFocus

```javascript
class App extends Component {
  constructor(props) {
    super(props)
    this.inputFocus = utilizeFocus()
  }

  render() {
    return (
      <>
        <button onClick={this.inputFocus.setFocus}>Focus</button>
        <input ref={this.inputFocus.ref} />
      </>
    )
  }
}

const utilizeFocus = () => {
  const ref = React.createRef()
  const setFocus = () => {
    ref.current && ref.current.focus()
  }

  return { setFocus, ref }
}
```
