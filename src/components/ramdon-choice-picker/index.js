import { Component } from "react"
import "./style/index.css"
import { nanoid } from "nanoid" // helps to generate unique key

class RamdonChoicePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      highlightTagIndex: -1,
    }
    // binding
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {}

  createTags() {
    const highlightTagIndex = this.state.highlightTagIndex
    const tagsEl = this.state.tags.map((tag, index) => {
      const isHighlight = index === highlightTagIndex
      return (
        <span
          className={`tag ${isHighlight ? "highlight" : ""}`}
          key={nanoid()}
        >
          {tag}
        </span>
      )
    })
    return tagsEl
  }

  handleKeyUp(event) {
    /**
     * `KeyUp` event will emits all types of keyboard, but here we only need
     * key which are printable, for performance and save of calculation, we add a filter
     * where logic executes only when key is printable
     */

    if (this.isPrintableKey(event.keyCode)) {
      if (event.key === ",") {
        if (this.state.highlightTagIndex !== -1) {
          this.setState({
            highlightTagIndex: -1,
          })
        }
        const input = event.target.value
        const tags = input
          .split(",")
          .filter((tag) => tag.trim() !== "")
          .map((tag) => tag.trim())
          /**
           * remove array duplications:
           * this algorithm is not particularly efficient for large arrays, but it works well here.
           * Resources: [https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array]
           */
          .filter((tag, index, arr) => index === arr.indexOf(tag))

        // Reconciliation: trigger `setState()` only when tags changed.
        const diff = this.arrDiff(tags, this.state.tags)
        if (diff.length > 0) {
          this.setState({
            tags: tags,
          })
        }
      }
    } else if (event.keyCode === 13) {
      // Enter keyCode
      event.target.value = ""
      this.ramdonSelect()
    }
  }

  /**
   * Bugs: sometimes you need to press `Enter` twice ru run this,
   * I don't konw why, but I thought it's related to `setStatu`
   */
  ramdonSelect() {
    const boundary = this.state.tags.length
    const times = 10 * Math.floor(Math.random() * boundary)
    let selectedTagIndex = -1
    let speed = 100

    const interval = setInterval(() => {
      setTimeout(() => {
        selectedTagIndex =
          selectedTagIndex === boundary - 1 ? 0 : selectedTagIndex + 1
        this.setState({
          highlightTagIndex: selectedTagIndex,
        })
      }, speed)
    }, speed)

    setTimeout(() => {
      clearInterval(interval)
    }, times * 100)
  }

  // Resouces: [https://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character]
  isPrintableKey(keycode) {
    const valid =
      (keycode > 47 && keycode < 58) || // number keys
      keycode === 32 || // spacebar key
      // keycode === 13 || // return key
      (keycode > 64 && keycode < 91) || // letter keys
      (keycode > 95 && keycode < 112) || // numpad keys
      (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
      (keycode > 218 && keycode < 223) // [\]' (in order)

    return valid
  }

  // Resouces: [https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript]
  arrDiff(a1, a2) {
    const a = [],
      diff = []

    for (let i = 0; i < a1.length; i++) {
      a[a1[i]] = true
    }
    for (let i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
        delete a[a2[i]]
      } else {
        a[a2[i]] = true
      }
    }
    for (let k in a) {
      diff.push(k)
    }

    return diff
  }

  render() {
    const tags = this.createTags()
    return (
      <div className="container">
        <h3>
          Enter all of the choices devided by a comma (',').
          <br />
          Press Enter when you're done.
        </h3>
        <textarea
          className="textarea"
          placeholder="Enter choices here..."
          autoFocus
          onKeyUp={this.handleKeyUp}
        ></textarea>
        <div className="tags">
          {tags}
          {/* <span className="tag highlight">Choice</span> */}
        </div>
      </div>
    )
  }
}

export default RamdonChoicePicker

// const tagsEl = document.querySelector(".tags")
// const textarea = document.querySelector(".textarea")

// textarea.focus()

// textarea.addEventListener("keyup", (e) => {
//   createTags(e.target.value)

//   if (e.key === "Enter") {
//     setTimeout(() => {
//       e.target.value = ""
//     }, 10)

//     ramdonSelect()
//   }
// })

// Manipulation of DOM like this is inefficient
// We need a more efficient way to do the operaiton of DOM.
// maybe virtual DOM is a good way.
// [What is Virtual Dom? And Why is it faster?]
// (https://dev.to/karthikraja34/what-is-virtual-dom-and-why-is-it-faster-14p9)

// function createTags(input) {
//   const tags = input
//     .split(",")
//     .filter((tag) => tag.trim() !== "")
//     .map((tag) => tag.trim())
//   tagsEl.innerHTML = ""
//   tags.forEach((tag) => {
//     const tagEl = document.createElement("span")
//     tagEl.classList.add("tag")
//     tagEl.innerText = tag
//     tagsEl.appendChild(tagEl)
//   })
// }

// function ramdonSelect() {
//   const times = 15

//   const interval = setInterval(() => {
//     const randomTag = pickRandomTag()

//     highlightTag(randomTag)

//     setTimeout(() => {
//       unHighlightTag(randomTag)
//     }, 100)
//   }, 100)

//   setTimeout(() => {
//     clearInterval(interval)

//     setTimeout(() => {
//       const randomTag = pickRandomTag()
//       highlightTag(randomTag)
//     })
//   }, times * 100)
// }

// function pickRandomTag() {
//   const tags = document.querySelectorAll(".tag")
//   const pickedTagIndex = Math.floor(Math.random() * tags.length)
//   return tags[pickedTagIndex]
// }

// function highlightTag(tag) {
//   tag.classList.add("highlight")
// }

// function unHighlightTag(tag) {
//   tag.classList.remove("highlight")
// }
