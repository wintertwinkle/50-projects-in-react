# Sticky Navbar

## 关键点

导航条的样式切换是通过切换 `active` 样式实现的。

浏览器滚动-> 监控 `window.scrollY` 和 `nav.offsetHeight` 的差值 -> 当这个差值查过某个值时，切换 `active`

那么，怎么在 React 中做到这一点呢？

`active`样式的切换使用一个状态来控制：

```js
const [toggleNav, setToggleNav] = useState(false)
```

```jsx
<nav className={`nav ${toggleNav ? "active" : ""}`} ref={navRef}>
```

在 `useEffect` 中注册窗口的 `scroll`事件，通过 `ref` 获取 nav 的高度:

```js
useEffect(() => {
    window.addEventListener("scroll", fixNav)
}, [])

const fixNav = () => {
    if (window.scrollY > navRef.current.offsetHeight + 150) {
        setToggleNav(true)
    } else {
        setToggleNav(false)
    }
}
```
