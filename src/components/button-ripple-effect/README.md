# Button ripple effect

## BUG record 1

**BUG Description**
只有第一次点击按钮时，才会触发动画。后面的点击不会触发动画。

**BUG FIX**
原因分析：

当`coordinate`更新的时候，<Circle>组件不会更新，只会更新内部的`coordinate` 所以动画只会执行一次

两种可能的解决思路:

(1) 每次都重新创建一个新的 <Circle>组件,通过`nanoid`每次都设置一个不同的`key`。

```jsx
const circle = <Circle coordinate={coordinate} key={nanoid()} />
```

这样 react 就会认为这是两个不同的组件。(可行)

(2) 从 CSS 出发，我需要的是每次当`coordinate`更新时重新触发一次动画

    有没有这么一种方法，当sytle的某个属性变化时，重新触发动画？ (暂时没有找到解决方案)
