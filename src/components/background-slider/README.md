# Background Slider

## BUG record 1

**BUG Description**

使用自增符 `++` 或者 `--` 修改状态时，需要执行两次`setter`，才会执行`re-render`

```jsx
let [activeSlide, setActiveSlide] = useState(0)

// 问题代码
setActiveSlide(activeSlide--) //第一次执行,不会进行渲染

setActiveSlide(activeSlide--) //第二次执行, 进行渲染
```

**BUG FIX**

将上述问题代码改成如下后，bug 修复

```jsx
// let改成const
const [activeSlide, setActiveSlide] = useState(0)

// `activeSlide++` 改成 `activeSlide + 1`
setActiveSlide(activeSlide + 1)

// `activeSlide--` 改成 `activeSlide - 1`
setActiveSlide(activeSlide - 1)
```

**原因分析**

(1) 为何要使用 `const` 而不是 `let` 来定义状态变量？

因为函数式组件每一次执行的结果都可以看做是组件的一帧(`frame`)。每一帧代表组件在某个特定时刻的状态，在这个状态下，组件是不变的(`immutable`)。从结果上来看，使用`let`跟使用 `const` 是一样的，但是使用 `const` 来定义状态变量更符合帧(`frame`)的概念。

(2) 为何使用 `setActiveSlide(activeSlide--)`需要执行两次才能进行重新渲染？

因为当执行 `setActiveSlide()` 时，函数内部首先会对传入的参数值和 React 保存的上一次的值 `prevState` 进行比较，如果两者比较结果是一致的，就不会触发重新渲染。

之所以 `setActiveSlide(activeSlide--)` 需要执行两次才能重新渲染，因为 `activeSlide--`会先使用 `activeSlide` 再执行 `activeSlide = activeSlide - 1`。第一次比较时，状态值是一样的，只有第二次比较状态值不同才会触发重新渲染。

## BUG record 2

**BUG Description**

我自定义了一个`Hook`，该`Hook`保存了一些数据和操作这些数据的函数，然后对外暴露出这些数据和方法。是的，没错，我将这个`Hook`当做了一个数据管理容器，一个`Context`。如下所示：

```jsx
const useSlide = () => {
  // 数据
  const [index, setIndex] = useState(0)
  // 数据操作方法，对外屏蔽实现细节
  const current = () => {
    console.log(`start current->setIndex: ${index}`)
    setIndex(index % slides.length)
    console.log(`after current->setIndex: now index is ${index}`)
  }
  const prev = () => {
    console.log(`start prev->setIndex: ${index}`)
    setIndex(index + 1)
    console.log(`after prev->setIndex: now index is ${index}`)
    return current()
  }
  const next = () => {
    setIndex(index + slides.length - 1)
    return current()
  }
  const reset = () => {
    setIndex(0)
  }
  // 对外暴露数据和数据操作方法
  return { index, prev, next, reset }
}
```

我的想法是通过这个`Hook`来将`视图`和`数据以及数据操作`进行分离,屏蔽掉具体操作方法的实现,在视图层中直接导入数据和方法来达到使用数据的目的。如下所示：

```jsx
import useSlide from "./useSlide"
import "./style/index.css"

function BackgroudSlider() {
  // 引入数据和数据操作方法
  const { slides, index, prev, next } = useSlide()
  console.log(`start to render backgroundSilder`)
  console.log(`the data "index" value is : ${index}`)

  return (
    <div className="slider-container">
      {slides.map((style, idx) => {
        const isActive = idx === index
        return (
          <div
            className={`slide ${isActive ? "active" : ""}`}
            style={style}
            key={idx}
          ></div>
        )
      })}

      <button className="arrow left-arrow" onClick={prev}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <button className="arrow right-arrow" onClick={next}>
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  )
}
```

我设想中的操作流程是这样的：

(1)视图层事件 -> (2)调用数据操作方法 -> (3)修改数据 -> (4)触发渲染

但经实际测试发现(1)(2)(3)(4)步都生效了，但数据没有被修改，断点记录如下：

```jsx
// 下面两行输出表示组件进行渲染，此时 `index` 的值是 `10`
start to render backgroundSilder index.js:6
the data "index" value is : 10 index.js:7

// 下面4行表示调用数据操作方法
start prev->setIndex: 10 useSlide.js:36
// 中间调用了 `setIndex(index + 1)`, 等价于 `setIndex(11)`
// 可是调用结束后 `index` 的值依然是 `10`,这只能说明 `setIndex()`函数是一个异步函数
after prev->setIndex: now index is 10 useSlide.js:38

// 在prev函数结束时，调用 `current` 函数, 由于 `setIndex` 的异步，此时`index` 的值依然是 `10`
start current->setIndex: 10 useSlide.js:30
// 中间调用 `setIndex(index % slides.length)`, 等价于 `setIndex(10 % 5)`, 即 `setIndex(0)`
after current->setIndex: now index is 10 useSlide.js:32

// 调用数据操作方法后，组件进行重新渲染
start to render backgroundSilder index.js:6
// 从组件渲染时获取到的 `index=0` 可知，在进行渲染之前 `setIndex` 的异步操作已经结束
the data "index" value is : 0
```

对上面的 log 记录进行分析可以得知：

(1) `setIndex` 是一个异步函数，或者说通过 `useState()` 得到的数据更新方法是一个异步方法
(2) 由于执行了两次 `setIndex`, 但组件只进行了一次渲染，可以猜测 React 内部对异步操作是进行批量更新的，并不会发生数据只要有变动就进行一次渲染，很明显这是合理的，因为变动一次就渲染一次，代价太大。我猜测 React 设计上应该存在一个数据变动队列，当发现一次`setState`操作，就会将该次操作入队，等到同步代码执行完毕后，再执行该队列里的异步操作，当队列为空后，根据所有数据的最终变动结果进行进行组件渲染。

**BUG FIX**

从上面的分析结果对存在 BUG 的代码段进行定位:

```jsx
const current = () => {
  console.log(`start current->setIndex: ${index}`)
  setIndex(index % slides.length)
  console.log(`after current->setIndex: now index is ${index}`)
}
const prev = () => {
  console.log(`start prev->setIndex: ${index}`)
  setIndex(index + 1)
  console.log(`after prev->setIndex: now index is ${index}`)
  return current()
}
```

如果调用 `prev()` 函数，就会调用 `current()` 函数。而这两个函数内部都调用了 `setIndex()`。
按照我最初的设想， `current()` 函数依赖于 `prev()` 函数，因此是顺序执行的关系。而由于 `setIndex()` 的异步性，导致依赖不成立，而变成对 `index`的后发竞争关系：即谁后执行，谁最终决定 `index` 的值。

因此，解决问题的关键就是将竞争关系变成依赖关系，我想到的一种解决方法是在 `prev()` 中不直接调用 `setIndex()` 对 `index` 进行操作，而是对 `index` 的一个副本进行操作，而在 `current()` 中使用修改后的副本进行异步更新，进而渲染：

```jsx
const useSlide = () => {
  const [index, setIndex] = useState(0)
  // 每次执行useSlide,先保存一份 `index` 的副本
  let _index = index

  // 保证每次执行useSlide都只进行一次 `setIndex` 操作
  const current = () => {
    setIndex(_index % slides.length)
  }
  const prev = () => {
    _index = _index + slides.length - 1
    return current()
  }
  const next = () => {
    _index++
    return current()
  }
  const reset = () => {
    _index = 0
    return current()
  }

  return { slides, index, prev, next, reset }
}
```

## Questions remained

1. `useState`是如何工作的？它是怎么保存数据的？它保存数据的数据结构是什么？它保存数据的范围是以组件为范围的吗？它怎么保证给我的数据是我想要的那个数据？
   首先，`useState`背后必定存在某种机制来保存数据。因为函数是保存不了数据的(闭包除外哈)。

2. 当`setState`的工作队列执行完毕后会触发组件渲染，这个触发信号是谁发出的？这个信号发给谁？组件渲染的流程是怎么样的？谁来执行渲染的这份工作？
   我觉得这份工作应该是在 React 内部完成的，对虚拟 DOM 的修改。具体的 DOM 修改肯定是由`ReactDOM`来执行的。
   那么 diff 工作是谁来做的呢？我觉得有两种路径：

(1) React 内部完成 diff 工作，然后将新的虚拟 DOM 传递给`ReactDOM`，由`ReactDOM`来执行。不对，这种路径`diff`就没有意义了。
(2) React 直接将修改完成后的 虚拟`DOM`传递给`ReactDOM` ,由 `ReactDOM`来执行 diff 工作，然后花费最小代价修改真实 DOM。
